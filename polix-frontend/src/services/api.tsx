import axios from "axios";

// ================= BASE CLIENT =================
const api = axios.create({
  baseURL: "http://localhost:8001",
});

// ==================================================
// USERS
// ==================================================
export const fetchUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// ==================================================
// ROLES
// ==================================================
export const fetchRoles = async () => {
  const res = await api.get("/roles/");
  return res.data;
};

// ==================================================
// PERMISSIONS
// ==================================================
export const fetchPermissions = async () => {
  const res = await api.get("/permissions/");
  return res.data;
};

// ==================================================
// RBAC
// ==================================================
export const fetchRolePermissions = async (roleId: number) => {
  const res = await api.get(`/rbac/role/${roleId}`);
  return res.data;
};

// ==================================================
// TOGGLE PERMISSION
// ==================================================
export const togglePermission = async (
  roleId: number,
  permissionId: number
) => {
  const res = await api.post("/rbac/toggle", {
    role_id: roleId,
    permission_id: permissionId,
  });

  return res.data;
};

export default api;