import { LoginForm } from '@/features/auth';
import { Scanlines } from '@/components/ui/scanlines';

export function LoginPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-mono flex flex-col overflow-hidden selection:bg-white selection:text-black">
      {/* Screen flicker effect */}
      <div className="screen-flicker" />
      
      {/* Scanlines overlay */}
      <Scanlines />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        
        {/* Title / Logo Area */}
        <div className="text-center mb-10 space-y-2">
           <h1 className="text-4xl font-bold tracking-tighter">
            RES<span className="text-muted-foreground">.RUN</span>
          </h1>
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Production Ready System
          </p>
        </div>

        {/* Login Form Container */}
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>

        {/* Footer / Credits */}
        <div className="mt-12 text-xs text-muted-foreground text-center">
            <p>SECURE TERMINAL ACCESS v2.0</p>
        </div>
      </main>
    </div>
  );
}
