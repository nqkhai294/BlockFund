'use client'

import { useState } from 'react'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'
import { ThirdwebStorage } from "@thirdweb-dev/storage"

interface UploadImageProps {
  onImageUploaded: (url: string) => void
}

export function UploadImage({ onImageUploaded }: UploadImageProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  
  // Khởi tạo storage với clientId
  const storage = new ThirdwebStorage({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      setError('')

      // Tạo URL tạm thời để preview
      const tempUrl = URL.createObjectURL(file)
      setPreviewUrl(tempUrl)

      // Lấy kích thước ảnh
      const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img')
          img.onload = () => {
            const maxWidth = 800 // Kích thước tối đa cho chiều rộng
            const maxHeight = 600 // Kích thước tối đa cho chiều cao
            let width = img.width
            let height = img.height

            // Tính toán tỷ lệ để giữ nguyên aspect ratio
            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }
            if (height > maxHeight) {
              width = (width * maxHeight) / height
              height = maxHeight
            }

            resolve({ width, height })
          }
          img.onerror = reject
          img.src = URL.createObjectURL(file)
        })
      }

      const dimensions = await getImageDimensions(file)
      setImageSize(dimensions)

      // Upload file lên IPFS thông qua Thirdweb Storage
      const uri = await storage.upload(file)
      
      // Lấy URL gateway để hiển thị ảnh
      const url = await storage.resolveScheme(uri)
      onImageUploaded(url)
    } catch (error) {
      console.error('Error uploading image:', error)
      setError('Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.')
      setPreviewUrl('')
      setImageSize({ width: 0, height: 0 })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl('')
    setImageSize({ width: 0, height: 0 })
    onImageUploaded('')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        {previewUrl ? (
          <div className="relative" style={{ width: imageSize.width, height: imageSize.height }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: '100%', height: '100%' }}
              className="object-contain rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Nhấp để tải ảnh lên</span> hoặc kéo thả
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG hoặc JPEG (MAX. 10MB)</p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 