"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Eye, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("draft")

  // Mock data - in a real app, you'd fetch this from your database
  useEffect(() => {
    const mockPost = {
      id: params.id,
      title: "Getting Started with Next.js 15",
      excerpt: "Learn the fundamentals of Next.js 15 and build your first application with the latest features.",
      content: `# Getting Started with Next.js 15

Next.js 15 introduces several exciting new features that make building React applications even more powerful and efficient.

## Key Features

1. **Improved Performance**: Enhanced server-side rendering and static generation
2. **Better Developer Experience**: Improved error messages and debugging tools
3. **New APIs**: Additional hooks and utilities for common use cases

## Installation

To get started with Next.js 15, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Your First Component

Create a simple component:

\`\`\`jsx
export default function Welcome() {
  return <h1>Welcome to Next.js 15!</h1>
}
\`\`\`

This is just the beginning of what you can build with Next.js 15!`,
      category: "tutorial",
      status: "published",
    }

    setTitle(mockPost.title)
    setExcerpt(mockPost.excerpt)
    setContent(mockPost.content)
    setCategory(mockPost.category)
    setStatus(mockPost.status)
  }, [params.id])

  const handleSave = () => {
    console.log("Saving post:", { title, excerpt, content, category, status })
    alert("Post saved successfully!")
  }

  const handlePublish = () => {
    console.log("Publishing post:", { title, excerpt, content, category, status: "published" })
    alert("Post published successfully!")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      console.log("Deleting post:", params.id)
      alert("Post deleted successfully!")
    }
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
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Post
              </Button>
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
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter post title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-lg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        placeholder="Brief description of your post..."
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your post content here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        className="font-mono"
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
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="opinion">Opinion</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="news">News</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button onClick={handleSave} variant="outline" className="w-full bg-transparent">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button onClick={handlePublish} className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        {status === "published" ? "Update" : "Publish"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Post Stats</CardTitle>
                    <CardDescription>Performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Views</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Likes</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Comments</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Shares</span>
                      <span className="font-medium">12</span>
                    </div>
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
