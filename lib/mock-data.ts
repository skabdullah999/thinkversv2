// Mock data for when Supabase is not available

export const mockCategories = [
  {
    id: "1",
    name: "Discoveries",
    slug: "discoveries",
    description: "Scientific discoveries and breakthroughs",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    articleCount: 3,
  },
  {
    id: "2",
    name: "Inventions",
    slug: "inventions",
    description: "New technologies and inventions",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    articleCount: 3,
  },
  {
    id: "3",
    name: "Interventions",
    slug: "interventions",
    description: "Solutions to global challenges",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    articleCount: 3,
  },
]

export const mockArticles = [
  {
    id: "1",
    title: "New Quantum Computing Breakthrough",
    slug: "new-quantum-computing-breakthrough",
    excerpt:
      "Scientists have achieved a major milestone in quantum computing that could revolutionize data processing.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image_url: "/placeholder.svg?height=600&width=1200",
    category_id: "1",
    author_id: "1",
    published: true,
    featured: true,
    views: 4289,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: { id: "1", name: "Discoveries", slug: "discoveries" },
  },
  {
    id: "2",
    title: "Biodegradable Microchip Technology",
    slug: "biodegradable-microchip-technology",
    excerpt: "Engineers have developed fully biodegradable microchips for medical applications.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image_url: "/placeholder.svg?height=300&width=500",
    category_id: "2",
    author_id: "1",
    published: true,
    featured: false,
    views: 1943,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: { id: "2", name: "Inventions", slug: "inventions" },
  },
  {
    id: "3",
    title: "Genetically Enhanced Coral for Reef Restoration",
    slug: "coral-reef-restoration-genetically-enhanced",
    excerpt: "Marine biologists have deployed genetically enhanced coral species in the Great Barrier Reef.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image_url: "/placeholder.svg?height=300&width=500",
    category_id: "3",
    author_id: "1",
    published: true,
    featured: false,
    views: 1832,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: { id: "3", name: "Interventions", slug: "interventions" },
  },
]

export const mockUsers = [
  {
    id: "1",
    email: "admin@thinkverse.com",
    created_at: new Date().toISOString(),
    profile: {
      id: "1",
      full_name: "Admin User",
      avatar_url: "/placeholder.svg?height=40&width=40",
      bio: "Administrator of Thinkverse",
      role: "admin",
      website: "https://thinkverse.com",
      last_login: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
  {
    id: "2",
    email: "editor@thinkverse.com",
    created_at: new Date().toISOString(),
    profile: {
      id: "2",
      full_name: "Editor User",
      avatar_url: "/placeholder.svg?height=40&width=40",
      bio: "Content editor for Thinkverse",
      role: "editor",
      website: null,
      last_login: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
]

export const mockSettings = {
  general: {
    siteName: "Thinkverse",
    siteDescription: "Exploring the frontiers of human knowledge through science, innovation, and discovery.",
    siteUrl: "https://thinkverse.com",
    adminEmail: "admin@thinkverse.com",
    articlesPerPage: "9",
    enableComments: true,
    enableSearch: true,
  },
  appearance: {
    theme: "light",
    primaryColor: "teal",
    logoUrl: "/logo.png",
    favicon: "/favicon.ico",
    enableDarkMode: true,
  },
  email: {
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@thinkverse.com",
    smtpPassword: "••••••••••••",
    senderName: "Thinkverse",
    senderEmail: "notifications@thinkverse.com",
  },
  seo: {
    metaTitle: "Thinkverse - Science & Technology News",
    metaDescription: "Exploring the frontiers of human knowledge through science, innovation, and discovery.",
    ogImage: "/og-image.jpg",
    twitterHandle: "@thinkverse",
    enableSitemap: true,
    enableRobotsTxt: true,
    googleAnalyticsId: "G-XXXXXXXXXX",
  },
}
