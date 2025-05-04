'use client'

import { Copy, ExternalLink } from 'lucide-react'
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
    <div className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 space-y-6 border border-border/30">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">HUFA Token</h2>
        <p className="text-muted-foreground leading-relaxed">
          Tham gia vào hành trình phát triển của BlockFund bằng cách sở hữu token HUFA. Mỗi token bạn nắm giữ không chỉ là một khoản đầu tư, mà còn là sự ủng hộ cho tương lai của nền tảng huy động vốn phi tập trung.
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Token Contract Address (BSC)</h3>
          <div className="flex items-center gap-2">
            <code className="bg-muted/30 px-4 py-2.5 rounded-lg text-foreground flex-1 font-mono text-sm">
              {tokenAddress}
            </code>
            <button
              onClick={() => copyToClipboard(tokenAddress)}
              className="p-2.5 hover:bg-muted/30 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Donation Address</h3>
          <div className="flex items-center gap-2">
            <code className="bg-muted/30 px-4 py-2.5 rounded-lg text-foreground flex-1 font-mono text-sm">
              {donationAddress}
            </code>
            <button
              onClick={() => copyToClipboard(donationAddress)}
              className="p-2.5 hover:bg-muted/30 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={`https://bscscan.com/token/${tokenAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-hufa/90 text-black px-4 py-2.5 rounded-lg hover:bg-hufa transition-colors font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View on BscScan</span>
        </a>
        <a
          href={pancakeSwapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-hufa/90 text-black px-4 py-2.5 rounded-lg hover:bg-hufa transition-colors font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Buy on PancakeSwap</span>
        </a>
      </div>
    </div>
  )
}

export default TokenInfo 