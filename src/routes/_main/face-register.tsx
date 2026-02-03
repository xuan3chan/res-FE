import { createFileRoute } from "@tanstack/react-router";
import { FaceRegistrationPage } from "@/pages";

export const Route = createFileRoute("/_main/face-register")({
  component: FaceRegistrationPage,
});
