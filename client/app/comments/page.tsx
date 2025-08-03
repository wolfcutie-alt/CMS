"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MessageSquare, User, Clock, Check, X, Reply, Flag } from "lucide-react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const comments = [
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      content:
        "This is a great tutorial! Really helped me understand the concepts better. Looking forward to more content like this.",
      post: "Getting Started with Next.js 15",
      status: "approved",
      date: "2024-01-15 10:30",
      replies: 2,
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      content: "I'm having trouble with the installation step. Could you provide more details about the setup process?",
      post: "Building Modern Web Applications",
      status: "pending",
      date: "2024-01-14 15:45",
      replies: 0,
    },
    {
      id: 3,
      author: "Mike Johnson",
      email: "mike@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MJ",
      content: "Spam content here with irrelevant links and promotional material that should be moderated.",
      post: "The Future of Web Development",
      status: "spam",
      date: "2024-01-13 09:15",
      replies: 0,
    },
    {
      id: 4,
      author: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      content: "Excellent explanation of CSS Grid vs Flexbox. The examples really clarify when to use each approach.",
      post: "CSS Grid vs Flexbox: When to Use What",
      status: "approved",
      date: "2024-01-12 14:20",
      replies: 1,
    },
    {
      id: 5,
      author: "Alex Brown",
      email: "alex@example.com",
      avatar: "/placeholder.svg?height=40&width=40&text=AB",
      content: "This comment contains inappropriate language and should be reviewed by moderators before approval.",
      post: "React Server Components Explained",
      status: "flagged",
      date: "2024-01-11 11:30",
      replies: 0,
    },
  ]

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
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApprove = (commentId: number) => {
    console.log("Approving comment:", commentId)
  }

  const handleReject = (commentId: number) => {
    console.log("Rejecting comment:", commentId)
  }

  const handleReply = (commentId: number) => {
    console.log("Replying to comment:", commentId)
  }

  const handleFlag = (commentId: number) => {
    console.log("Flagging comment:", commentId)
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
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{comment.author}</h3>
                            <Badge className={getStatusColor(comment.status)}>{comment.status}</Badge>
                            {comment.replies > 0 && (
                              <Badge variant="outline">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {comment.replies} replies
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            {comment.date}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{comment.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <p>
                              On: <span className="font-medium">{comment.post}</span>
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
                              onClick={() => handleReply(comment.id)}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredComments.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No comments found matching your criteria.</p>
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
