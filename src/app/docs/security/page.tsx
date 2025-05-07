'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Shield, Lock, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

const sections = [
  {
    title: "Tổng quan về bảo mật",
    content: `
      BlockFund cam kết bảo vệ an toàn cho người dùng và dự án thông qua:

      - Kiểm toán smart contracts
      - Xác thực đa yếu tố
      - Mã hóa đầu cuối
      - Giám sát giao dịch 24/7
      - Bảo vệ chống tấn công DDoS
    `
  },
  {
    title: "Bảo mật tài khoản",
    steps: [
      {
        title: "Mật khẩu mạnh",
        description: "Sử dụng mật khẩu phức tạp, không trùng lặp"
      },
      {
        title: "2FA",
        description: "Bật xác thực hai yếu tố cho tài khoản"
      },
      {
        title: "Khóa thiết bị",
        description: "Quản lý và giới hạn thiết bị truy cập"
      },
      {
        title: "Cảnh báo",
        description: "Theo dõi thông báo về hoạt động bất thường"
      }
    ]
  },
  {
    title: "Bảo mật giao dịch",
    content: `
      Các biện pháp bảo vệ giao dịch:

      1. Xác thực nhiều lớp cho giao dịch lớn
      2. Giới hạn giao dịch theo cấp độ tài khoản
      3. Theo dõi và phát hiện giao dịch bất thường
      4. Khóa tạm thời khi phát hiện rủi ro
      5. Backup và khôi phục dữ liệu
    `
  },
  {
    title: "Quy trình xử lý sự cố",
    content: `
      Khi phát hiện sự cố bảo mật:

      1. Khóa tài khoản tạm thời
      2. Thông báo cho người dùng
      3. Điều tra nguyên nhân
      4. Áp dụng biện pháp khắc phục
      5. Báo cáo và cập nhật biện pháp phòng ngừa
    `
  }
]

export default function SecurityPage() {
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
            <h1 className="text-4xl font-bold mb-4">Bảo Mật</h1>
            <p className="text-xl text-gray-400">
              Các biện pháp bảo mật và bảo vệ trên BlockFund
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.steps ? (
                <div className="grid gap-4">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-4 bg-gray-800/50 p-4 rounded-lg">
                      <div className="bg-hufa/90 p-2 rounded-lg">
                        <Shield className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{step.title}</h3>
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="prose prose-invert">
                  <pre className="bg-gray-800 p-4 rounded-lg">
                    <code className="text-gray-300 whitespace-pre-line">{section.content}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}

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
    </div>
  )
}