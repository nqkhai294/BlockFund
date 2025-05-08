'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
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

export default function GettingStartedPage() {
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
          Bắt Đầu với BlockFund
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Hướng dẫn từng bước để bắt đầu sử dụng nền tảng gọi vốn phi tập trung BlockFund.
        </p>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Giới thiệu</h2>
          <div className="bg-black/60 border border-yellow-500/30 rounded-xl p-6 shadow-lg">
            <p className="text-gray-200 mb-2">
              <span className="font-semibold text-yellow-400">BlockFund</span> là nền tảng gọi vốn cộng đồng phi tập trung trên blockchain, cung cấp:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Gọi vốn an toàn và minh bạch</li>
              <li>Smart contracts được kiểm toán</li>
              <li>Quản lý dự án hiệu quả</li>
              <li>Cộng đồng nhà đầu tư lớn mạnh</li>
            </ul>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">Các bước bắt đầu</h2>
          <div className="grid gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-black/70 border border-yellow-500/30 rounded-xl p-5 shadow-lg hover:border-yellow-400 transition-all duration-200"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-400 shadow text-black text-2xl font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-yellow-400 mb-1">{step.title}</h3>
                  <p className="text-gray-200">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Tạo dự án đầu tiên</h2>
          <div className="bg-black/60 border border-yellow-500/30 rounded-xl p-6 shadow-lg">
            <ol className="list-decimal pl-6 text-gray-300 space-y-1">
              <li>Truy cập trang <span className="text-yellow-400 font-semibold">Tạo dự án</span></li>
              <li>Điền thông tin dự án: tên, mô tả, mục tiêu, thời hạn, tỉ lệ chia sẻ lợi nhuận</li>
              <li>Tải lên tài liệu dự án</li>
              <li>Xác nhận và triển khai smart contract</li>
            </ol>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Quản lý dự án</h2>
          <div className="bg-black/60 border border-yellow-500/30 rounded-xl p-6 shadow-lg">
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Theo dõi tiến độ gọi vốn</li>
              <li>Cập nhật thông tin dự án</li>
              <li>Tương tác với nhà đầu tư</li>
              <li>Quản lý và phân phối lợi nhuận</li>
              <li>Báo cáo định kỳ</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-10 py-4 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
            onClick={() => router.push('/projects')}
          >
            Khám phá các dự án ngay
          </Button>
        </div>
      </div>
    </div>
  )
}