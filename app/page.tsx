import Link from "next/link"
import Image from "next/image"
import { Clock, EyeIcon, Beaker } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ArticleCard } from "@/components/article-card"
import { ResponsiveNavbar } from "@/components/responsive-navbar"
import { AdUnit } from "@/components/ad-unit"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Home() {
  const supabase = createClient()

  // Fetch featured article
  const { data: featuredArticle } = await supabase
    .from("articles")
    .select(`
      *,
      categories(id, name, slug)
    `)
    .eq("featured", true)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  // Fetch articles by category
  const { data: discoveriesArticles } = await supabase
    .from("articles")
    .select(`
      *,
      categories(id, name, slug)
    `)
    .eq("categories.slug", "discoveries")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  const { data: inventionsArticles } = await supabase
    .from("articles")
    .select(`
      *,
      categories(id, name, slug)
    `)
    .eq("categories.slug", "inventions")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  const { data: interventionsArticles } = await supabase
    .from("articles")
    .select(`
      *,
      categories(id, name, slug)
    `)
    .eq("categories.slug", "interventions")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3)

  // Fetch popular articles
  const { data: popularArticles } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      created_at,
      views
    `)
    .eq("published", true)
    .order("views", { ascending: false })
    .limit(3)

  return (
    <div className="min-h-screen bg-slate-50">
      <ResponsiveNavbar />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          {featuredArticle ? (
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl md:aspect-[2.4/1]">
                <Image
                  src={featuredArticle.image_url || "/placeholder.svg?height=600&width=1200"}
                  alt={featuredArticle.title}
                  width={1400}
                  height={600}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 p-8 flex flex-col justify-end text-white">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center rounded-full bg-teal-500/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white capitalize mb-3">
                      {featuredArticle.categories?.name || "Uncategorized"}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">{featuredArticle.title}</h1>
                    <p className="text-sm md:text-base mb-4 text-gray-200 max-w-xl">{featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(featuredArticle.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
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
          ) : (
            <div className="relative overflow-hidden rounded-xl shadow-lg bg-slate-200 aspect-video md:aspect-[2.4/1] flex items-center justify-center">
              <p className="text-slate-500">No featured article found</p>
            </div>
          )}
        </section>

        {/* Ad Space Below Hero */}
        <div className="mb-12">
          <AdUnit className="w-full" format="leaderboard" slot="3456789012" />
        </div>

        {/* Main Content with Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Discoveries Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <span className="w-1.5 h-6 bg-teal-500 rounded-full mr-2.5"></span>
                  Discoveries
                </h2>
                <Link
                  href="/discoveries"
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discoveriesArticles && discoveriesArticles.length > 0 ? (
                  discoveriesArticles.map((article) => <ArticleCard key={article.id} article={article} />)
                ) : (
                  <p className="text-slate-500 col-span-3 text-center py-8">No discoveries articles found</p>
                )}
              </div>
            </section>

            {/* Mid-page Ad */}
            <div className="mb-12">
              <AdUnit className="w-full" format="rectangle" slot="5678901234" />
            </div>

            {/* Inventions Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <span className="w-1.5 h-6 bg-amber-500 rounded-full mr-2.5"></span>
                  Inventions
                </h2>
                <Link
                  href="/inventions"
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventionsArticles && inventionsArticles.length > 0 ? (
                  inventionsArticles.map((article) => <ArticleCard key={article.id} article={article} />)
                ) : (
                  <p className="text-slate-500 col-span-3 text-center py-8">No inventions articles found</p>
                )}
              </div>
            </section>

            {/* Interventions Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full mr-2.5"></span>
                  Interventions
                </h2>
                <Link
                  href="/interventions"
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interventionsArticles && interventionsArticles.length > 0 ? (
                  interventionsArticles.map((article) => <ArticleCard key={article.id} article={article} />)
                ) : (
                  <p className="text-slate-500 col-span-3 text-center py-8">No interventions articles found</p>
                )}
              </div>
            </section>

            {/* Bottom Ad */}
            <div className="mb-12">
              <AdUnit className="w-full" format="horizontal" slot="6789012345" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-8">
            {/* Sidebar Ad */}
            <div>
              <AdUnit className="w-full" format="vertical" slot="7890123456" />
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h3 className="font-bold text-lg mb-3">Stay Updated</h3>
              <p className="text-sm text-slate-600 mb-4">Get the latest science news delivered to your inbox weekly.</p>
              <form className="space-y-3">
                <Input placeholder="Your email address" type="email" className="bg-slate-50" />
                <Button className="w-full">Subscribe</Button>
              </form>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h3 className="font-bold text-lg mb-4">Popular Articles</h3>
              <ul className="space-y-4">
                {popularArticles && popularArticles.length > 0 ? (
                  popularArticles.map((article) => (
                    <li key={article.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <Link href={`/article/${article.slug}`} className="text-sm font-medium hover:text-teal-600 block">
                        {article.title}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(article.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 text-sm">No popular articles found</li>
                )}
              </ul>
            </div>

            {/* Topics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h3 className="font-bold text-lg mb-4">Explore Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Quantum Physics",
                  "Biotechnology",
                  "Climate",
                  "AI",
                  "Space",
                  "Medicine",
                  "Robotics",
                  "Neuroscience",
                ].map((topic) => (
                  <Link
                    key={topic}
                    href={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-teal-50 hover:text-teal-700 transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            {/* Second Sidebar Ad */}
            <div>
              <AdUnit className="w-full" format="rectangle" slot="8901234567" />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t bg-white mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gradient-to-br from-teal-400 to-teal-600 text-white">
                  <Beaker className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">Thinkverse</span>
              </Link>
              <p className="text-sm text-slate-500">
                Exploring the frontiers of human knowledge through science, innovation, and discovery.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/discoveries" className="text-sm text-slate-600 hover:text-teal-600">
                    Discoveries
                  </Link>
                </li>
                <li>
                  <Link href="/inventions" className="text-sm text-slate-600 hover:text-teal-600">
                    Inventions
                  </Link>
                </li>
                <li>
                  <Link href="/interventions" className="text-sm text-slate-600 hover:text-teal-600">
                    Interventions
                  </Link>
                </li>
                <li>
                  <Link href="/topics" className="text-sm text-slate-600 hover:text-teal-600">
                    Topics
                  </Link>
                </li>
                <li>
                  <Link href="/latest" className="text-sm text-slate-600 hover:text-teal-600">
                    Latest
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">About</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-slate-600 hover:text-teal-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-slate-600 hover:text-teal-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-teal-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-teal-600">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mt-4">
                <AdUnit className="w-full" format="large-mobile" slot="9012345678" responsive={true} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
