"use client";
import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation"; 
const { Header, Sider, Content } = Layout;
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter(); 

  // Menu items
  const items = [
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users",
    },
  ];

  const handleNavigation = ({ key }: { key: string }) => {
    if (key === "1") router.push("/dashboard/complaints");
    if (key === "2") router.push("/dashboard/users");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: "#444",
        }}
      >
  
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

      
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onClick={handleNavigation}   
          style={{ background: "#444" }}
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
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => setCollapsed(false)}
              style={{ fontSize: 20 }}
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
