import api from "./api";

export const addComment = (complaintId: string, data: any) =>
  api.post(`/complaints/${complaintId}/comments`, data);

export const getComments = (complaintId: string) =>
  api.get(`/complaints/${complaintId}/comments`);
