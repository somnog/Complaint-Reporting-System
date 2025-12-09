"use client";

import React, { useState } from "react";
import { Table, Space, Button, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  address: string;
  department: string;
}

const UsersTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([
    {
      key: "1",
      fullname: "Mohamed Dacar",
      email: "m.dacar@example.com",
      phoneNumber: "0617791483",
      address: "Wadajir, Muqdisho",
      department: "IT / Engineering",
    },
    {
      key: "2",
      fullname: "Mohamed Noor",
      email: "m.noor@example.com",
      phoneNumber: "0615000001",
      address: "Hodan, Muqdisho",
      department: "HR",
    },
    {
      key: "3",
      fullname: "Eng Said",
      email: "eng.said@example.com",
      phoneNumber: "0615000002",
      address: "Banaadir, Muqdisho",
      department: "Engineering",
    },
    {
      key: "4",
      fullname: "Ayaan Ahmed",
      email: "ayaan@example.com",
      phoneNumber: "0615000003",
      address: "Waberi, Muqdisho",
      department: "Finance",
    },
    {
      key: "5",
      fullname: "Faysal Ali",
      email: "faysal@example.com",
      phoneNumber: "0615000004",
      address: "KM4, Muqdisho",
      department: "Management",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  // Open Add User Modal
  const openAddModal = () => {
    setEditingUser(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  // Open Edit User Modal
  const openEditModal = (record: DataType) => {
    setEditingUser(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Delete User
  const deleteUser = (key: string) => {
    setData((prev) => prev.filter((user) => user.key !== key));
  };

  // Submit Form (Add or Edit)
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingUser) {
        // Update Existing User
        setData((prev) =>
          prev.map((user) =>
            user.key === editingUser.key ? { ...editingUser, ...values } : user
          )
        );
      } else {
        // Add New User
        const newUser: DataType = {
          ...values,
          key: Date.now().toString(),
        };
        setData((prev) => [...prev, newUser]);
      }

      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text: string) => <strong>{text}</strong>,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Department", dataIndex: "department", key: "department" },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openEditModal(record)}>Edit</a>
          <a onClick={() => deleteUser(record.key)} style={{ color: "red" }}>
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

      <Table<DataType> columns={columns} dataSource={data} />

      {/* Add/Edit Modal */}
      <Modal
        title={editingUser ? "Update User" : "Add New User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}>
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

          <Form.Item name="department" label="Department" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersTable;
