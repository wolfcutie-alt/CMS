"use client"

import { useState, useEffect } from "react"
import { use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Eye, Calendar, User, Tag, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { usePosts } from "@/hooks/usePost"
import { useCategories } from "@/hooks/useCategory"
import { useToast } from "@/hooks/use-toast"
import { Post } from "@/types"

function ViewPostContent({ postId }: { postId: number }) {
  const { getPost } = usePosts()
  const { categories } = useCategories()
  const { toast } = useToast()

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const postData = await getPost(postId)
        setPost(postData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId, getPost, toast])

  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Uncategorized"
    const category = categories.find(cat => cat.id === categoryId)
    return category?.name || "Unknown Category"
  }

  const getStatusColor = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'archived':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading post...</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">Post not found</p>
                <Link href="/content">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Content
                  </Button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Link href="/content">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Content
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">View Post</h1>
                  <p className="text-gray-600">Post details and content</p>
                </div>
              </div>
              <Link href={`/content/${post.id}/edit`}>
                <Button>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Post
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                        {getCategoryName(post.categoryId)}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    {post.excerpt && (
                      <CardDescription className="text-lg">
                        {post.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {post.featuredImage && (
                      <div className="mb-6">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="prose max-w-none">
                      <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-4 rounded-lg">
                        {post.content}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Information</CardTitle>
                    <CardDescription>Details about this post</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Author ID:</span>
                      <span className="font-medium">{post.authorId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="font-medium">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Updated:</span>
                      <span className="font-medium">
                        {new Date(post.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    {post.publishedAt && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Published:</span>
                        <span className="font-medium">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Slug:</span>
                      <span className="font-medium font-mono text-xs">{post.slug}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Views</span>
                      </div>
                      <span className="font-medium">{post.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Likes</span>
                      </div>
                      <span className="font-medium">{post.likes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Shares</span>
                      </div>
                      <span className="font-medium">{post.shares}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Manage this post</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href={`/content/${post.id}/edit`} className="w-full">
                      <Button variant="outline" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Post
                      </Button>
                    </Link>
                    <Link href="/content" className="w-full">
                      <Button variant="outline" className="w-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to List
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// ✅ params is not a Promise, just an object
export default function ViewPostPage({ params }: { params: { id: string } }) {
  const postId = parseInt(params.id, 10)
  return <ViewPostContent postId={postId} />
}