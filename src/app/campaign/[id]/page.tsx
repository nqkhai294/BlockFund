'use client'

import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { Label } from '@/app/components/ui/label'
import { DonateForm } from '@/app/components/campaign/DonateForm'
import { CampaignManagement } from '@/app/components/campaign/CampaignManagement'
import { QuickFunding } from '@/app/components/campaign/QuickFunding'
import { QuickFundingRequests } from '@/app/components/campaign/QuickFundingRequests'
import { calculateBarPercentage, daysLeft } from '@/app/utils'

export default function CampaignDetails({ params }: { params: { id: string } }) {
  const address = useAddress()
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS)
  const { data: campaign, isLoading } = useContractRead(contract, "getCampaign", [params.id])
  const { data: donations, isLoading: isLoadingDonations } = useContractRead(contract, "getDonators", [params.id])
  const { data: donators, isLoading: isLoadingDonators } = useContractRead(contract, "getDonators", [params.id])
  const { data: amounts, isLoading: isLoadingAmounts } = useContractRead(contract, "getDonations", [params.id])
  const { data: isAdmin } = useContractRead(contract, "isAdmin", [address])

  const isOwner = campaign?.owner === address

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Existing campaign details */}
          <div className="relative h-80 w-full">
            <Image
              src={campaign?.image}
              alt={campaign?.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{campaign?.title}</h1>
            <p className="text-gray-400">{campaign?.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Mục tiêu</Label>
                <p className="text-xl font-semibold">{ethers.utils.formatEther(campaign?.target)} ETH</p>
              </div>
              <div className="space-y-2">
                <Label>Đã gây quỹ</Label>
                <p className="text-xl font-semibold">{ethers.utils.formatEther(campaign?.amountCollected)} ETH</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tiến độ</Label>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${calculateBarPercentage(campaign?.target, campaign?.amountCollected)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Thời gian còn lại</Label>
              <p className="text-xl font-semibold">{daysLeft(parseInt(campaign?.deadline))} ngày</p>
            </div>

            {!isOwner && (
              <DonateForm campaignId={params.id} />
            )}
          </div>
        </div>

        <div className="space-y-8">
          {/* Campaign Management for owner */}
          {isOwner && (
            <CampaignManagement campaignId={params.id} isOwner={isOwner} />
          )}

          {/* Quick Funding for owner */}
          {isOwner && (
            <QuickFunding campaignId={params.id} isOwner={isOwner} />
          )}

          {/* Quick Funding Requests for admin */}
          {isAdmin && (
            <QuickFundingRequests isAdmin={isAdmin} />
          )}

          {/* Donators list */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Danh sách nhà tài trợ</h2>
            {isLoadingDonators || isLoadingAmounts ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {donators?.map((donator: string, index: number) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <p className="text-sm">{donator}</p>
                    <p className="font-semibold">{ethers.utils.formatEther(amounts[index])} ETH</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 