import axios, { AxiosInstance } from "axios";

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
