"use client";

import { Row, Col, Card, Statistic } from "antd";
import { Complaint } from "@/types/complaint";

export default function StatsCards({ complaints }: { complaints: Complaint[] }) {
  return (
    <Row gutter={16} className="mb-6">
      <Col span={8}>
        <Card>
          <Statistic title="Total Complaints" value={complaints.length} />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic
            title="Pending"
            value={complaints.filter((c) => c.status === "pending").length}
          />
        </Card>
      </Col>

      <Col span={8}>
        <Card>
          <Statistic
            title="Resolved"
            value={complaints.filter((c) => c.status === "resolved").length}
          />
        </Card>
      </Col>
    </Row>
  );
}
