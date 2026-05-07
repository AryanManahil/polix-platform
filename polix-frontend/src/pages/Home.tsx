import {
  Layout,
  Menu,
  Typography,
  Avatar,
  Dropdown,
  Space,
  Card,
  Row,
  Col,
} from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  BarChartOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/home",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/home"),
    },
    {
      key: "/policies",
      icon: <FileTextOutlined />,
      label: "Policies",
      onClick: () => navigate("/policies"),
    },
    {
      key: "/customers",
      icon: <UserOutlined />,
      label: "Customers",
      onClick: () => navigate("/customers"),
    },
    {
      key: "/analytics",
      icon: <BarChartOutlined />,
      label: "Analytics",
      onClick: () => navigate("/analytics"),
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <Layout style={{ height: "100vh", background: "#f5f7fb" }}>
      {/* ================= SIDEBAR ================= */}
      <Sider
        width={270}
        style={{
          background: "linear-gradient(180deg,#0B1220,#111C33)",
          paddingTop: 10,
        }}
      >
        <div style={{ padding: 20 }}>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            🏦 PoliX Insurance
          </Title>
          <Text style={{ color: "#94a3b8" }}>Enterprise SaaS</Text>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            background: "transparent",
            borderRight: 0,
            marginTop: 10,
          }}
          items={menuItems}
        />

        <div style={{ position: "absolute", bottom: 20, width: "100%" }}>
          <div style={{ padding: 16 }}>
            <Text style={{ color: "#94a3b8" }}>Logged in as</Text>
            <div style={{ color: "white", marginTop: 5 }}>{email}</div>
          </div>
        </div>
      </Sider>

      {/* ================= MAIN ================= */}
      <Layout>
        {/* TOP BAR */}
        <Header
          style={{
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: 20,
            borderBottom: "1px solid #eee",
          }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Dashboard
          </Title>

          <Space size="large">
            <BellOutlined style={{ fontSize: 18 }} />

            <Dropdown
              menu={{
                items: [
                  {
                    key: "logout",
                    icon: <LogoutOutlined />,
                    label: "Logout",
                    onClick: logout,
                  },
                ],
              }}
            >
              <Space style={{ cursor: "pointer" }}>
                <Avatar style={{ backgroundColor: "#1677ff" }}>
                  {email?.charAt(0).toUpperCase()}
                </Avatar>
                <Text>{email}</Text>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* CONTENT */}
        <Content style={{ padding: 24, background: "#f5f7fb" }}>
          <div
            style={{
              padding: 24,
              borderRadius: 16,
              background: "linear-gradient(135deg,#1677ff,#69b1ff)",
              color: "white",
              marginBottom: 20,
            }}
          >
            <Title style={{ color: "white", margin: 0 }}>
              Welcome back 👋
            </Title>
            <Text style={{ color: "#e6f4ff" }}>
              Insurance SaaS Control Center
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card bordered={false} style={cardStyle}>
                <Title level={4}>Policies</Title>
                <Text>120 Active</Text>
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false} style={cardStyle}>
                <Title level={4}>Customers</Title>
                <Text>540 Total</Text>
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false} style={cardStyle}>
                <Title level={4}>Claims</Title>
                <Text>18 Pending</Text>
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false} style={cardStyle}>
                <Title level={4}>Revenue</Title>
                <Text>$12,400</Text>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

const cardStyle: React.CSSProperties = {
  borderRadius: 16,
  background: "#ffffff",
  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
};