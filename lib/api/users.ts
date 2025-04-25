import { createClient } from "@/lib/supabase/client"
import type { Updateables } from "@/lib/supabase/database.types"

const supabase = createClient()

export async function getUsers() {
  const { data, error } = await supabase.auth.admin.listUsers()

  if (error) {
    console.error("Error fetching users:", error)
    throw error
  }

  // Get profiles for all users
  const userIds = data.users.map((user) => user.id)
  const { data: profiles } = await supabase.from("profiles").select("*").in("id", userIds)

  // Combine users with their profiles
  const usersWithProfiles = data.users.map((user) => {
    const profile = profiles?.find((p) => p.id === user.id)
    return {
      ...user,
      profile,
    }
  })

  return usersWithProfiles
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.auth.admin.getUserById(id)

  if (error) {
    console.error("Error fetching user:", error)
    throw error
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", id).single()

  return {
    ...data.user,
    profile,
  }
}

export async function updateUserProfile(id: string, updates: Updateables<"profiles">) {
  const { data, error } = await supabase.from("profiles").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating profile:", error)
    throw error
  }

  return data
}

export async function createUser(
  email: string,
  password: string,
  userData: {
    full_name?: string
    role?: string
  },
) {
  // Create user in Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError) {
    console.error("Error creating user:", authError)
    throw authError
  }

  // Create profile
  if (authData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      full_name: userData.full_name,
      role: userData.role || "user",
    })

    if (profileError) {
      console.error("Error creating profile:", profileError)
      throw profileError
    }
  }

  return authData.user
}

export async function deleteUser(id: string) {
  const { error } = await supabase.auth.admin.deleteUser(id)

  if (error) {
    console.error("Error deleting user:", error)
    throw error
  }

  return true
}
