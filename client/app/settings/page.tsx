"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Upload, Globe, Mail, Shield, Bell, Palette, Database } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSetting } from "@/hooks/useSetting"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { settings: stored, loading, error, saveSettings, refetch } = useSetting()
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    // General Settings
    siteName: "CMS Admin",
    siteDescription: "A modern content management system",
    siteUrl: "https://example.com",
    adminEmail: "admin@example.com",
    timezone: "UTC",
    dateFormat: "YYYY-MM-DD",

    // Content Settings
    postsPerPage: "10",
    allowComments: true,
    moderateComments: true,
    allowRegistration: true,
    defaultUserRole: "author",

    // Email Settings
    emailProvider: "smtp",
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",

    // Security Settings
    enableTwoFactor: false,
    sessionTimeout: "24",
    maxLoginAttempts: "5",

    // Notification Settings
    emailNotifications: true,
    commentNotifications: true,
    newUserNotifications: true,
    systemNotifications: true,
  })

  useEffect(() => {
    if (!loading && stored) {
      setSettings(prev => ({
        ...prev,
        siteName: stored.siteName ?? prev.siteName,
        siteDescription: stored.siteDescription ?? prev.siteDescription,
        siteUrl: stored.siteUrl ?? prev.siteUrl,
        adminEmail: stored.adminEmail ?? prev.adminEmail,
        timezone: stored.timezone ?? prev.timezone,
        dateFormat: stored.dateFormat ?? prev.dateFormat,

        postsPerPage: String(stored.postsPerPage ?? prev.postsPerPage),
        allowComments: Boolean(stored.allowComments ?? prev.allowComments),
        moderateComments: Boolean(stored.moderateComments ?? prev.moderateComments),
        allowRegistration: Boolean(stored.allowRegistration ?? prev.allowRegistration),
        defaultUserRole: stored.defaultUserRole ?? prev.defaultUserRole,

        emailProvider: stored.emailProvider ?? prev.emailProvider,
        smtpHost: stored.smtpHost ?? prev.smtpHost,
        smtpPort: String(stored.smtpPort ?? prev.smtpPort),
        smtpUsername: stored.smtpUsername ?? prev.smtpUsername,
        smtpPassword: stored.smtpPassword ?? prev.smtpPassword,

        enableTwoFactor: Boolean(stored.enableTwoFactor ?? prev.enableTwoFactor),
        sessionTimeout: String(stored.sessionTimeout ?? prev.sessionTimeout),
        maxLoginAttempts: String(stored.maxLoginAttempts ?? prev.maxLoginAttempts),

        emailNotifications: Boolean(stored.emailNotifications ?? prev.emailNotifications),
        commentNotifications: Boolean(stored.commentNotifications ?? prev.commentNotifications),
        newUserNotifications: Boolean(stored.newUserNotifications ?? prev.newUserNotifications),
        systemNotifications: Boolean(stored.systemNotifications ?? prev.systemNotifications),
      }))
    }
  }, [loading, stored])

  const handleSave = async (section: string) => {
    try {
      await saveSettings({
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        siteUrl: settings.siteUrl,
        adminEmail: settings.adminEmail,
        timezone: settings.timezone,
        dateFormat: settings.dateFormat,

        postsPerPage: Number(settings.postsPerPage),
        allowComments: settings.allowComments,
        moderateComments: settings.moderateComments,
        allowRegistration: settings.allowRegistration,
        defaultUserRole: settings.defaultUserRole,

        emailProvider: settings.emailProvider,
        smtpHost: settings.smtpHost,
        smtpPort: Number(settings.smtpPort),
        smtpUsername: settings.smtpUsername,
        smtpPassword: settings.smtpPassword,

        enableTwoFactor: settings.enableTwoFactor,
        sessionTimeout: Number(settings.sessionTimeout),
        maxLoginAttempts: Number(settings.maxLoginAttempts),

        emailNotifications: settings.emailNotifications,
        commentNotifications: settings.commentNotifications,
        newUserNotifications: settings.newUserNotifications,
        systemNotifications: settings.systemNotifications,
      })
      toast({ title: "Success", description: `${section} settings saved successfully!` })
    } catch (e) {
      toast({ title: "Error", description: e instanceof Error ? e.message : 'Failed to save settings', variant: 'destructive' })
    }
  }

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Configure your CMS preferences and options</p>
              {error && (
                <p className="text-red-600 mt-2">{error.message}</p>
              )}
            </div>

            <Tabs defaultValue="general" className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-gradient-to-r from-slate-100 to-gray-100">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger
                  value="email"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                >
                  Email
                </TabsTrigger>
                <TabsTrigger
                  value="security"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="advanced"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  Advanced
                </TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      <CardTitle>General Settings</CardTitle>
                    </div>
                    <CardDescription>Basic site configuration and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={settings.siteName}
                          onChange={(e) => handleInputChange("siteName", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siteUrl">Site URL</Label>
                        <Input
                          id="siteUrl"
                          value={settings.siteUrl}
                          onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        value={settings.siteDescription}
                        onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={settings.adminEmail}
                          onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={settings.timezone}
                          onValueChange={(value) => handleInputChange("timezone", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="America/New_York">Eastern Time</SelectItem>
                            <SelectItem value="America/Chicago">Central Time</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select
                        value={settings.dateFormat}
                        onValueChange={(value) => handleInputChange("dateFormat", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MMM DD, YYYY">MMM DD, YYYY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={() => handleSave("General")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save General Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Settings */}
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      <CardTitle>Content Settings</CardTitle>
                    </div>
                    <CardDescription>Configure content display and user interaction options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postsPerPage">Posts Per Page</Label>
                        <Input
                          id="postsPerPage"
                          type="number"
                          value={settings.postsPerPage}
                          onChange={(e) => handleInputChange("postsPerPage", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="defaultUserRole">Default User Role</Label>
                        <Select
                          value={settings.defaultUserRole}
                          onValueChange={(value) => handleInputChange("defaultUserRole", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="author">Author</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Comment Settings</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Comments</Label>
                          <p className="text-sm text-gray-500">Enable commenting on posts</p>
                        </div>
                        <Switch
                          checked={settings.allowComments}
                          onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Moderate Comments</Label>
                          <p className="text-sm text-gray-500">Require approval before comments are published</p>
                        </div>
                        <Switch
                          checked={settings.moderateComments}
                          onCheckedChange={(checked) => handleInputChange("moderateComments", checked)}
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">User Registration</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Allow Registration</Label>
                          <p className="text-sm text-gray-500">Allow new users to register accounts</p>
                        </div>
                        <Switch
                          checked={settings.allowRegistration}
                          onCheckedChange={(checked) => handleInputChange("allowRegistration", checked)}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSave("Content")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Content Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Email Settings */}
              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <CardTitle>Email Settings</CardTitle>
                    </div>
                    <CardDescription>Configure email delivery and SMTP settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="emailProvider">Email Provider</Label>
                      <Select
                        value={settings.emailProvider}
                        onValueChange={(value) => handleInputChange("emailProvider", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="smtp">SMTP</SelectItem>
                          <SelectItem value="sendgrid">SendGrid</SelectItem>
                          <SelectItem value="mailgun">Mailgun</SelectItem>
                          <SelectItem value="ses">Amazon SES</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">SMTP Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpHost">SMTP Host</Label>
                          <Input
                            id="smtpHost"
                            value={settings.smtpHost}
                            onChange={(e) => handleInputChange("smtpHost", e.target.value)}
                            placeholder="smtp.example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPort">SMTP Port</Label>
                          <Input
                            id="smtpPort"
                            value={settings.smtpPort}
                            onChange={(e) => handleInputChange("smtpPort", e.target.value)}
                            placeholder="587"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="smtpUsername">SMTP Username</Label>
                          <Input
                            id="smtpUsername"
                            value={settings.smtpUsername}
                            onChange={(e) => handleInputChange("smtpUsername", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="smtpPassword">SMTP Password</Label>
                          <Input
                            id="smtpPassword"
                            type="password"
                            value={settings.smtpPassword}
                            onChange={(e) => handleInputChange("smtpPassword", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSave("Email")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Email Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      <CardTitle>Security Settings</CardTitle>
                    </div>
                    <CardDescription>Configure security and authentication options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                      </div>
                      <Switch
                        checked={settings.enableTwoFactor}
                        onCheckedChange={(checked) => handleInputChange("enableTwoFactor", checked)}
                      />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleInputChange("sessionTimeout", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={settings.maxLoginAttempts}
                          onChange={(e) => handleInputChange("maxLoginAttempts", e.target.value)}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSave("Security")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Security Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      <CardTitle>Notification Settings</CardTitle>
                    </div>
                    <CardDescription>Configure email notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive general email notifications</p>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Comment Notifications</Label>
                          <p className="text-sm text-gray-500">Get notified when new comments are posted</p>
                        </div>
                        <Switch
                          checked={settings.commentNotifications}
                          onCheckedChange={(checked) => handleInputChange("commentNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New User Notifications</Label>
                          <p className="text-sm text-gray-500">Get notified when new users register</p>
                        </div>
                        <Switch
                          checked={settings.newUserNotifications}
                          onCheckedChange={(checked) => handleInputChange("newUserNotifications", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>System Notifications</Label>
                          <p className="text-sm text-gray-500">Receive system alerts and updates</p>
                        </div>
                        <Switch
                          checked={settings.systemNotifications}
                          onCheckedChange={(checked) => handleInputChange("systemNotifications", checked)}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSave("Notifications")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Settings */}
              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5" />
                      <CardTitle>Advanced Settings</CardTitle>
                    </div>
                    <CardDescription>Advanced configuration options and maintenance tools</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Database Maintenance</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="bg-transparent">
                          <Database className="w-4 h-4 mr-2" />
                          Optimize Database
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <Upload className="w-4 h-4 mr-2" />
                          Backup Database
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Cache Management</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="bg-transparent">
                          Clear Page Cache
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          Clear Database Cache
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">CMS Version:</span>
                            <span className="font-medium">1.0.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Database Version:</span>
                            <span className="font-medium">PostgreSQL 14.2</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">PHP Version:</span>
                            <span className="font-medium">8.2.0</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Server:</span>
                            <span className="font-medium">Nginx 1.20</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Memory Usage:</span>
                            <span className="font-medium">128MB / 512MB</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Disk Usage:</span>
                            <span className="font-medium">2.1GB / 10GB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSave("Advanced")}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Advanced Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
