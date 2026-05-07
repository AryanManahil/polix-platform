import api from "./axios";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post(
    "/auth/login",
    new URLSearchParams({
      username: email,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data;
};