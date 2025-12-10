import api from "./api";

export const createComplaint = (data: any) =>
  api.post("/complaints", data);

export const getMyComplaints = () =>
  api.get("/complaints");

export const getComplaintById = (id: string) =>
  api.get(`/complaints/${id}`);

export const updateStatus = (id: string, status: string) =>
  api.patch(`/complaints/${id}/status`, { status });

export const assignComplaint = (id: string, assignedToId: string) =>
  api.patch(`/complaints/${id}/assign`, { assignedToId });

export const updatePriority = (id: string, priority: string) =>
  api.patch(`/complaints/${id}/priority`, { priority });
