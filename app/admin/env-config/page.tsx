"use client"

import { useState, useEffect } from "react"
import { Copy, Download, Save, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { getSupabaseConfigStatus } from "@/lib/supabase/is-configured"

export default function EnvConfigPage() {
  const { toast } = useToast()
  const [isConfigured, setIsConfigured] = useState(false)
  const [configMessage, setConfigMessage] = useState("")

  // Supabase settings
  const [supabaseUrl, setSupabaseUrl] = useState("")
  const [supabaseAnonKey, setSupabaseAnonKey] = useState("")
  const [supabaseServiceRoleKey, setSupabaseServiceRoleKey] = useState("")
  const [supabaseJwtSecret, setSupabaseJwtSecret] = useState("")

  // Site settings
  const [siteUrl, setSiteUrl] = useState("http://localhost:3000")
  const [siteName, setSiteName] = useState("Thinkverse")
  const [siteDescription, setSiteDescription] = useState("A platform for discoveries, inventions, and interventions")

  // Email settings
  const [emailServerHost, setEmailServerHost] = useState("")
  const [emailServerPort, setEmailServerPort] = useState("587")
  const [emailServerUser, setEmailServerUser] = useState("")
  const [emailServerPassword, setEmailServerPassword] = useState("")
  const [emailFrom, setEmailFrom] = useState("noreply@thinkverse.com")

  // Analytics settings
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("")

  // Storage settings
  const [storageBucket, setStorageBucket] = useState("")

  useEffect(() => {
    // Check if Supabase is configured
    const status = getSupabaseConfigStatus()
    setIsConfigured(status.configured)
    setConfigMessage(status.message)

    // Load saved values from localStorage if available
    const savedConfig = localStorage.getItem("env-config")
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig)

        // Supabase settings
        if (config.supabaseUrl) setSupabaseUrl(config.supabaseUrl)
        if (config.supabaseAnonKey) setSupabaseAnonKey(config.supabaseAnonKey)
        if (config.supabaseServiceRoleKey) setSupabaseServiceRoleKey(config.supabaseServiceRoleKey)
        if (config.supabaseJwtSecret) setSupabaseJwtSecret(config.supabaseJwtSecret)

        // Site settings
        if (config.siteUrl) setSiteUrl(config.siteUrl)
        if (config.siteName) setSiteName(config.siteName)
        if (config.siteDescription) setSiteDescription(config.siteDescription)

        // Email settings
        if (config.emailServerHost) setEmailServerHost(config.emailServerHost)
        if (config.emailServerPort) setEmailServerPort(config.emailServerPort)
        if (config.emailServerUser) setEmailServerUser(config.emailServerUser)
        if (config.emailServerPassword) setEmailServerPassword(config.emailServerPassword)
        if (config.emailFrom) setEmailFrom(config.emailFrom)

        // Analytics settings
        if (config.googleAnalyticsId) setGoogleAnalyticsId(config.googleAnalyticsId)

        // Storage settings
        if (config.storageBucket) setStorageBucket(config.storageBucket)
      } catch (error) {
        console.error("Error loading saved config:", error)
      }
    }
  }, [])

  const saveToLocalStorage = () => {
    const config = {
      supabaseUrl,
      supabaseAnonKey,
      supabaseServiceRoleKey,
      supabaseJwtSecret,
      siteUrl,
      siteName,
      siteDescription,
      emailServerHost,
      emailServerPort,
      emailServerUser,
      emailServerPassword,
      emailFrom,
      googleAnalyticsId,
      storageBucket,
    }

    localStorage.setItem("env-config", JSON.stringify(config))

    toast({
      title: "Configuration Saved",
      description: "Your environment configuration has been saved to local storage.",
    })
  }

  const generateEnvFile = () => {
    return `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}
SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceRoleKey}
SUPABASE_JWT_SECRET=${supabaseJwtSecret}

# Site Configuration
NEXT_PUBLIC_SITE_URL=${siteUrl}
NEXT_PUBLIC_SITE_NAME=${siteName}
NEXT_PUBLIC_SITE_DESCRIPTION="${siteDescription}"

# Email Configuration (for password reset, notifications)
EMAIL_SERVER_HOST=${emailServerHost}
EMAIL_SERVER_PORT=${emailServerPort}
EMAIL_SERVER_USER=${emailServerUser}
EMAIL_SERVER_PASSWORD=${emailServerPassword}
EMAIL_FROM=${emailFrom}

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=${googleAnalyticsId}

# Storage (for file uploads)
NEXT_PUBLIC_STORAGE_BUCKET=${storageBucket}
`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEnvFile())

    toast({
      title: "Copied to Clipboard",
      description: "Environment configuration has been copied to your clipboard.",
    })
  }

  const downloadEnvFile = () => {
    const element = document.createElement("a")
    const file = new Blob([generateEnvFile()], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = ".env.local"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: "File Downloaded",
      description: "Environment configuration file (.env.local) has been downloaded.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environment Configuration</h1>
          <p className="text-muted-foreground">Configure your environment variables for Thinkverse.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveToLocalStorage}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button onClick={copyToClipboard} variant="outline">
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button onClick={downloadEnvFile} variant="outline">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </div>
      </div>

      {isConfigured ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Supabase Configured</AlertTitle>
          <AlertDescription className="text-green-700">{configMessage}</AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Supabase Not Configured</AlertTitle>
          <AlertDescription>{configMessage}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="supabase">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="supabase">Supabase</TabsTrigger>
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        {/* Supabase Configuration */}
        <TabsContent value="supabase">
          <Card>
            <CardHeader>
              <CardTitle>Supabase Configuration</CardTitle>
              <CardDescription>
                Configure your Supabase connection settings. These are required for the application to function.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supabaseUrl">
                  Supabase URL <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="supabaseUrl"
                  placeholder="https://your-project-id.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your Supabase project URL, found in the Project Settings > API section.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabaseAnonKey">
                  Supabase Anon Key <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="supabaseAnonKey"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseAnonKey}
                  onChange={(e) => setSupabaseAnonKey(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your Supabase anonymous key, found in the Project Settings > API section.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabaseServiceRoleKey">
                  Supabase Service Role Key <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="supabaseServiceRoleKey"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseServiceRoleKey}
                  onChange={(e) => setSupabaseServiceRoleKey(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your Supabase service role key, found in the Project Settings > API section.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supabaseJwtSecret">Supabase JWT Secret</Label>
                <Input
                  id="supabaseJwtSecret"
                  placeholder="your-supabase-jwt-secret"
                  value={supabaseJwtSecret}
                  onChange={(e) => setSupabaseJwtSecret(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your Supabase JWT secret, found in the Project Settings > API > JWT Settings section.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveToLocalStorage}>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Site Configuration */}
        <TabsContent value="site">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>Configure your website's basic information and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  placeholder="http://localhost:3000"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  placeholder="Thinkverse"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  placeholder="A platform for discoveries, inventions, and interventions"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveToLocalStorage}>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Configuration */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email settings for password reset, notifications, and other email functionality.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailServerHost">SMTP Server Host</Label>
                <Input
                  id="emailServerHost"
                  placeholder="smtp.example.com"
                  value={emailServerHost}
                  onChange={(e) => setEmailServerHost(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailServerPort">SMTP Server Port</Label>
                <Input
                  id="emailServerPort"
                  placeholder="587"
                  value={emailServerPort}
                  onChange={(e) => setEmailServerPort(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailServerUser">SMTP Username</Label>
                <Input
                  id="emailServerUser"
                  placeholder="your-email@example.com"
                  value={emailServerUser}
                  onChange={(e) => setEmailServerUser(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailServerPassword">SMTP Password</Label>
                <Input
                  id="emailServerPassword"
                  type="password"
                  placeholder="••••••••••••"
                  value={emailServerPassword}
                  onChange={(e) => setEmailServerPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailFrom">From Email</Label>
                <Input
                  id="emailFrom"
                  placeholder="noreply@thinkverse.com"
                  value={emailFrom}
                  onChange={(e) => setEmailFrom(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveToLocalStorage}>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other Configuration */}
        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle>Other Configuration</CardTitle>
              <CardDescription>
                Configure additional settings for analytics, storage, and other services.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  placeholder="G-XXXXXXXXXX"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storageBucket">Storage Bucket</Label>
                <Input
                  id="storageBucket"
                  placeholder="thinkverse-storage"
                  value={storageBucket}
                  onChange={(e) => setStorageBucket(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveToLocalStorage}>Save Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Generated Environment File</CardTitle>
          <CardDescription>Copy this configuration to your .env.local file or download it.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea className="font-mono text-sm" rows={15} readOnly value={generateEnvFile()} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={copyToClipboard} variant="outline">
            <Copy className="mr-2 h-4 w-4" /> Copy to Clipboard
          </Button>
          <Button onClick={downloadEnvFile}>
            <Download className="mr-2 h-4 w-4" /> Download .env.local
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
