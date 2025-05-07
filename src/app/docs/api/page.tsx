'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Code, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/projects",
    description: "Lấy danh sách dự án",
    example: `
      fetch('https://api.blockfund.com/api/projects')
        .then(response => response.json())
        .then(data => console.log(data))
    `
  },
  {
    method: "POST",
    endpoint: "/api/projects/create",
    description: "Tạo dự án mới",
    example: `
      fetch('https://api.blockfund.com/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          title: 'Dự án mới',
          description: 'Mô tả dự án',
          target: '10',
          deadline: '2024-12-31'
        })
      })
    `
  },
  {
    method: "GET",
    endpoint: "/api/projects/:id",
    description: "Lấy thông tin chi tiết dự án",
    example: `
      fetch('https://api.blockfund.com/api/projects/123')
        .then(response => response.json())
        .then(data => console.log(data))
    `
  },
  {
    method: "POST",
    endpoint: "/api/invest",
    description: "Đầu tư vào dự án",
    example: `
      fetch('https://api.blockfund.com/api/invest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
          projectId: '123',
          amount: '1.5'
        })
      })
    `
  }
]

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <code className="text-gray-300">{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-gray-400" />
        )}
      </button>
    </div>
  )
}

export default function ApiPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div>
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
            <h1 className="text-4xl font-bold mb-4">API Reference</h1>
            <p className="text-xl text-gray-400">
              Tài liệu API để tích hợp với BlockFund
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Authentication</h2>
              <p className="text-gray-400 mb-4">
                Tất cả API calls cần có API key trong header Authentication
              </p>
              <CodeBlock 
                code={`
                  headers: {
                    'Authorization': 'Bearer YOUR_API_KEY'
                  }
                `}
              />
            </div>

            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    endpoint.method === 'GET' 
                      ? 'bg-blue-500/20 text-blue-500' 
                      : 'bg-green-500/20 text-green-500'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-hufa">{endpoint.endpoint}</code>
                </div>
                <p className="text-gray-400">{endpoint.description}</p>
                <CodeBlock code={endpoint.example} />
              </div>
            ))}
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-4">SDK</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => router.push('/docs/sdk/javascript')}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                JavaScript SDK
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/docs/sdk/python')}
                className="w-full border-hufa text-hufa hover:bg-hufa/10"
              >
                Python SDK
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}