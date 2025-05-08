'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

const overviewFeatures = [
  { icon: <Shield className="w-5 h-5 text-yellow-400" />, text: "Kiểm toán smart contracts" },
  { icon: <Lock className="w-5 h-5 text-yellow-400" />, text: "Xác thực đa yếu tố" },
  { icon: <Shield className="w-5 h-5 text-yellow-400" />, text: "Mã hóa đầu cuối" },
  { icon: <Shield className="w-5 h-5 text-yellow-400" />, text: "Giám sát giao dịch 24/7" },
  { icon: <Shield className="w-5 h-5 text-yellow-400" />, text: "Bảo vệ chống tấn công DDoS" },
]

const accountSteps = [
  { title: "Mật khẩu mạnh", description: "Sử dụng mật khẩu phức tạp, không trùng lặp" },
  { title: "2FA", description: "Bật xác thực hai yếu tố cho tài khoản" },
  { title: "Khóa thiết bị", description: "Quản lý và giới hạn thiết bị truy cập" },
  { title: "Cảnh báo", description: "Theo dõi thông báo về hoạt động bất thường" },
]

const transactionSteps = [
  "Xác thực nhiều lớp cho giao dịch lớn",
  "Giới hạn giao dịch theo cấp độ tài khoản",
  "Theo dõi và phát hiện giao dịch bất thường",
  "Khóa tạm thời khi phát hiện rủi ro",
  "Backup và khôi phục dữ liệu"
]

const incidentSteps = [
  "Khóa tài khoản tạm thời",
  "Thông báo cho người dùng",
  "Điều tra nguyên nhân",
  "Áp dụng biện pháp khắc phục",
  "Báo cáo và cập nhật biện pháp phòng ngừa"
]

export default function SecurityPage() {
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
          Bảo Mật
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Các biện pháp bảo mật và bảo vệ trên BlockFund
        </p>

        {/* Tổng quan về bảo mật */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400 flex items-center gap-2">
            <Shield className="w-6 h-6 text-yellow-400" /> Tổng quan về bảo mật
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {overviewFeatures.map((f, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-black/70 border border-yellow-500/30 rounded-xl p-4 shadow">
                {f.icon}
                <span className="text-gray-200">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bảo mật tài khoản */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Bảo mật tài khoản</h2>
          <div className="space-y-3">
            {accountSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold text-lg border-2 border-yellow-400 shadow">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-1">{step.title}</h3>
                  <p className="text-gray-200">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bảo mật giao dịch */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Bảo mật giao dịch</h2>
          <div className="space-y-3">
            {transactionSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold text-lg border-2 border-yellow-400 shadow">
                  {idx + 1}
                </div>
                <span className="text-gray-200">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quy trình xử lý sự cố */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Quy trình xử lý sự cố</h2>
          <div className="space-y-3">
            {incidentSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-black font-bold text-lg border-2 border-yellow-400 shadow">
                  {idx + 1}
                </div>
                <span className="text-gray-200">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cảnh báo & Hỗ trợ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-bold text-red-500">Cảnh báo</h3>
            </div>
            <p className="text-gray-400">
              Không bao giờ chia sẻ mật khẩu, seed phrase hoặc private key với bất kỳ ai, 
              kể cả nhân viên của BlockFund
            </p>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-bold text-green-500">Hỗ trợ</h3>
            </div>
            <p className="text-gray-400">
              Nếu phát hiện vấn đề bảo mật, hãy liên hệ ngay với đội ngũ hỗ trợ của chúng tôi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}