import { createClient } from "@/lib/supabase/client"
import type { Insertables, Updateables } from "@/lib/supabase/database.types"

const supabase = createClient()

export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    throw error
  }

  return data
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

  if (error) {
    console.error("Error fetching category:", error)
    throw error
  }

  return data
}

export async function createCategory(category: Insertables<"categories">) {
  const { data, error } = await supabase.from("categories").insert(category).select().single()

  if (error) {
    console.error("Error creating category:", error)
    throw error
  }

  return data
}

export async function updateCategory(id: string, updates: Updateables<"categories">) {
  const { data, error } = await supabase.from("categories").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating category:", error)
    throw error
  }

  return data
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    console.error("Error deleting category:", error)
    throw error
  }

  return true
}

export async function getCategoryArticleCount(categoryId: string) {
  const { count, error } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId)

  if (error) {
    console.error("Error counting articles:", error)
    throw error
  }

  return count
}
