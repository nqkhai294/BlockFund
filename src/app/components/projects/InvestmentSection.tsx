'use client'

import { useState } from 'react'
import { useCrowdfunding } from '@/app/hooks/useCrowdfunding'
import { ethers } from 'ethers'
import { Progress } from '../ui/progress'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Loader2 } from 'lucide-react'

interface InvestmentSectionProps {
  campaignId: string
  target: string
  amountCollected: string
  deadline: number
  owner: string
}

export function InvestmentSection({
  campaignId,
  target,
  amountCollected,
  deadline,
  owner
}: InvestmentSectionProps) {
  const [amount, setAmount] = useState('0.1')
  const [isInvesting, setIsInvesting] = useState(false)
  const [error, setError] = useState('')
  const { donateToCampaign, address } = useCrowdfunding()

  const handleInvest = async () => {
    if (!address) {
      setError('Vui lòng kết nối ví trước')
      return
    }

    if (address === owner) {
      setError('Bạn không thể đầu tư vào dự án của chính mình')
      return
    }

    if (parseFloat(amount) <= 0) {
      setError('Vui lòng nhập số tiền hợp lệ')
      return
    }

    try {
      setIsInvesting(true)
      setError('')

      await donateToCampaign(parseInt(campaignId), amount)
      setAmount('0.1')
    } catch (error) {
      console.error('Error investing:', error)
      setError('Có lỗi xảy ra khi đầu tư. Vui lòng thử lại.')
    } finally {
      setIsInvesting(false)
    }
  }

  const percentage = (parseFloat(amountCollected) / parseFloat(target)) * 100

  // Tính số ngày còn lại
  const remainingDays = Math.ceil((deadline - Math.floor(Date.now() / 1000)) / (24 * 60 * 60))

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-gray-800 p-6">
        <h2 className="text-xl font-bold">Đầu tư vào dự án</h2>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Mục tiêu</span>
            <span className="font-medium">{target} ETH</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Đã huy động</span>
            <span className="font-medium">{amountCollected} ETH</span>
          </div>
          
          <Progress value={percentage} className="h-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Thời gian còn lại</span>
            <span className="font-medium">{remainingDays > 0 ? `${remainingDays} ngày` : 'Đã kết thúc'}</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Số ETH muốn đầu tư
            </label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full"
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          
          <Button
            onClick={handleInvest}
            disabled={isInvesting || remainingDays <= 0}
            className="w-full"
          >
            {isInvesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              'Đầu tư ngay'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
} 