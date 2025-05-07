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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <h1 className="text-4xl font-bold mb-4">Smart Contracts</h1>
            <p className="text-xl text-gray-400">
              Tài liệu chi tiết về các smart contracts của BlockFund
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <div className="prose prose-invert">
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <code className="text-gray-300 whitespace-pre-line">{section.content}</code>
                </pre>
              </div>
            </div>
          ))}

          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-4">Tài liệu liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/docs/api')}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                Tài liệu API
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/docs/security')}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                Bảo mật
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}