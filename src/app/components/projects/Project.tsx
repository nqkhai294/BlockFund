'use client'

import Container from "../Container"
import  CardProject  from "./CardProject"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { useCrowdfunding } from "@/app/hooks/useCrowdfunding"
import { ethers } from "ethers"

interface Campaign {
  owner: string
  title: string
  description: string
  target: string
  deadline: string
  amountCollected: string
  image: string
  donators: string[]
  donations: string[]
}

// Danh sách các phân loại dự án
const categories = ["All", "Technology", "Art", "Games", "DeFi", "NFT", "DAO", "Other"]

const Project = () => {
  const { campaigns, isLoadingCampaigns } = useCrowdfunding()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState<Campaign[]>([])
  const router = useRouter()

  // Lọc dự án dựa trên từ khóa tìm kiếm
  useEffect(() => {
    if (!campaigns) return

    let filtered = campaigns
    
    if (searchTerm) {
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    setFilteredProjects(filtered)
  }, [campaigns, searchTerm])

  return (
    <div className="text-white pt-26 mt-20">
      <Container>
        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Projects grid */}
        {isLoadingCampaigns ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent"></div>
            <p className="mt-4 text-lg text-gray-300">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-300">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <CardProject
                key={index}
                id={index.toString()}
                image={project.image}
                title={project.title}
                content={project.description}
                target={parseFloat(ethers.utils.formatEther(project.target))}
                raised={parseFloat(ethers.utils.formatEther(project.amountCollected))}
                deadline={project.deadline}
                author={{
                  name: project.owner.slice(0, 6) + "..." + project.owner.slice(-4),
                  avatar: "/placeholder.svg"
                }}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

export default Project
