import { Outlet } from '@tanstack/react-router'

export function AuthLayout() {
  return (
    <div className="container grid h-svh max-w-none items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold me-2">
            R
          </div>
          <h1 className="text-xl font-medium">ResApp</h1>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
