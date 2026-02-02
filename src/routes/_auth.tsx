import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthLayout } from '@/layouts'
import { useUserStore } from '@/stores'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const { isAuthenticated } = useUserStore.getState()
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: AuthLayout,
})
