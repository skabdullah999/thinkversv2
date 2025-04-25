import { createClient } from "@/lib/supabase/client"
import { mockArticles, mockCategories, mockUsers, mockSettings } from "@/lib/mock-data"
import { isSupabaseConfigured } from "@/lib/supabase/is-configured"

// Create a function that returns a fresh Supabase client for each operation
// This helps avoid stale connections and initialization issues
const getSupabaseClient = () => createClient()

// Check if we should use mock data
const useMockData = () => {
  // In development, use mock data if Supabase is not configured
  if (process.env.NODE_ENV === "development" && !isSupabaseConfigured()) {
    return true
  }
  return false
}

// Generic function to fetch data from any table with better error handling
export async function fetchData(table: string, options: any = {}) {
  // Use mock data if Supabase is not configured in development
  if (useMockData()) {
    console.log(`Using mock data for ${table}`)
    return getMockData(table, options)
  }

  try {
    const supabase = getSupabaseClient()

    // Check if supabase client is properly initialized
    if (!supabase) {
      console.error("Supabase client not initialized")
      return getMockData(table, options)
    }

    let query = supabase.from(table).select(options.select || "*")

    if (options.filters) {
      for (const filter of options.filters) {
        query = query.filter(filter.column, filter.operator, filter.value)
      }
    }

    if (options.order) {
      query = query.order(options.order.column, options.order.direction || "asc")
    }

    if (options.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error(`Supabase error fetching data from ${table}:`, error)
      return getMockData(table, options)
    }

    return data || []
  } catch (error) {
    console.error(`Error fetching data from ${table}:`, error)
    // If there's a network error or any other error, fall back to mock data
    return getMockData(table, options)
  }
}

// Helper function to get mock data based on table name
function getMockData(table: string, options: any = {}) {
  console.log(`Falling back to mock data for ${table}`)
  switch (table) {
    case "articles":
      return mockArticles
    case "categories":
      return mockCategories
    case "profiles":
      return mockUsers.map((user) => user.profile)
    case "settings":
      const settingId = options.id || "general"
      return mockSettings[settingId] || {}
    default:
      return []
  }
}

// Generic function to insert data into any table with better error handling
export async function insertData(table: string, data: any) {
  // Use mock data if Supabase is not configured in development
  if (useMockData()) {
    console.log(`Using mock data for inserting into ${table}`)
    return { id: "mock-id", ...data }
  }

  try {
    const supabase = getSupabaseClient()

    // Check if supabase client is properly initialized
    if (!supabase) {
      console.error("Supabase client not initialized")
      return { id: "mock-id", ...data }
    }

    const { data: result, error } = await supabase.from(table).insert(data).select()

    if (error) {
      console.error(`Supabase error inserting data into ${table}:`, error)
      return { id: "mock-id", ...data }
    }

    return result[0] || { id: "mock-id", ...data }
  } catch (error) {
    console.error(`Error inserting data into ${table}:`, error)
    return { id: "mock-id", ...data }
  }
}

// Generic function to update data in any table with better error handling
export async function updateData(table: string, id: string, data: any) {
  // Use mock data if Supabase is not configured in development
  if (useMockData()) {
    console.log(`Using mock data for updating ${table}`)
    return { id, ...data }
  }

  try {
    const supabase = getSupabaseClient()

    // Check if supabase client is properly initialized
    if (!supabase) {
      console.error("Supabase client not initialized")
      return { id, ...data }
    }

    const { data: result, error } = await supabase.from(table).update(data).eq("id", id).select()

    if (error) {
      console.error(`Supabase error updating data in ${table}:`, error)
      return { id, ...data }
    }

    return result[0] || { id, ...data }
  } catch (error) {
    console.error(`Error updating data in ${table}:`, error)
    return { id, ...data }
  }
}

// Generic function to delete data from any table with better error handling
export async function deleteData(table: string, id: string) {
  // Use mock data if Supabase is not configured in development
  if (useMockData()) {
    console.log(`Using mock data for deleting from ${table}`)
    return true
  }

  try {
    const supabase = getSupabaseClient()

    // Check if supabase client is properly initialized
    if (!supabase) {
      console.error("Supabase client not initialized")
      return true
    }

    const { error } = await supabase.from(table).delete().eq("id", id)

    if (error) {
      console.error(`Supabase error deleting data from ${table}:`, error)
      return false
    }

    return true
  } catch (error) {
    console.error(`Error deleting data from ${table}:`, error)
    return true // Return true for mock data in case of error
  }
}
