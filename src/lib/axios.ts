import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:8000"; // Your backend URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const handleApiError = (error: unknown): never => {
  const errorMessage =
    (error as AxiosError<{ message: string }>)?.response?.data?.message ||
    "Something went wrong!";
  throw new Error(errorMessage);
};
