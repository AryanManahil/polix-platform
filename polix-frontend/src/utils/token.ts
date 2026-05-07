const TOKEN_KEY = "token";
const EMAIL_KEY = "email";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setEmail = (email: string) => {
  localStorage.setItem(EMAIL_KEY, email);
};

export const getEmail = () => {
  return localStorage.getItem(EMAIL_KEY);
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EMAIL_KEY);
};