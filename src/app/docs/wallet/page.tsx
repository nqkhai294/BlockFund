'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Wallet, CheckCircle2, Lock, Link2, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const walletTypes = [
  { name: "MetaMask", icon: "/wallets/metamask.png" },
  { name: "WalletConnect", icon: "/wallets/walletconnect.png" },
  { name: "Coinbase Wallet", icon: "/wallets/coinbase.png" },
  { name: "Trust Wallet", icon: "/wallets/trustwallet.png" },
]

const installSteps = [
  "Truy cập trang metamask.io",
  "Tải extension cho trình duyệt",
  "Tạo ví mới hoặc import ví hiện có",
  "Kết nối với mạng Ethereum",
  "Nạp ETH vào ví"
]

const connectSteps = [
  "Nhấn nút 'Kết nối ví' trên BlockFund",
  "Chọn loại ví muốn kết nối",
  "Xác nhận kết nối trong ví",
  "Kiểm tra trạng thái kết nối"
]

const securityTips = [
  { icon: <Lock className="w-5 h-5 text-yellow-400" />, text: "Lưu giữ seed phrase ở nơi an toàn, không chụp ảnh màn hình" },
  { icon: <Shield className="w-5 h-5 text-yellow-400" />, text: "Sử dụng mật khẩu mạnh và bật xác thực 2 yếu tố" },
  { icon: <CheckCircle2 className="w-5 h-5 text-yellow-400" />, text: "Kiểm tra kỹ các giao dịch trước khi ký" },
  { icon: <Link2 className="w-5 h-5 text-yellow-400" />, text: "Không chia sẻ thông tin ví với bất kỳ ai" }
]

export default function WalletPage() {
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
          Ví Tiền Điện Tử
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Hướng dẫn sử dụng ví điện tử với BlockFund
        </p>

        {/* Giới thiệu ví */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-yellow-400" /> Các loại ví phổ biến
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {walletTypes.map((w) => (
              <div key={w.name} className="flex flex-col items-center bg-black/70 border border-yellow-500/30 rounded-xl p-4 shadow">
                
                <span className="text-yellow-400 font-semibold">{w.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cài đặt MetaMask */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Cài đặt MetaMask</h2>
          <div className="space-y-3">
            {installSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold text-lg border-2 border-yellow-400 shadow">
                  {idx + 1}
                </div>
                <span className="text-gray-200">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kết nối ví */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Kết nối ví với BlockFund</h2>
          <div className="space-y-3">
            {connectSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold text-lg border-2 border-yellow-400 shadow">
                  {idx + 1}
                </div>
                <span className="text-gray-200">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bảo mật ví */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Bảo mật ví điện tử</h2>
          <div className="grid gap-4">
            {securityTips.map((tip, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black/70 border border-yellow-500/30 rounded-xl p-4 shadow">
                {tip.icon}
                <span className="text-gray-200">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}