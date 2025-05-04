'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useCrowdfunding } from "@/app/hooks/useCrowdfunding"
import { Trash2, Heart, Share2, MessageCircle, Clock, Users } from "lucide-react"
import { useState } from "react"
import { daysLeft } from "@/app/utils"

interface CardProjectProps {
  id: string
  image: string
  title: string
  content: string
  target: number | string
  raised: number | string
  deadline: string
  donators?: string[]
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
  donators = [],
  author,
}: CardProjectProps) => {
  const router = useRouter()
  const { address, deleteCampaign } = useCrowdfunding()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const percentage = (Number(raised) / Number(target)) * 100
  const remainingDays = daysLeft(parseInt(deadline))

  const handleClick = () => {
    router.push(`/projects/${id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) return

    try {
      setIsDeleting(true)
      await deleteCampaign(id)
      window.location.reload()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Không thể xóa dự án. Vui lòng thử lại sau.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Implement share functionality
  }

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl || imageUrl === 'undefined') return '/placeholder.svg'
    
    try {
      // Nếu là URL IPFS
      if (imageUrl.startsWith('ipfs://')) {
        // Giữ nguyên toàn bộ đường dẫn sau ipfs://
        const path = imageUrl.replace('ipfs://', '')
        // Sử dụng public IPFS gateway và giữ nguyên encoding của URL
        const url = `https://ipfs.io/ipfs/${path}`
        console.log('IPFS URL:', url)
        return url
      }
      
      // Nếu là URL thông thường
      if (imageUrl.startsWith('http')) {
        // Nếu là URL từ ipfscdn.io hoặc các gateway khác, chuyển sang ipfs.io
        if (imageUrl.includes('/ipfs/')) {
          // Giữ nguyên phần path sau /ipfs/
          const path = imageUrl.substring(imageUrl.indexOf('/ipfs/') + 6)
          const url = `https://ipfs.io/ipfs/${path}`
          console.log('Converted IPFS URL:', url)
          return url
        }
        console.log('HTTP URL:', imageUrl)
        return imageUrl
      }

      return '/placeholder.svg'
    } catch (error) {
      console.error('Error parsing image URL:', error)
      return '/placeholder.svg'
    }
  }

  return (
    <div 
      className="bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative border border-border/30"
      onClick={handleClick}
    >
      {address === author.name && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-2 right-2 p-2 bg-destructive/90 text-white rounded-lg hover:bg-destructive transition-colors z-10"
        >
          <Trash2 className="w-5 h-5" />
        </button>
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
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{content}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Đã huy động</span>
            <span className="text-foreground font-medium">{raised} ETH</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mục tiêu</span>
            <span className="text-foreground font-medium">{target} ETH</span>
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
            <span className="text-sm">{remainingDays} ngày còn lại</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{donators?.length || 0} người ủng hộ</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked ? 'bg-destructive/90 text-white' : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">Like</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-muted/30 text-muted-foreground rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Chia sẻ</span>
          </button>
          <button 
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 bg-hufa/90 text-black rounded-lg hover:bg-hufa transition-colors font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Xem chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProject
