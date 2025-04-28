import React from 'react'
import { useRouter } from 'next/router'
import FundCard from './FundCard'
import { loader } from '../assets'

interface DisplayCampaignsProps {
  title: string
  isLoading: boolean
  campaigns: any[]
}

const DisplayCampaigns = ({ title, isLoading, campaigns }: DisplayCampaignsProps) => {
  const router = useRouter()

  const handleNavigate = (campaign: any) => {
    router.push(`/campaign-details/${campaign.id}`)
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <img src={loader.src} alt="loader" className="w-[100px] h-[100px] object-contain" />
          </div>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <FundCard
            key={campaign.id}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  )
}

export default DisplayCampaigns 