"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Tag, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3b82f6",
  })

  const categories = [
    {
      id: 1,
      name: "Tutorial",
      slug: "tutorial",
      description: "Step-by-step guides and tutorials",
      color: "#3b82f6",
      postCount: 12,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Guide",
      slug: "guide",
      description: "Comprehensive guides and documentation",
      color: "#10b981",
      postCount: 8,
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Opinion",
      slug: "opinion",
      description: "Editorial content and opinions",
      color: "#f59e0b",
      postCount: 5,
      createdAt: "2024-01-13",
    },
    {
      id: 4,
      name: "Technical",
      slug: "technical",
      description: "Technical deep-dives and analysis",
      color: "#8b5cf6",
      postCount: 15,
      createdAt: "2024-01-12",
    },
    {
      id: 5,
      name: "News",
      slug: "news",
      description: "Latest news and updates",
      color: "#ef4444",
      postCount: 3,
      createdAt: "2024-01-11",
    },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving category:", formData)
    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData({ name: "", slug: "", description: "", color: "#3b82f6" })
  }

  const handleEdit = (category: any) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (categoryId: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      console.log("Deleting category:", categoryId)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
                <p className="text-gray-600">Organize your content with categories</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg"
                    onClick={() => setFormData({ name: "", slug: "", description: "", color: "#3b82f6" })}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Category" : "Create New Category"}</DialogTitle>
                    <DialogDescription>
                      {editingCategory
                        ? "Update the category details."
                        : "Add a new category to organize your content."}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Category name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="category-slug"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Category description"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <div className="flex gap-2">
                        <Input
                          id="color"
                          type="color"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          placeholder="#3b82f6"
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingCategory ? "Update Category" : "Create Category"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
                >
                  <div
                    className="h-2 bg-gradient-to-r"
                    style={{
                      background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                    }}
                  ></div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 rounded-full shadow-md border-2 border-white"
                          style={{ backgroundColor: category.color }}
                        />
                        <CardTitle className="text-lg text-slate-800">{category.name}</CardTitle>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200"
                      >
                        <FileText className="w-3 h-3 mr-1" />
                        {category.postCount}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-600">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-slate-500">
                        <p className="font-medium">
                          Slug: <span className="text-slate-700">/{category.slug}</span>
                        </p>
                        <p>Created: {category.createdAt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                          className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCategories.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No categories found matching your search.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
