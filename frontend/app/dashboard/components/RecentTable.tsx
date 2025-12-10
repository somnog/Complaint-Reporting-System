"use client";

import { Table, Card } from "antd";
import { Complaint } from "@/types/complaint";

export default function RecentTable({ complaints }: { complaints: Complaint[] }) {
  return (
    <Card title="Recent Complaints" className="shadow-sm">
      <Table
        rowKey="id"
        dataSource={complaints}
        columns={[
          { title: "Title", dataIndex: "title", key: "title" },
          { title: "Ref", dataIndex: "referenceNumber", key: "referenceNumber" },
          { title: "Category", dataIndex: "category", key: "category" },
          { title: "Status", dataIndex: "status", key: "status" },
        ]}
      />
    </Card>
  );
}
