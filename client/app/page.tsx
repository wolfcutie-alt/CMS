"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Eye, TrendingUp, MessageSquare} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { useAnalytics } from "@/hooks/useAnalytic"
import { usePosts } from "@/hooks/usePost"
import { useMemo } from "react"

export default function Dashboard() {
  const { analytics, loading, error } = useAnalytics()
  const { posts, loading: postsLoading } = usePosts()

  const stats = useMemo(() => {
    const totalViews = analytics.filter(a => a.type === 'view').length
    const uniqueVisitors = new Set(analytics.map(a => (a.userId ?? a.ipAddress) || `${a.ipAddress}`)).size
    const publishedPosts = analytics.filter(a => a.type === 'post').length
    const comments = analytics.filter(a => a.type === 'comment').length

    return [
      {
        title: "Total Views",
        value: totalViews.toLocaleString(),
        change: "—",
        trend: "up",
        icon: Eye,
        bgColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
        textColor: "text-blue-600",
        description: "Total page views",
        color: "bg-blue-500",
      },
      {
        title: "Unique Visitors",
        value: uniqueVisitors.toLocaleString(),
        change: "—",
        trend: "up",
        icon: Users,
        bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
        textColor: "text-green-600",
        description: "Unique visitors",
        color: "bg-green-500",
      },
      {
        title: "Published Posts",
        value: publishedPosts.toLocaleString(),
        change: "—",
        trend: "up",
        icon: FileText,
        bgColor: "bg-gradient-to-r from-purple-500 to-violet-500",
        textColor: "text-purple-600",
        description: "Published posts",
        color: "bg-purple-500",
      },
      {
        title: "Comments",
        value: comments.toLocaleString(),
        change: "—",
        trend: "up",
        icon: MessageSquare,
        bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
        textColor: "text-orange-600",
        description: "Total comments",
        color: "bg-orange-500",
      },
    ] as const
  }, [analytics])

  const recentPosts = useMemo(() => {
    const items = posts.map(p => {
      const publishedOrCreated = p.publishedAt || p.created_at
      const sortDate = new Date(publishedOrCreated).getTime()
      return {
        id: p.id,
        title: p.title,
        status: p.status === 'published' ? 'Published' : p.status === 'draft' ? 'Draft' : 'Archived',
        date: new Date(publishedOrCreated).toISOString().slice(0, 10),
        views: p.views ?? 0,
        sortDate,
      }
    })
    return items.sort((a, b) => b.sortDate - a.sortDate).slice(0, 5).map(({ sortDate, ...rest }) => rest)
  }, [posts])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
              </div>
              <Link href="/content/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className={`text-xs ${stat.textColor}`}>{stat.description}</p>
                  </CardContent>
                  <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color}`}></div>
                </Card>
              ))}
            </div>

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>Your latest content updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{post.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              post.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                          <span>{post.date}</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/content/${post.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/content">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Posts
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
