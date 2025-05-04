'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Về Chúng Tôi</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            BlockFund là nền tảng huy động vốn phi tập trung hàng đầu, kết nối các dự án blockchain với cộng đồng nhà đầu tư toàn cầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sứ Mệnh Của Chúng Tôi</h2>
            <p className="text-gray-400">
              Chúng tôi tin rằng blockchain sẽ cách mạng hóa cách thức huy động vốn. Sứ mệnh của chúng tôi là tạo ra một nền tảng minh bạch, an toàn và hiệu quả để kết nối các dự án blockchain với cộng đồng nhà đầu tư toàn cầu.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Tầm Nhìn</h2>
            <p className="text-gray-400">
              Chúng tôi hướng đến việc trở thành nền tảng huy động vốn phi tập trung hàng đầu thế giới, nơi mọi dự án blockchain đều có cơ hội tiếp cận nguồn vốn cần thiết để phát triển.
            </p>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Tham Gia Cùng Chúng Tôi</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Bạn có ý tưởng dự án blockchain? Hãy bắt đầu huy động vốn ngay hôm nay!
          </p>
          <Button 
            onClick={() => router.push('/projects/create')}
            className="bg-hufa/90 text-black hover:bg-hufa"
          >
            Tạo Dự Án
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 