'use client'

import { Button } from "@/app/components/ui/button"
import { FaBook, FaNewspaper, FaQuestionCircle, FaHeadset, FaArrowRight } from "react-icons/fa"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"

const supportResources = [
  {
    title: "Tài liệu",
    description: "Hướng dẫn chi tiết về cách sử dụng BlockFund, từ việc tạo dự án đến quản lý chiến dịch gọi vốn.",
    icon: FaBook,
    features: [
      "Hướng dẫn bắt đầu",
      "API Documentation",
      "Smart Contract Guides",
    ],
    link: "/docs"
  },
  {
    title: "Blog",
    description: "Cập nhật tin tức, hướng dẫn và thông tin chi tiết về thị trường crowdfunding blockchain.",
    icon: FaNewspaper,
    features: [
      "Tin tức mới nhất",
      "Case Studies",
      "Market Insights",
     
    ],
    link: "/blog"
  },
  {
    title: "FAQ",
    description: "Tìm câu trả lời cho các câu hỏi thường gặp về BlockFund và crowdfunding blockchain.",
    icon: FaQuestionCircle,
    features: [
      "Câu hỏi thường gặp",
      "Hướng dẫn khắc phục sự cố",
      "Quy trình hoạt động",
      
    ],
    link: "/faq"
  },
  {
    title: "Hỗ trợ",
    description: "Liên hệ với đội ngũ hỗ trợ của chúng tôi để được giúp đỡ với bất kỳ vấn đề nào.",
    icon: FaHeadset,
    features: [
      "Hỗ trợ 24/7",
      "Live Chat",
      "Email Support",
      
    ],
    link: "/support"
  }
]

const ResourceCard = ({ title, description, icon: Icon, features, link }: any) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-border/30"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-hufa/90 rounded-lg">
          <Icon className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      
      <p className="text-muted-foreground">{description}</p>
      
      <ul className="space-y-2">
        {features.map((feature: any, index: any) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-1.5 h-1.5 bg-hufa/90 rounded-full" />
            {feature}
          </li>
        ))}
      </ul>

      <Link 
        href={link}
        className="inline-flex items-center gap-2 text-hufa hover:text-hufa/80 transition-colors mt-4"
      >
        <span>Tìm hiểu thêm</span>
        <FaArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  )
}

export default function ServicesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Tài Nguyên & Hỗ Trợ</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tìm hiểu thêm về BlockFund và nhận hỗ trợ khi cần thiết
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {supportResources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>

        <div className="bg-secondary/30 backdrop-blur-sm rounded-xl p-8 border border-border/30 mb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Cần hỗ trợ thêm?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-hufa text-black px-8 py-3 rounded-lg font-semibold hover:bg-hufa/90 transition-colors"
                onClick={() => router.push('/support')}
              >
                Liên hệ hỗ trợ
              </Button>
              <Button 
                variant="outline"
                className="border-hufa text-hufa hover:bg-hufa/10 px-8 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => router.push('/faq')}
              >
                Xem FAQ
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Tài liệu hướng dẫn</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Khám phá các tài liệu hướng dẫn chi tiết về cách sử dụng BlockFund
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/docs/getting-started"
              className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-hufa/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">Bắt đầu</h3>
              <p className="text-gray-400">Hướng dẫn cơ bản để bắt đầu với BlockFund</p>
            </Link>

            <Link 
              href="/docs/api"
              className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-hufa/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">API Reference</h3>
              <p className="text-gray-400">Tài liệu chi tiết về BlockFund API</p>
            </Link>

            <Link 
              href="/docs/smart-contracts"
              className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-hufa/50 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-2">Smart Contracts</h3>
              <p className="text-gray-400">Hướng dẫn về smart contracts và blockchain</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 