"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Checkbox,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

type CommentType = {
  id: string;
  content: string;
  isInternal: boolean;
  complaintId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    fullName: string;
  };
  complaint: {
    id: string;
    title: string;
  };
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const currentComplaintId = "7dd68b10-cc67-4fc6-b28e-8d879e04f243";
const currentUserId = "2f3bb45c-7467-4af8-bdf0-6b5ab764fd40";

export default function CommentsTable() {
  const [data, setData] = useState<CommentType[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CommentType | null>(null);
  const [form] = Form.useForm();

  const fetchComments = async () => {
    setFetchLoading(true);
    try {
      const res = await api.get("/comments");
      // FIX: backend returns array directly in res.data (no .data)
      setData(res.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch comments");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const openCreateModal = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (record: CommentType) => {
    setEditing(record);
    form.setFieldsValue({
      content: record.content,
      isInternal: record.isInternal,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setFetchLoading(true);
    try {
      await api.delete(`/comments/${id}`);
      setData((prev) => prev.filter((c) => c.id !== id));
      message.success("Comment deleted");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete comment");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSubmit = async (values: { content: string; isInternal: boolean }) => {
    setSubmitLoading(true);
    try {
      if (editing) {
        const res = await api.patch(`/comments/${editing.id}`, values);
        setData((prev) =>
          prev.map((c) => (c.id === editing.id ? res.data : c))
        );
        message.success("Comment updated");
      } else {
        const payload = {
          ...values,
          complaintId: currentComplaintId,
          authorId: currentUserId,
        };
        const res = await api.post("/comments", payload);
        setData((prev) => [res.data, ...prev]);
        message.success("Comment created");
      }
      setModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const columns: ColumnsType<CommentType> = [
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Author",
      dataIndex: ["author", "fullName"],
      key: "author",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Complaint Title",
      dataIndex: ["complaint", "title"],
      key: "complaintTitle",
    },
    {
      title: "Internal",
      dataIndex: "isInternal",
      key: "isInternal",
      render: (value: boolean) =>
        value ? (
          <CheckOutlined style={{ color: "green" }} />
        ) : (
          <CloseOutlined style={{ color: "red" }} />
        ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this comment?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreateModal}>
          New Comment
        </Button>
        <Button onClick={fetchComments} loading={fetchLoading}>
          Refresh
        </Button>
      </Space>

      <Table<CommentType>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={fetchLoading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title={editing ? "Edit Comment" : "Create Comment"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter comment content" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="isInternal"
            label="Internal Comment"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary" loading={submitLoading}>
                {editing ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
                  form.resetFields();
                }}
                disabled={submitLoading}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
