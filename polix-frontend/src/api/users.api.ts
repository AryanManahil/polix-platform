import api from "./client";

export const fetchUsers = async () => {
  const res = await api.get("/users/");
  return res.data;
};