'use client'

import { useState } from 'react'
import { useContract, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'react-hot-toast'

interface DonateFormProps {
  campaignId: string
}

export function DonateForm({ campaignId }: DonateFormProps) {
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { mutateAsync: donate } = useContractWrite(
    contract,
    "donateToCampaign"
  )

  const handleDonate = async () => {
    if (!amount) {
      toast.error('Vui lòng nhập số tiền muốn đóng góp')
      return
    }

    try {
      setIsLoading(true)
      const amountInWei = ethers.utils.parseEther(amount)
      
      const tx = await donate({ args: [campaignId], overrides: { value: amountInWei } })
      await tx.receipt
      
      toast.success('Đóng góp thành công!')
      setAmount('')
    } catch (error) {
      console.error('Error donating:', error)
      toast.error('Có lỗi xảy ra khi đóng góp')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Đóng góp cho dự án</h2>
      
      <div className="space-y-2">
        <Label>Số tiền (ETH)</Label>
        <Input
          type="number"
          placeholder="Nhập số ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Button
        onClick={handleDonate}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'Đóng góp ngay'
        )}
      </Button>
    </div>
  )
} 