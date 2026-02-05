import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Loader2 } from 'lucide-react'
import { CONSTANTS } from '@/config'
import { useLogin } from '../hooks'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { Alert, AlertDescription } from '@/components/ui/alert'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password required'),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: login, error } = useLogin()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    login(data, {
      onSettled: () => setIsLoading(false),
    })
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive-foreground">
              <AlertDescription>
                {(error as Error).message || 'Authentication failed'}
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="group flex items-center text-sm border border-border px-4 py-3 transition-colors focus-within:border-foreground/40">
                  <span className="text-muted-foreground font-mono mr-3 select-none">$</span>
                  <FormControl>
                    <Input 
                      placeholder="email" 
                      className="flex-1 bg-transparent border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto font-mono text-foreground placeholder:text-muted-foreground/50 rounded-none"
                      autoComplete="off"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage className="font-mono text-[10px] uppercase" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="group flex items-center text-sm border border-border px-4 py-3 transition-colors focus-within:border-foreground/40">
                  <span className="text-muted-foreground font-mono mr-3 select-none">&gt;</span>
                  <FormControl>
                    <PasswordInput 
                      placeholder="password" 
                      className="flex-1 bg-transparent border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto font-mono text-foreground placeholder:text-muted-foreground/50 rounded-none"
                      {...field} 
                    />
                  </FormControl>
                </div>
                <FormMessage className="font-mono text-[10px] uppercase" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-11 rounded-none font-mono uppercase tracking-widest text-xs border border-foreground bg-foreground text-background hover:bg-white hover:text-black hover:border-white hover:tracking-[0.5em] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500 ease-in-out" 
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : ":: AUTHENTICATE ::"}
          </Button>

          <div className="relative flex items-center justify-center my-8">
             <div className="absolute inset-0 flex items-center">
                 <span className="w-full border-t border-dashed border-border/60" />
             </div>
          </div>

          <Button 
            variant="ghost" 
            type="button" 
            disabled={isLoading} 
            asChild
            className="w-full h-auto py-2 rounded-none font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-transparent -mt-2 group"
          >
            <Link to={CONSTANTS.ROUTES.FACE_LOGIN}>
              <span className="flex items-center gap-2 group-hover:underline decoration-1 underline-offset-4">
               [ SWITCH TO FACE_ID ]
              </span>
            </Link>
          </Button>
        </form>
      </Form>
    </div>
  )
}
