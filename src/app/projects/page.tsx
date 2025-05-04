'use client'

import { utils } from 'ethers'
import { useRouter } from 'next/navigation'
import { useCrowdfunding } from '@/app/hooks/useCrowdfunding'
import CardProject from '@/app/components/projects/CardProject'
import { Plus, Search } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ProjectsPage() {
  const router = useRouter()
  const { campaigns, isLoadingCampaigns } = useCrowdfunding()
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dự Án</h1>
        <button
          onClick={() => router.push('/create-project')}
          className="flex items-center gap-2 px-4 py-2 bg-hufa/90 text-black rounded-lg hover:bg-hufa transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Tạo Dự Án</span>
        </button>
      </div>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Tìm kiếm dự án..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-secondary/50 backdrop-blur-sm border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-hufa/50"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>

      {isLoadingCampaigns ? (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-hufa/50 border-r-transparent"></div>
          <p className="mt-4 text-lg text-muted-foreground">Đang tải dự án...</p>
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">Không tìm thấy dự án nào.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((project) => (
            <CardProject
              key={project.id}
              id={project.id}
              image={project.image}
              title={project.title}
              content={project.description}
              target={project.target}
              raised={project.amountCollected}
              deadline={project.deadline}
              donators={project.donators}
              author={{
                name: project.owner.slice(0, 6) + "..." + project.owner.slice(-4),
                avatar: "/placeholder.svg"
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
} 