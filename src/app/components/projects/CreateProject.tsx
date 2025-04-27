"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Tiêu đề phải có ít nhất 5 ký tự",
  }),
  content: z.string().min(20, {
    message: "Nội dung phải có ít nhất 20 ký tự",
  }),
  target: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Mục tiêu phải là số dương",
  }),
  category: z.string({
    required_error: "Vui lòng chọn danh mục",
  }),
  duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Thời gian phải là số dương",
  }),
})

export function CreateProject() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      target: "",
      category: "",
      duration: "30",
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)

      // Handle image upload first if there's an image
      let imageUrl = null
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        
        if (!uploadResponse.ok) {
          throw new Error('Không thể tải lên hình ảnh')
        }
        
        const uploadResult = await uploadResponse.json()
        imageUrl = uploadResult.url
      }

      // Prepare project data
      const projectData = {
        title: values.title,
        content: values.content,
        target: values.target,
        category: values.category,
        duration: values.duration,
        image: imageUrl,
      }

      // Send data to API
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Tạo dự án thất bại')
      }

      alert("Dự án đã được tạo thành công!")

      // Chuyển hướng đến trang chủ
      router.push('/')
    } catch (error) {
      console.error(error)
      alert("Đã xảy ra lỗi. Không thể tạo dự án. Vui lòng thử lại sau.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategory = watch("category")

  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-sm text-gray-800">
      <div className="border-b border-gray-200 p-6">
        <h2 className="text-xl font-bold">Tạo dự án mới</h2>
        <p className="text-sm text-gray-500">Điền đầy đủ thông tin để tạo dự án gọi vốn của bạn trên blockchain</p>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div
              className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6"
              onClick={() => document.getElementById("project-image")?.click()}
            >
              {imagePreview ? (
                <div className="relative h-48 w-full">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-2 right-2 rounded-md bg-gray-800 bg-opacity-70 px-2 py-1 text-xs text-white"
                    onClick={(e) => {
                      e.stopPropagation()
                      setImageFile(null)
                      setImagePreview(null)
                    }}
                  >
                    Xóa
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mb-2 h-10 w-10 text-gray-400" />
                  <p className="text-sm text-gray-500">Tải lên hình ảnh dự án</p>
                  <p className="mt-1 text-xs text-gray-400">PNG, JPG hoặc GIF (tối đa 5MB)</p>
                </>
              )}
              <input
                id="project-image"
                type="file"
                accept="image/*"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium">
                Tiêu đề
              </label>
              <input
                id="title"
                {...register("title")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Nhập tiêu đề dự án"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label htmlFor="content" className="mb-1 block text-sm font-medium">
                Nội dung
              </label>
              <textarea
                id="content"
                {...register("content")}
                className="min-h-32 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Mô tả chi tiết về dự án của bạn"
              />
              {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="target" className="mb-1 block text-sm font-medium">
                  Mục tiêu gọi vốn (ETH)
                </label>
                <input
                  id="target"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("target")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.target && <p className="mt-1 text-xs text-red-500">{errors.target.message}</p>}
              </div>

              <div>
                <label htmlFor="duration" className="mb-1 block text-sm font-medium">
                  Thời gian (ngày)
                </label>
                <input
                  id="duration"
                  type="number"
                  min="1"
                  max="365"
                  {...register("duration")}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="category" className="mb-1 block text-sm font-medium">
                Danh mục
              </label>
              <select
                id="category"
                {...register("category")}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="" disabled>
                  Chọn danh mục
                </option>
                <option value="technology">Công nghệ</option>
                <option value="art">Nghệ thuật</option>
                <option value="games">Trò chơi</option>
                <option value="defi">DeFi</option>
                <option value="nft">NFT</option>
                <option value="dao">DAO</option>
                <option value="other">Khác</option>
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-200 pt-4 gap-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="inline-flex items-center rounded-2xl bg-gray-500 px-6 py-3 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center rounded-2xl bg-[#4acd8d] px-6 py-3 text-sm font-medium text-white hover:bg-[#3db87d] focus:outline-none focus:ring-2 focus:ring-[#4acd8d]/50 disabled:opacity-50 transition-colors"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tạo dự án
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
