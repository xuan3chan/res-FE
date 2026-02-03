import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authApi } from "../api";
import { useUserStore } from "@/stores";
import { CONSTANTS } from "@/config";
import { storage } from "@/utils/storage";
import type { FaceLoginPayload } from "../types";

export function useFaceLogin() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async (payload: FaceLoginPayload) => {
      return await authApi.faceLogin(payload);
    },
    onSuccess: (data) => {
      if (data.decision === "LOGIN_SUCCESS") {
        // Store access token if returned
        if (data.accessToken) {
          storage.set(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
        }

        // Set user from the new user object or legacy fields
        if (data.user) {
          setUser(data.user);
        } else if (data.userId && data.role) {
          // Fallback to legacy fields
          setUser({
            id: data.userId,
            name: data.userName || "User",
            email: "",
            role: data.role as "admin" | "user",
          });
        }

        toast.success(data.message || "Face login successful");
        navigate({ to: CONSTANTS.ROUTES.DASHBOARD });
      } else if (data.decision === "REQUIRE_STEP_UP") {
        toast.info(data.message || "Additional verification required");
        // Navigate to password login with step-up flag
        navigate({ to: CONSTANTS.ROUTES.LOGIN });
      } else {
        // DENY
        toast.error(data.message || "Face login denied");
      }
    },
    onError: (error) => {
      toast.error(
        (error as any).response?.data?.message || "Face login failed",
      );
    },
  });
}
