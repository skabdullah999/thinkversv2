import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { AdUnit } from "@/components/ad-unit"

// Sample topics data
const TOPICS = [
  {
    name: "Quantum Physics",
    description: "Explore the fundamental principles of quantum mechanics and its applications.",
    count: 24,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Biotechnology",
    description: "Discover advances in biological research and technological applications.",
    count: 18,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Climate",
    description: "Learn about climate science, global warming, and environmental conservation.",
    count: 32,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Artificial Intelligence",
    description: "Understand machine learning, neural networks, and AI applications.",
    count: 45,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Space",
    description: "Explore astronomy, space exploration, and cosmic phenomena.",
    count: 29,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Medicine",
    description: "Stay updated on medical breakthroughs, treatments, and healthcare innovations.",
    count: 37,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Robotics",
    description: "Discover advances in robotics, automation, and mechanical engineering.",
    count: 21,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Neuroscience",
    description: "Learn about brain research, cognitive science, and neural systems.",
    count: 16,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Renewable Energy",
    description: "Explore sustainable energy sources, technologies, and environmental impact.",
    count: 27,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Genetics",
    description: "Understand DNA, genetic engineering, and hereditary science.",
    count: 23,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Nanotechnology",
    description: "Discover microscopic innovations and molecular engineering.",
    count: 14,
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    name: "Oceanography",
    description: "Explore marine science, ocean ecosystems, and underwater discoveries.",
    count: 19,
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function TopicsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Topics</h1>

        <AdUnit className="w-full mb-8" format="leaderboard" slot="1234567890" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOPICS.map((topic) => (
            <Link key={topic.name} href={`/topics/${topic.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 transition-all duration-300 hover:shadow-md">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={topic.image || "/placeholder.svg"}
                    alt={topic.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <h2 className="text-white text-xl font-bold">{topic.name}</h2>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-600 text-sm mb-2">{topic.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{topic.count} articles</span>
                    <span className="text-teal-600 text-sm font-medium group-hover:underline">Explore</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
