import { createFileRoute, redirect } from '@tanstack/react-router'
import { MainLayout } from '@/layouts'
import { useUserStore } from '@/stores'

export const Route = createFileRoute('/_main')({
  beforeLoad: () => {
    const { isAuthenticated } = useUserStore.getState()
    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: MainLayout,
})
