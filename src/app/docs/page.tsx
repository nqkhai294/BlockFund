'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight, Book, Code, FileText, Shield, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"

const docs = [
  {
    title: "Bắt Đầu",
    description: "Hướng dẫn cơ bản để bắt đầu với BlockFund",
    icon: <Book className="w-6 h-6" />,
    link: "/docs/getting-started"
  },
  {
    title: "Smart Contracts",
    description: "Tài liệu về các smart contracts của BlockFund",
    icon: <Code className="w-6 h-6" />,
    link: "/docs/smart-contracts"
  },
  {
    title: "Ví Tiền Điện Tử",
    description: "Hướng dẫn kết nối và sử dụng ví tiền điện tử",
    icon: <Wallet className="w-6 h-6" />,
    link: "/docs/wallet"
  },
  {
    title: "Bảo Mật",
    description: "Các biện pháp bảo mật và an toàn trên BlockFund",
    icon: <Shield className="w-6 h-6" />,
    link: "/docs/security"
  },
  {
    title: "API",
    description: "Tài liệu API để tích hợp với BlockFund",
    icon: <FileText className="w-6 h-6" />,
    link: "/docs/api"
  }
]

export default function DocsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Tài Liệu</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tìm hiểu cách sử dụng BlockFund thông qua tài liệu chi tiết
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, index) => (
            <div 
              key={index}
              className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  {doc.icon}
                </div>
                <h2 className="text-xl font-bold">{doc.title}</h2>
              </div>
              <p className="text-gray-400 mb-6">{doc.description}</p>
              <Button
                variant="outline"
                onClick={() => router.push(doc.link)}
                className="w-full"
              >
                Xem Tài Liệu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 