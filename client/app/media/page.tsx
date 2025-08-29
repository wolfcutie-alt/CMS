"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Grid,
  List,
  ImageIcon,
  FileText,
  Video,
  Music,
} from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMedias } from "@/hooks/useMedia"

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const mediaFiles = [
    {
      id: 1,
      name: "hero-banner.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadDate: "2024-01-15",
      url: "/placeholder.svg?height=200&width=300&text=Hero+Banner",
    },
    {
      id: 2,
      name: "product-demo.mp4",
      type: "video",
      size: "15.2 MB",
      duration: "2:34",
      uploadDate: "2024-01-14",
      url: "/placeholder.svg?height=200&width=300&text=Video+Demo",
    },
    {
      id: 3,
      name: "user-guide.pdf",
      type: "document",
      size: "1.8 MB",
      pages: "24",
      uploadDate: "2024-01-13",
      url: "/placeholder.svg?height=200&width=300&text=PDF+Document",
    },
    {
      id: 4,
      name: "background-music.mp3",
      type: "audio",
      size: "4.1 MB",
      duration: "3:45",
      uploadDate: "2024-01-12",
      url: "/placeholder.svg?height=200&width=300&text=Audio+File",
    },
    {
      id: 5,
      name: "logo-variants.zip",
      type: "archive",
      size: "892 KB",
      files: "12",
      uploadDate: "2024-01-11",
      url: "/placeholder.svg?height=200&width=300&text=Archive+File",
    },
    {
      id: 6,
      name: "team-photo.jpg",
      type: "image",
      size: "3.1 MB",
      dimensions: "2400x1600",
      uploadDate: "2024-01-10",
      url: "/placeholder.svg?height=200&width=300&text=Team+Photo",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      case "audio":
        return <Music className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
      case "video":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200"
      case "audio":
        return "bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-200"
      case "document":
        return "bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200"
    }
  }

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || file.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                <p className="text-gray-600">Manage your images, videos, and documents</p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>

            {/* Filters and View Toggle */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="image">Images</SelectItem>
                        <SelectItem value="video">Videos</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="document">Documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFiles.map((file) => (
                  <Card key={file.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <h3 className="font-medium truncate">{file.name}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
                          <span className="text-sm text-gray-500">{file.size}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {file.dimensions && <span>{file.dimensions} • </span>}
                          {file.duration && <span>{file.duration} • </span>}
                          {file.pages && <span>{file.pages} pages • </span>}
                          {file.files && <span>{file.files} files • </span>}
                          <span>{file.uploadDate}</span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFiles.map((file) => (
                  <Card key={file.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getFileIcon(file.type)}
                              <h3 className="font-medium">{file.name}</h3>
                              <Badge className={getFileTypeColor(file.type)}>{file.type}</Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                              {file.size} • {file.uploadDate}
                              {file.dimensions && ` • ${file.dimensions}`}
                              {file.duration && ` • ${file.duration}`}
                              {file.pages && ` • ${file.pages} pages`}
                              {file.files && ` • ${file.files} files`}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredFiles.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No files found matching your criteria.</p>
                    <Button className="mt-4">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Your First File
                    </Button>
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
