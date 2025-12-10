"use client";

import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";

type CategoryType = {
  id: string;
  name: string;
  description?: string;
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

// Automatically attach token if you use auth
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function CategoriesPage() {
  const [data, setData] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryType | null>(null);
  const [form] = Form.useForm();

  // Fetch categories from backend
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      // Assuming your API response structure: { data: CategoryType[], meta: {...} }
      setData(res.data.data || []);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (record: CategoryType) => {
    setEditing(record);
    form.setFieldsValue({ name: record.name, description: record.description });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await api.delete(`/categories/${id}`);
      setData((prev) => prev.filter((c) => c.id !== id));
      message.success("Category deleted");
    } catch (error) {
      console.error(error);
      message.error("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: { name: string; description?: string }) => {
    setLoading(true);
    try {
      if (editing) {
        // PATCH update
        const res = await api.patch(`/categories/${editing.id}`, values);
        setData((prev) =>
          prev.map((c) => (c.id === editing.id ? res.data : c))
        );
        message.success("Category updated");
      } else {
        // POST create
        const res = await api.post("/categories", values);
        setData((prev) => [res.data, ...prev]);
        message.success("Category created");
      }
      setModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<CategoryType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "-",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title={`Ma hubtaa inaad tirtirto "${record.name}"?`}
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

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={openCreateModal}>
          New Category
        </Button>
        <Button onClick={fetchCategories}>Refresh</Button>
      </Space>

      <Table<CategoryType>
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title={editing ? "Edit Category" : "Create Category"}
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
            name="name"
            label="Name"
            rules={[{ required: true, message: "Fadlan gali magaca category" }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} placeholder="Short description (optional)" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="submit" type="primary" loading={loading}>
                {editing ? "Update" : "Create"}
              </Button>
              <Button
                onClick={() => {
                  setModalOpen(false);
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
