export const daysLeft = (deadline: number) => {
  try {
    // Chuyển đổi deadline từ seconds sang milliseconds
    const deadlineDate = new Date(deadline * 1000)
    const currentDate = new Date()
    
    // Tính số ngày còn lại
    const diffTime = deadlineDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays <= 0 ? 0 : diffDays
  } catch (error) {
    console.error('Error calculating days left:', error)
    return 0
  }
}

export const calculateBarPercentage = (target: string, collected: string) => {
  try {
    const percentage = (Number(collected) / Number(target)) * 100
    return percentage > 100 ? 100 : percentage
  } catch (error) {
    console.error('Error calculating percentage:', error)
    return 0
  }
}

export const checkIfImage = (url: string, callback: (isImage: boolean) => void) => {
  const img = new Image()
  img.src = url

  if (img.complete) callback(true)

  img.onload = () => callback(true)
  img.onerror = () => callback(false)
} 