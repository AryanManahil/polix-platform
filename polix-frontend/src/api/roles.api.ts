import { api } from "./client";

export const fetchRoles = async () => {
  const res = await api.get("/roles");
  return res.data;
};