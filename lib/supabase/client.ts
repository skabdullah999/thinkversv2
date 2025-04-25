import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

// Create a single instance of the Supabase client to be used across the client components
export const createClient = () => {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined"

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
        signInWithPassword: () =>
          Promise.resolve({ data: { user: null }, error: new Error("Supabase not configured") }),
        signUp: () => Promise.resolve({ data: { user: null }, error: new Error("Supabase not configured") }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase not configured") }),
        insert: () => ({ data: null, error: new Error("Supabase not configured") }),
        update: () => ({ data: null, error: new Error("Supabase not configured") }),
        delete: () => ({ data: null, error: new Error("Supabase not configured") }),
      }),
    } as any
  }

  try {
    // If environment variables are properly set, create the actual client
    return createClientComponentClient<Database>({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    })
  } catch (error) {
    console.error("Error creating Supabase client:", error)

    // Return a mock client in case of initialization error
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      },
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase client initialization failed") }),
        insert: () => ({ data: null, error: new Error("Supabase client initialization failed") }),
        update: () => ({ data: null, error: new Error("Supabase client initialization failed") }),
        delete: () => ({ data: null, error: new Error("Supabase client initialization failed") }),
      }),
    } as any
  }
}
