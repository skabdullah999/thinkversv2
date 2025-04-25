"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Save, Globe, Mail, Palette, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchData, insertData, updateData } from "@/lib/api/admin"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Thinkverse",
    siteDescription: "Exploring the frontiers of human knowledge through science, innovation, and discovery.",
    siteUrl: "https://thinkverse.com",
    adminEmail: "admin@thinkverse.com",
    articlesPerPage: "9",
    enableComments: true,
    enableSearch: true,
  })

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    primaryColor: "teal",
    logoUrl: "/logo.png",
    favicon: "/favicon.ico",
    enableDarkMode: true,
  })

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@thinkverse.com",
    smtpPassword: "••••••••••••",
    senderName: "Thinkverse",
    senderEmail: "notifications@thinkverse.com",
  })

  // SEO settings
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "Thinkverse - Science & Technology News",
    metaDescription: "Exploring the frontiers of human knowledge through science, innovation, and discovery.",
    ogImage: "/og-image.jpg",
    twitterHandle: "@thinkverse",
    enableSitemap: true,
    enableRobotsTxt: true,
    googleAnalyticsId: "G-XXXXXXXXXX",
  })

  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true)

        // Fetch settings from database
        const settingsData = await fetchData("settings")

        if (settingsData && settingsData.length > 0) {
          // Process settings by category
          const general = settingsData.find((s) => s.category === "general")?.settings || generalSettings
          const appearance = settingsData.find((s) => s.category === "appearance")?.settings || appearanceSettings
          const email = settingsData.find((s) => s.category === "email")?.settings || emailSettings
          const seo = settingsData.find((s) => s.category === "seo")?.settings || seoSettings

          if (general) setGeneralSettings(general)
          if (appearance) setAppearanceSettings(appearance)
          if (email) setEmailSettings(email)
          if (seo) setSeoSettings(seo)
        }
      } catch (error) {
        console.error("Error fetching settings:", error)
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [toast])

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleGeneralSwitchChange = (name: string, checked: boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [name]: checked,
    })
  }

  const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAppearanceSettings({
      ...appearanceSettings,
      [name]: value,
    })
  }

  const handleAppearanceSelectChange = (name: string, value: string) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [name]: value,
    })
  }

  const handleAppearanceSwitchChange = (name: string, checked: boolean) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [name]: checked,
    })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmailSettings({
      ...emailSettings,
      [name]: value,
    })
  }

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSeoSettings({
      ...seoSettings,
      [name]: value,
    })
  }

  const handleSeoSwitchChange = (name: string, checked: boolean) => {
    setSeoSettings({
      ...seoSettings,
      [name]: checked,
    })
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    try {
      // Save all settings
      const settingsToSave = [
        { category: "general", settings: generalSettings },
        { category: "appearance", settings: appearanceSettings },
        { category: "email", settings: emailSettings },
        { category: "seo", settings: seoSettings },
      ]

      // Fetch existing settings to determine if we need to update or insert
      const existingSettings = await fetchData("settings")

      for (const setting of settingsToSave) {
        const existing = existingSettings.find((s) => s.category === setting.category)

        if (existing) {
          // Update existing setting
          await updateData("settings", existing.id, setting)
        } else {
          // Insert new setting
          await insertData("settings", setting)
        }
      }

      toast({
        title: "Success",
        description: "Settings saved successfully!",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your website settings and preferences.</p>
        </div>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" /> General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" /> Email
          </TabsTrigger>
          <TabsTrigger value="seo">
            <FileText className="h-4 w-4 mr-2" /> SEO
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic website settings and functionality.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" name="siteName" value={generalSettings.siteName} onChange={handleGeneralChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input id="siteUrl" name="siteUrl" value={generalSettings.siteUrl} onChange={handleGeneralChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  value={generalSettings.adminEmail}
                  onChange={handleGeneralChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="articlesPerPage">Articles Per Page</Label>
                <Input
                  id="articlesPerPage"
                  name="articlesPerPage"
                  type="number"
                  value={generalSettings.articlesPerPage}
                  onChange={handleGeneralChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableComments">Enable Comments</Label>
                  <p className="text-sm text-muted-foreground">Allow visitors to comment on articles</p>
                </div>
                <Switch
                  id="enableComments"
                  checked={generalSettings.enableComments}
                  onCheckedChange={(checked) => handleGeneralSwitchChange("enableComments", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableSearch">Enable Search</Label>
                  <p className="text-sm text-muted-foreground">Allow visitors to search your website content</p>
                </div>
                <Switch
                  id="enableSearch"
                  checked={generalSettings.enableSearch}
                  onCheckedChange={(checked) => handleGeneralSwitchChange("enableSearch", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={appearanceSettings.theme}
                  onValueChange={(value) => handleAppearanceSelectChange("theme", value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <Select
                  value={appearanceSettings.primaryColor}
                  onValueChange={(value) => handleAppearanceSelectChange("primaryColor", value)}
                >
                  <SelectTrigger id="primaryColor">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teal">Teal</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logoUrl">Logo URL</Label>
                <Input
                  id="logoUrl"
                  name="logoUrl"
                  value={appearanceSettings.logoUrl}
                  onChange={handleAppearanceChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  name="favicon"
                  value={appearanceSettings.favicon}
                  onChange={handleAppearanceChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableDarkMode">Enable Dark Mode Toggle</Label>
                  <p className="text-sm text-muted-foreground">Allow visitors to switch between light and dark mode</p>
                </div>
                <Switch
                  id="enableDarkMode"
                  checked={appearanceSettings.enableDarkMode}
                  onCheckedChange={(checked) => handleAppearanceSwitchChange("enableDarkMode", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings for notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="smtpServer">SMTP Server</Label>
                <Input
                  id="smtpServer"
                  name="smtpServer"
                  value={emailSettings.smtpServer}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPort">SMTP Port</Label>
                <Input id="smtpPort" name="smtpPort" value={emailSettings.smtpPort} onChange={handleEmailChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpUsername">SMTP Username</Label>
                <Input
                  id="smtpUsername"
                  name="smtpUsername"
                  value={emailSettings.smtpUsername}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtpPassword">SMTP Password</Label>
                <Input
                  id="smtpPassword"
                  name="smtpPassword"
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderName">Sender Name</Label>
                <Input
                  id="senderName"
                  name="senderName"
                  value={emailSettings.senderName}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senderEmail">Sender Email</Label>
                <Input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  value={emailSettings.senderEmail}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="pt-4">
                <Button variant="outline">Test Email Configuration</Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Default Meta Title</Label>
                <Input id="metaTitle" name="metaTitle" value={seoSettings.metaTitle} onChange={handleSeoChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Default Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={handleSeoChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Default OG Image URL</Label>
                <Input id="ogImage" name="ogImage" value={seoSettings.ogImage} onChange={handleSeoChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                <Input
                  id="twitterHandle"
                  name="twitterHandle"
                  value={seoSettings.twitterHandle}
                  onChange={handleSeoChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  name="googleAnalyticsId"
                  value={seoSettings.googleAnalyticsId}
                  onChange={handleSeoChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableSitemap">Generate Sitemap</Label>
                  <p className="text-sm text-muted-foreground">Automatically generate and update XML sitemap</p>
                </div>
                <Switch
                  id="enableSitemap"
                  checked={seoSettings.enableSitemap}
                  onCheckedChange={(checked) => handleSeoSwitchChange("enableSitemap", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableRobotsTxt">Generate robots.txt</Label>
                  <p className="text-sm text-muted-foreground">Automatically generate robots.txt file</p>
                </div>
                <Switch
                  id="enableRobotsTxt"
                  checked={seoSettings.enableRobotsTxt}
                  onCheckedChange={(checked) => handleSeoSwitchChange("enableRobotsTxt", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
