import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "../api";

export function useFaceRegister() {
  return useMutation({
    mutationFn: async ({
      userId,
      file,
      isAdmin = false,
    }: {
      userId: string;
      file: File;
      isAdmin?: boolean;
    }) => {
      if (isAdmin) {
        return await authApi.registerAdminFace(userId, file);
      }
      return await authApi.registerUserFace(userId, file);
    },
    onSuccess: () => {
      toast.success("Face registered successfully");
    },
    onError: (error) => {
      toast.error(
        (error as any).response?.data?.message || "Failed to register face",
      );
    },
  });
}
