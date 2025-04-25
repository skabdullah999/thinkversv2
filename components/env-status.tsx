"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getSupabaseConfigStatus } from "@/lib/supabase/is-configured"
import Link from "next/link"

export function EnvStatus() {
  const [isConfigured, setIsConfigured] = useState(false)
  const [configMessage, setConfigMessage] = useState("")

  useEffect(() => {
    // Check if Supabase is configured
    const status = getSupabaseConfigStatus()
    setIsConfigured(status.configured)
    setConfigMessage(status.message)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Status</CardTitle>
        <CardDescription>Check the status of your environment configuration.</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/admin/env-config">{isConfigured ? "View Configuration" : "Configure Environment"}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
