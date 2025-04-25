/**
 * Checks if Supabase is properly configured with valid environment variables
 */
export function isSupabaseConfigured(): boolean {
  return (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://") &&
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0
  )
}

/**
 * Gets the configuration status message for Supabase
 */
export function getSupabaseConfigStatus(): { configured: boolean; message: string } {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return {
      configured: false,
      message: "NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables",
    }
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith("https://")) {
    return {
      configured: false,
      message: "NEXT_PUBLIC_SUPABASE_URL must start with https://",
    }
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      configured: false,
      message: "NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in environment variables",
    }
  }

  return {
    configured: true,
    message: "Supabase is properly configured",
  }
}
