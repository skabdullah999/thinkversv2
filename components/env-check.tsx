"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { SupabaseNotConfigured } from "./supabase-not-configured"
import { isSupabaseConfigured } from "@/lib/supabase/is-configured"

interface EnvCheckProps {
  children: React.ReactNode
}

export function EnvCheck({ children }: EnvCheckProps) {
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)

  useEffect(() => {
    setIsConfigured(isSupabaseConfigured())
  }, [])

  // Still checking
  if (isConfigured === null) {
    return null
  }

  // Not configured
  if (!isConfigured) {
    return <SupabaseNotConfigured />
  }

  // Configured correctly
  return <>{children}</>
}
