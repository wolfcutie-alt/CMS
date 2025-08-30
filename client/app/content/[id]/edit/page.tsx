"use client"

import { useState, useEffect, useMemo } from "react"
import { use } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Eye, ArrowLeft, Trash2, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePosts } from "@/hooks/usePost"
import { useCategories } from "@/hooks/useCategory"
import { useToast } from "@/hooks/use-toast"
import { Post } from "@/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function EditPostContent({ postId }: { postId: number }) {
  const router = useRouter()
  const { updatePost, deletePost, getPost } = usePosts()
  const { categories, loading: categoriesLoading } = useCategories()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "none",
    status: "draft" as Post['status'],
    featuredImage: ""
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [post, setPost] = useState<Post | null>(null)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }

    // Auto-generate slug from title
    if (field === 'title') {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    if (formData.categoryId && formData.categoryId !== "none" && !categories.find(cat => cat.id.toString() === formData.categoryId)) {
      newErrors.categoryId = "Invalid category selected"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async (publish: boolean = false) => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const postData = {
        ...formData,
        status: publish ? "published" : formData.status,
        categoryId: formData.categoryId && formData.categoryId !== "none" ? parseInt(formData.categoryId) : null,
        publishedAt: publish ? new Date().toISOString() : post?.publishedAt,
      }

      await updatePost(postId, postData)
      
      toast({
        title: "Success",
        description: publish ? "Post published successfully!" : "Post updated successfully!",
      })

      router.push("/content")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = () => handleSave(true)

  const handleDelete = async () => {
    try {
      await deletePost(postId)
      toast({
        title: "Success",
        description: "Post deleted successfully",
      })
      router.push("/content")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      })
    }
  }

  // Fetch post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      try {
        const postData = await getPost(postId)
        setPost(postData)
        setFormData({
          title: postData.title,
          slug: postData.slug,
          excerpt: postData.excerpt || "",
          content: postData.content,
          categoryId: postData.categoryId?.toString() || "none",
          status: postData.status,
          featuredImage: postData.featuredImage || ""
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        })
        router.push("/content")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId, getPost, router, toast])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Loading post...</p>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Link href="/content">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Content
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
                  <p className="text-gray-600">Update your content</p>
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Post
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the post "{post?.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Post Content</CardTitle>
                    <CardDescription>Edit your post content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title..."
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className={`text-lg ${errors.title ? 'border-red-500' : ''}`}
                      />
                      {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                      <Label htmlFor="slug">Slug *</Label>
                      <Input
                        id="slug"
                        placeholder="post-url-slug"
                        value={formData.slug}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        className={errors.slug ? 'border-red-500' : ''}
                      />
                      {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Brief description of your post..."
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your post content here..."
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        rows={15}
                        className={`font-mono ${errors.content ? 'border-red-500' : ''}`}
                      />
                      {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>
                    <div>
                      <Label htmlFor="featuredImage">Featured Image URL</Label>
                      <Input
                        id="featuredImage"
                        placeholder="https://example.com/image.jpg"
                        value={formData.featuredImage}
                        onChange={(e) => handleInputChange('featuredImage', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publish</CardTitle>
                    <CardDescription>Manage your post settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.categoryId} 
                        onValueChange={(value) => handleInputChange('categoryId', value)}
                        disabled={categoriesLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={categoriesLoading ? "Loading..." : "Select category"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No Category</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => handleSave(false)} 
                        variant="outline" 
                        className="w-full bg-transparent"
                        disabled={saving}
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4 mr-2" />
                        )}
                        Save Changes
                      </Button>
                      <Button 
                        onClick={handlePublish} 
                        className="w-full"
                        disabled={saving}
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Eye className="w-4 h-4 mr-2" />
                        )}
                        {formData.status === "published" ? "Update" : "Publish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {post && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Post Stats</CardTitle>
                      <CardDescription>Performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Views</span>
                        <span className="font-medium">{post.views}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Likes</span>
                        <span className="font-medium">{post.likes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Shares</span>
                        <span className="font-medium">{post.shares}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Created</span>
                        <span className="font-medium">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Updated</span>
                        <span className="font-medium">{new Date(post.updated_at).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const postId = parseInt(resolvedParams.id)
  
  return <EditPostContent postId={postId} />
}
