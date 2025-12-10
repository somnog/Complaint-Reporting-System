"use client";

import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Form, Input, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import userService, { User } from "@/app/services/userService";
const UsersTable: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  // Load users from API
  const loadUsers = async () => {
    setLoading(true);
    try {
      const users = await userService.getAll();
      setData(users);
    } catch (error) {
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Open Add User Modal
  const openAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Open Edit User Modal
  const openEditModal = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Delete user (locally for now)
  const deleteUser = (id: string) => {
    setData((prev) => prev.filter((user) => user.id !== id));
    message.success("User deleted (locally)");
  };

  // Submit Add/Edit form
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        // Update locally
        setData((prev) =>
          prev.map((user) => (user.id === editingUser.id ? { ...user, ...values } : user))
        );
        message.success("User updated (locally)");
      } else {
        // Add new user locally (generate temporary id)
        const newUser: User = {
          id: Date.now().toString(),
          role: "CITIZEN", // default role or adapt accordingly
          ...values,
        };
        setData((prev) => [...prev, newUser]);
        message.success("User added (locally)");
      }

      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <strong>{text}</strong>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      render: (dep) => dep || "-",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openEditModal(record)}>Edit</a>
          <a onClick={() => deleteUser(record.id)} style={{ color: "red" }}>
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4">User Management</h2>

      <Button type="primary" onClick={openAddModal} style={{ marginBottom: 16 }}>
        Add User
      </Button>

      <Table<User> columns={columns} dataSource={data} rowKey="id" loading={loading} />

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? "Update User" : "Add New User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullName" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="address" label="Address" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
