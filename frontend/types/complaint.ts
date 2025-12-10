export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  referenceNumber: string;
  status: "pending" | "resolved" | "in_progress";
  createdAt: string;
}
