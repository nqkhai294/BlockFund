"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Users, Calendar, ArrowRight } from "lucide-react"
import Container from "../Container"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  content: string
  date: string
}

interface Backer {
  id: string
  name: string
  avatar: string
  amount: number
  date: string
}

interface ProjectDetailProps {
  id: string
  image: string
  title: string
  content: string
  target: number
  raised: number
  backers: number
  daysLeft: number
  startDate: string
  endDate: string
  author: {
    id: string
    name: string
    avatar: string
    bio?: string
    projects?: number
  }
  category: string
  backersData: Backer[]
  comments: Comment[]
  slug: string
  description: string
  deadline: string
  goal: number
  address: string
  link: string
  createdAt: string
  donators: number
}

export function ProjectDetail({
  id,
  image,
  title,
  content,
  target,
  raised,
  backers,
  daysLeft,
  startDate,
  endDate,
  author,
  category,
  backersData,
  comments: initialComments,
}: ProjectDetailProps) {
  const [contribution, setContribution] = useState<string>("0.1")
  const [activeTab, setActiveTab] = useState<string>("about")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(initialComments || [])
  const [projectStats, setProjectStats] = useState({
    raised,
    backers
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Tính phần trăm tiến độ của dự án
  const progressPercentage = Math.min(100, (raised / target) * 100)

  // Xử lý khi người dùng đóng góp vào dự án
  const handleContribute = async () => {
    if (!contribution || parseFloat(contribution) <= 0) {
      setErrorMessage("Vui lòng nhập số tiền hợp lệ")
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage("")
      
      // TODO: Gửi transaction blockchain ở đây
      
      // Giả lập thành công đóng góp
      setTimeout(() => {
        // Cập nhật số liệu thống kê của dự án
        setProjectStats({
          raised: projectStats.raised + parseFloat(contribution),
          backers: projectStats.backers + 1
        })
        
        setSuccessMessage("Đóng góp thành công! Cảm ơn bạn đã ủng hộ dự án.")
        setContribution("0.1")
        setIsSubmitting(false)
      }, 1500)
    } catch (error) {
      console.error("Lỗi khi đóng góp:", error)
      setErrorMessage("Đã xảy ra lỗi khi đóng góp. Vui lòng thử lại.")
      setIsSubmitting(false)
    }
  }

  // Xử lý khi người dùng thêm bình luận
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setErrorMessage("Vui lòng nhập nội dung bình luận")
      return
    }

    try {
      setIsSubmitting(true)
      
      // Bình luận demo
      const commentData = {
        id: `comment-${Date.now()}`,
        user: {
          name: "Người dùng ẩn danh",
          avatar: `/placeholder.svg`,
        },
        content: newComment,
        date: new Date().toLocaleDateString("vi-VN")
      }
      
      // TODO: Gửi API để lưu bình luận thật sự
      
      setComments([commentData, ...comments])
      setNewComment("")
      setErrorMessage("")
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error)
      setErrorMessage("Đã xảy ra lỗi khi thêm bình luận. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container>
      <div className="mx-auto max-w-7xl text-white mt-20">
        {/* Hiển thị thông báo lỗi hoặc thành công */}
        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-500/20 p-4 text-red-300">
            {errorMessage}
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 rounded-md bg-green-500/20 p-4 text-green-300">
            {successMessage}
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cột trái - Thông tin dự án */}
          <div className="col-span-2 space-y-6">
            <div className="overflow-hidden rounded-xl">
              <div className="relative h-80 w-full">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold">{title}</h1>
                <span className="rounded-full bg-amber-400 px-4 py-1 text-sm font-medium text-black">
                  {category}
                </span>
              </div>
              
              {/* Tiến độ dự án */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{progressPercentage.toFixed(2)}% Hoàn thành</span>
                  <span>
                    {raised} / {target} ETH
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b border-gray-700">
                <div className="flex space-x-8">
                  <button
                    className={`border-b-2 px-4 py-2 font-medium ${
                      activeTab === "about"
                        ? "border-amber-400 text-amber-400"
                        : "border-transparent hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("about")}
                  >
                    Giới thiệu
                  </button>
                  <button
                    className={`border-b-2 px-4 py-2 font-medium ${
                      activeTab === "backers"
                        ? "border-amber-400 text-amber-400"
                        : "border-transparent hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("backers")}
                  >
                    Nhà đầu tư ({projectStats.backers})
                  </button>
                  <button
                    className={`border-b-2 px-4 py-2 font-medium ${
                      activeTab === "comments"
                        ? "border-amber-400 text-amber-400"
                        : "border-transparent hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab("comments")}
                  >
                    Bình luận ({comments.length})
                  </button>
                </div>
              </div>
              
              {/* Nội dung tab */}
              <div className="min-h-[400px]">
                {/* Tab Giới thiệu */}
                {activeTab === "about" && (
                  <div className="prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                  </div>
                )}
                
                {/* Tab Nhà đầu tư */}
                {activeTab === "backers" && (
                  <div className="space-y-6">
                    {backersData && backersData.length > 0 ? (
                      backersData.map((backer) => (
                        <div
                          key={backer.id}
                          className="flex items-center justify-between rounded-lg bg-gray-800 p-4"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={backer.avatar || "/placeholder.svg"}
                                alt={backer.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{backer.name}</h3>
                              <p className="text-xs text-gray-400">{backer.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-amber-400">{backer.amount} ETH</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-gray-700 p-8 text-center">
                        <p className="text-gray-400">Chưa có nhà đầu tư nào.</p>
                        <p className="mt-2 text-sm text-gray-500">Hãy là người đầu tiên ủng hộ dự án này!</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Tab Bình luận */}
                {activeTab === "comments" && (
                  <div className="space-y-6">
                    {/* Form bình luận */}
                    <div className="space-y-3 rounded-lg bg-gray-800 p-4">
                      <textarea
                        className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                        placeholder="Viết bình luận của bạn..."
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end">
                        <button
                          onClick={handleAddComment}
                          disabled={isSubmitting}
                          className="flex items-center space-x-2 rounded-md bg-amber-400 px-4 py-2 font-medium text-black hover:bg-amber-500 disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                              <span>Đang gửi...</span>
                            </>
                          ) : (
                            <span>Gửi bình luận</span>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Danh sách bình luận */}
                    {comments && comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="rounded-lg bg-gray-800 p-4">
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={comment.user.avatar || "/placeholder.svg"}
                                alt={comment.user.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{comment.user.name}</h3>
                              <p className="text-xs text-gray-400">{comment.date}</p>
                            </div>
                          </div>
                          <div className="mt-3 text-gray-300">{comment.content}</div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-lg border border-gray-700 p-8 text-center">
                        <p className="text-gray-400">Chưa có bình luận nào.</p>
                        <p className="mt-2 text-sm text-gray-500">Hãy là người đầu tiên bình luận!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Cột phải - Đóng góp và thông tin tác giả */}
          <div className="space-y-6">
            {/* Box đóng góp */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="text-xl font-bold">Đóng góp vào dự án</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Số lượng (ETH)</label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="number"
                      className="w-full rounded-md border border-gray-700 bg-gray-900 p-3 text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none"
                      placeholder="0.1"
                      step="0.01"
                      min="0.01"
                      value={contribution}
                      onChange={(e) => setContribution(e.target.value)}
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleContribute}
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center space-x-2 rounded-md bg-amber-400 py-3 font-medium text-black hover:bg-amber-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <span>Ủng hộ ngay</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-4">
                <div className="rounded-md bg-amber-400/10 p-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Dự án kết thúc trong:</span>
                    <span className="font-medium text-white">{daysLeft} ngày</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thống kê dự án */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="text-xl font-bold">Thống kê dự án</h2>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="flex justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="mt-1 font-medium">{projectStats.backers}</p>
                  <p className="text-xs text-gray-500">Nhà đầu tư</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="mt-1 font-medium">{daysLeft}</p>
                  <p className="text-xs text-gray-500">Ngày còn lại</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center">
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </div>
                  <p className="mt-1 font-medium">{endDate}</p>
                  <p className="text-xs text-gray-500">Kết thúc</p>
                </div>
              </div>
            </div>
            
            {/* Thông tin tác giả */}
            <div className="rounded-lg bg-gray-800 p-6">
              <h2 className="text-xl font-bold">Người tạo dự án</h2>
              <div className="mt-4 flex items-center space-x-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src={author.avatar || "/placeholder.svg"}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{author.name}</h3>
                  <p className="text-sm text-gray-400">{author.projects || 0} dự án</p>
                </div>
              </div>
              {author.bio && (
                <div className="mt-3 text-sm text-gray-300">
                  {author.bio}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
