'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

const sections = [
  {
    title: "Giới thiệu về BlockFund",
    content: `
      BlockFund là nền tảng gọi vốn cộng đồng phi tập trung trên blockchain. 
      Chúng tôi cung cấp:

      - Gọi vốn an toàn và minh bạch
      - Smart contracts được kiểm toán
      - Quản lý dự án hiệu quả
      - Cộng đồng nhà đầu tư lớn mạnh
    `
  },
  {
    title: "Các bước bắt đầu",
    steps: [
      {
        title: "Tạo tài khoản",
        description: "Đăng ký tài khoản BlockFund với email hoặc ví điện tử"
      },
      {
        title: "Kết nối ví",
        description: "Kết nối ví MetaMask hoặc các ví tương thích khác"
      },
      {
        title: "Xác minh danh tính",
        description: "Hoàn thành quy trình KYC để bắt đầu gọi vốn"
      },
      {
        title: "Tạo dự án",
        description: "Tạo dự án với thông tin chi tiết và mục tiêu gọi vốn"
      }
    ]
  },
  {
    title: "Tạo dự án đầu tiên",
    content: `
      Để tạo dự án mới:

      1. Truy cập trang "Tạo dự án"
      2. Điền thông tin dự án:
         - Tên dự án
         - Mô tả chi tiết
         - Mục tiêu gọi vốn
         - Thời hạn
         - Tỉ lệ chia sẻ lợi nhuận
      3. Tải lên tài liệu dự án
      4. Xác nhận và triển khai smart contract
    `
  },
  {
    title: "Quản lý dự án",
    content: `
      Sau khi tạo dự án:

      - Theo dõi tiến độ gọi vốn
      - Cập nhật thông tin dự án
      - Tương tác với nhà đầu tư
      - Quản lý và phân phối lợi nhuận
      - Báo cáo định kỳ
    `
  }
]

export default function GettingStartedPage() {
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
            <h1 className="text-4xl font-bold mb-4">Bắt Đầu với BlockFund</h1>
            <p className="text-xl text-gray-400">
              Hướng dẫn từng bước để bắt đầu sử dụng BlockFund
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
                        <CheckCircle2 className="w-5 h-5 text-black" />
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

          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-4">Bước tiếp theo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/docs/wallet')}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                Tìm hiểu về ví điện tử
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/docs/smart-contracts')}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                Tìm hiểu về Smart Contracts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}