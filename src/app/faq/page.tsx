'use client'

import { useState } from "react"

const faqs = [
  {
    question: "BlockFund là gì?",
    answer: "BlockFund là nền tảng huy động vốn phi tập trung (DeFi) cho các dự án blockchain. Chúng tôi kết nối các dự án với cộng đồng nhà đầu tư thông qua smart contracts."
  },
  {
    question: "Làm thế nào để tạo dự án trên BlockFund?",
    answer: "Để tạo dự án, bạn cần kết nối ví tiền điện tử của mình, điền thông tin dự án, đặt mục tiêu huy động vốn và thời hạn. Sau khi được phê duyệt, dự án của bạn sẽ được hiển thị trên nền tảng."
  },
  {
    question: "Tôi có thể đầu tư vào dự án như thế nào?",
    answer: "Bạn có thể đầu tư vào bất kỳ dự án nào bằng cách kết nối ví tiền điện tử và sử dụng token của dự án. Tất cả giao dịch đều được thực hiện thông qua smart contracts để đảm bảo minh bạch."
  },
  {
    question: "Phí sử dụng nền tảng là bao nhiêu?",
    answer: "BlockFund thu phí 2% trên tổng số tiền huy động được thành công. Phí này được sử dụng để duy trì và phát triển nền tảng."
  },
  {
    question: "Làm thế nào để đảm bảo an toàn cho khoản đầu tư?",
    answer: "Chúng tôi sử dụng smart contracts để quản lý tất cả các giao dịch. Mỗi dự án đều được kiểm tra kỹ lưỡng trước khi được phê duyệt. Tuy nhiên, đầu tư luôn có rủi ro, vì vậy bạn nên nghiên cứu kỹ trước khi đầu tư."
  },
  {
    question: "Tôi có thể rút tiền đầu tư không?",
    answer: "Một khi bạn đã đầu tư vào dự án, bạn không thể rút tiền trực tiếp. Tuy nhiên, bạn có thể bán token của dự án trên các sàn giao dịch nếu dự án có token giao dịch."
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Câu Hỏi Thường Gặp</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tìm câu trả lời cho những câu hỏi phổ biến về BlockFund
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-yellow-500/20 rounded-lg overflow-hidden bg-black/40 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-yellow-500/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-yellow-400">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform text-yellow-400 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-yellow-500/5 border-t border-yellow-500/20">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 