"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProjectDetail } from "@/app/components/projects/ProjectDetail"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjectData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/projects/${projectId}`)
        
        if (!response.ok) {
          throw new Error("Không thể tải dự án")
        }
        
        const data = await response.json()
        
        if (data.success && data.project) {
          setProject(data.project)
          setError(null)
        } else {
          throw new Error(data.error || "Không tìm thấy dự án")
        }
      } catch (err: any) {
        console.error("Error loading project:", err)
        setError(err.message || "Đã xảy ra lỗi khi tải dự án")
      } finally {
        setLoading(false)
      }
    }
    
    if (projectId) {
      fetchProjectData()
    }
  }, [projectId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent"></div>
          <p className="mt-4 text-lg text-white">Đang tải dự án...</p>
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="max-w-md p-8 bg-gray-800 rounded-lg text-center">
          <svg className="mx-auto h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-white">Lỗi</h2>
          <p className="mt-2 text-gray-300">{error || "Không thể tải dự án. Vui lòng thử lại sau."}</p>
          <a href="/projects" className="mt-6 inline-block rounded bg-amber-400 px-4 py-2 text-sm font-medium text-black hover:bg-amber-500">
            Quay lại danh sách dự án
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen pt-24">
      <ProjectDetail 
        id={project.id}
        image={project.image} 
        title={project.title}
        content={project.content}
        target={project.target}
        raised={project.raised}
        backers={project.backers}
        daysLeft={project.daysLeft}
        startDate={formatDate(project.startDate)}
        endDate={formatDate(project.endDate)}
        author={project.author}
        category={project.category}
        backersData={project.backersData || []}
        comments={project.comments || []}
        slug={project.id}
        description={project.content}
        deadline={formatDate(project.endDate)}
        goal={project.target}
        address={project.author?.id || ""}
        link={""}
        createdAt={formatDate(project.startDate)}
        donators={project.backers}
      />
    </div>
  )
}

// Hàm hỗ trợ để định dạng ngày tháng
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  } catch (e) {
    return dateString
  }
} 