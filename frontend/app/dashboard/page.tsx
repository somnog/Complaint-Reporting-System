"use client";

import { useEffect, useState } from "react";
import { Spin } from "antd";

import StatsCards from "./components/StatsCards";
import RecentTable from "./components/RecentTable";

import { Complaint } from "@/types/complaint";
import { getComplaints } from "../services/complaintService";

export default function DashboardPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getComplaints();
        setComplaints(data);
      } catch (err) {
        console.error("Dashboard load error:", err);
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <StatsCards complaints={complaints} />
      <RecentTable complaints={complaints} />
    </div>
  );
}
