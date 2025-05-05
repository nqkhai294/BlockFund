'use client'

import { useContract, useContractRead, useContractWrite, useAddress } from "@thirdweb-dev/react"
import { useState, useEffect } from 'react'
import { daysLeft, calculateBarPercentage } from '../utils'
import { ethers } from 'ethers'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const CROWDFUNDING_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "target",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "CampaignCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "CampaignDeleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "CampaignExpired",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "donator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DonationReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "actor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "HistoryAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "donator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ProfitClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "ProfitReported",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "campaignHistories",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "campaignId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "actor",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
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
      },
      {
        "internalType": "uint256",
        "name": "totalProfit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastProfitReport",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "profitDistributionPeriod",
        "type": "uint256"
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
    "name": "checkCampaignStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isExpired",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCompleted",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "canBeDeleted",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
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
    "name": "claimProfit",
    "outputs": [],
    "stateMutability": "nonpayable",
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
      },
      {
        "internalType": "uint256",
        "name": "_profitDistributionPeriod",
        "type": "uint256"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getCampaignHistory",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "actor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct CrowdFunding.CampaignHistory[]",
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
      },
      {
        "internalType": "string",
        "name": "_action",
        "type": "string"
      }
    ],
    "name": "getCampaignHistoryByAction",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "campaignId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "actor",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct CrowdFunding.CampaignHistory[]",
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
    "name": "getCampaignProfitInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalProfit",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastProfitReport",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "profitDistributionPeriod",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nextProfitReport",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCampaigns",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "owners",
        "type": "address[]"
      },
      {
        "internalType": "string[]",
        "name": "titles",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "descriptions",
        "type": "string[]"
      },
      {
        "internalType": "uint256[]",
        "name": "targets",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "deadlines",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "amountCollecteds",
        "type": "uint256[]"
      },
      {
        "internalType": "string[]",
        "name": "images",
        "type": "string[]"
      },
      {
        "internalType": "bool[]",
        "name": "isActives",
        "type": "bool[]"
      },
      {
        "internalType": "uint256[]",
        "name": "totalProfits",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "lastProfitReports",
        "type": "uint256[]"
      },
      {
        "internalType": "uint256[]",
        "name": "profitDistributionPeriods",
        "type": "uint256[]"
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
      },
      {
        "internalType": "address",
        "name": "_donator",
        "type": "address"
      }
    ],
    "name": "getDonatorProfitInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "donationAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "profitShare",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastClaim",
        "type": "uint256"
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
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_profitAmount",
        "type": "uint256"
      }
    ],
    "name": "reportProfit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalHistoryEntries",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
    "name": "withdrawCampaignFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    if (!isLoading && campaignsData) {
      try {
        console.log("Raw campaigns data:", campaignsData) // Debug log

        // Chuyển đổi dữ liệu từ mảng riêng biệt thành mảng các object
        const formattedCampaigns = Array.from({ length: campaignsData.owners.length }, (_, index) => {
          const campaign = {
            id: index.toString(),
            owner: campaignsData.owners[index]?.toString() || '',
            title: campaignsData.titles[index] || '',
            description: campaignsData.descriptions[index] || '',
            target: ethers.utils.formatEther(campaignsData.targets[index]?.toString() || '0'),
            deadline: campaignsData.deadlines[index]?.toString() || '0',
            amountCollected: ethers.utils.formatEther(campaignsData.amountCollecteds[index]?.toString() || '0'),
            image: campaignsData.images[index] || '',
            isActive: campaignsData.isActives[index] || false,
            totalProfit: ethers.utils.formatEther(campaignsData.totalProfits[index]?.toString() || '0'),
            lastProfitReport: campaignsData.lastProfitReports[index]?.toString() || '0',
            profitDistributionPeriod: campaignsData.profitDistributionPeriods[index]?.toString() || '0',
            daysLeft: daysLeft(parseInt(campaignsData.deadlines[index]?.toString() || '0')),
            percentage: calculateBarPercentage(
              campaignsData.targets[index]?.toString() || '0',
              campaignsData.amountCollecteds[index]?.toString() || '0'
            )
          };
          
          console.log(`Campaign ${index}:`, campaign) // Debug log
          return campaign;
        }).filter(campaign => campaign.isActive);
        
        console.log("Formatted campaigns:", formattedCampaigns) // Debug log
        setCampaigns(formattedCampaigns)
      } catch (error) {
        console.error("Error formatting campaigns:", error)
      }
      setIsLoadingCampaigns(false)
    }
  }, [campaignsData, isLoading, error])

  const createNewCampaign = async (campaignData: { 
    owner: string; 
    title: string; 
    description: string; 
    target: any; // Changed from string to any to accept BigNumber
    deadline: number; 
    image: string; 
    profitDistributionPeriod: number 
  }) => {
    const { owner, title, description, target, deadline, image, profitDistributionPeriod } = campaignData;
    
    try {
      if (!contract) {
        throw new Error("Contract is not initialized");
      }
      const tx = await contract.call("createCampaign", [
        owner,
        title,
        description,
        target,
        deadline,
        image,
        profitDistributionPeriod
      ]);
      return tx;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

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