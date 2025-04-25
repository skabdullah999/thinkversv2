"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Beaker } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    // Automatically redirect to admin dashboard
    router.push("/admin")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-br from-teal-400 to-teal-600 text-white">
              <Beaker className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Access</CardTitle>
          <CardDescription className="text-center">Redirecting to admin panel...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
