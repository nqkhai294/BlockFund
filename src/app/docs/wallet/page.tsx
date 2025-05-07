'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const sections = [
  {
    title: "Giới thiệu về ví điện tử",
    content: `
      Ví điện tử là công cụ quan trọng để tương tác với blockchain. Trong BlockFund, 
      chúng tôi hỗ trợ các ví phổ biến như:
      
      - MetaMask
      - WalletConnect
      - Coinbase Wallet
      - Trust Wallet
    `
  },
  {
    title: "Cài đặt MetaMask",
    content: `
      1. Truy cập metamask.io
      2. Tải extension cho trình duyệt
      3. Tạo ví mới hoặc import ví hiện có
      4. Kết nối với mạng Ethereum
      5. Nạp ETH vào ví
    `
  },
  {
    title: "Kết nối ví với BlockFund",
    content: `
      1. Nhấn nút "Kết nối ví" trên BlockFund
      2. Chọn loại ví muốn kết nối
      3. Xác nhận kết nối trong ví
      4. Kiểm tra trạng thái kết nối
    `
  },
  {
    title: "Bảo mật ví điện tử",
    content: `
      - Lưu giữ seed phrase an toàn
      - Sử dụng mật khẩu mạnh
      - Bật xác thực 2 yếu tố
      - Kiểm tra kỹ các giao dịch trước khi ký
      - Không chia sẻ thông tin ví với người khác
    `
  }
]

export default function WalletPage() {
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
            <h1 className="text-4xl font-bold mb-4">Ví Tiền Điện Tử</h1>
            <p className="text-xl text-gray-400">
              Hướng dẫn sử dụng ví điện tử với BlockFund
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              <div className="prose prose-invert">
                <pre className="bg-gray-800 p-4 rounded-lg">
                  <code className="text-gray-300 whitespace-pre-line">{section.content}</code>
                </pre>
              </div>
            </div>
          ))}

          
        </div>
      </div>
    </div>
  )
}