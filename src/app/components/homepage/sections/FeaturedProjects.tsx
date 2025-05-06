'use client'

import { useCrowdfunding } from "@/app/hooks/useCrowdfunding"
import { useEffect, useState } from "react"
import CardProject from "@/app/components/projects/CardProject"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const FeaturedProjects = () => {
  const { campaigns, isLoadingCampaigns } = useCrowdfunding()
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([])

  useEffect(() => {
    if (campaigns && campaigns.length > 0) {
      // Sắp xếp theo số tiền huy động được
      const sorted = [...campaigns].sort((a, b) => 
        Number(b.amountCollected) - Number(a.amountCollected)
      )
      setFeaturedProjects(sorted.slice(0, 3))
    }
  }, [campaigns])

  if (isLoadingCampaigns) {
    return (
      <div className="space-y-6 ">
        <div className="flex items-center justify-between ">
          <h2 className="text-2xl font-bold text-foreground">Dự Án Nổi Bật</h2>
          <Link 
            href="/projects"
            className="flex items-center gap-2 text-hufa hover:text-hufa/80 transition-colors"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 space-y-4 border border-border/30 animate-pulse"
            >
              <div className="h-48 bg-muted/30 rounded-lg" />
              <div className="space-y-2">
                <div className="h-4 bg-muted/30 rounded w-3/4" />
                <div className="h-4 bg-muted/30 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Dự Án Nổi Bật</h2>
        <Link 
          href="/projects"
          className="flex items-center gap-2 text-hufa hover:text-hufa/80 transition-colors"
        >
          <span>Xem tất cả</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProjects.map((project) => (
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
              name: project.owner,
              avatar: `/avatars/${project.owner.slice(2, 4)}.png`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FeaturedProjects 