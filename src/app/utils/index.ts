import { BigNumber } from 'ethers'

export const calculateBarPercentage = (goal: BigNumber, raisedAmount: BigNumber) => {
  const percentage = Math.round((Number(raisedAmount) * 100) / Number(goal))
  return percentage > 100 ? 100 : percentage
}

export const daysLeft = (deadline: number) => {
  const difference = new Date(deadline * 1000).getTime() - Date.now()
  const remainingDays = difference / (1000 * 60 * 60 * 24)
  return remainingDays.toFixed(0)
}

export const checkIfImage = (url: string, callback: (isImage: boolean) => void) => {
  const img = new Image()
  img.src = url

  if (img.complete) callback(true)

  img.onload = () => callback(true)
  img.onerror = () => callback(false)
} 