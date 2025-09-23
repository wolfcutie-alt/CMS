"use client"

import { useState, useEffect } from "react"
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
  Edit,
  Loader2,
} from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMedias } from "@/hooks/useMedia"
import { MediaModal } from "@/components/media-modal"
import { DeleteConfirmation } from "@/components/delete-confirmation"
import { Media } from "@/types"
import { formatDate, formatFileSize } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
  const [mediaToDelete, setMediaToDelete] = useState<Media | null>(null)

  const { medias, loading, error, createMedia, updateMedia, deleteMedia } = useMedias()
  const { toast } = useToast()

  // Debug thumbnails in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && medias.length > 0) {
      console.log('Media data:', medias.map(m => ({
        id: m.id,
        name: m.name,
        type: m.type,
        url: m.url,
        thumbnailUrl: m.thumbnailUrl
      })))
    }
  }, [medias])

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

  const filteredMedias = medias.filter((media) => {
    const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (media.alt && media.alt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (media.caption && media.caption.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === "all" || media.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleCreateMedia = async (data: FormData) => {
    try {
      await createMedia(data)
      toast({
        title: "Success",
        description: "Media uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload media",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleUpdateMedia = async (data: FormData) => {
    if (!selectedMedia) return
    
    try {
      // Convert FormData to JSON for update
      const updateData: Partial<Media> = {
        name: data.get('name') as string,
        alt: data.get('alt') as string,
        caption: data.get('caption') as string,
        type: data.get('type') as string,
      }
      
      await updateMedia(selectedMedia.id, updateData)
      toast({
        title: "Success",
        description: "Media updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update media",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleDeleteMedia = async () => {
    if (!mediaToDelete) return
    
    try {
      console.log('Attempting to delete media:', mediaToDelete.id)
      const result = await deleteMedia(mediaToDelete.id)
      console.log('Delete result:', result)
      toast({
        title: "Success",
        description: "Media deleted successfully",
      })
      // Close modal and clear state after successful deletion
      setIsDeleteModalOpen(false)
      setMediaToDelete(null)
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete media",
        variant: "destructive",
      })
      throw error
    }
  }

  const openCreateModal = () => {
    setSelectedMedia(null)
    setIsModalOpen(true)
  }

  const openEditModal = (media: Media) => {
    setSelectedMedia(media)
    setIsModalOpen(true)
  }

  const openDeleteModal = (media: Media) => {
    setMediaToDelete(media)
    setIsDeleteModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMedia(null)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setMediaToDelete(null)
  }

  const handleDownload = (media: Media) => {
    try {
      // Create a temporary link to download the file
      const link = document.createElement('a')
      
      // Ensure the URL is absolute
      const url = media.url.startsWith('http') ? media.url : `${window.location.origin}${media.url}`
      
      link.href = url
      link.download = media.name
      link.target = '_blank'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      toast({
        title: "Download Error",
        description: "Failed to download file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleView = (media: Media) => {
    try {
      // Extract filename from the stored URL
      let filename = ''
      if (media.url.includes('/storage/media/')) {
        filename = media.url.split('/storage/media/')[1]
      } else if (media.url.includes('storage/media/')) {
        filename = media.url.split('storage/media/')[1]
      } else if (media.url.includes('/uploads/')) {
        filename = media.url.split('/uploads/')[1]
      } else if (media.url.includes('uploads/')) {
        filename = media.url.split('uploads/')[1]
      } else if (media.url.includes('/media/')) {
        filename = media.url.split('/media/')[1]
      } else {
        // Fallback to original URL
        const url = media.url.startsWith('http') ? media.url : `${window.location.origin}${media.url}`
        window.open(url, '_blank')
        return
      }
      
      // Use the new media serving route
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      // Remove trailing /api if it exists to avoid double /api/
      const baseUrl = apiUrl.replace(/\/api\/?$/, '')
      const viewUrl = `${baseUrl}/api/media-file/${filename}`
      window.open(viewUrl, '_blank')
    } catch (error) {
      toast({
        title: "View Error",
        description: "Failed to open file. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center py-8">
                <p className="text-red-500">Error loading media: {error.message}</p>
                <Button onClick={() => window.location.reload()} className="mt-4">
                  Retry
                </Button>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                <p className="text-gray-600">Manage your images, videos, and documents</p>
              </div>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                onClick={openCreateModal}
              >
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
                        <SelectItem value="archive">Archives</SelectItem>
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

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
                <span className="ml-2 text-gray-600">Loading media...</span>
              </div>
            )}

            {/* Media Grid/List */}
            {!loading && viewMode === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedias.map((media) => (
                  <Card key={media.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        {media.type === "image" ? (
                          <div>
                            <img
                              src={media.thumbnailUrl ? `http://localhost:8000${media.thumbnailUrl}` : `http://localhost:8000${media.url}` || "/placeholder.svg"}
                              alt={media.alt || media.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg"
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            {getFileIcon(media.type)}
                            <span className="ml-2 text-sm text-gray-600">{media.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getFileIcon(media.type)}
                          <h3 className="font-medium truncate">{media.name}</h3>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge className={getFileTypeColor(media.type)}>{media.type}</Badge>
                          <span className="text-sm text-gray-500">{formatFileSize(media.size)}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(media.uploadedAt)}
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 bg-transparent"
                            onClick={() => handleView(media)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(media)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditModal(media)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDeleteModal(media)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && viewMode === "list" && (
              <div className="space-y-4">
                {filteredMedias.map((media) => (
                  <Card key={media.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {media.type === "image" ? (
                              <img
                                src={media.thumbnailUrl ? `http://localhost:8000${media.thumbnailUrl}` : `http://localhost:8000${media.url}` || "/placeholder.svg"}
                                alt={media.alt || media.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg"
                                }}
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                {getFileIcon(media.type)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getFileIcon(media.type)}
                              <h3 className="font-medium">{media.name}</h3>
                              <Badge className={getFileTypeColor(media.type)}>{media.type}</Badge>
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatFileSize(media.size)} • {formatDate(media.uploadedAt)}
                              {media.alt && ` • ${media.alt}`}
                            </div>
                            {media.caption && (
                              <div className="text-sm text-gray-600 mt-1">
                                {media.caption}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleView(media)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(media)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditModal(media)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openDeleteModal(media)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredMedias.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {searchTerm || typeFilter !== "all" 
                        ? "No files found matching your criteria." 
                        : "No media files uploaded yet."}
                    </p>
                    <Button className="mt-4" onClick={openCreateModal}>
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

      {/* Modals */}
      <MediaModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={selectedMedia ? handleUpdateMedia : handleCreateMedia}
        media={selectedMedia}
        isEdit={!!selectedMedia}
      />

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteMedia}
        title="Delete Media"
        description="Are you sure you want to delete this media file? This action cannot be undone."
        itemName={mediaToDelete?.name}
      />
    </div>
  )
}
