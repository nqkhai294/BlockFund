'use client'

import { useState } from 'react'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { Loader2, Upload } from 'lucide-react'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { toast } from 'react-hot-toast'

interface QuickFundingProps {
  campaignId: string
  isOwner: boolean
}

export function QuickFunding({ campaignId, isOwner }: QuickFundingProps) {
  const [amount, setAmount] = useState('')
  const [reason, setReason] = useState('')
  const [collateral, setCollateral] = useState('')
  const [collateralImage, setCollateralImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { mutateAsync: requestQuickFunding } = useContractWrite(
    contract,
    "requestQuickFunding"
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCollateralImage(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!amount || !reason || !collateral) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }

    try {
      setIsLoading(true)
      const amountInWei = ethers.utils.parseEther(amount)
      
      const tx = await requestQuickFunding({ 
        args: [campaignId, amountInWei, reason, collateral],
        overrides: { value: amountInWei }
      })
      await tx.receipt
      
      toast.success('Yêu cầu huy động vốn nhanh đã được gửi!')
      setAmount('')
      setReason('')
      setCollateral('')
      setCollateralImage(null)
    } catch (error) {
      console.error('Error requesting quick funding:', error)
      toast.error('Có lỗi xảy ra khi gửi yêu cầu')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOwner) return null

  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold">Huy động vốn nhanh</h2>
      
      <div className="space-y-2">
        <Label>Số tiền cần huy động (ETH)</Label>
        <Input
          type="number"
          placeholder="Nhập số ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Lý do cần vốn gấp</Label>
        <Textarea
          placeholder="Mô tả lý do cần vốn gấp..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Tài sản thế chấp</Label>
        <Textarea
          placeholder="Mô tả tài sản thế chấp..."
          value={collateral}
          onChange={(e) => setCollateral(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label>Hình ảnh tài sản thế chấp</Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={isLoading}
            className="hidden"
            id="collateral-image"
          />
          <Label
            htmlFor="collateral-image"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>Chọn ảnh</span>
          </Label>
          {collateralImage && (
            <span className="text-sm text-gray-400">
              {collateralImage.name}
            </span>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Gửi yêu cầu'
        )}
      </Button>
    </div>
  )
} 