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
  Popconfirm,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";

type CommentItem = {
  id: string;
  content: string;
  isInternal: boolean;
  complaint?: { id: string; title?: string; referenceNumber?: string } | null;
  author?: { id: string; fullName?: string; email?: string } | null;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const initialComments: CommentItem[] = [
  {
    id: "c1",
    content: "Wadada waxay leedahay daloolo badan oo halis ah.",
    isInternal: false,
    complaint: { id: "cmp1", title: "Potholes on Main Road", referenceNumber: "REF-001" },
    author: { id: "u1", fullName: "Mohamed Dacar" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "c2",
    content: "Official note: team dispatched, awaiting parts.",
    isInternal: true,
    complaint: { id: "cmp1", title: "Potholes on Main Road", referenceNumber: "REF-001" },
    author: { id: "u2", fullName: "Eng Said" },
    createdAt: new Date().toISOString(),
  },
];

export default function CommentsPage() {
  const [data, setData] = useState<CommentItem[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CommentItem | null>(null);
  const [form] = Form.useForm();
  const [filter, setFilter] = useState<"all" | "internal" | "public">("all");

  async function fetchComments() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/comments`).catch(() => null);
      if (!res || !res.ok) {
        // fallback to local mock data
        setData(initialComments);
      } else {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to load comments, using local data.");
      setData(initialComments);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // load comments on mount
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (record: CommentItem) => {
    setEditing(record);
    form.setFieldsValue({
      content: record.content,
      isInternal: record.isInternal,
      complaintId: record.complaint?.id,
      authorId: record.author?.id,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      // attempt backend delete
      const res = await fetch(`${API_BASE}/api/comments/${id}`, { method: "DELETE" }).catch(() => null);
      if (res && res.ok) {
        message.success("Comment deleted");
      } else {
        message.success("Comment removed locally");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to delete on server; removed locally");
    } finally {
      setData((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        content: values.content,
        isInternal: !!values.isInternal,
        complaintId: values.complaintId,
        authorId: values.authorId,
      };

      if (editing) {
        // try server update
        const res = await fetch(`${API_BASE}/api/comments/${editing.id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => null);

        if (res && res.ok) {
          const updated = await res.json();
          setData((prev) => prev.map((c) => (c.id === editing.id ? updated : c)));
          message.success("Comment updated");
        } else {
          // update locally if server not available
          setData((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...payload } : c)));
          message.success("Comment updated locally");
        }
      } else {
        const res = await fetch(`${API_BASE}/api/comments`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        }).catch(() => null);

        let created: CommentItem;
        if (res && res.ok) {
          created = await res.json();
        } else {
          // local fallback: create fake id & timestamps
          created = {
            id: `local-${Date.now()}`,
            content: payload.content,
            isInternal: payload.isInternal,
            complaint: { id: payload.complaintId, title: "Unknown" },
            author: { id: payload.authorId, fullName: "Unknown" },
            createdAt: new Date().toISOString(),
          };
        }
        setData((prev) => [created, ...prev]);
        message.success("Comment created");
      }
      setOpen(false);
      form.resetFields();
      setEditing(null);
    } catch (err) {
      console.error(err);
      message.error("Failed to save comment");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<CommentItem> = [
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text: string) => <div style={{ maxWidth: 420, whiteSpace: "pre-wrap" }}>{text}</div>,
    },
    {
      title: "Complaint",
      dataIndex: ["complaint", "title"],
      key: "complaint",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.complaint?.title ?? "-"}</div>
          <div style={{ fontSize: 12, color: "#666" }}>{record.complaint?.referenceNumber ?? ""}</div>
        </div>
      ),
    },
    {
      title: "Author",
      dataIndex: ["author", "fullName"],
      key: "author",
      render: (v, record) => record.author?.fullName ?? "-",
    },
    {
      title: "Type",
      dataIndex: "isInternal",
      key: "isInternal",
      render: (v: boolean) => (v ? <Tag color="red">Internal</Tag> : <Tag color="green">Public</Tag>),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v: string | undefined) => (v ? new Date(v).toLocaleString() : "-"),
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Ma hubtaa inaad tirtirto comment-kan?"
            onConfirm={() => handleDelete(record.id)}
            okText="Haa"
            cancelText="Maya"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((c) =>
    filter === "all" ? true : filter === "internal" ? c.isInternal : !c.isInternal
  );

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreate}>
          New Comment
        </Button>
        <Select value={filter} onChange={(v) => setFilter(v)} style={{ width: 160 }}>
          <Select.Option value="all">All</Select.Option>
          <Select.Option value="public">Public</Select.Option>
          <Select.Option value="internal">Internal</Select.Option>
        </Select>
        <Button onClick={fetchComments}>Refresh</Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title={editing ? "Edit Comment" : "Create Comment"}
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setEditing(null);
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="content" label="Content" rules={[{ required: true, message: "Fadlan geli content" }]}>
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="complaintId" label="Complaint ID" rules={[{ required: true }]}>
            <Input placeholder="Enter complaint id (or connect to select list)" />
          </Form.Item>

          <Form.Item name="authorId" label="Author ID" rules={[{ required: true }]}>
            <Input placeholder="Enter author user id" />
          </Form.Item>

          <Form.Item name="isInternal" label="Is Internal" initialValue={false}>
            <Select>
              <Select.Option value={false}>Public</Select.Option>
              <Select.Option value={true}>Internal</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary" loading={loading}>
                {editing ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  form.resetFields();
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
