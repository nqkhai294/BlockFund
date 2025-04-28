'use client'

import { Copy } from 'lucide-react'
import { useState } from 'react'

const TokenInfo = () => {
  const [copied, setCopied] = useState(false)
  const tokenAddress = '0xb99192491aB525d7b1775b95A2560b8095B89B89'
  const donationAddress = '0x9eD54f75893Fa84f1aAC8a3a883fdDaF42c79Dae'
  const pancakeSwapLink = 'https://pancakeswap.finance/swap?outputCurrency=0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82&inputCurrency=0xb99192491aB525d7b1775b95A2560b8095B89B89'

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">HUFA Token</h2>
        <p className="text-gray-400">
          Tham gia vào hành trình phát triển của BlockFund bằng cách sở hữu token HUFA. Mỗi token bạn nắm giữ không chỉ là một khoản đầu tư, mà còn là sự ủng hộ cho tương lai của nền tảng huy động vốn phi tập trung. Nếu bạn muốn ủng hộ chúng tôi, hãy chuyển token HUFA của bạn đến địa chỉ sau:
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Token Contract Address (BSC)</h3>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900 px-3 py-2 rounded-lg text-gray-300 flex-1">
              {tokenAddress}
            </code>
            <button
              onClick={() => copyToClipboard(tokenAddress)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Donation Address</h3>
          <div className="flex items-center gap-2">
            <code className="bg-gray-900 px-3 py-2 rounded-lg text-gray-300 flex-1">
              {donationAddress}
            </code>
            <button
              onClick={() => copyToClipboard(donationAddress)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <a
          href={`https://bscscan.com/token/${tokenAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg text-center hover:bg-amber-600 transition-colors"
        >
          View on BscScan
        </a>
        <a
          href={pancakeSwapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg text-center hover:bg-amber-600 transition-colors"
        >
          Buy on PancakeSwap
        </a>
      </div>
    </div>
  )
}

export default TokenInfo 