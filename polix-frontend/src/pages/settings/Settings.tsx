import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  BankOutlined,
  ApartmentOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";

import UsersTable from "./components/UsersTable";
import RolesView from "./components/RolesView";
import PermissionsView from "./components/PermissionsView";
import CompanyView from "./components/CompanyView";
import BranchesView from "./components/BranchesView";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

type TabKey =
  | "overview"
  | "users"
  | "roles"
  | "permissions"
  | "company"
  | "branches";

export default function Settings() {
  const [tab, setTab] = useState<TabKey>("overview");

  // ================= MENU CONFIG =================
  const menuItems = useMemo(
    () => [
      { key: "overview", icon: <SettingOutlined />, label: "Overview" },
      { key: "users", icon: <UserOutlined />, label: "Users" },
      { key: "roles", icon: <TeamOutlined />, label: "Roles" },
      { key: "permissions", icon: <SafetyOutlined />, label: "Permissions" },
      { key: "company", icon: <BankOutlined />, label: "Company" },
      { key: "branches", icon: <ApartmentOutlined />, label: "Branches" },
    ],
    []
  );

  // ================= VIEW MAP (NO SWITCH CASE) =================
  const viewMap: Record<TabKey, JSX.Element> = {
    overview: (
      <>
        <Title level={3}>⚙ System Settings Overview</Title>
        <Text type="secondary">
          Select a module from the sidebar to manage system configuration
        </Text>
      </>
    ),

    users: <UsersTable />,
    roles: <RolesView />,
    permissions: <PermissionsView />,
    company: <CompanyView />,
    branches: <BranchesView />,
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fb" }}>
      {/* ================= SIDEBAR ================= */}
      <Sider width={260} style={{ background: "#0B1220" }}>
        <div style={{ padding: 20 }}>
          <Title level={4} style={{ color: "white", margin: 0 }}>
            ⚙ Settings
          </Title>
          <Text style={{ color: "#94a3b8" }}>
            System Configuration
          </Text>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[tab]}
          items={menuItems}
          onClick={(e) => setTab(e.key as TabKey)}
        />
      </Sider>

      {/* ================= CONTENT ================= */}
      <Layout>
        <Content style={{ padding: 24 }}>
          {viewMap[tab]}
        </Content>
      </Layout>
    </Layout>
  );
}