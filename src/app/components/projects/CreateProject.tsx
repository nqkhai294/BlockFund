"use client"

import React, { useState } from 'react'
import { useCrowdfunding } from '@/app/hooks/useCrowdfunding'
import { useRouter } from 'next/navigation'
import { UploadImage } from '../ui/upload-image'
import { ethers } from 'ethers'
import { Slider } from '../ui/slider'

interface CreateCampaignArgs {
  owner: string
  title: string
  description: string
  target: ethers.BigNumber
  deadline: number
  image: string
  profitDistributionPeriod: number
  profitShare: number
  expectedProfit: string
  fixedProfitShare: string
}

const CreateProject = () => {
  const router = useRouter()
  const { createNewCampaign, address } = useCrowdfunding()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [profitShare, setProfitShare] = useState(10) // Default 10%
  const [expectedProfit, setExpectedProfit] = useState('') // Lợi nhuận dự kiến
  const [isCustomProfit, setIsCustomProfit] = useState(false) // Toggle cho "Liên hệ riêng"
  const [fixedProfitShare, setFixedProfitShare] = useState('') // Lợi nhuận cố định
  const [isCustomFixedProfit, setIsCustomFixedProfit] = useState(false) // Toggle cho "Liên hệ riêng"
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!address) {
        throw new Error('Vui lòng kết nối ví trước')
      }

      if (!formData.image) {
        throw new Error('Vui lòng tải lên ảnh cho dự án')
      }

      const deadline = Math.floor(Date.now() / 1000) + (parseInt(formData.deadline) * 24 * 60 * 60)
      const targetInWei = ethers.utils.parseEther(formData.target)
      const profitDistributionPeriod = 30 * 24 * 60 * 60 // 30 days in seconds
      const profitShareBasisPoints = profitShare * 100 // Convert percentage to basis points
      const finalExpectedProfit = isCustomProfit ? 'Liên hệ riêng' : expectedProfit
      const finalFixedProfitShare = isCustomFixedProfit ? 'Liên hệ riêng' : fixedProfitShare

      const args: CreateCampaignArgs = {
        owner: address,
        title: formData.title,
        description: formData.description,
        target: targetInWei,
        deadline: deadline,
        image: formData.image,
        profitDistributionPeriod: profitDistributionPeriod,
        profitShare: profitShareBasisPoints,
        expectedProfit: finalExpectedProfit,
        fixedProfitShare: finalFixedProfitShare
      }

      await createNewCampaign(args)

      router.push('/projects')
    } catch (error: any) {
      console.error('Error creating project:', error)
      setError(error.message || 'Có lỗi xảy ra khi tạo dự án')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="container mx-auto px-44 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-8">Tạo Dự Án Mới</h1>
      <form onSubmit={handleSubmit} className="max-w-full space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
            Tên Dự Án
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 bg-secondary/30 backdrop-blur-sm border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
            placeholder="Nhập tên dự án"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">
            Mô Tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2.5 bg-secondary/30 backdrop-blur-sm border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
            placeholder="Mô tả chi tiết về dự án của bạn"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="target" className="block text-sm font-medium text-muted-foreground">
            Số Tiền Cần Huy Động (ETH)
          </label>
          <input
            type="number"
            id="target"
            name="target"
            value={formData.target}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-4 py-2.5 bg-secondary/30 backdrop-blur-sm border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
            placeholder="Nhập số tiền cần huy động"
          />
          <p className="text-sm text-muted-foreground">Ví dụ: Nhập 1.5 cho 1.5 ETH</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="deadline" className="block text-sm font-medium text-muted-foreground">
            Thời Hạn (ngày)
          </label>
          <input
            type="number"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-4 py-2.5 bg-secondary/30 backdrop-blur-sm border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
            placeholder="Nhập số ngày cần huy động"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Tỉ Lệ Lợi Nhuận Chia Sẻ: {profitShare}%
          </label>
          <Slider
            value={[profitShare]}
            onValueChange={(values: number[]) => setProfitShare(values[0])}
            min={0}
            max={100}
            step={1}
            disabled={isLoading}
          />
          <p className="text-sm text-muted-foreground">
            Tỉ lệ phần trăm lợi nhuận bạn sẽ chia sẻ cho nhà đầu tư từ doanh thu của dự án
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Lợi Nhuận Cố Định
          </label>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="customFixedProfit"
              checked={isCustomFixedProfit}
              onChange={(e) => setIsCustomFixedProfit(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="customFixedProfit" className="text-sm text-muted-foreground">
              Liên hệ riêng
            </label>
          </div>
          {!isCustomFixedProfit && (
            <input
              type="text"
              value={fixedProfitShare}
              onChange={(e) => setFixedProfitShare(e.target.value)}
              className="w-full px-4 py-2.5 bg-secondary/30 backdrop-blur-sm border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
              placeholder="Ví dụ: 20-30% mỗi năm"
              disabled={isCustomFixedProfit}
            />
          )}
          <p className="text-sm text-muted-foreground">
            Lợi nhuận cố định bạn cam kết trả cho nhà đầu tư, không phụ thuộc vào doanh thu dự án
          </p>
          <p className="text-sm text-yellow-500">
            * Lưu ý: Đây là cam kết của bạn về lợi nhuận cố định sẽ trả cho nhà đầu tư, bất kể dự án có lãi hay lỗ
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Lợi Nhuận Dự Kiến
          </label>
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="customProfit"
              checked={isCustomProfit}
              onChange={(e) => setIsCustomProfit(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="customProfit" className="text-sm text-muted-foreground">
              Liên hệ riêng
            </label>
          </div>
          {!isCustomProfit && (
            <input
              type="text"
              value={expectedProfit}
              onChange={(e) => setExpectedProfit(e.target.value)}
              className="w-full px-4 py-2.5 bg-secondary/30 backdrop-blur-sm border border-border/30 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
              placeholder="Ví dụ: Dự kiến 20-30% mỗi năm từ doanh thu dự án"
              disabled={isCustomProfit}
            />
          )}
          <p className="text-sm text-muted-foreground">
            Dự kiến lợi nhuận tổng thể nhà đầu tư có thể nhận được từ dự án (bao gồm cả lợi nhuận cố định và lợi nhuận chia sẻ)
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-muted-foreground">
            Ảnh Dự Án
          </label>
          <UploadImage onImageUploaded={(url) => setFormData(prev => ({ ...prev, image: url }))} />
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-destructive">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isLoading 
              ? 'bg-muted/30 text-muted-foreground cursor-not-allowed' 
              : 'bg-hufa/90 text-black hover:bg-hufa'
          }`}
        >
          {isLoading ? 'Đang tạo...' : 'Tạo Dự Án'}
        </button>
      </form>
    </div>
  )
}

export default CreateProject
