"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, EyeIcon, MessageSquare, Share2 } from "lucide-react"
import { useParams } from "next/navigation"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { findArticleBySlug } from "@/data/articles"
import { AdUnit } from "@/components/ad-unit"

export default function ArticlePage() {
  const params = useParams()
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const article = findArticleBySlug(slug)

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<{ name: string; text: string; date: string }[]>([])
  const [copied, setCopied] = useState(false)

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SiteHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <Link href="/" className="text-teal-600 hover:underline">
              Return to home page
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && comment.trim()) {
      setComments([
        ...comments,
        {
          name,
          text: comment,
          date: new Date().toLocaleDateString(),
        },
      ])
      setName("")
      setComment("")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <Link href="/" className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>

            <article className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>

              <div className="flex items-center gap-4 mb-6 text-slate-500 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  <span>{article.views} views</span>
                </div>
              </div>

              <div className="relative aspect-video w-full mb-8 overflow-hidden rounded-lg">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={1200}
                  height={675}
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="mb-4 leading-relaxed">{article.fullContent.split("\n\n")[0]}</p>
                <p className="mb-4 leading-relaxed">{article.fullContent.split("\n\n")[1]}</p>

                {/* In-article ad */}
                <div className="my-6">
                  <AdUnit className="w-full" format="rectangle" slot="1234567890" />
                </div>

                <p className="mb-4 leading-relaxed">{article.fullContent.split("\n\n")[2]}</p>
                <p className="mb-4 leading-relaxed">{article.fullContent.split("\n\n")[3]}</p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <div className="flex items-center text-slate-500">
                    <EyeIcon className="h-5 w-5 mr-2" />
                    <span>{article.views} views</span>
                  </div>

                  <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Share"}
                  </Button>
                </div>

                <div className="text-sm text-slate-500">
                  Category:{" "}
                  <Link href={`/${article.category}`} className="text-teal-600 hover:underline">
                    {article.category}
                  </Link>
                </div>
              </div>
            </article>

            {/* Ad Space Below Article */}
            <div className="mb-8">
              <AdUnit className="w-full" format="horizontal" slot="2345678901" />
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Comments ({comments.length})
              </h2>

              {comments.length > 0 && (
                <div className="mb-8 space-y-4">
                  {comments.map((comment, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{comment.name}</h3>
                        <span className="text-xs text-slate-500">{comment.date}</span>
                      </div>
                      <p className="text-slate-700">{comment.text}</p>
                    </Card>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmitComment}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium mb-1">
                      Comment
                    </label>
                    <Textarea
                      id="comment"
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Submit Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:w-1/4">
            {/* Sidebar Ad */}
            <div className="mb-6">
              <AdUnit className="w-full" format="vertical" slot="3456789012" />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-bold mb-4">Related Articles</h3>
              <ul className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <li key={i}>
                    <Link href="#" className="text-sm hover:text-teal-600 block">
                      Related article title goes here with some placeholder text
                    </Link>
                    <div className="text-xs text-slate-500 mt-1">May 12, 2023</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second sidebar ad */}
            <div className="mb-6">
              <AdUnit className="w-full" format="rectangle" slot="4567890123" />
            </div>
          </div>
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
