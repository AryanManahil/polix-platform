import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8001", // IAM service
  headers: {
    "Content-Type": "application/json",
  },
});