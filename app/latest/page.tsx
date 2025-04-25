import { SiteHeader } from "@/components/site-header"
import { ArticleCard } from "@/components/article-card"
import { AdUnit } from "@/components/ad-unit"
import { discoveriesArticles, inventionsArticles, interventionsArticles } from "@/data/articles"
import type { Article } from "@/types/article"

export default function LatestPage() {
  // Combine all articles and sort by date (newest first)
  const allArticles: Article[] = [...discoveriesArticles, ...inventionsArticles, ...interventionsArticles]

  // Sort by date (assuming date is in format "Month Day, Year")
  const sortedArticles = [...allArticles].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>

        <AdUnit className="w-full mb-8" format="leaderboard" slot="2345678901" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        <div className="mt-12">
          <AdUnit className="w-full" format="horizontal" slot="3456789012" />
        </div>
      </main>

      <footer className="py-6 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} Thinkverse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
