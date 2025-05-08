'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowRight, FileText, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const blogPosts: {
  title: string
  description: string
  date: string
  slug: string
}[] = [
  {
    title: "Cập nhật BlockFund 2024",
    description: "Những thay đổi lớn trong hệ sinh thái BlockFund, cập nhật tính năng và định hướng phát triển mới cho cộng đồng.",
    date: "2024-06-01",
    slug: "cap-nhat-blockfund-2024"
  },
  {
    title: "Hướng dẫn bảo mật ví điện tử",
    description: "Các bước bảo mật ví điện tử khi tham gia đầu tư và gọi vốn trên nền tảng blockchain.",
    date: "2024-05-20",
    slug: "huong-dan-bao-mat-vi"
  },
  {
    title: "Blockchain và tương lai gọi vốn cộng đồng",
    description: "Phân tích xu hướng ứng dụng blockchain trong lĩnh vực gọi vốn cộng đồng và những lợi ích vượt trội.",
    date: "2024-05-10",
    slug: "blockchain-va-tuong-lai-goi-von"
  }
]

export default function BlogPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Cập nhật tin tức và kiến thức mới nhất về blockchain và huy động vốn
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <FileText className="w-16 h-16 text-yellow-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">Chưa có bài viết nào</h2>
            <p className="text-gray-400 mb-6">Hãy quay lại sau để xem các bài viết mới nhất về BlockFund và blockchain!</p>
            {/* Nếu bạn muốn cho phép tạo bài viết mới, bỏ comment dòng dưới */}
            {/* <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-3 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400 flex items-center gap-2"
              onClick={() => router.push('/blog/create')}
            >
              <PlusCircle className="w-5 h-5" />
              Tạo bài viết mới
            </Button> */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-black/70 border border-yellow-500/30 rounded-xl p-6 shadow-lg flex flex-col justify-between hover:border-yellow-400 transition-all duration-200"
              >
                <div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4">{post.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">{post.date}</span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-4 py-2 rounded-2xl shadow hover:scale-105 transition-all duration-200 border border-yellow-400 flex items-center gap-2"
                    onClick={() => router.push(`/blog/${post.slug}`)}
                  >
                    Đọc tiếp
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}