import { api, handleApiError } from "@/lib/axios";
import { User, APIResponse } from "@/types";

export interface AuthUserResponse extends APIResponse {
  data: {
    status: "success" | "error";
    user: User;
    access_token?: string;
    message?: string;
  };
}

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthUserResponse> => {
  try {
    const response = api.post("/api/auth/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const registerUser = async (
  full_name: string,
  email: string,
  role: "student" | "instructor",
  password: string
): Promise<AuthUserResponse> => {
  try {
    const response = api.post("/api/auth/register", {
      full_name,
      email,
      role,
      password,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const forgotPassword = async (
  email: string
): Promise<AuthUserResponse> => {
  try {
    const response = api.post("/api/auth/forgot-password", {
      email,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const resetPassword = async (
  email: string,
  otp: string,
  password: string
): Promise<AuthUserResponse> => {
  try {
    const response = api.post("/api/auth/reset-password", {
      email,
      otp,
      password,
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
