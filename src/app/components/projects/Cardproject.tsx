'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useCrowdfunding } from "@/app/hooks/useCrowdfunding"
import { Trash2, Heart, Share2, MessageCircle, Clock, Users, Coins } from "lucide-react"
import { useState, useEffect } from "react"
import { daysLeft } from "@/app/utils"
import { Button } from "../ui/button"
import { toast } from "react-hot-toast"
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { Input } from "../ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

interface CardProjectProps {
  id: string
  image: string
  title: string
  content: string
  target: number | string
  raised: number | string
  deadline: string
  initialDonators?: string[]
  author: {
    name: string
    avatar: string
  }
}

const CardProject = ({
  id,
  image,
  title,
  content,
  target,
  raised,
  deadline,
  initialDonators = [],
  author,
}: CardProjectProps) => {
  const router = useRouter()
  const { address, deleteCampaign } = useCrowdfunding()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [campaignData, setCampaignData] = useState<any>(null)
  const [donatorInfo, setDonatorInfo] = useState<{
    addresses: string[]
    amounts: string[]
  }>({ addresses: [], amounts: [] })
  const [donatorProfitInfo, setDonatorProfitInfo] = useState<{
    donationAmount: string
    profitShare: string
    lastClaim: string
  }>({ donationAmount: '0', profitShare: '0', lastClaim: '0' })
  const [isLoading, setIsLoading] = useState(true)
  const [amount, setAmount] = useState("")
  const [isDonating, setIsDonating] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: campaign } = useContractRead(contract, "campaigns", [id])
  const { data: donatorsData } = useContractRead(contract, "getDonators", [id])
  const { data: donatorProfit } = useContractRead(
    contract, 
    "getDonatorProfitInfo", 
    [id, address]
  )
  const { data: campaignProfitInfo } = useContractRead(contract, "getCampaignProfitInfo", [id])
  const { mutateAsync: donate } = useContractWrite(contract, "donateToCampaign")

  useEffect(() => {
    if (campaign) {
      setCampaignData(campaign)
    }
    if (donatorsData) {
      setDonatorInfo({
        addresses: donatorsData[0],
        amounts: donatorsData[1].map((amount: any) => ethers.utils.formatEther(amount))
      })
    }
    if (donatorProfit) {
      setDonatorProfitInfo({
        donationAmount: ethers.utils.formatEther(donatorProfit.donationAmount),
        profitShare: ethers.utils.formatEther(donatorProfit.profitShare),
        lastClaim: donatorProfit.lastClaim.toString()
      })
    }
    if (campaign && donatorsData && donatorProfit) {
      setIsLoading(false)
    }
  }, [campaign, donatorsData, donatorProfit])

  const percentage = campaignData ? (Number(campaignData.amountCollected) / Number(campaignData.target)) * 100 : 0
  const remainingDays = campaignData ? daysLeft(parseInt(campaignData.deadline)) : 0
  const uniqueDonators = donatorInfo.addresses.length
  
  // Lấy tỉ lệ lợi nhuận từ thông tin dự án
  const profitRate = campaignData?.profitShare ? Number(campaignData.profitShare) : 0

  const handleClick = () => {
    router.push(`/projects/${id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) return

    try {
      setIsDeleting(true)
      await deleteCampaign(id)
      toast.success('Xóa dự án thành công!')
      window.location.reload()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Không thể xóa dự án. Vui lòng thử lại sau.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Đã bỏ thích dự án' : 'Đã thích dự án')
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    const url = window.location.origin + `/projects/${id}`
    navigator.clipboard.writeText(url)
    toast.success('Đã sao chép link chia sẻ!')
  }

  const handleDonate = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error('Vui lòng nhập số ETH hợp lệ')
      return
    }

    try {
      setIsDonating(true)
      const amountInWei = ethers.utils.parseEther(amount)
      await donate({ args: [id], overrides: { value: amountInWei } })
      toast.success('Ủng hộ thành công!')
      setAmount("")
    } catch (error) {
      console.error('Error donating:', error)
      toast.error('Không thể ủng hộ. Vui lòng thử lại sau.')
    } finally {
      setIsDonating(false)
    }
  }

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl || imageUrl === 'undefined') return '/placeholder.svg'
    
    try {
      if (imageUrl.startsWith('ipfs://')) {
        const path = imageUrl.replace('ipfs://', '')
        return `https://ipfs.io/ipfs/${path}`
      }
      
      if (imageUrl.startsWith('http')) {
        if (imageUrl.includes('/ipfs/')) {
          const path = imageUrl.substring(imageUrl.indexOf('/ipfs/') + 6)
          return `https://ipfs.io/ipfs/${path}`
        }
        return imageUrl
      }

      return '/placeholder.svg'
    } catch (error) {
      console.error('Error parsing image URL:', error)
      return '/placeholder.svg'
    }
  }

  const formatRemainingTime = (days: number) => {
    if (days < 0) return 'Đã kết thúc'
    if (days === 0) return 'Còn 1 ngày'
    return `Còn ${days} ngày`
  }

  if (isLoading) {
    return (
      <div className="bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-border/30 animate-pulse">
        <div className="h-48 bg-gray-700" />
        <div className="p-4 space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    )
  }

  return (
    <div 
      className="bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative border border-border/30"
      onClick={handleClick}
    >
      {address === author.name && (
        <Button
          onClick={handleDelete}
          disabled={isDeleting}
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 z-10"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      )}
      <div className="relative h-48 w-full">
        <img
          src={getImageUrl(image)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.error('Error loading image:', e)
            e.currentTarget.src = '/placeholder.svg'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{content}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Đã huy động</span>
            <span className="text-foreground font-medium text-blue-400">
              {donatorInfo.amounts.length > 0 
                ? donatorInfo.amounts.reduce((sum, amount) => sum + Number(amount), 0).toFixed(4)
                : '0'} ETH
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mục tiêu</span>
            <span className="text-foreground font-medium">
              {ethers.utils.formatEther(campaignData?.target || '0')} ETH
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lợi nhuận cố định</span>
            <span className="text-foreground font-medium text-green-400">
              {campaignData?.fixedProfitShare || 'N/A'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Tạo bởi</p>
            <p className="text-foreground font-medium">{author.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border/30 pt-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatRemainingTime(Number(remainingDays))}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{uniqueDonators} người ủng hộ</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            onClick={handleLike}
            variant={isLiked ? "destructive" : "outline"}
            size="sm"
            className="flex-1"
          >
            <Heart className="w-4 h-4 mr-2" />
            <span>Like</span>
          </Button>
          <Button 
            onClick={handleShare}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Share2 className="w-4 h-4 mr-2" />
            <span>Chia sẻ</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="flex-1 bg-hufa/90 text-black hover:bg-hufa"
                onClick={(e) => e.stopPropagation()}
              >
                <Coins className="w-4 h-4 mr-2" />
                <span>Ủng hộ</span>
              </Button>
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
              <DialogHeader>
                <DialogTitle>Ủng hộ dự án</DialogTitle>
                <DialogDescription>
                  Nhập số ETH bạn muốn ủng hộ cho dự án này
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số ETH</label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Lợi nhuận cố định: {campaignData?.fixedProfitShare || 'N/A'}</p>
                  <p>Số tiền đã huy động: {donatorInfo.amounts.length > 0 
                    ? donatorInfo.amounts.reduce((sum, amount) => sum + Number(amount), 0).toFixed(4)
                    : '0'} ETH</p>
                  <p>Mục tiêu: {ethers.utils.formatEther(campaignData?.target || '0')} ETH</p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleDonate}
                  disabled={isDonating}
                  className="w-full"
                >
                  {isDonating ? 'Đang xử lý...' : 'Xác nhận ủng hộ'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default CardProject
