import Link from "next/link"
import Image from "next/image"
import { Clock, EyeIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Article } from "@/types/article"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-slate-200 h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          width={400}
          height={225}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-teal-700 capitalize">
            {article.category}
          </span>
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center">
            <EyeIcon className="h-3 w-3 mr-1" />
            <span>{article.views} views</span>
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-600 mb-4 text-sm line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-4">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-200 transition-colors"
          >
            <Link href={`/article/${article.slug}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
