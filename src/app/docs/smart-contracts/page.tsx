'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Code } from "lucide-react"
import { useRouter } from "next/navigation"

const sections = [
  {
    title: "Smart Contracts của BlockFund",
    content: `
      BlockFund sử dụng hệ thống smart contracts để đảm bảo tính minh bạch và an toàn cho các giao dịch. 
      Các smart contracts chính bao gồm:
      
      - CrowdfundingFactory: Contract quản lý việc tạo các chiến dịch mới
      - CrowdfundingCampaign: Contract cho từng chiến dịch gọi vốn
      - TokenDistribution: Contract quản lý phân phối token
      - ProfitSharing: Contract quản lý chia sẻ lợi nhuận
    `
  },
  {
    title: "Cấu trúc Smart Contracts",
    content: `
      1. CrowdfundingFactory
         - createCampaign()
         - getCampaigns()
         - updateCampaign()
      
      2. CrowdfundingCampaign
         - contribute()
         - withdrawFunds()
         - refund()
         - updateStatus()
      
      3. TokenDistribution
         - distributeTokens()
         - claimTokens()
         - getTokenBalance()
      
      4. ProfitSharing
         - distributeProfits()
         - claimProfits()
         - updateProfitShare()
    `
  },
  {
    title: "Tương tác với Smart Contracts",
    content: `
      Để tương tác với smart contracts, bạn cần:
      
      1. Kết nối ví điện tử (MetaMask)
      2. Có đủ ETH để thanh toán gas fee
      3. Gọi các functions thông qua Web3 provider
      4. Xử lý các events từ contracts
    `
  },
  {
    title: "Bảo mật Smart Contracts",
    content: `
      Các biện pháp bảo mật được áp dụng:
      
      - Kiểm toán bởi các đơn vị uy tín
      - Multi-signature wallet
      - Time-locks cho các thao tác quan trọng
      - Emergency stop mechanism
      - Access control và role-based permissions
    `
  }
]

export default function SmartContractsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Smart Contracts
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Tài liệu chi tiết về các smart contracts của BlockFund
        </p>

        <div className="space-y-10 mb-16">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold mb-3 text-yellow-400 flex items-center gap-2">
                <Code className="w-6 h-6 text-yellow-400" /> {section.title}
              </h2>
              <div className="bg-black/70 border border-yellow-500/30 rounded-xl p-6 shadow-lg overflow-x-auto">
                <pre className="text-gray-200 text-sm whitespace-pre-line font-mono">
                  {section.content.trim()}
                </pre>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-10 py-4 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
            onClick={() => router.push('/docs/api')}
          >
            Xem tài liệu API
          </Button>
        </div>
      </div>
    </div>
  )
}