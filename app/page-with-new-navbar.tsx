import Link from "next/link"
import Image from "next/image"
import { Clock, EyeIcon } from "lucide-react"
import { ResponsiveNavbar } from "@/components/responsive-navbar"
import { featuredArticle } from "@/data/articles"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <ResponsiveNavbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl md:aspect-[2.4/1]">
              <Image
                src={featuredArticle.image || "/placeholder.svg"}
                alt={featuredArticle.title}
                width={1400}
                height={600}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 p-8 flex flex-col justify-end text-white">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center rounded-full bg-teal-500/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white capitalize mb-3">
                    {featuredArticle.category}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">{featuredArticle.title}</h1>
                  <p className="text-sm md:text-base mb-4 text-gray-200 max-w-xl">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      <span>{featuredArticle.views} views</span>
                    </div>
                  </div>
                  <Link
                    href={`/article/${featuredArticle.slug}`}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-slate-900 shadow transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the content remains the same */}
        {/* ... */}
      </main>
    </div>
  )
}
