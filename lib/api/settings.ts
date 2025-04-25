import { createClient } from "@/lib/supabase/client"

const supabase = createClient()

export async function getSettings(id: string) {
  const { data, error } = await supabase.from("settings").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching settings (${id}):`, error)
    throw error
  }

  return data?.value
}

export async function getAllSettings() {
  const { data, error } = await supabase.from("settings").select("*")

  if (error) {
    console.error("Error fetching all settings:", error)
    throw error
  }

  // Convert array to object with id as key
  return data.reduce(
    (acc, setting) => {
      acc[setting.id] = setting.value
      return acc
    },
    {} as Record<string, any>,
  )
}

export async function updateSettings(id: string, value: any, userId: string) {
  const { data, error } = await supabase
    .from("settings")
    .update({
      value,
      updated_by: userId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error updating settings (${id}):`, error)
    throw error
  }

  return data
}
