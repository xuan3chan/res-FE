import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FaceRegistration } from "@/features/auth";
import { useUserStore } from "@/stores";
import { CONSTANTS } from "@/config";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function FaceRegistrationPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to register your face");
      navigate({ to: CONSTANTS.ROUTES.LOGIN });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Register Face ID</CardTitle>
          <CardDescription>
            Register your face to enable secure and fast login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FaceRegistration
            userId={user.id}
            isAdmin={user.role === "admin"}
            onSuccess={() => {
              navigate({ to: CONSTANTS.ROUTES.DASHBOARD });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
