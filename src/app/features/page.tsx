'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight, Wallet, Shield, Users, Coins, ChartBar, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-black/40 border border-gray-800 rounded-xl p-6 overflow-hidden transition-all duration-300 ${
        isHovered ? "transform scale-[1.02] shadow-lg shadow-yellow-500/10" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl" />
      )}
      <div className="relative z-10">
        <div className="bg-gray-800/80 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-yellow-500 mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>
  );
};

export default function FeaturesPage() {
  const router = useRouter()

  const features = [
    {
      icon: <Wallet className="w-6 h-6 text-yellow-400" />,
      title: "Ví Điện Tử Tích Hợp",
      description: "Tích hợp ví điện tử an toàn, cho phép người dùng quản lý và thực hiện giao dịch một cách dễ dàng."
    },
    {
      icon: <Shield className="w-6 h-6 text-yellow-400" />,
      title: "Bảo Mật Blockchain",
      description: "Sử dụng công nghệ blockchain để đảm bảo tính minh bạch và an toàn cho mọi giao dịch."
    },
    {
      icon: <Users className="w-6 h-6 text-yellow-400" />,
      title: "Cộng Đồng Toàn Cầu",
      description: "Kết nối người dùng từ khắp nơi trên thế giới, tạo ra một cộng đồng gây quỹ phi tập trung."
    },
    {
      icon: <Coins className="w-6 h-6 text-yellow-400" />,
      title: "Đa Dạng Tiền Tệ",
      description: "Hỗ trợ nhiều loại tiền điện tử, cho phép người dùng linh hoạt trong việc quyên góp."
    },
    {
      icon: <ChartBar className="w-6 h-6 text-yellow-400" />,
      title: "Theo Dõi Tiến Độ",
      description: "Công cụ theo dõi tiến độ chiến dịch trực quan, giúp người dùng nắm rõ tình hình gây quỹ."
    },
    {
      icon: <Globe className="w-6 h-6 text-yellow-400" />,
      title: "Phi Tập Trung",
      description: "Nền tảng hoàn toàn phi tập trung, không có bên trung gian, giảm thiểu chi phí và rủi ro."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Tính Năng</h1>
          <h2 className="text-xl md:text-2xl font-semibold text-yellow-500 mb-3">Platform Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Khám phá các tính năng mạnh mẽ của BlockFund
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button 
            onClick={() => router.push('/projects')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
          >
            Bắt Đầu Ngay
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
} 