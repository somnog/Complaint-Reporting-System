"use client";

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";

type CategoryType = {
  id: string;
  name: string;
  description?: string;
};

const initialCategories: CategoryType[] = [
  { id: "1", name: "Roads", description: "Road and traffic issues" },
  { id: "2", name: "Water", description: "Water supply issues" },
  { id: "3", name: "Electricity", description: "Power outage and wiring issues" },
  { id: "4", name: "Sanitation", description: "Garbage collection and sewage issues" },
  { id: "5", name: "Public Safety", description: "Crimes, hazards, insecure areas" },
];

export default function CategoriesPage() {
  const [data, setData] = useState<CategoryType[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CategoryType | null>(null);
  const [form] = Form.useForm();

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEdit = (record: CategoryType) => {
    setEditing(record);
    form.setFieldsValue({ name: record.name, description: record.description });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((c) => c.id !== id));
    message.success("Category deleted");
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (editing) {
        // Edit existing
        setData((prev) => prev.map((c) => (c.id === editing.id ? { ...c, ...values } : c)));
        message.success("Category updated");
      } else {
        // Create new (generate simple id)
        const newItem: CategoryType = {
          id: String(Date.now()),
          name: values.name,
          description: values.description,
        };
        setData((prev) => [newItem, ...prev]);
        message.success("Category created");
      }
      setOpen(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
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
      render: (text) => text ?? "-",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEdit(record)}>
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
        <Button type="primary" onClick={openCreate}>
          New Category
        </Button>
        <Button onClick={() => { setData(initialCategories); message.success("Reset to initial data"); }}>
          Reset
        </Button>
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
        open={open}
        onCancel={() => { setOpen(false); form.resetFields(); }}
        footer={null}
        destroyOnHidden   // ✅ FIXED HERE
        >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Fadlan gali magaca category" }]}>
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
              <Button onClick={() => { setOpen(false); form.resetFields(); }}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
