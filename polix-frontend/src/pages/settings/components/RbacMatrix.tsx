import {
  Card,
  Table,
  Checkbox,
  Spin,
  message,
  Typography,
} from "antd";

import { useEffect, useState } from "react";

import {
  fetchRoles,
  fetchPermissions,
  fetchRolePermissions,
  togglePermission,
} from "../../../api/api";

const { Title } = Typography;

export default function RBACMatrix() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [matrix, setMatrix] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // ================= LOAD DATA =================
  const loadData = async () => {
    try {
      setLoading(true);

      const rolesData = await fetchRoles();
      const permissionsData = await fetchPermissions();

      setRoles(rolesData);
      setPermissions(permissionsData);

      const tempMatrix: any = {};

      for (const role of rolesData) {
        const rolePermissions = await fetchRolePermissions(role.id);

        tempMatrix[role.id] = rolePermissions.map(
          (p: any) => p.id
        );
      }

      setMatrix(tempMatrix);
    } catch (err) {
      console.error(err);
      message.error("Failed to load RBAC matrix");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ================= TOGGLE =================
  const handleToggle = async (
    roleId: number,
    permissionId: number
  ) => {
    try {
      await togglePermission(roleId, permissionId);

      setMatrix((prev: any) => {
        const existing = prev[roleId] || [];

        const updated = existing.includes(permissionId)
          ? existing.filter((id: number) => id !== permissionId)
          : [...existing, permissionId];

        return {
          ...prev,
          [roleId]: updated,
        };
      });

      message.success("Permission updated");
    } catch (err) {
      console.error(err);
      message.error("Failed to update permission");
    }
  };

  // ================= TABLE COLUMNS =================
  const columns: any = [
    {
      title: "Permission",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 250,
    },

    ...roles.map((role) => ({
      title: role.name,
      dataIndex: `role_${role.id}`,
      key: `role_${role.id}`,
      width: 120,

      render: (_: any, record: any) => (
        <Checkbox
          checked={
            matrix[role.id]?.includes(record.id)
          }
          onChange={() =>
            handleToggle(role.id, record.id)
          }
        />
      ),
    })),
  ];

  if (loading) {
    return <Spin />;
  }

  return (
    <Card variant="outlined">
      <Title level={4}>
        🛡 RBAC Permission Matrix
      </Title>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={permissions}
        pagination={false}
        scroll={{ x: true }}
      />
    </Card>
  );
}