'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FeaturesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Tính Năng</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Khám phá các tính năng mạnh mẽ của BlockFund
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Thêm nội dung tính năng ở đây */}
        </div>
      </div>
    </div>
  )
} 