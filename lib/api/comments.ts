import { createClient } from "@/lib/supabase/client"
import type { Insertables, Updateables } from "@/lib/supabase/database.types"

const supabase = createClient()

export async function getCommentsByArticle(
  articleId: string,
  options?: {
    approved?: boolean
    limit?: number
    orderBy?: { column: string; order: "asc" | "desc" }
  },
) {
  let query = supabase
    .from("comments")
    .select(`
      *,
      profiles(id, full_name, avatar_url)
    `)
    .eq("article_id", articleId)

  if (options?.approved !== undefined) {
    query = query.eq("approved", options.approved)
  }

  if (options?.orderBy) {
    query = query.order(options.orderBy.column, { ascending: options.orderBy.order === "asc" })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching comments:", error)
    throw error
  }

  return data
}

export async function createComment(comment: Insertables<"comments">) {
  const { data, error } = await supabase.from("comments").insert(comment).select().single()

  if (error) {
    console.error("Error creating comment:", error)
    throw error
  }

  return data
}

export async function updateComment(id: string, updates: Updateables<"comments">) {
  const { data, error } = await supabase.from("comments").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating comment:", error)
    throw error
  }

  return data
}

export async function deleteComment(id: string) {
  const { error } = await supabase.from("comments").delete().eq("id", id)

  if (error) {
    console.error("Error deleting comment:", error)
    throw error
  }

  return true
}

export async function approveComment(id: string) {
  return updateComment(id, { approved: true })
}
