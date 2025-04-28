'use client'

import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react"
import { useState, useEffect } from 'react'
import { daysLeft, calculateBarPercentage } from '../utils'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const CROWDFUNDING_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "campaigns",
    "outputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "target",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountCollected",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "image",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_target",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_image",
        "type": "string"
      }
    ],
    "name": "createCampaign",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "deleteCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "donateToCampaign",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCampaigns",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "target",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amountCollected",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "image",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isActive",
            "type": "bool"
          }
        ],
        "internalType": "struct CrowdFunding.Campaign[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getDonators",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numberOfCampaigns",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const useCrowdfunding = () => {
  const [isTransacting, setIsTransacting] = useState(false)
  const address = useAddress()
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true)

  const { contract } = useContract(CONTRACT_ADDRESS, CROWDFUNDING_ABI)

  const { data: campaignsData, isLoading, error } = useContractRead(
    contract,
    "getCampaigns"
  )

  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")
  const { mutateAsync: deleteCampaign } = useContractWrite(contract, "deleteCampaign")
  const { mutateAsync: donate } = useContractWrite(contract, "donateToCampaign")

  useEffect(() => {
    if (!isLoading) {
      if (error) {
        console.error("Error fetching campaigns:", error)
        setIsLoadingCampaigns(false)
        return
      }

      if (campaignsData) {
        try {
          console.log("Raw campaigns data:", campaignsData) // Debug

          const formattedCampaigns = campaignsData
            .filter((campaign: any) => campaign.isActive)
            .map((campaign: any, index: number) => {
              console.log(`Campaign ${index}:`, campaign) // Debug
              
              return {
                id: index.toString(),
                owner: campaign.owner?.toString() || '',
                title: campaign.title || '',
                description: campaign.description || '',
                target: ethers.utils.formatEther(campaign.target?.toString() || '0'),
                deadline: campaign.deadline?.toString() || '0',
                amountCollected: ethers.utils.formatEther(campaign.amountCollected?.toString() || '0'),
                image: campaign.image || '',
                donators: campaign.donators || [],
                donations: campaign.donations || [],
                daysLeft: daysLeft(parseInt(campaign.deadline?.toString() || '0')),
                percentage: calculateBarPercentage(
                  campaign.target?.toString() || '0',
                  campaign.amountCollected?.toString() || '0'
                )
              }
            })
          
          console.log("Formatted campaigns:", formattedCampaigns) // Debug
          setCampaigns(formattedCampaigns)
        } catch (error) {
          console.error("Error formatting campaigns:", error)
        }
      }
      setIsLoadingCampaigns(false)
    }
  }, [campaignsData, isLoading, error])

  const createNewCampaign = async (
    title: string,
    description: string,
    target: string,
    deadline: number,
    image: string
  ) => {
    if (!address) {
      throw new Error("Please connect your wallet first")
    }

    try {
      setIsTransacting(true)
      const targetInWei = ethers.utils.parseEther(target)
      const data = await createCampaign({
        args: [address, title, description, targetInWei, deadline, image],
      })
      return data
    } catch (error) {
      console.log("Error creating campaign:", error)
      throw error
    } finally {
      setIsTransacting(false)
    }
  }

  const deleteCampaignById = async (campaignId: string) => {
    try {
      const data = await deleteCampaign({
        args: [campaignId],
      })
      return data
    } catch (error) {
      console.log("Error deleting campaign:", error)
      throw error
    }
  }

  const donateToCampaign = async (pId: number, amount: string) => {
    try {
      const data = await donate({
        args: [pId],
        overrides: {
          value: ethers.utils.parseEther(amount),
        },
      })
      return data
    } catch (error) {
      console.log("Error donating:", error)
      throw error
    }
  }

  const getDonators = async (campaignId: string) => {
    try {
      const result = await contract?.call("getDonators", [campaignId])
      if (!result) return { donators: [], donations: [] }
      return {
        donators: result[0] || [],
        donations: result[1] || []
      }
    } catch (error) {
      console.error("Error getting donators:", error)
      throw error
    }
  }

  return {
    address,
    campaigns,
    isLoadingCampaigns,
    createNewCampaign,
    deleteCampaign: deleteCampaignById,
    isCreatingCampaign: isTransacting,
    donateToCampaign,
    isDonating: isTransacting,
    getDonators,
    error
  }
} 