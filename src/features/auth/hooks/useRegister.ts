import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { authApi } from "../api";
import { useUserStore } from "@/stores";
import { storage } from "@/utils";
import { CONSTANTS } from "@/config";
import type { RegisterPayload } from "../types";

export function useRegister() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      storage.set(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      storage.set(CONSTANTS.STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      setUser(data.user);
      navigate({ to: CONSTANTS.ROUTES.DASHBOARD });
    },
  });
}
