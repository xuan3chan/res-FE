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
      return await authApi.login(payload);
    },
    onSuccess: (data) => {
      storage.set(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      if (data.refreshToken) {
        storage.set(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      }
      setUser(data.user);
      navigate({ to: CONSTANTS.ROUTES.DASHBOARD });
    },
  });
}
