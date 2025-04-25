"use client"

import { useEffect, useState } from "react"
import { FileText, Users, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { EnvStatus } from "@/components/env-status"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    averageViews: 0,
    activeUsers: 0,
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch articles
        const { data: articles } = await supabase.from("articles").select("*")
        const totalArticles = articles?.length || 0
        const totalViews = articles?.reduce((sum, article) => sum + (article.views || 0), 0) || 0
        const averageViews = totalArticles > 0 ? Math.round(totalViews / totalArticles) : 0

        // Fetch user count
        const { count: activeUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true })

        setStats({
          totalArticles,
          totalViews,
          averageViews,
          activeUsers: activeUsers || 0,
        })

        // Fetch recent activity (latest articles and comments)
        const { data: recentArticles } = await supabase
          .from("articles")
          .select("id, title, created_at")
          .order("created_at", { ascending: false })
          .limit(3)

        const { data: recentComments } = await supabase
          .from("comments")
          .select("id, content, created_at, article_id, articles(title)")
          .order("created_at", { ascending: false })
          .limit(2)

        // Format activity data
        const formattedArticles =
          recentArticles?.map((article) => ({
            type: "article_published",
            title: article.title,
            date: new Date(article.created_at).toLocaleString(),
            id: article.id,
          })) || []

        const formattedComments =
          recentComments?.map((comment) => ({
            type: "comment_added",
            article: comment.articles?.title,
            articleId: comment.article_id,
            date: new Date(comment.created_at).toLocaleString(),
            id: comment.id,
          })) || []

        // Combine and sort by date
        const combinedActivity = [...formattedArticles, ...formattedComments]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)

        setRecentActivity(combinedActivity)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase])

  // Mock stats for demonstration
  const statsData = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
      icon: FileText,
      change: "+12%",
      trend: "up",
      description: "vs. previous month",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      icon: Eye,
      change: "+18%",
      trend: "up",
      description: "vs. previous month",
    },
    {
      title: "Avg. Views per Article",
      value: stats.averageViews.toLocaleString(),
      icon: TrendingUp,
      change: "-3%",
      trend: "down",
      description: "vs. previous month",
    },
    {
      title: "Active Users",
      value: stats.activeUsers.toString(),
      icon: Users,
      change: "+7%",
      trend: "up",
      description: "vs. previous month",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your website statistics and activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4 text-rose-500" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}>{stat.change}</span>
                <span className="ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="rounded-full p-2 bg-slate-100">
                      {activity.type === "article_published" && <FileText className="h-4 w-4 text-blue-500" />}
                      {activity.type === "comment_added" && <Eye className="h-4 w-4 text-purple-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.type === "article_published" && `Published "${activity.title}"`}
                        {activity.type === "comment_added" && `New comment on "${activity.article}"`}
                      </p>
                      <p className="text-xs text-slate-500">{activity.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No recent activity found</p>
              )}
            </div>
          </CardContent>
        </Card>

        <EnvStatus />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>Your planned content and tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "Draft Review: AI Ethics", date: "Today, 2:00 PM", type: "review" },
              { title: "Publish: Space Exploration", date: "Tomorrow, 9:00 AM", type: "publish" },
              { title: "Team Meeting", date: "May 18, 11:00 AM", type: "meeting" },
              { title: "Content Planning", date: "May 20, 10:00 AM", type: "planning" },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="rounded-full p-2 bg-slate-100">
                  <Calendar className="h-4 w-4 text-teal-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
