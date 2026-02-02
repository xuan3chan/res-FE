import { type FormEvent, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button, Input, Label } from '@/components'
import { CONSTANTS } from '@/config'
import { useLogin } from '../hooks'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { mutate: login, isPending, error } = useLogin()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Welcome Back</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400">
          {(error as Error).message || 'Login failed. Please try again.'}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Signing in...' : 'Sign In'}
      </Button>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-dashed"
        onClick={() => login({ email: 'admin@resapp.com', password: 'password' })}
      >
        Bypass with Mock Login
      </Button>

      <p className="text-sm text-center text-gray-500">
        Don't have an account?
        <Link to={CONSTANTS.ROUTES.REGISTER} className="ml-1 font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}
