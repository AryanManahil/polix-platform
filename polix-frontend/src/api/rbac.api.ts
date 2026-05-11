import { api } from "./client";

export const fetchRolePermissions = async (roleId: number) => {
  const res = await api.get(`/rbac/role/${roleId}`);
  return res.data;
};

export const togglePermission = async (roleId: number, permissionId: number) => {
  const res = await api.post("/rbac/toggle", {
    role_id: roleId,
    permission_id: permissionId,
  });

  return res.data;
};