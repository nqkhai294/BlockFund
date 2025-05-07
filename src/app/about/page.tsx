'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight, Users, Globe, Shield, Rocket } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()

  const features = [
    {
      icon: <Users className="w-8 h-8 text-hufa" />,
      title: "Cộng Đồng Mạnh Mẽ",
      description: "Kết nối với hàng nghìn nhà đầu tư và dự án blockchain trên toàn cầu"
    },
    {
      icon: <Globe className="w-8 h-8 text-hufa" />,
      title: "Toàn Cầu Hóa",
      description: "Hỗ trợ đa ngôn ngữ và đa tiền tệ, phục vụ cộng đồng quốc tế"
    },
    {
      icon: <Shield className="w-8 h-8 text-hufa" />,
      title: "Bảo Mật Tối Đa",
      description: "Smart contracts được kiểm toán, bảo mật đa lớp cho mọi giao dịch"
    },
    {
      icon: <Rocket className="w-8 h-8 text-hufa" />,
      title: "Đổi Mới Liên Tục",
      description: "Cập nhật và cải tiến không ngừng để mang đến trải nghiệm tốt nhất"
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-hufa to-purple-500 bg-clip-text text-transparent">
            BlockFund
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Nền tảng huy động vốn phi tập trung hàng đầu, kết nối các dự án blockchain với cộng đồng nhà đầu tư toàn cầu
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-hufa/50 transition-colors">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-4xl font-bold text-hufa mb-2">100+</div>
            <div className="text-gray-400">Dự án Thành Công</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-hufa mb-2">$10M+</div>
            <div className="text-gray-400">Tổng Vốn Huy Động</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-hufa mb-2">50K+</div>
            <div className="text-gray-400">Nhà Đầu Tư</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-hufa mb-2">20+</div>
            <div className="text-gray-400">Quốc Gia</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Bắt Đầu Hành Trình Của Bạn</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tham gia vào cộng đồng BlockFund ngay hôm nay để khám phá các cơ hội đầu tư hoặc huy động vốn cho dự án của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push('/projects')}
              className="bg-hufa/90 text-black hover:bg-hufa"
            >
              Khám Phá Dự Án
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              onClick={() => router.push('/create-project ')}
              variant="outline"
              className="border-hufa text-hufa hover:bg-hufa/10"
            >
              Tạo Dự Án
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 