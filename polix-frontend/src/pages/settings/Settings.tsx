import {
  Layout,
  Menu,
  Card,
  Typography,
  Row,
  Col,
  Table,
  Tag,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  BankOutlined,
  ApartmentOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function Settings() {
  const [tab, setTab] = useState("overview");

  const menuItems = [
    { key: "overview", icon: <SettingOutlined />, label: "Overview" },
    { key: "users", icon: <UserOutlined />, label: "Users" },
    { key: "roles", icon: <TeamOutlined />, label: "Roles" },
    { key: "permissions", icon: <SafetyOutlined />, label: "Permissions" },
    { key: "company", icon: <BankOutlined />, label: "Company" },
    { key: "branches", icon: <ApartmentOutlined />, label: "Branches" },
  ];

  const renderContent = () => {
    switch (tab) {
      case "overview":
        return (
          <>
            <Title level={3}>⚙ System Settings Overview</Title>

            <Row gutter={[16, 16]}>
              {[
                { title: "Users", desc: "Manage system users" },
                { title: "Roles", desc: "RBAC configuration" },
                { title: "Company", desc: "Organization setup" },
                { title: "Branches", desc: "Branch management" },
              ].map((item) => (
                <Col span={6} key={item.title}>
                  <Card hoverable style={cardStyle}>
                    <Title level={4}>{item.title}</Title>
                    <Text type="secondary">{item.desc}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        );

      case "users":
        return (
          <>
            <Title level={3}>👤 Users Management</Title>

            <Table
              bordered
              dataSource={[
                {
                  key: 1,
                  name: "Admin User",
                  email: "admin@polix.com",
                  role: "Admin",
                },
                {
                  key: 2,
                  name: "Agent User",
                  email: "agent@polix.com",
                  role: "Agent",
                },
              ]}
              columns={[
                { title: "Name", dataIndex: "name" },
                { title: "Email", dataIndex: "email" },
                {
                  title: "Role",
                  dataIndex: "role",
                  render: (r) => <Tag color="blue">{r}</Tag>,
                },
              ]}
            />
          </>
        );

      case "roles":
        return (
          <>
            <Title level={3}>🔐 Roles (RBAC)</Title>

            <Row gutter={[16, 16]}>
              {["Admin", "Underwriter", "Agent", "Support"].map((r) => (
                <Col span={6} key={r}>
                  <Card hoverable style={cardStyle}>
                    <Title level={4}>{r}</Title>
                    <Text type="secondary">System Role</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        );

      case "permissions":
        return (
          <>
            <Title level={3}>🛡 Permissions</Title>

            <Card style={cardStyle}>
              {[
                "user:create",
                "user:update",
                "user:delete",
                "policy:approve",
                "settings:edit",
              ].map((p) => (
                <Tag key={p} color="blue" style={{ marginBottom: 8 }}>
                  {p}
                </Tag>
              ))}
            </Card>
          </>
        );

      case "company":
        return (
          <>
            <Title level={3}>🏢 Company Settings</Title>

            <Card style={cardStyle}>
              <p>Company Name: PoliX Insurance Ltd</p>
              <p>Country: Bangladesh</p>
              <p>Currency: BDT</p>
            </Card>
          </>
        );

      case "branches":
        return (
          <>
            <Title level={3}>🏬 Branch Management</Title>

            <Row gutter={[16, 16]}>
              {[
                { name: "Dhaka Branch", type: "Main Office" },
                { name: "Chattogram Branch", type: "Regional Office" },
                { name: "Sylhet Branch", type: "Sales Office" },
              ].map((b) => (
                <Col span={8} key={b.name}>
                  <Card hoverable style={cardStyle} title={b.name}>
                    {b.type}
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      {/* ================= SIDEBAR ================= */}
      <Sider
        width={260}
        style={{
          background: "linear-gradient(180deg,#0B1220,#111C33)",
        }}
      >
        <div style={{ padding: 20 }}>
          <Title level={4} style={{ color: "white" }}>
            ⚙ Settings
          </Title>
          <Text style={{ color: "#94a3b8" }}>System Configuration</Text>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[tab]}
          style={{ background: "transparent" }}
          onClick={(e) => setTab(e.key)}
          items={menuItems}
        />
      </Sider>

      {/* ================= CONTENT ================= */}
      <Layout>
        <Content style={{ padding: 24 }}>{renderContent()}</Content>
      </Layout>
    </Layout>
  );
}

const cardStyle: React.CSSProperties = {
  borderRadius: 14,
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
};