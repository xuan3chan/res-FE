import { useState } from 'react'
import { User, Camera, ShieldCheck, Loader2 } from 'lucide-react'
import { useUserStore } from '@/stores'
import { FaceRegistration } from '@/features/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ProfilePage() {
  const { user } = useUserStore()
  const [faceDialogOpen, setFaceDialogOpen] = useState(false)

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const isAdmin = user.role === 'admin'

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile settings and Face ID authentication.
        </p>
      </div>

      <Separator />

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
          <CardDescription>
            Your account details and information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="text-sm font-semibold">{user.name || '-'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-sm font-semibold">{user.email || '-'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Username</p>
              <p className="text-sm font-semibold">{user.username || '-'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Role</p>
              <Badge variant={isAdmin ? 'default' : 'secondary'}>
                {user.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Face ID Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Face ID Authentication
          </CardTitle>
          <CardDescription>
            Register your face for quick and secure login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Face ID Status</p>
              <div className="flex items-center gap-2">
                {user.hasFaceRegistered ? (
                  <>
                    <Badge variant="default" className="bg-green-600">
                      Registered
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Your face is registered for login
                    </span>
                  </>
                ) : (
                  <>
                    <Badge variant="secondary">Not Registered</Badge>
                    <span className="text-xs text-muted-foreground">
                      Register your face to enable Face ID login
                    </span>
                  </>
                )}
              </div>
            </div>

            <Dialog open={faceDialogOpen} onOpenChange={setFaceDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Camera className="mr-2 h-4 w-4" />
                  {user.hasFaceRegistered ? 'Update Face ID' : 'Register Face ID'}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Face ID Registration</DialogTitle>
                  <DialogDescription>
                    Position your face within the oval guide and capture a clear photo.
                  </DialogDescription>
                </DialogHeader>
                <FaceRegistration
                  userId={user.id}
                  isAdmin={true}
                  onSuccess={() => {
                    setFaceDialogOpen(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
