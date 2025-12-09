"use client";

import React from "react";
import { Card, Button, Table, Tag, Space } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const stats = [
  { id: 1, label: "Total Complaints", value: 1286, diff: 8 },
  { id: 2, label: "Open", value: 342, diff: -3 },
  { id: 3, label: "Resolved", value: 891, diff: 12 },
  { id: 4, label: "Officials", value: 42, diff: 1 },
];

const chartData = [
  { name: "Jan", complaints: 120 },
  { name: "Feb", complaints: 210 },
  { name: "Mar", complaints: 150 },
  { name: "Apr", complaints: 320 },
  { name: "May", complaints: 280 },
  { name: "Jun", complaints: 360 },
  { name: "Jul", complaints: 420 },
];

const recentComplaints = [
  { key: "1", title: "Potholes on Main Road", reference: "REF-00123", category: "Roads", status: "IN_PROGRESS", priority: "HIGH" },
  { key: "2", title: "No water supply in Hodan", reference: "REF-00124", category: "Water", status: "SUBMITTED", priority: "MEDIUM" },
  { key: "3", title: "Broken street light", reference: "REF-00125", category: "Electricity", status: "RESOLVED", priority: "LOW" },
];

const columns = [
  { title: "Title", dataIndex: "title", key: "title", render: (t: string) => <strong>{t}</strong> },
  { title: "Ref", dataIndex: "reference", key: "reference" },
  { title: "Category", dataIndex: "category", key: "category" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (s: string) => {
      const color = s === "RESOLVED" ? "green" : s === "IN_PROGRESS" ? "blue" : "orange";
      return <Tag color={color}>{s}</Tag>;
    },
  },
  { title: "Priority", dataIndex: "priority", key: "priority", render: (p: string) => <Tag>{p}</Tag> },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back — here’s a quick snapshot of the complaint reporting system.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="primary" icon={<PlusOutlined />}>New Complaint</Button>
          <Button>Export</Button>
        </div>
      </div>

      {/* Stats + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Card key={s.id} variant="borderless" className="shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className="text-2xl font-semibold">{s.value.toLocaleString()}</div>
                  </div>
                  <div className={`text-sm ${s.diff >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {s.diff >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(s.diff)}%
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card title="Complaints — last 7 months" className="mt-4 shadow-sm" variant="borderless">
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="complaints" stroke="#1890ff" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Quick Actions" variant="borderless" className="shadow-sm">
            <Space direction="vertical" size="middle">
              <Button block>Assign Unassigned</Button>
              <Button block>View Overdue</Button>
              <Button block>Manage Categories</Button>
            </Space>
          </Card>

          <Card title="Top Categories" variant="borderless" className="mt-4 shadow-sm">
            <ul className="space-y-2">
              <li className="flex justify-between"><span>Roads</span><span className="font-semibold">412</span></li>
              <li className="flex justify-between"><span>Water</span><span className="font-semibold">298</span></li>
              <li className="flex justify-between"><span>Sanitation</span><span className="font-semibold">210</span></li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Recent Complaints Table */}
      <Card title="Recent Complaints" variant="borderless" className="shadow-sm">
        <Table columns={columns} dataSource={recentComplaints} pagination={{ pageSize: 5 }} />
      </Card>

      {/* Footer Stats */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <Card variant="borderless" className="flex-1 shadow-sm">
          <div className="text-sm text-gray-500">Average Resolution Time</div>
          <div className="text-xl font-semibold mt-1">3.6 days</div>
        </Card>
        <Card variant="borderless" className="flex-1 shadow-sm">
          <div className="text-sm text-gray-500">Satisfaction Score</div>
          <div className="text-xl font-semibold mt-1">89%</div>
        </Card>
        <Card variant="borderless" className="flex-1 shadow-sm">
          <div className="text-sm text-gray-500">Pending Comments</div>
          <div className="text-xl font-semibold mt-1">24</div>
        </Card>
      </div>

    </div>
  );
}
