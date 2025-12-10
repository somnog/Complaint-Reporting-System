import api from "./api";

export const registerUser = async (data: any) => {
  const res = await api.post("/auth/register", data);
  if (res.data.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }
  return res.data;
};

export const loginUser = async (data: any) => {
  const res = await api.post("/auth/login", data);
  if (res.data.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }
  return res.data;
};
