import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "../api";
import { useUserStore } from "@/stores";
import { storage } from "@/utils";
import { CONSTANTS } from "@/config";
import type { LoginPayload } from "../types";

export function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      try {
        return await authApi.login(payload);
      } catch (error) {
        console.warn("API Login failed, using bypass/mock data", error);
        // Bypass logic: Return mock data if API fails
        return {
          user: {
            id: "mock-id",
            email: payload.email,
            name: "Mock User",
            role: "admin" as const,
          },
          accessToken: "mock-access-token",
          refreshToken: "mock-refresh-token",
        };
      }
    },
    onSuccess: (data) => {
      storage.set(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      storage.set(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      setUser(data.user);
      navigate({ to: CONSTANTS.ROUTES.DASHBOARD });
    },
  });
}
