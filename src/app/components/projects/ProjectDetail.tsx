"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Clock, Users, Calendar, ArrowRight } from "lucide-react"
import Container from "../Container"
import { useCrowdfunding } from "@/app/hooks/useCrowdfunding"
import { ethers } from "ethers"
import { daysLeft, calculateBarPercentage } from '@/app/utils'
import { useRouter } from 'next/navigation'
import { InvestorsSection } from './InvestorsSection'

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
  target: string
  amountCollected: string
  deadline: number
  owner: string
  donators: string[]
  donations: string[]
}

const ProjectDetail = ({
  id,
  image,
  title,
  content,
  target,
  amountCollected,
  deadline,
  owner,
  donators: initialDonators,
  donations: initialDonations,
}: ProjectDetailProps) => {
  const [contribution, setContribution] = useState<string>('0.1')
  const [activeTab, setActiveTab] = useState<string>("about")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [donators, setDonators] = useState<string[]>(initialDonators)
  const [donations, setDonations] = useState<string[]>(initialDonations)
  const router = useRouter()
  const { donateToCampaign, isDonating, getDonators } = useCrowdfunding()

  const remainingDays = daysLeft(deadline)
  const percentage = calculateBarPercentage(target, amountCollected)

  // Cập nhật danh sách nhà đầu tư khi có thay đổi
  useEffect(() => {
    const fetchDonators = async () => {
      try {
        const result = await getDonators(id)
        if (result) {
          setDonators(result.donators)
          setDonations(result.donations)
        }
      } catch (error) {
        console.error('Error fetching donators:', error)
      }
    }

    fetchDonators()
  }, [id, getDonators])

  const handleContribute = async () => {
    if (!contribution || parseFloat(contribution) <= 0) {
      setErrorMessage('Vui lòng nhập số tiền hợp lệ')
      return
    }

    try {
      setIsSubmitting(true)
      setErrorMessage('')
      
      const tx = await donateToCampaign(parseInt(id), contribution)
      
      if (tx) {
        setSuccessMessage('Đóng góp thành công! Cảm ơn bạn đã ủng hộ dự án.')
        setContribution('0.1')
        
        // Cập nhật lại danh sách nhà đầu tư sau khi đóng góp thành công
        const result = await getDonators(id)
        if (result) {
          setDonators(result.donators)
          setDonations(result.donations)
        }
      }
    } catch (error) {
      console.error('Lỗi khi đóng góp:', error)
      setErrorMessage('Đã xảy ra lỗi khi đóng góp. Vui lòng thử lại.')
    } finally {
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
                  {owner.slice(0, 6)}...{owner.slice(-4)}
                </span>
              </div>
              
              {/* Tiến độ dự án */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{percentage}% Hoàn thành</span>
                  <span>
                    {amountCollected} / {target} ETH
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${percentage}%` }}
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
                    Nhà đầu tư ({donators.length})
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
                  <InvestorsSection
                    donators={donators}
                    donations={donations}
                    amountCollected={amountCollected}
                  />
                )}
                
                {/* Tab Bình luận */}
                {activeTab === "comments" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Viết bình luận của bạn..."
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                        rows={4}
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={isSubmitting}
                        className="rounded-lg bg-amber-400 px-6 py-2 text-sm font-medium text-black hover:bg-amber-500 disabled:opacity-50"
                      >
                        {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment.id} className="rounded-lg bg-gray-800 p-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={comment.user.avatar}
                                alt={comment.user.name}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div>
                              <p className="font-medium">{comment.user.name}</p>
                              <p className="text-sm text-gray-400">{comment.date}</p>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-300">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Cột phải - Thông tin đóng góp */}
          <div className="space-y-6">
            <div className="rounded-xl bg-gray-800 p-6">
              <h2 className="text-xl font-bold">Đóng góp cho dự án</h2>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mục tiêu</span>
                  <span className="font-medium">{target} ETH</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Đã gọi được</span>
                  <span className="font-medium">{amountCollected} ETH</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Số người ủng hộ</span>
                  <span className="font-medium">{donators.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Thời gian còn lại</span>
                  <span className="font-medium">{remainingDays} ngày</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                    Số ETH muốn đóng góp
                  </label>
                  <input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                
                <button
                  onClick={handleContribute}
                  disabled={isSubmitting || isDonating || remainingDays <= 0}
                  className="w-full rounded-lg bg-amber-400 px-6 py-3 text-sm font-medium text-black hover:bg-amber-500 "
                >
                  {isSubmitting || isDonating ? "Đang xử lý..." : "Đóng góp ngay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProjectDetail
