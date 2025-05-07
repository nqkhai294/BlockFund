'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight, Book, Code, FileText, Shield, Wallet, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/app/components/ui/input"
import { motion } from "framer-motion"
import { useState } from "react"

const docs = [
  {
    title: "Bắt Đầu",
    description: "Hướng dẫn cơ bản để bắt đầu với BlockFund",
    icon: <Book className="w-6 h-6" />,
    link: "/docs/getting-started",
    category: "Cơ bản"
  },
  {
    title: "Smart Contracts",
    description: "Tài liệu về các smart contracts của BlockFund",
    icon: <Code className="w-6 h-6" />,
    link: "/docs/smart-contracts",
    category: "Kỹ thuật"
  },
  {
    title: "Ví Tiền Điện Tử",
    description: "Hướng dẫn kết nối và sử dụng ví tiền điện tử",
    icon: <Wallet className="w-6 h-6" />,
    link: "/docs/wallet",
    category: "Cơ bản"
  },
  {
    title: "Bảo Mật",
    description: "Các biện pháp bảo mật và an toàn trên BlockFund",
    icon: <Shield className="w-6 h-6" />,
    link: "/docs/security",
    category: "Bảo mật"
  },
  {
    title: "API",
    description: "Tài liệu API để tích hợp với BlockFund",
    icon: <FileText className="w-6 h-6" />,
    link: "/docs/api",
    category: "Kỹ thuật"
  }
]

const categories = ["Tất cả", "Cơ bản", "Kỹ thuật", "Bảo mật"]

export default function DocsPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = docs.filter(doc => {
    const matchesCategory = selectedCategory === "Tất cả" || doc.category === selectedCategory
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold">Tài Liệu</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tìm hiểu cách sử dụng BlockFund thông qua tài liệu chi tiết
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-hufa text-black" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Docs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border/30"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-hufa/90 rounded-lg">
                  {doc.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{doc.title}</h2>
                  <span className="text-sm text-hufa">{doc.category}</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">{doc.description}</p>
              <Button
                variant="outline"
                onClick={() => router.push(doc.link)}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                Xem Tài Liệu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 