import { createClient } from "@/lib/supabase/client"
import type { Insertables, Updateables } from "@/lib/supabase/database.types"

const supabase = createClient()

export async function getArticles(options?: {
  category?: string
  featured?: boolean
  published?: boolean
  limit?: number
  search?: string
  orderBy?: { column: string; order: "asc" | "desc" }
}) {
  let query = supabase.from("articles").select(`
      *,
      categories(id, name, slug)
    `)

  // Apply filters
  if (options?.category) {
    query = query.eq("categories.slug", options.category)
  }

  if (options?.featured !== undefined) {
    query = query.eq("featured", options.featured)
  }

  if (options?.published !== undefined) {
    query = query.eq("published", options.published)
  }

  if (options?.search) {
    query = query.or(
      `title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%,content.ilike.%${options.search}%`,
    )
  }

  // Apply ordering
  if (options?.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.order === "asc" })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  // Apply limit
  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching articles:", error)
    throw error
  }

  return data
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("articles")
    .select(`
      *,
      categories(id, name, slug)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching article:", error)
    throw error
  }

  return data
}

export async function incrementArticleViews(id: string) {
  const { data, error } = await supabase.rpc("increment_article_views", { article_id: id })

  if (error) {
    console.error("Error incrementing views:", error)
    throw error
  }

  return data
}

export async function createArticle(article: Insertables<"articles">) {
  const { data, error } = await supabase.from("articles").insert(article).select().single()

  if (error) {
    console.error("Error creating article:", error)
    throw error
  }

  return data
}

export async function updateArticle(id: string, updates: Updateables<"articles">) {
  const { data, error } = await supabase.from("articles").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating article:", error)
    throw error
  }

  return data
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from("articles").delete().eq("id", id)

  if (error) {
    console.error("Error deleting article:", error)
    throw error
  }

  return true
}
