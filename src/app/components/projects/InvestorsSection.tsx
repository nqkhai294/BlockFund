'use client'

import { ethers } from 'ethers'
import Image from 'next/image'

interface InvestorsSectionProps {
  donators: string[]
  donations: string[]
  amountCollected: string
}

export function InvestorsSection({
  donators,
  donations,
  amountCollected
}: InvestorsSectionProps) {
  // Chuyển đổi amountCollected sang Wei để tính toán
  const totalAmount = ethers.utils.parseEther(amountCollected)

  return (
    <div className="space-y-4">
      {donators.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Chưa có nhà đầu tư nào</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Tổng số nhà đầu tư</h3>
              <p className="text-2xl font-bold text-amber-400">{donators.length}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Tổng số tiền đã đầu tư</h3>
              <p className="text-2xl font-bold text-amber-400">
                {amountCollected} ETH
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Top nhà đầu tư</h3>
            {donators
              .map((donator, index) => ({
                address: donator,
                amount: donations[index],
                date: new Date().toLocaleDateString("vi-VN")
              }))
              .sort((a, b) => {
                const amountA = ethers.BigNumber.from(a.amount)
                const amountB = ethers.BigNumber.from(b.amount)
                return amountA.gt(amountB) ? -1 : amountA.lt(amountB) ? 1 : 0
              })
              .map((donator, index) => {
                const donationAmount = ethers.BigNumber.from(donator.amount)
                const percentage = Number((donationAmount.mul(10000).div(totalAmount))) / 100

                return (
                  <div key={index} className="flex items-center justify-between rounded-lg bg-gray-800 p-4 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-lg font-bold text-amber-400">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{donator.address.slice(0, 6)}...{donator.address.slice(-4)}</p>
                        <p className="text-sm text-gray-400">
                          {donator.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-amber-400">
                        {ethers.utils.formatEther(donator.amount)} ETH
                      </p>
                      <p className="text-sm text-gray-400">
                        {percentage.toFixed(1)}% tổng số tiền
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
} 