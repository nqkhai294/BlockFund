"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Clock, Users, Calendar, ArrowRight, Rocket } from "lucide-react"
import Container from "../Container"
import { useCrowdfunding } from "@/app/hooks/useCrowdfunding"
import { ethers, BigNumber } from "ethers"
import { daysLeft, calculateBarPercentage } from '@/app/utils'
import { useRouter } from 'next/navigation'
import { InvestorsSection } from './InvestorsSection'
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react"
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { toast } from 'react-hot-toast'

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
  const address = useAddress()
  const { donateToCampaign, isDonating, getDonators } = useCrowdfunding()
  const [isRequestingFunds, setIsRequestingFunds] = useState(false)
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [requestReason, setRequestReason] = useState("")
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isClaiming, setIsClaiming] = useState(false)
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false)
  const [campaignData, setCampaignData] = useState<any>(null)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: campaignStatus } = useContractRead(contract, "checkCampaignStatus", [id])
  const { data: donatorProfit } = useContractRead(
    contract, 
    "getDonatorProfitInfo", 
    [id, address || "0x0"]
  )
  const { data: profitInfo } = useContractRead(contract, "getCampaignProfitInfo", [id])

  const remainingDays = daysLeft(Number(deadline))
  const percentage = calculateBarPercentage(
    ethers.utils.parseEther(target.toString()),
    ethers.utils.parseEther(amountCollected.toString())
  )

  const canWithdraw = campaignStatus?.isCompleted && owner === address
  const canClaim = donatorProfit && Number(donatorProfit.profitShare) > 0 && 
    (Number(donatorProfit.lastClaim) + Number(profitInfo?.profitDistributionPeriod || 0) <= Date.now()/1000)

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

  const handleRequestFastFunding = async () => {
    if (!requestReason.trim()) {
      toast.error("Vui lòng nhập lý do cần huy động vốn nhanh")
      return
    }

    try {
      setIsRequestingFunds(true)
      // TODO: Thêm hàm requestFastFunding vào contract
      // await contract.call("requestFastFunding", [id, requestReason])
      toast.success("Đã gửi yêu cầu huy động vốn nhanh!")
      setShowRequestDialog(false)
      setRequestReason("")
    } catch (error) {
      console.error("Lỗi khi yêu cầu huy động vốn nhanh:", error)
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại.")
    } finally {
      setIsRequestingFunds(false)
    }
  }

  const handleClaimProfit = async () => {
    if (!canClaim || !contract) return

    try {
      setIsClaiming(true)
      const tx = await contract.call("claimProfit", [id])
      await tx.wait()
      toast.success("Đã nhận lợi nhuận thành công!")
    } catch (error) {
      console.error("Lỗi khi nhận lợi nhuận:", error)
      toast.error("Không thể nhận lợi nhuận. Vui lòng thử lại sau.")
    } finally {
      setIsClaiming(false)
    }
  }

  const handleWithdraw = async () => {
    if (!canWithdraw || !withdrawAmount || !contract) return

    try {
      setIsWithdrawing(true)
      const amountInWei = ethers.utils.parseEther(withdrawAmount)
      const tx = await contract.call("withdrawCampaignFunds", [id])
      await tx.wait()
      toast.success("Rút tiền thành công!")
      setShowWithdrawDialog(false)
      setWithdrawAmount("")
    } catch (error) {
      console.error("Lỗi khi rút tiền:", error)
      toast.error("Không thể rút tiền. Vui lòng thử lại sau.")
    } finally {
      setIsWithdrawing(false)
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
              
              {/* Thêm nút huy động vốn nhanh cho chủ dự án */}
              {owner === address && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowRequestDialog(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    Yêu cầu huy động vốn nhanh
                  </Button>
                </div>
              )}

              {/* Thêm nút rút tiền cho chủ dự án */}
              {address && owner === address && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowWithdrawDialog(true)}
                    className="bg-green-500 hover:bg-green-600 text-black"
                  >
                    Rút tiền từ dự án
                  </Button>
                </div>
              )}

              {/* Dialog huy động vốn nhanh */}
              <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yêu cầu huy động vốn nhanh</DialogTitle>
                    <DialogDescription>
                      Giải thích lý do bạn cần huy động vốn nhanh cho dự án này
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      placeholder="Nhập lý do cần huy động vốn nhanh..."
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                      rows={4}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleRequestFastFunding}
                      disabled={isRequestingFunds}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                    >
                      {isRequestingFunds ? "Đang gửi..." : "Gửi yêu cầu"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog rút tiền */}
              <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rút tiền từ dự án</DialogTitle>
                    <DialogDescription>
                      Nhập số tiền bạn muốn rút. Lưu ý đảm bảo đủ tiền trả lãi cho nhà đầu tư.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Số ETH muốn rút</label>
                      <input
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        placeholder="0.0"
                        step="0.01"
                        min="0"
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Số dư khả dụng: {ethers.utils.formatEther(campaignData?.amountCollected?.toString() || '0')} ETH</p>
                      <p>Lãi phải trả: {ethers.utils.formatEther(profitInfo?.totalProfit?.toString() || '0')} ETH</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleWithdraw}
                      disabled={isWithdrawing}
                      className="w-full bg-green-500 hover:bg-green-600 text-black"
                    >
                      {isWithdrawing ? "Đang xử lý..." : "Xác nhận rút tiền"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

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
          
          {/* Cột phải - Thông tin đóng góp và lợi nhuận */}
          <div className="space-y-6">
            <div className="rounded-xl bg-gray-800 p-6">
              <h2 className="text-xl font-bold">Thông tin dự án</h2>
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Mục tiêu</span>
                  <span className="font-medium">{target} ETH</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Đã gọi được</span>
                  <span className="font-medium">
                    {ethers.utils.formatEther(ethers.utils.parseEther(amountCollected.toString()))} ETH
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Số người ủng hộ</span>
                  <span className="font-medium">{donators.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Thời gian còn lại</span>
                  <span className="font-medium">{remainingDays} ngày</span>
                </div>

                {/* Thêm thông tin lợi nhuận */}
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tổng lợi nhuận</span>
                  <span className="font-medium">
                    {profitInfo ? ethers.utils.formatEther(profitInfo.totalProfit) : '0'} ETH
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Chu kỳ chia lợi nhuận</span>
                  <span className="font-medium">
                    {profitInfo ? Math.floor(Number(profitInfo.profitDistributionPeriod) / (24 * 60 * 60)) : 0} ngày
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Lần chia lợi nhuận tiếp theo</span>
                  <span className="font-medium">
                    {profitInfo ? new Date(Number(profitInfo.nextProfitReport) * 1000).toLocaleDateString() : 'N/A'}
                  </span>
                </div>

                {/* Thêm phần thông tin và nút claim lợi nhuận cho nhà đầu tư */}
                {donatorProfit && Number(donatorProfit.donationAmount) > 0 && (
                  <div className="mt-6 space-y-4 border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-semibold">Thông tin lợi nhuận</h3>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Số tiền đã đầu tư</span>
                      <span>{ethers.utils.formatEther(donatorProfit.donationAmount)} ETH</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lợi nhuận được nhận</span>
                      <span className="text-green-400">{ethers.utils.formatEther(donatorProfit.profitShare)} ETH</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lần nhận gần nhất</span>
                      <span>{new Date(Number(donatorProfit.lastClaim) * 1000).toLocaleDateString()}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Lần nhận tiếp theo</span>
                      <span>
                        {new Date((Number(donatorProfit.lastClaim) + Number(profitInfo?.profitDistributionPeriod || 0)) * 1000).toLocaleDateString()}
                      </span>
                    </div>

                    <Button
                      onClick={handleClaimProfit}
                      disabled={!canClaim || isClaiming}
                      className="w-full bg-green-500 hover:bg-green-600 text-black disabled:bg-gray-600"
                    >
                      {isClaiming ? "Đang xử lý..." : canClaim ? "Nhận lợi nhuận" : "Chưa đến kỳ nhận lợi nhuận"}
                    </Button>
                  </div>
                )}
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
                  disabled={isSubmitting || isDonating || Number(remainingDays) <= 0}
                  className="w-full rounded-lg bg-amber-400 px-6 py-3 text-sm font-medium text-black hover:bg-amber-500 disabled:opacity-50"
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
