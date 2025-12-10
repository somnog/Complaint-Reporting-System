// userService.ts

import api from "../lib/api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  department: string | null;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

const userService = {
  async getAll(): Promise<User[]> {
    const res = await api.get<{ data: User[] }>("/users");
    return res.data.data; // Extract the user array here
  },
  // Add other CRUD methods as needed
};

export default userService;
