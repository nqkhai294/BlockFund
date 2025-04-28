'use client'

import React, { createContext, useContext, useState } from 'react'

interface StateContextType {
  address: string
  contract: any
  connect: () => Promise<void>
  createCampaign: (form: any) => Promise<void>
  getCampaigns: () => Promise<any[]>
  getUserCampaigns: () => Promise<any[]>
  donate: (pId: number, amount: string) => Promise<void>
  getDonations: (pId: number) => Promise<any[]>
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export const StateContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState('')
  const [contract, setContract] = useState(null)

  const connect = async () => {
    try {
      // Implement wallet connection logic here
    } catch (error) {
      console.log('Error connecting to wallet:', error)
    }
  }

  const createCampaign = async (form: any) => {
    try {
      // Implement campaign creation logic here
    } catch (error) {
      console.log('Error creating campaign:', error)
    }
  }

  const getCampaigns = async () => {
    try {
      // Implement get campaigns logic here
      return []
    } catch (error) {
      console.log('Error getting campaigns:', error)
      return []
    }
  }

  const getUserCampaigns = async () => {
    try {
      // Implement get user campaigns logic here
      return []
    } catch (error) {
      console.log('Error getting user campaigns:', error)
      return []
    }
  }

  const donate = async (pId: number, amount: string) => {
    try {
      // Implement donation logic here
    } catch (error) {
      console.log('Error donating:', error)
    }
  }

  const getDonations = async (pId: number) => {
    try {
      // Implement get donations logic here
      return []
    } catch (error) {
      console.log('Error getting donations:', error)
      return []
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => {
  const context = useContext(StateContext)
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateContextProvider')
  }
  return context
} 