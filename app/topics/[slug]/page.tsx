"use client"

import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { ArticleCard } from "@/components/article-card"
import { AdUnit } from "@/components/ad-unit"
import { discoveriesArticles, inventionsArticles, interventionsArticles } from "@/data/articles"
import type { Article } from "@/types/article"

// Sample topic descriptions
const TOPIC_DESCRIPTIONS: Record<string, string> = {
  "quantum-physics":
    "Quantum physics is a branch of physics that explores the behavior of matter and energy at the smallest scales. It reveals phenomena that challenge our intuition and has led to revolutionary technologies.",
  biotechnology:
    "Biotechnology harnesses cellular and biomolecular processes to develop technologies and products that help improve our lives and the health of our planet.",
  climate:
    "Climate science studies long-term weather patterns, their variations, and the factors that influence them, including human activities and their impact on global climate systems.",
  ai: "Artificial Intelligence encompasses computer systems designed to perform tasks that typically require human intelligence, including visual perception, speech recognition, and decision-making.",
  space:
    "Space exploration investigates celestial objects and phenomena beyond Earth's atmosphere, expanding our understanding of the universe and developing technologies for space travel.",
  medicine:
    "Medical science focuses on maintaining health and preventing, diagnosing, and treating disease, continuously evolving through research and technological innovation.",
  robotics:
    "Robotics combines engineering and computer science to design, construct, and operate machines that can perform tasks autonomously or semi-autonomously.",
  neuroscience:
    "Neuroscience studies the nervous system, including the brain, spinal cord, and networks of sensory nerve cells, to understand behavior, learning, and consciousness.",
}

export default function TopicDetailPage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug

  // Format the topic name for display
  const topicName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Get topic description or default
  const topicDescription =
    TOPIC_DESCRIPTIONS[slug] ||
    "Explore the latest articles, research, and breakthroughs in this fascinating field of science and technology."

  // Combine all articles
  const allArticles: Article[] = [...discoveriesArticles, ...inventionsArticles, ...interventionsArticles]

  // Filter articles that might be related to this topic (simple keyword matching)
  const relatedArticles = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(slug.replace(/-/g, " ")) ||
      article.excerpt.toLowerCase().includes(slug.replace(/-/g, " ")) ||
      article.fullContent.toLowerCase().includes(slug.replace(/-/g, " ")),
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3">{topicName}</h1>
          <p className="text-slate-600 max-w-3xl">{topicDescription}</p>
        </div>

        <AdUnit className="w-full mb-8" format="leaderboard" slot="4567890123" />

        {relatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
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
            <h2 className="text-xl font-bold mb-2">No articles found</h2>
            <p className="text-slate-600 max-w-md mx-auto">
              We don't have any articles on this topic yet. Check back soon as we're constantly adding new content.
            </p>
          </div>
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
