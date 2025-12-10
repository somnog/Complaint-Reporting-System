"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
const statuses = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "REJECTED",
];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ComplaintsPage = () => {
  const router = useRouter();

  // Authentication state
  const [user, setUser] = useState<{ role: string; sub: string } | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Complaint form state
  const [loadingComplaint, setLoadingComplaint] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [officials, setOfficials] = useState<{ id: string; fullName: string }[]>([]);
  const [form] = Form.useForm();

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch categories and officials only if logged in and role is CITIZEN
  useEffect(() => {
    if (user?.role === "CITIZEN") {
      fetchCategories();
      fetchOfficials();
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data.data || []);
    } catch {
      message.error("Failed to load categories");
    }
  };

  const fetchOfficials = async () => {
    try {
      const res = await api.get("/users", { params: { role: "OFFICIAL" } });
      setOfficials(res.data.data || []);
    } catch {
      message.error("Failed to load officials");
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoadingAuth(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setLoginError(errorData.message || "Login failed");
        setLoadingAuth(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setLoadingAuth(false);
      // Optional: redirect or just show complaint form
    } catch (err) {
      console.error(err);
      setLoginError("Something went wrong. Try again.");
      setLoadingAuth(false);
    }
  };

  // Logout handler (optional)
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    form.resetFields();
  };

  // Complaint submission handler
  const onFinish = async (values: any) => {
    setLoadingComplaint(true);
    try {
      const payload = {
        ...values,
        submittedById: user?.sub,
        latitude: values.latitude ? parseFloat(values.latitude) : undefined,
        longitude: values.longitude ? parseFloat(values.longitude) : undefined,
      };
      await api.post("/complaints", payload);
      message.success("Complaint submitted successfully!");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error("Failed to submit complaint.");
    } finally {
      setLoadingComplaint(false);
    }
  };

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-700 relative">
          <div className="flex flex-col items-center justify-center h-full text-center text-white px-8">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg">
              Sign in to access your account and continue where you left off.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-7 text-center">Login</h2>
            {loginError && (
              <p className="text-red-600 mb-4 text-center font-semibold">{loginError}</p>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loadingAuth}
                className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                {loadingAuth ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in but role is not CITIZEN, show a message (or redirect)
  if (user.role !== "CITIZEN") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            Access Denied
          </h1>
          <p className="mb-4">You must be logged in as a Citizen to submit complaints.</p>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If logged in as citizen, show complaint form
  return (
    <>
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 mt-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
          Submit Complaint & Feedback
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16 mt-6 grid md:grid-cols-2 gap-12">
        {/* Left Side - Form */}
        <div>
          <p className="text-gray-600 text-lg mb-6">
            Your feedback helps improve Somalia Government services. Please fill
            out the form below and our team will review your submission.
          </p>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ priority: "MEDIUM", status: "SUBMITTED" }}
          >
            {/* ... your complaint form fields unchanged ... */}

            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the complaint title" }]}
            >
              <Input placeholder="Garbage not collected" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter a description" }]}
            >
              <TextArea rows={4} placeholder="Trash has been piling up for days..." />
            </Form.Item>

            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "Please enter location" }]}
            >
              <Input placeholder="Mogadishu, Hodan District" />
            </Form.Item>

            <Form.Item label="Latitude" name="latitude">
              <Input placeholder="2.0371" />
            </Form.Item>

            <Form.Item label="Longitude" name="longitude">
              <Input placeholder="45.3436" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="categoryId"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select placeholder="Select a category" loading={!categories.length}>
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Assign to Official" name="assignedToId">
              <Select placeholder="Select an official" allowClear loading={!officials.length}>
                {officials.map((user) => (
                  <Option key={user.id} value={user.id}>
                    {user.fullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Priority" name="priority">
              <Select>
                {priorities.map((p) => (
                  <Option key={p} value={p}>
                    {p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Status" name="status">
              <Select>
                {statuses.map((status) => (
                  <Option key={status} value={status}>
                    {status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Image URL" name="imageUrl">
              <Input placeholder="https://example.com/image.jpg" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingComplaint}>
                Submit Complaint
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right Side - Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            What Happens Next?
          </h2>
          <ul className="text-gray-600 text-lg space-y-3">
            <li>
              • Your complaint will be reviewed by the appropriate government
              department.
            </li>
            <li>
              • Sensitive reports such as corruption are handled confidentially.
            </li>
            <li>
              • You may receive a follow-up if additional information is needed.
            </li>
          </ul>

          <div className="mt-8 p-8 bg-gray-100 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              Need Immediate Support?
            </h3>
            <p className="text-gray-600">Call our hotline:</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              +252 61 234 5678
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComplaintsPage;
