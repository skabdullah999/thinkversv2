import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

// Create a server-side Supabase client
export const createClient = () => {
  // Check if the environment variables are defined
  if (
    typeof process.env.NEXT_PUBLIC_SUPABASE_URL !== "string" ||
    typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "string"
  ) {
    console.error(
      "Supabase environment variables are missing or invalid. " +
        "Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set correctly.",
    )

    // Return a mock client that won't make actual API calls
    // This prevents the app from crashing but won't allow Supabase functionality
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase not configured") }),
        insert: () => ({ data: null, error: new Error("Supabase not configured") }),
        update: () => ({ data: null, error: new Error("Supabase not configured") }),
        delete: () => ({ data: null, error: new Error("Supabase not configured") }),
      }),
    } as any
  }

  // If environment variables are properly set, create the actual client
  return createServerComponentClient<Database>({ cookies })
}
