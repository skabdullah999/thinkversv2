"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ArticleCard } from "@/components/article-card"
import { AdUnit } from "@/components/ad-unit"
import { discoveriesArticles, inventionsArticles, interventionsArticles } from "@/data/articles"
import type { Article } from "@/types/article"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate search delay
    setIsLoading(true)

    const timer = setTimeout(() => {
      if (query) {
        // Combine all articles
        const allArticles = [...discoveriesArticles, ...inventionsArticles, ...interventionsArticles]

        // Filter articles based on search query
        const filteredResults = allArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
            article.fullContent.toLowerCase().includes(query.toLowerCase()),
        )

        setResults(filteredResults)
      } else {
        setResults([])
      }

      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          {query && (
            <p className="text-slate-600">
              Showing results for: <span className="font-medium">"{query}"</span>
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>

                {/* Ad unit in search results */}
                <AdUnit className="w-full" format="leaderboard" slot="9012345678" />

                <p className="text-center text-slate-500">
                  Found {results.length} result{results.length !== 1 ? "s" : ""}
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">No results found</h2>
                <p className="text-slate-600 max-w-md mx-auto">
                  We couldn't find any articles matching "{query}". Try using different keywords or check your spelling.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Thinkverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
