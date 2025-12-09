"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Upload,
  message,
  Tag,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { InboxOutlined } from "@ant-design/icons";

type User = {
  id: string;
  fullName: string;
  email?: string;
};

type Category = {
  id: string;
  name: string;
};

type Complaint = {
  id: string;
  title: string;
  description: string;
  location: string;
  referenceNumber: string;
  status: string;
  priority: string;
  imageUrl?: string | null;
  submittedBy?: User | null;
  category?: Category | null;
  assignedTo?: User | null;
  comments?: { id: string }[];
};

const { Dragger } = Upload;
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export default function ComplaintsPage() {
  const [data, setData] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]); // for upload preview

  // Fetch data from backend (or fallback to empty arrays)
  async function fetchAll() {
    setLoading(true);
    try {
      const [cRes, uRes, compRes] = await Promise.all([
        fetch(`${API_BASE}/api/categories`).then((r) => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/users`).then((r) => r.json()).catch(() => []),
        fetch(`${API_BASE}/api/complaints`).then((r) => r.json()).catch(() => []),
      ]);
      setCategories(cRes || []);
      setUsers(uRes || []);
      setData(compRes || []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  // Convert File to base64 (for sending image inline). You can replace this with upload to server endpoint.
  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = (err) => reject(err);
    });

  const handleCreate = async (values: any) => {
    setLoading(true);
    try {
      // If user uploaded an image, convert to base64 and include as imageUrl
      let imageUrl: string | undefined = undefined;
      if (fileList.length > 0 && fileList[0].originFileObj) {
        imageUrl = await fileToBase64(fileList[0].originFileObj as File);
      }

      // build payload
      const payload = {
        title: values.title,
        description: values.description,
        location: values.location,
        submittedById: values.submittedById,
        categoryId: values.categoryId,
        assignedToId: values.assignedToId || undefined,
        priority: values.priority || "MEDIUM",
        // server can generate referenceNumber if not provided
        referenceNumber: values.referenceNumber || undefined,
        imageUrl,
      };

      // POST to backend
      const res = await fetch(`${API_BASE}/api/complaints`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Failed to create complaint");
      }
      const created = await res.json();

      message.success("Complaint created");
      setOpen(false);
      form.resetFields();
      setFileList([]);
      // Refresh list (optimistic prepend)
      setData((prev) => [created, ...prev]);
    } catch (err: any) {
      console.error(err);
      message.error(err?.message ?? "Error creating complaint");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Complaint> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (t) => <strong>{t}</strong>,
    },
    {
      title: "Reference",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
    },
    {
      title: "Submitted By",
      dataIndex: ["submittedBy", "fullName"],
      key: "submittedBy",
      render: (v, record) => record.submittedBy?.fullName ?? "—",
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      render: (v, record) => record.category?.name ?? "-",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => {
        const color = s === "RESOLVED" ? "green" : s === "IN_PROGRESS" ? "blue" : "orange";
        return <Tag color={color}>{s}</Tag>;
      },
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (p) => <Tag>{p}</Tag>,
    },
    {
      title: "Assigned To",
      dataIndex: ["assignedTo", "fullName"],
      key: "assignedTo",
      render: (v, record) => record.assignedTo?.fullName ?? "-",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (c: any[]) => c?.length ?? 0,
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          New Complaint
        </Button>
        <Button onClick={fetchAll}>Refresh</Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Create Complaint"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setFileList([]);
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Short title for the complaint" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Detailed description" />
          </Form.Item>

          <Form.Item name="location" label="Location" rules={[{ required: true }]}>
            <Input placeholder="Address or area (e.g., Wadajir, Muqdisho)" />
          </Form.Item>

          <Form.Item name="submittedById" label="Submitted By" rules={[{ required: true }]}>
            <Select showSearch placeholder="Select user">
              {users.map((u) => (
                <Select.Option value={u.id} key={u.id}>
                  {u.fullName} {u.email ? `(${u.email})` : ""}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="categoryId" label="Category" rules={[{ required: true }]}>
            <Select placeholder="Select category">
              {categories.map((c) => (
                <Select.Option value={c.id} key={c.id}>
                  {c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="assignedToId" label="Assign To (optional)">
            <Select placeholder="Assign to official">
              <Select.Option value="">Unassigned</Select.Option>
              {users.map((u) => (
                <Select.Option value={u.id} key={u.id}>
                  {u.fullName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="priority" label="Priority" initialValue="MEDIUM">
            <Select>
              <Select.Option value="LOW">Low</Select.Option>
              <Select.Option value="MEDIUM">Medium</Select.Option>
              <Select.Option value="HIGH">High</Select.Option>
              <Select.Option value="URGENT">Urgent</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Image (optional)">
            <Dragger
              accept="image/*"
              multiple={false}
              fileList={fileList}
              onRemove={() => setFileList([])}
              beforeUpload={(file) => {
                // keep file in state and prevent auto upload
                setFileList([{ uid: file.uid, name: file.name, originFileObj: file }]);
                return false;
              }}
              maxCount={1}
              style={{ padding: 8 }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to this area to upload</p>
              <p className="ant-upload-hint">PNG / JPG up to your backend limits</p>
            </Dragger>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary" loading={loading}>
                Create
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  form.resetFields();
                  setFileList([]);
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
