'use client'

import { Button } from "@/app/components/ui/button"
import { ArrowLeft, Code, Copy, Check, KeyRound } from "lucide-react"
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

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-2">
      <pre className="bg-yellow-400/10 border border-yellow-500/30 text-yellow-200 p-4 rounded-xl overflow-x-auto font-mono text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4 text-yellow-400" />
        )}
      </button>
    </div>
  )
}

export default function ApiPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          API Reference
        </h1>
        <p className="text-lg text-gray-300 mb-10">
          Tài liệu API để tích hợp với BlockFund
        </p>

        {/* Authentication */}
        <div className="bg-black/70 border border-yellow-500/30 rounded-xl p-6 shadow-lg mb-10">
          <div className="flex items-center gap-3 mb-2">
            <KeyRound className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-yellow-400">Authentication</h2>
          </div>
          <p className="text-gray-200 mb-2">
            Tất cả API calls cần có API key trong header <span className="font-mono bg-yellow-500/10 px-2 py-1 rounded text-yellow-400">Authorization</span>
          </p>
          <CodeBlock 
            code={`headers: {
  'Authorization': 'Bearer YOUR_API_KEY'
}`}
          />
        </div>

        {/* Endpoints */}
        <div className="space-y-8 mb-16">
          {apiEndpoints.map((endpoint, index) => (
            <div key={index} className="bg-black/70 border border-yellow-500/30 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-2 py-1 rounded text-sm font-bold tracking-wide ${
                  endpoint.method === 'GET' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-400'
                    : 'bg-green-500/20 text-green-400 border border-green-400'
                }`}>
                  {endpoint.method}
                </span>
                <span className="font-mono text-yellow-400 text-base">{endpoint.endpoint}</span>
              </div>
              <p className="text-gray-200 mb-2">{endpoint.description}</p>
              <CodeBlock code={endpoint.example} />
            </div>
          ))}
        </div>

        {/* SDK */}
        <div className="pt-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">SDK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
              onClick={() => router.push('/docs/sdk/javascript')}
            >
              JavaScript SDK
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-8 py-4 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300 border-2 border-yellow-400"
              onClick={() => router.push('/docs/sdk/python')}
            >
              Python SDK
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}