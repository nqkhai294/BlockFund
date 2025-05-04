'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight, Mail, MessageSquare, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SupportPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Hỗ Trợ</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-800 rounded-lg p-6 text-center">
            <Phone className="w-12 h-12 mx-auto mb-4 text-hufa" />
            <h3 className="text-xl font-bold mb-2">Hỗ Trợ Qua Điện Thoại</h3>
            <p className="text-gray-400 mb-4">+84 123 456 789</p>
            <p className="text-sm text-gray-500">Thứ 2 - Thứ 6: 9:00 - 18:00</p>
          </div>

          <div className="border border-gray-800 rounded-lg p-6 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-hufa" />
            <h3 className="text-xl font-bold mb-2">Hỗ Trợ Qua Email</h3>
            <p className="text-gray-400 mb-4">support@blockfund.com</p>
            <p className="text-sm text-gray-500">Phản hồi trong vòng 24h</p>
          </div>

          <div className="border border-gray-800 rounded-lg p-6 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-hufa" />
            <h3 className="text-xl font-bold mb-2">Chat Trực Tuyến</h3>
            <p className="text-gray-400 mb-4">Hỗ trợ 24/7</p>
            <Button
              variant="outline"
              className="mt-4"
            >
              Bắt Đầu Chat
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 