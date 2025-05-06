'use client'

import { useState } from 'react'
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { Loader2, Check, X } from 'lucide-react'
import { Button } from '../ui/button'
import { toast } from 'react-hot-toast'

interface QuickFundingRequest {
  id: string
  campaignId: string
  amount: string
  reason: string
  collateral: string
  collateralImage: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: number
}

interface QuickFundingRequestsProps {
  isAdmin: boolean
}

export function QuickFundingRequests({ isAdmin }: QuickFundingRequestsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null)

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)

  const { data: requests, isLoading: isLoadingRequests } = useContractRead(
    contract,
    "getQuickFundingRequests"
  )

  const { mutateAsync: approveQuickFunding } = useContractWrite(
    contract,
    "approveQuickFunding"
  )

  const { mutateAsync: rejectQuickFunding } = useContractWrite(
    contract,
    "rejectQuickFunding"
  )

  const handleApprove = async (requestId: string) => {
    try {
      setIsLoading(true)
      setSelectedRequestId(requestId)
      
      const tx = await approveQuickFunding({ args: [requestId] })
      await tx.receipt
      
      toast.success('Đã phê duyệt yêu cầu huy động vốn!')
    } catch (error) {
      console.error('Error approving quick funding:', error)
      toast.error('Có lỗi xảy ra khi phê duyệt')
    } finally {
      setIsLoading(false)
      setSelectedRequestId(null)
    }
  }

  const handleReject = async (requestId: string) => {
    try {
      setIsLoading(true)
      setSelectedRequestId(requestId)
      
      const tx = await rejectQuickFunding({ args: [requestId] })
      await tx.receipt
      
      toast.success('Đã từ chối yêu cầu huy động vốn!')
    } catch (error) {
      console.error('Error rejecting quick funding:', error)
      toast.error('Có lỗi xảy ra khi từ chối')
    } finally {
      setIsLoading(false)
      setSelectedRequestId(null)
    }
  }

  if (!isAdmin) return null

  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold">Yêu cầu huy động vốn nhanh</h2>

      {isLoadingRequests ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {requests?.map((request: any) => (
            <div key={request.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="space-y-2">
                <p className="font-semibold">
                  Số tiền: {ethers.utils.formatEther(request.amount)} ETH
                </p>
                <p className="text-sm text-gray-400">
                  Lý do: {request.reason}
                </p>
                <p className="text-sm text-gray-400">
                  Tài sản thế chấp: {request.collateral}
                </p>
                <p className="text-sm text-gray-400">
                  Chủ dự án: {request.owner}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={() => handleApprove(request.id)}
                  disabled={isLoading && selectedRequestId === request.id}
                  className="flex-1"
                >
                  {isLoading && selectedRequestId === request.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Phê duyệt
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => handleReject(request.id)}
                  disabled={isLoading && selectedRequestId === request.id}
                  variant="destructive"
                  className="flex-1"
                >
                  {isLoading && selectedRequestId === request.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      Từ chối
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}

          {requests?.length === 0 && (
            <p className="text-center text-gray-400">
              Không có yêu cầu huy động vốn nào
            </p>
          )}
        </div>
      )}
    </div>
  )
} 