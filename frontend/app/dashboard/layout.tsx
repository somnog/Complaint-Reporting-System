"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      icon: <FileTextOutlined />,
      label: "Complaints",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: "3",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: "#444", // GRAY SIDEBAR COLOR
        }}
      >
        {/* Brand / Logo */}
        <div
          style={{
            color: "white",
            padding: 16,
            textAlign: "center",
            fontSize: collapsed ? 18 : 22,
            fontWeight: "bold",
          }}
        >
          {collapsed ? "CRS" : "Complaint Reporting"}
        </div>

        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{
            background: "#444", // match sidebar
          }}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        
        {/* Header */}
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          {/* Collapse Button */}
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => setCollapsed(false)}
              style={{ fontSize: 30 }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => setCollapsed(true)}
              style={{ fontSize: 20 }}
            />
          )}

          <div>Welcome, Admin</div>
        </Header>

        {/* Main Content */}
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 360,
              borderRadius: 8,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
