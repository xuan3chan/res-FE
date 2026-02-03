import { createFileRoute } from '@tanstack/react-router'
import { FaceLogin } from '@/features/auth'
export const Route = createFileRoute('/_auth/face-login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FaceLogin />
}
