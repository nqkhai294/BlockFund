'use client'

import { useParams } from 'next/navigation'
import { useCrowdfunding } from '@/app/hooks/useCrowdfunding'
import { useEffect, useState } from 'react'
import ProjectDetail from '@/app/components/projects/ProjectDetail'

const ProjectPage = () => {
  const params = useParams()
  const { campaigns, isLoadingCampaigns, getDonators } = useCrowdfunding()
  const [project, setProject] = useState<any>(null)
  const [donators, setDonators] = useState<string[]>([])
  const [donations, setDonations] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoadingCampaigns && campaigns) {
        const campaign = campaigns.find(c => c.id === params.id)
        if (campaign) {
          setProject(campaign)
          
          // Lấy danh sách nhà đầu tư
          try {
            const result = await getDonators(campaign.id)
            if (result) {
              setDonators(result.donators)
              setDonations(result.donations)
            }
          } catch (error) {
            console.error('Error fetching donators:', error)
          }
        }
      }
    }

    fetchData()
  }, [campaigns, isLoadingCampaigns, params.id, getDonators])

  if (isLoadingCampaigns || !project) {
    return <div>Loading...</div>
  }

  return (
    <ProjectDetail
      id={project.id}
      image={project.image}
      title={project.title}
      content={project.description}
      target={project.target}
      amountCollected={project.amountCollected}
      deadline={project.deadline}
      owner={project.owner}
      donators={donators}
      donations={donations}
    />
  )
}

export default ProjectPage 