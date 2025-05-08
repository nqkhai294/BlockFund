"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {  Rocket } from "lucide-react"
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
import { Input } from '../ui/input'


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
  const [availableBalance, setAvailableBalance] = useState("0")
  const [totalProfit, setTotalProfit] = useState("0")
  const [reason, setReason] = useState('')
  const [identityVerification, setIdentityVerification] = useState<File | null>(null)
  const [collateral, setCollateral] = useState<File | null>(null)
  const [collateralType, setCollateralType] = useState<'document' | 'token' | 'nft'>('document')
  const [collateralToken, setCollateralToken] = useState('')
  const [collateralAmount, setCollateralAmount] = useState('')
  const [collateralNFT, setCollateralNFT] = useState('')
  const [collateralNFTId, setCollateralNFTId] = useState('')
  const [isReportingProfit, setIsReportingProfit] = useState(false)
  const [profitAmount, setProfitAmount] = useState("")
  const [showReportProfitDialog, setShowReportProfitDialog] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: campaignStatus } = useContractRead(contract, "checkCampaignStatus", [id])
  const { data: donatorProfit } = useContractRead(
    contract, 
    "getDonatorProfitInfo", 
    [id, address || "0x0"]
  )
  const { data: profitInfo } = useContractRead(contract, "getCampaignProfitInfo", [id])
  const { data: campaign } = useContractRead(contract, "campaigns", [id])

  const remainingDays = daysLeft(Number(deadline))
  const percentage = calculateBarPercentage(
    ethers.utils.parseEther(target.toString()),
    ethers.utils.parseEther(amountCollected.toString())
  )

  // Kiểm tra xem dự án đã hoàn thành hoặc hết hạn chưa
  const isCampaignEnded = campaignStatus?.isCompleted || Number(remainingDays) <= 0

  const canWithdraw = isCampaignEnded && owner === address
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

  // Cập nhật số dư và lãi khi component mount
  useEffect(() => {
    const fetchBalanceAndProfit = async () => {
      if (contract && id) {
        try {
          if (campaign) {
            setAvailableBalance(ethers.utils.formatEther(campaign.amountCollected))
          }
          if (profitInfo) {
            setTotalProfit(ethers.utils.formatEther(profitInfo.totalProfit))
          }
        } catch (error) {
          console.error("Error fetching balance and profit:", error)
        }
      }
    }

    fetchBalanceAndProfit()
  }, [contract, id, campaign, profitInfo])

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

  const handleIdentityVerificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdentityVerification(e.target.files[0])
    }
  }

  const handleCollateralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCollateral(e.target.files[0])
    }
  }

  const handleRequestFastFunding = async () => {
    if (!address) {
      toast.error("Vui lòng kết nối ví")
      return
    }

    // Kiểm tra trạng thái chiến dịch
    if (!campaignStatus) {
      toast.error("Không thể kiểm tra trạng thái chiến dịch")
      return
    }

    if (campaignStatus.isActive) {
      toast.error("Chiến dịch đã được kích hoạt. Không thể yêu cầu huy động vốn nhanh.")
      return
    }

    if (campaignStatus.isCompleted) {
      toast.error("Chiến dịch đã hoàn thành. Không thể yêu cầu huy động vốn nhanh.")
      return
    }

    if (!reason) {
      toast.error("Vui lòng nhập lý do huy động vốn nhanh")
      return
    }

    if (!identityVerification) {
      toast.error("Vui lòng tải lên giấy tờ xác thực danh tính")
      return
    }

    if (collateralType === 'document' && !collateral) {
      toast.error("Vui lòng tải lên tài liệu tài sản thế chấp")
      return
    }

    if (collateralType === 'token') {
      if (!collateralToken) {
        toast.error("Vui lòng nhập địa chỉ token")
        return
      }
      if (!collateralAmount || Number(collateralAmount) <= 0) {
        toast.error("Vui lòng nhập số lượng token hợp lệ")
        return
      }
    }

    if (collateralType === 'nft') {
      if (!collateralNFT) {
        toast.error("Vui lòng nhập địa chỉ NFT")
        return
      }
      if (!collateralNFTId) {
        toast.error("Vui lòng nhập ID của NFT")
        return
      }
    }

    try {
      setIsRequestingFunds(true)
      const collateralTypeEnum = collateralType === 'document' ? 1 : collateralType === 'token' ? 2 : 3
      
      // Upload files to IPFS or other storage
      const identityVerificationUrl = "ipfs://" // Replace with actual upload
      const collateralUrl = collateral ? "ipfs://" : "" // Replace with actual upload

      // Thêm retry logic
      const maxRetries = 3
      let retryCount = 0
      let success = false

      while (retryCount < maxRetries && !success) {
        try {
          await contract?.call("requestFastFunding", [
            id,
            reason,
            identityVerificationUrl,
            collateralUrl,
            collateralType === 'token' ? collateralToken : "0x0000000000000000000000000000000000000000",
            collateralType === 'token' ? ethers.utils.parseEther(collateralAmount) : 0,
            collateralType === 'nft' ? collateralNFT : "0x0000000000000000000000000000000000000000",
            collateralType === 'nft' ? Number(collateralNFTId) : 0,
            collateralTypeEnum
          ])
          success = true
          toast.success("Yêu cầu huy động vốn nhanh đã được gửi")
          setShowRequestDialog(false)
        } catch (error: any) {
          retryCount++
          if (error.message?.includes("Too Many Requests")) {
            if (retryCount < maxRetries) {
              // Đợi một khoảng thời gian tăng dần trước khi thử lại
              await new Promise(resolve => setTimeout(resolve, 2000 * retryCount))
              continue
            }
          }
          throw error
        }
      }

      if (!success) {
        throw new Error("Không thể gửi yêu cầu sau nhiều lần thử")
      }
    } catch (error: any) {
      console.error("Error requesting fast funding:", error)
      if (error.message?.includes("Too Many Requests")) {
        toast.error("Quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.")
      } else if (error.message?.includes("Campaign is already active")) {
        toast.error("Chiến dịch đã được kích hoạt. Không thể yêu cầu huy động vốn nhanh.")
      } else {
        toast.error("Có lỗi xảy ra khi gửi yêu cầu huy động vốn nhanh")
      }
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
    if (!canWithdraw /* || !withdrawAmount */ || !contract) {
      toast.error("Không thể rút tiền. Dự án phải hoàn thành hoặc hết hạn.")
      return
    }

    try {
      setIsWithdrawing(true)
      // const amountInWei = ethers.utils.parseEther(withdrawAmount) // Tạm thời bỏ điều kiện số tiền
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

  const handleReportProfit = async () => {
    if (!profitAmount || !contract) return

    try {
      setIsReportingProfit(true)
      const amountInWei = ethers.utils.parseEther(profitAmount)
      const tx = await contract.call("reportProfit", [id, amountInWei], {
        value: amountInWei
      })
      await tx.wait()
      toast.success("Báo cáo lợi nhuận thành công!")
      setShowReportProfitDialog(false)
      setProfitAmount("")
    } catch (error: any) {
      console.error("Lỗi khi báo cáo lợi nhuận:", error)
      if (error.message?.includes("Must wait for profit distribution period")) {
        toast.error("Phải đợi qua thời gian phân phối lợi nhuận giữa các lần báo cáo")
      } else {
        toast.error("Không thể báo cáo lợi nhuận. Vui lòng thử lại sau.")
      }
    } finally {
      setIsReportingProfit(false)
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

              {/* Thêm nút báo cáo lợi nhuận cho chủ dự án */}
              {address && owner === address && (
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowReportProfitDialog(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-black"
                  >
                    Báo cáo lợi nhuận
                  </Button>
                </div>
              )}

              {/* Dialog huy động vốn nhanh */}
              <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yêu cầu huy động vốn nhanh</DialogTitle>
                    <DialogDescription>
                      Vui lòng cung cấp đầy đủ thông tin để yêu cầu huy động vốn nhanh
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Lý do huy động vốn nhanh</label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Nhập lý do cần huy động vốn nhanh..."
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Giấy tờ xác thực danh tính</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleIdentityVerificationChange}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                      />
                      <p className="text-sm text-gray-400">
                        Tải lên CMND/CCCD/Hộ chiếu để xác thực danh tính
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Loại tài sản thế chấp</label>
                      <select
                        value={collateralType}
                        onChange={(e) => setCollateralType(e.target.value as 'document' | 'token' | 'nft')}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="document">Tài liệu</option>
                        <option value="token">Token</option>
                        <option value="nft">NFT</option>
                      </select>
                    </div>

                    {collateralType === 'document' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tài liệu tài sản thế chấp</label>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleCollateralChange}
                          className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                        />
                        <p className="text-sm text-gray-400">
                          Tải lên giấy tờ chứng minh quyền sở hữu tài sản thế chấp
                        </p>
                      </div>
                    )}

                    {collateralType === 'token' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Địa chỉ token</label>
                          <Input
                            value={collateralToken}
                            onChange={(e) => setCollateralToken(e.target.value)}
                            placeholder="0x..."
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Số lượng token</label>
                          <Input
                            type="number"
                            value={collateralAmount}
                            onChange={(e) => setCollateralAmount(e.target.value)}
                            placeholder="0.0"
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}

                    {collateralType === 'nft' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Địa chỉ NFT</label>
                          <Input
                            value={collateralNFT}
                            onChange={(e) => setCollateralNFT(e.target.value)}
                            placeholder="0x..."
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">ID của NFT</label>
                          <Input
                            type="number"
                            value={collateralNFTId}
                            onChange={(e) => setCollateralNFTId(e.target.value)}
                            placeholder="0"
                            className="w-full"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setShowRequestDialog(false)} variant="outline">
                      Hủy
                    </Button>
                    <Button onClick={handleRequestFastFunding} className="bg-amber-500 hover:bg-amber-600 text-black">
                      Gửi yêu cầu
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
                      {isCampaignEnded 
                        ? "Bạn sẽ rút toàn bộ số tiền đã gọi được từ dự án."
                        : "Dự án phải hoàn thành hoặc hết hạn mới có thể rút tiền."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="text-sm text-muted-foreground">
                      <p>Số dư khả dụng: {campaign ? ethers.utils.formatEther(campaign.amountCollected) : "0"} ETH</p>
                      <p>Lãi phải trả: {profitInfo ? ethers.utils.formatEther(profitInfo.totalProfit) : "0"} ETH</p>
                      {!isCampaignEnded && (
                        <p className="text-amber-400 mt-2">Dự án chưa kết thúc. Còn {remainingDays} ngày.</p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleWithdraw}
                      disabled={isWithdrawing || !canWithdraw}
                      className="w-full bg-green-500 hover:bg-green-600 text-black"
                    >
                      {isWithdrawing ? "Đang xử lý..." : canWithdraw ? "Xác nhận rút tiền" : "Không thể rút tiền"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Dialog báo cáo lợi nhuận */}
              <Dialog open={showReportProfitDialog} onOpenChange={setShowReportProfitDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Báo cáo lợi nhuận</DialogTitle>
                    <DialogDescription>
                      Nhập số ETH lợi nhuận bạn muốn báo cáo. Số ETH này sẽ được gửi kèm theo giao dịch.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Số ETH lợi nhuận</label>
                      <input
                        type="number"
                        value={profitAmount}
                        onChange={(e) => setProfitAmount(e.target.value)}
                        placeholder="0.0"
                        step="0.01"
                        min="0"
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 p-4 text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Lợi nhuận cố định: {campaign?.fixedProfitShare || 'N/A'}</p>
                      <p>Tổng lợi nhuận hiện tại: {profitInfo ? ethers.utils.formatEther(profitInfo.totalProfit) : "0"} ETH</p>
                      <p>Lần báo cáo gần nhất: {profitInfo ? new Date(Number(profitInfo.lastProfitReport) * 1000).toLocaleDateString() : "Chưa có"}</p>
                      <p>Lần báo cáo tiếp theo: {profitInfo ? new Date(Number(profitInfo.nextProfitReport) * 1000).toLocaleDateString() : "Chưa có"}</p>
                      <p className="text-amber-400 mt-2">
                        Thời gian chờ giữa các lần báo cáo: {profitInfo ? Math.floor(Number(profitInfo.profitDistributionPeriod) / (24 * 60 * 60)) : 0} ngày
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setShowReportProfitDialog(false)} variant="outline">
                      Hủy
                    </Button>
                    <Button 
                      onClick={handleReportProfit} 
                      disabled={isReportingProfit || !profitAmount}
                      className="bg-blue-500 hover:bg-blue-600 text-black"
                    >
                      {isReportingProfit ? "Đang xử lý..." : "Báo cáo"}
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

                {/* Thêm phần thông tin lợi nhuận */}
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <h3 className="mb-3 text-lg font-semibold">Thông tin lợi nhuận</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Tổng lợi nhuận</span>
                      <span className="font-medium text-green-400">
                        {profitInfo ? ethers.utils.formatEther(profitInfo.totalProfit) : '0'} ETH
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Lợi nhuận cố định</span>
                      <span className="font-medium">
                        {campaign?.fixedProfitShare || 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Lần báo cáo gần nhất</span>
                      <span className="font-medium">
                        {profitInfo && Number(profitInfo.lastProfitReport) > 0 
                          ? new Date(Number(profitInfo.lastProfitReport) * 1000).toLocaleDateString() 
                          : "Chưa có"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Lần báo cáo tiếp theo</span>
                      <span className="font-medium">
                        {profitInfo && Number(profitInfo.nextProfitReport) > 0 
                          ? new Date(Number(profitInfo.nextProfitReport) * 1000).toLocaleDateString() 
                          : "Chưa có"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Thời gian chờ giữa các lần báo cáo</span>
                      <span className="font-medium">
                        {profitInfo ? Math.floor(Number(profitInfo.profitDistributionPeriod) / (24 * 60 * 60)) : 0} ngày
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thêm phần thông tin lợi nhuận của nhà đầu tư nếu đã đầu tư */}
                {donatorProfit && Number(donatorProfit.donationAmount) > 0 && (
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <h3 className="mb-3 text-lg font-semibold">Lợi nhuận của bạn</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Số tiền đã đầu tư</span>
                        <span className="font-medium">
                          {ethers.utils.formatEther(donatorProfit.donationAmount)} ETH
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Lợi nhuận được nhận</span>
                        <span className="font-medium text-green-400">
                          {ethers.utils.formatEther(donatorProfit.profitShare)} ETH
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Lần nhận gần nhất</span>
                        <span className="font-medium">
                          {Number(donatorProfit.lastClaim) === 0 
                            ? "Chưa nhận" 
                            : new Date(Number(donatorProfit.lastClaim) * 1000).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Lần nhận tiếp theo</span>
                        <span className="font-medium">
                          {Number(donatorProfit.lastClaim) === 0 
                            ? "Chưa nhận" 
                            : new Date((Number(donatorProfit.lastClaim) + Number(profitInfo?.profitDistributionPeriod || 0)) * 1000).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Thêm nút nhận lợi nhuận */}
                      <div className="mt-4">
                        <Button
                          onClick={handleClaimProfit}
                          disabled={!canClaim || isClaiming}
                          className="w-full bg-green-500 hover:bg-green-600 text-black disabled:bg-gray-600"
                        >
                          {isClaiming ? "Đang xử lý..." : canClaim ? "Nhận lợi nhuận" : "Chưa có lợi nhuận để nhận"}
                        </Button>
                        {!canClaim && Number(donatorProfit.profitShare) > 0 && (
                          <p className="mt-2 text-sm text-amber-400">
                            Bạn có thể nhận lợi nhuận vào ngày {new Date((Number(donatorProfit.lastClaim) + Number(profitInfo?.profitDistributionPeriod || 0)) * 1000).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Phần đóng góp */}
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
                    disabled={isCampaignEnded}
                  />
                </div>
                
                <button
                  onClick={handleContribute}
                  disabled={isSubmitting || isDonating || Number(remainingDays) <= 0 || isCampaignEnded}
                  className="w-full rounded-lg bg-amber-400 px-6 py-3 text-sm font-medium text-black hover:bg-amber-500 disabled:opacity-50"
                >
                  {isSubmitting || isDonating ? "Đang xử lý..." : isCampaignEnded ? "Dự án đã kết thúc" : "Đóng góp ngay"}
                </button>
                {isCampaignEnded && (
                  <p className="text-sm text-amber-400 mt-2">
                    Dự án đã đạt mục tiêu hoặc hết hạn. Không thể đóng góp thêm.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ProjectDetail
