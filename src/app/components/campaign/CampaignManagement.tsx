'use client'

import { useState } from 'react'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { toast } from 'react-hot-toast'

interface CampaignManagementProps {
  campaignId: string
  isOwner: boolean
}

export function CampaignManagement({ campaignId, isOwner }: CampaignManagementProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [target, setTarget] = useState('')
  const [deadline, setDeadline] = useState('')
  const [image, setImage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { mutateAsync: updateCampaign } = useContractWrite(
    contract,
    "updateCampaign"
  )

  const handleUpdate = async () => {
    if (!title || !description || !target || !deadline || !image) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    try {
      setIsLoading(true)
      const targetInWei = ethers.utils.parseEther(target)
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000)
      
      const tx = await updateCampaign({
        args: [
          campaignId,
          title,
          description,
          targetInWei,
          deadlineTimestamp,
          image
        ]
      })
      await tx.receipt
      
      toast.success('Cập nhật dự án thành công!')
      setTitle('')
      setDescription('')
      setTarget('')
      setDeadline('')
      setImage('')
    } catch (error) {
      console.error('Error updating campaign:', error)
      toast.error('Có lỗi xảy ra khi cập nhật')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOwner) return null

  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold">Quản lý dự án</h2>
      
      <div className="space-y-2">
        <Label>Tên dự án</Label>
        <Input
          placeholder="Nhập tên dự án"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Mô tả</Label>
        <Textarea
          placeholder="Mô tả dự án..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Mục tiêu (ETH)</Label>
        <Input
          type="number"
          placeholder="Nhập số ETH"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Hạn chót</Label>
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Hình ảnh</Label>
        <Input
          placeholder="Nhập URL hình ảnh"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Button
        onClick={handleUpdate}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Cập nhật dự án'
        )}
      </Button>
    </div>
  )
} 