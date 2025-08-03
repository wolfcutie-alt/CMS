import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function Dashboard() {
  const stats = [
    {
      title: "Total Posts",
      value: "24",
      description: "+2 from last month",
      icon: FileText,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Views",
      value: "12,543",
      description: "+15% from last month",
      icon: Eye,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Active Users",
      value: "573",
      description: "+8% from last month",
      icon: Users,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Engagement",
      value: "89%",
      description: "+3% from last month",
      icon: TrendingUp,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ]

  const recentPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      status: "Published",
      date: "2024-01-15",
      views: 1234,
    },
    {
      id: 2,
      title: "Building Modern Web Applications",
      status: "Draft",
      date: "2024-01-14",
      views: 0,
    },
    {
      id: 3,
      title: "The Future of Web Development",
      status: "Published",
      date: "2024-01-13",
      views: 856,
    },
  ]

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
