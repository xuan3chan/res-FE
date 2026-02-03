import { axiosInstance } from "@/lib";
import type {
  LoginPayload,
  RegisterPayload,
  AuthResponse,
  FaceLoginPayload,
  FaceLoginResponse,
  FaceRegistrationResponse,
} from "../types";

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

  registerAdminFace: async (
    adminId: string,
    file: File,
  ): Promise<FaceRegistrationResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<FaceRegistrationResponse>(
      `/admins/${adminId}/register-face`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  registerUserFace: async (
    userId: string,
    file: File,
  ): Promise<FaceRegistrationResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post<FaceRegistrationResponse>(
      `/users/${userId}/register-face`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  faceLogin: async (payload: FaceLoginPayload): Promise<FaceLoginResponse> => {
    const response = await axiosInstance.post<FaceLoginResponse>(
      "/auth/face-login",
      payload,
    );
    return response.data;
  },
};
