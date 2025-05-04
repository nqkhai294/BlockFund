'use client'

import { FileText, Wallet, Rocket, CheckCircle } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Tạo Dự Án",
      description: "Đăng ký và tạo dự án của bạn với thông tin chi tiết về mục tiêu và kế hoạch"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Kết Nối Ví",
      description: "Kết nối ví MetaMask để có thể nhận tiền ủng hộ và quản lý dự án"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Khởi Chạy",
      description: "Bắt đầu chiến dịch huy động vốn và chia sẻ dự án của bạn với cộng đồng"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Hoàn Thành",
      description: "Khi đạt được mục tiêu, bạn có thể rút tiền và bắt đầu thực hiện dự án"
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Cách Thức Hoạt Động</h2>
        <p className="text-muted-foreground">Chỉ với 4 bước đơn giản để bắt đầu huy động vốn cho dự án của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div 
            key={index}
            className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-border/30"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-hufa/90 rounded-lg">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks 