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

export const CardProject = ({
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
        const [hash, ...pathParts] = imageUrl.replace('ipfs://', '').split('/')
        const path = pathParts.join('/')
        return `https://${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}.ipfscdn.io/ipfs/${hash}/${path}`
      }
      
      // Nếu là URL thông thường
      if (imageUrl.startsWith('http')) {
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
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative"
      onClick={handleClick}
    >
      {address === author.name && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors z-10"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
      <div className="relative h-48 w-full">
        <Image
          src={getImageUrl(image)}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{content}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Đã huy động</span>
            <span className="text-white">{raised} ETH</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">Mục tiêu</span>
            <span className="text-white">{target} ETH</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-gray-400">Tạo bởi</p>
            <p className="text-white font-medium">{author.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{remainingDays} ngày còn lại</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{donators?.length || 0} người ủng hộ</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">Like</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Chia sẻ</span>
          </button>
          <button 
            onClick={handleClick}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Xem chi tiết</span>
          </button>
        </div>
      </div>
    </div>
  )
}
