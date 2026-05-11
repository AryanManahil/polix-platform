import { api } from "./client";

export const fetchPermissions = async () => {
  const res = await api.get("/permissions");
  return res.data;
};