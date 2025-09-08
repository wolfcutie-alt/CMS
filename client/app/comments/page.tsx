"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MessageSquare, User, Clock, Check, X, Reply, Flag, Trash2, AlertCircle } from "lucide-react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useComments } from "@/hooks/useComment"
import { DeleteConfirmation } from "@/components/delete-confirmation"
import { ReplyModal } from "@/components/reply-modal"
import { useToast } from "@/hooks/use-toast"
import type { Comment } from "@/types"

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [replyModalOpen, setReplyModalOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const { toast } = useToast()

  const { 
    comments, 
    loading, 
    error, 
    pagination,
    refetch,
    approveComment, 
    rejectComment, 
    flagComment, 
    deleteComment, 
    replyToComment 
  } = useComments(currentPage, 10)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200"
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200"
      case "spam":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200"
      case "flagged":
        return "bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200"
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200"
    }
  }

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      (comment.content || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comment.author || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (comment.post?.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = async (commentId: number) => {
    try {
      await approveComment(commentId)
      toast({
        title: "Comment approved",
        description: "The comment has been approved successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReject = async (commentId: number) => {
    try {
      await rejectComment(commentId)
      toast({
        title: "Comment rejected",
        description: "The comment has been marked as spam.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReply = (comment: Comment) => {
    setSelectedComment(comment)
    setReplyModalOpen(true)
  }

  const handleReplySubmit = async (data: { author: string; email: string; content: string }) => {
    if (!selectedComment) return
    
    try {
      await replyToComment(selectedComment.id, {
        ...data,
        postId: selectedComment.postId,
        status: 'pending',
        ipAddress: null,
        userAgent: null,
      })
      toast({
        title: "Reply sent",
        description: "Your reply has been submitted for moderation.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFlag = async (commentId: number) => {
    try {
      await flagComment(commentId)
      toast({
        title: "Comment flagged",
        description: "The comment has been flagged for review.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to flag comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = (comment: Comment) => {
    setSelectedComment(comment)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedComment) return
    
    try {
      await deleteComment(selectedComment.id)
      toast({
        title: "Comment deleted",
        description: "The comment has been permanently deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getInitials = (name?: string) => {
    const safe = (name || '').trim()
    if (!safe) return '?'
    return safe
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-pink-50 via-white to-rose-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Comments</h1>
                <p className="text-gray-600">Moderate and manage user comments</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="secondary">{comments.filter((c) => c.status === "pending").length} Pending</Badge>
                <Badge variant="secondary">{comments.filter((c) => c.status === "flagged").length} Flagged</Badge>
              </div>
            </div>

            {error && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p>Error loading comments: {error.message}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search comments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="spam">Spam</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Comments List */}
            {loading ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading comments...</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredComments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(comment.author)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{comment.author}</h3>
                              <Badge className={getStatusColor(comment.status)}>{comment.status}</Badge>
                              {comment.replies_count && comment.replies_count > 0 && (
                                <Badge variant="outline">
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  {comment.replies_count} replies
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              {formatDate(comment.created_at)}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{comment.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              <p>
                                On: <span className="font-medium">{comment.post?.title || `Post #${comment.postId}`}</span>
                              </p>
                              <p>Email: {comment.email}</p>
                            </div>
                            <div className="flex gap-2">
                              {comment.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleApprove(comment.id)}
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                                  >
                                    <Check className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleReject(comment.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                                  >
                                    <X className="w-4 h-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleReply(comment)}
                                className="hover:bg-blue-50 hover:text-blue-600 border-blue-200"
                              >
                                <Reply className="w-4 h-4 mr-1" />
                                Reply
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleFlag(comment.id)}
                                className="hover:bg-orange-50 hover:text-orange-600 border-orange-200"
                              >
                                <Flag className="w-4 h-4 mr-1" />
                                Flag
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(comment)}
                                className="hover:bg-red-50 hover:text-red-600 border-red-200"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!loading && filteredComments.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No comments found matching your criteria.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (pagination.currentPage > 1) {
                            setCurrentPage(pagination.currentPage - 1)
                          }
                        }}
                        className={pagination.currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, pagination.currentPage - 2) + i
                      if (pageNum > pagination.totalPages) return null
                      
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(pageNum)
                            }}
                            isActive={pageNum === pagination.currentPage}
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (pagination.currentPage < pagination.totalPages) {
                            setCurrentPage(pagination.currentPage + 1)
                          }
                        }}
                        className={pagination.currentPage >= pagination.totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  Showing {((pagination.currentPage - 1) * pagination.perPage) + 1} to {Math.min(pagination.currentPage * pagination.perPage, pagination.totalItems)} of {pagination.totalItems} comments
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        itemName={selectedComment?.content.substring(0, 50) + "..."}
      />

      <ReplyModal
        isOpen={replyModalOpen}
        onClose={() => setReplyModalOpen(false)}
        onReply={handleReplySubmit}
        parentComment={selectedComment ? {
          author: selectedComment.author,
          content: selectedComment.content
        } : undefined}
      />
    </div>
  )
}
