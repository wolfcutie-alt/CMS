"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Eye, Users, FileText, MessageSquare, Calendar, Download } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnalytics } from "@/hooks/useAnalytic"
import { useMemo } from "react"

export default function AnalyticsPage() {
  const { analytics, loading, error } = useAnalytics()

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
      },
      {
        title: "Unique Visitors",
        value: uniqueVisitors.toLocaleString(),
        change: "—",
        trend: "up",
        icon: Users,
        bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
        textColor: "text-green-600",
      },
      {
        title: "Published Posts",
        value: publishedPosts.toLocaleString(),
        change: "—",
        trend: "up",
        icon: FileText,
        bgColor: "bg-gradient-to-r from-purple-500 to-violet-500",
        textColor: "text-purple-600",
      },
      {
        title: "Comments",
        value: comments.toLocaleString(),
        change: "—",
        trend: "up",
        icon: MessageSquare,
        bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
        textColor: "text-orange-600",
      },
    ] as const
  }, [analytics])

  const topPosts = useMemo(() => {
    const viewsByPost = new Map<number, number>()
    const commentsByPost = new Map<number, number>()

    analytics.forEach(a => {
      if (a.entityType === 'post') {
        if (a.type === 'view') {
          viewsByPost.set(a.entityId, (viewsByPost.get(a.entityId) || 0) + 1)
        }
        if (a.type === 'comment') {
          commentsByPost.set(a.entityId, (commentsByPost.get(a.entityId) || 0) + 1)
        }
      }
    })

    const items = Array.from(viewsByPost.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([postId, views]) => {
        const related = analytics.filter(a => a.entityType === 'post' && a.entityId === postId)
        const latest = related.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
        return {
          id: postId,
          title: `Post #${postId}`,
          views,
          comments: commentsByPost.get(postId) || 0,
          date: latest ? new Date(latest.created_at).toISOString().slice(0, 10) : "",
        }
      })

    return items
  }, [analytics])

  const trafficSources = useMemo(() => {
    // Prefer metadata.source if available; fallback to entityType distribution
    const groups = new Map<string, number>()
    analytics.forEach(a => {
      const source = (a.metadata && (a.metadata.source || a.metadata.referrer)) || a.entityType || 'Other'
      groups.set(source, (groups.get(source) || 0) + 1)
    })
    const total = Array.from(groups.values()).reduce((s, v) => s + v, 0) || 1
    return Array.from(groups.entries()).map(([source, visitors]) => ({
      source,
      visitors,
      percentage: Math.round((visitors / total) * 100),
    }))
  }, [analytics])

  const recentActivity = useMemo(() => {
    const describeAction = (t: string) => {
      if (t === 'comment') return 'New comment on'
      if (t === 'post') return 'Post activity:'
      if (t === 'view') return 'Viewed'
      if (t === 'share') return 'Shared'
      if (t === 'download') return 'Downloaded'
      if (t === 'login') return 'User login:'
      if (t === 'logout') return 'User logout:'
      return 'Activity on'
    }
    return [...analytics]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10)
      .map(a => ({
        id: a.id,
        action: describeAction(a.type),
        target: `${a.entityType} #${a.entityId}`,
        user: a.userId ? `User #${a.userId}` : 'Anonymous',
        time: new Date(a.created_at).toLocaleString(),
      }))
  }, [analytics])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-orange-50 via-white to-red-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
                <p className="text-gray-600">Track your content performance and user engagement</p>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="30days">
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="1year">Last year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg">
                  <div className={`absolute top-0 left-0 right-0 h-1 ${stat.bgColor}`}></div>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
                    <CardTitle className="text-sm font-medium text-slate-700">{stat.title}</CardTitle>
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-r ${stat.bgColor.replace("from-", "from-").replace("to-", "to-")} bg-opacity-10`}
                    >
                      <stat.icon className={`h-4 w-4 text-white`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                    <div className="flex items-center text-xs">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                      <span className="ml-1 text-slate-500">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Top Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Posts</CardTitle>
                  <CardDescription>Most viewed content this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPosts.map((post, index) => (
                      <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">#{index + 1}</Badge>
                            <h4 className="font-medium text-sm">{post.title}</h4>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {post.comments}
                            </span>
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{source.source}</span>
                            <span className="text-sm text-gray-500">{source.visitors.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${source.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions on your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="text-gray-600">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>by {activity.user}</span>
                          <span>•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
