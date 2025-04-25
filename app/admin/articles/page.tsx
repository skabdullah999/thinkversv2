"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal, ArrowUpDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchData, deleteData } from "@/lib/api/admin"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { isSupabaseConfigured } from "@/lib/supabase/is-configured"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState<"created_at" | "title" | "views">("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMockData, setUsingMockData] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function fetchArticlesData() {
      try {
        setIsLoading(true)
        setError(null)

        // Check if Supabase is configured
        const supabaseConfigured = isSupabaseConfigured()
        if (!supabaseConfigured && process.env.NODE_ENV === "development") {
          console.log("Supabase not configured, using mock data")
          setUsingMockData(true)
        }

        // Fetch categories
        const categoriesData = await fetchData("categories")

        // Check if categories data is valid
        if (!Array.isArray(categoriesData)) {
          throw new Error("Failed to fetch categories data")
        }

        setCategories(categoriesData)

        // Fetch articles
        const articlesData = await fetchData("articles", {
          select: "*, categories(*)",
        })

        // Check if articles data is valid
        if (!Array.isArray(articlesData)) {
          throw new Error("Failed to fetch articles data")
        }

        setArticles(articlesData)
      } catch (error: any) {
        console.error("Error fetching data:", error)
        setError(error.message || "Failed to load data. Please check your connection and try again.")

        // Don't show toast for mock data
        if (!usingMockData) {
          toast({
            title: "Error",
            description: "Failed to load articles. Using mock data instead.",
            variant: "destructive",
          })
        }

        // Try to use mock data if available
        try {
          setUsingMockData(true)
          const categoriesData = await fetchData("categories")
          const articlesData = await fetchData("articles", {
            select: "*, categories(*)",
          })

          if (Array.isArray(categoriesData)) {
            setCategories(categoriesData)
          }

          if (Array.isArray(articlesData)) {
            setArticles(articlesData)
            setError(null) // Clear error if we successfully got mock data
          }
        } catch (mockError) {
          console.error("Error fetching mock data:", mockError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticlesData()
  }, [toast])

  // Filter and sort articles
  const filteredArticles = articles
    .filter((article) => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return article.title.toLowerCase().includes(query) || article.excerpt?.toLowerCase().includes(query)
      }
      return true
    })
    .filter((article) => {
      // Apply category filter
      if (categoryFilter !== "all") {
        return article.categories?.slug === categoryFilter
      }
      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "created_at") {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA
      } else if (sortBy === "title") {
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      } else if (sortBy === "views") {
        return sortDirection === "asc" ? a.views - b.views : b.views - a.views
      }
      return 0
    })

  const toggleSort = (column: "created_at" | "title" | "views") => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("desc")
    }
  }

  const handleDeleteArticle = async (article: any) => {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      try {
        const success = await deleteData("articles", article.id)

        if (!success && !usingMockData) {
          throw new Error("Failed to delete article")
        }

        // Update local state
        setArticles(articles.filter((a) => a.id !== article.id))

        toast({
          title: "Success",
          description: `Article "${article.title}" has been deleted.`,
        })
      } catch (error: any) {
        console.error("Error deleting article:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to delete article. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch (e) {
      return "Invalid date"
    }
  }

  // If there's a connection error and we couldn't get mock data, show a friendly message
  if (error && articles.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">Manage your website articles.</p>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-2">
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="p-8 text-center">
          <p className="text-muted-foreground mb-4">This could be due to:</p>
          <ul className="list-disc text-left max-w-md mx-auto space-y-2 text-muted-foreground">
            <li>Missing or incorrect Supabase environment variables</li>
            <li>Network connectivity issues</li>
            <li>Supabase service being temporarily unavailable</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground">Manage your website articles.</p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </div>

      {usingMockData && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Using Mock Data</AlertTitle>
          <AlertDescription className="text-amber-700">
            Supabase connection is not available. Using mock data for demonstration purposes.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("title")}
                  className="flex items-center p-0 h-auto font-medium"
                >
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("created_at")}
                  className="flex items-center p-0 h-auto font-medium"
                >
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("views")}
                  className="flex items-center p-0 h-auto font-medium"
                >
                  Views
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No articles found
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((article, index) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {article.title}
                    {!article.published && (
                      <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">Draft</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">
                    {article.categories?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell>{formatDate(article.created_at)}</TableCell>
                  <TableCell className="hidden md:table-cell">{article.views?.toLocaleString() || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
                        <Link href={`/article/${article.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
                        <Link href={`/admin/articles/edit/${article.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteArticle(article)}
                        className="hidden sm:inline-flex text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>

                      {/* Mobile dropdown menu */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="sm:hidden">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/article/${article.slug}`} target="_blank">
                              <Eye className="h-4 w-4 mr-2" /> View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/articles/edit/${article.id}`}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteArticle(article)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
