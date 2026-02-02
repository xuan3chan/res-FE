import { axiosInstance } from "@/lib";
import type { LoginPayload, RegisterPayload, AuthResponse } from "../types";

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      payload,
    );
    return response.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/register",
      payload,
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post("/auth/logout");
  },

  refreshToken: async (
    refreshToken: string,
  ): Promise<{ accessToken: string }> => {
    const response = await axiosInstance.post<{ accessToken: string }>(
      "/auth/refresh",
      {
        refreshToken,
      },
    );
    return response.data;
  },

  getProfile: async (): Promise<AuthResponse["user"]> => {
    const response =
      await axiosInstance.get<AuthResponse["user"]>("/auth/profile");
    return response.data;
  },
};
