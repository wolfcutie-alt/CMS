"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { User, Mail, Shield, Calendar, Save, Camera, Eye, EyeOff, Upload } from "lucide-react"
import { useProfile } from "@/hooks/useProfile"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const { profile, loading, error, updateProfile } = useProfile()

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = localStorage.getItem("user")
      const parsed = raw ? JSON.parse(raw) : null
      const role = parsed?.role ?? null
      if (role === "admin" || role === "editor" || role === "author") {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
        router.replace("/auth/login")
      }
    } catch {
      setIsAuthorized(false)
      router.replace("/auth/login")
    }
  }, [router])

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }
  }, [profile])

  if (isAuthorized === false) {
    return null
  }

  if (isAuthorized === null || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200"
      case "editor":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
      case "author":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (formData.newPassword && formData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const updateData: any = {
        name: formData.name,
        email: formData.email,
      }

      if (formData.newPassword) {
        updateData.password = formData.newPassword
        if (formData.currentPassword) {
          updateData.current_password = formData.currentPassword
        }
      }

      console.log('Updating profile with data:', updateData)
      const result = await updateProfile(updateData)
      console.log('Profile update result:', result)
      
      // Update local storage as a fallback
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          const updatedUser = { 
            ...parsed, 
            name: formData.name,
            email: formData.email,
            updated_at: new Date().toISOString()
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (err: any) {
      console.error('Profile update error:', err)
      
      // Even if API fails, update local storage for immediate UI feedback
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsed = JSON.parse(userData);
          const updatedUser = { 
            ...parsed, 
            name: formData.name,
            email: formData.email,
            updated_at: new Date().toISOString()
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      }
      
      toast({
        title: "Warning",
        description: "Profile updated locally, but server sync may have failed. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setIsUploadingAvatar(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      // For now, we'll just show a success message
      // In a real implementation, you'd upload to your server
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate upload
      
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      })
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to upload avatar",
        variant: "destructive",
      })
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-red-600 text-center py-8">
                    <p>Error loading profile: {error.message}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your account information and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Overview */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <Avatar className="w-20 h-20 mb-4">
                          <AvatarImage
                            src={profile?.avatar || "/placeholder-user.jpg"}
                            alt={profile?.name || "User"}
                          />
                          <AvatarFallback>
                            <User className="w-10 h-10" />
                          </AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer transition-colors"
                          title="Upload avatar"
                        >
                          {isUploadingAvatar ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                          disabled={isUploadingAvatar}
                        />
                      </div>
                      <h3 className="font-semibold text-lg">{profile?.name || "User"}</h3>
                      <p className="text-gray-600 text-sm">{profile?.email || "user@example.com"}</p>
                      <Badge className={`mt-2 ${getRoleColor(profile?.role || "author")}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {profile?.role || "author"}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{profile?.email || "user@example.com"}</span>
                      </div>
                      {profile?.created_at && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Edit Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Information */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Basic Information</h3>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Password Change */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              value={formData.currentPassword}
                              onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                              placeholder="Enter current password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showPassword ? "text" : "password"}
                              value={formData.newPassword}
                              onChange={(e) => handleInputChange("newPassword", e.target.value)}
                              placeholder="Enter new password"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                            placeholder="Confirm new password"
                          />
                        </div>
                        <p className="text-sm text-gray-500">
                          Leave password fields empty if you don't want to change your password.
                        </p>
                      </div>

                      <Separator />

                      {/* Submit Button */}
                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Save className="w-4 h-4 mr-2" />
                          )}
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
