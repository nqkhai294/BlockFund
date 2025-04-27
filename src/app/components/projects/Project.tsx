'use client'

import Container from "../Container";
import { CardProject } from "./Cardproject";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";

interface Project {
  id: string;
  image: string;
  title: string;
  content: string;
  target: number;
  raised: number;
  author: {
    name: string;
    avatar: string;
  };
  category?: string;
}

// Danh sách các phân loại dự án
const categories = ["All", "Technology", "Art", "Games", "DeFi", "NFT", "DAO", "Other"];

const Project = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Hàm để lấy dự án dựa trên các điều kiện tìm kiếm
  const fetchProjects = async (title = "", category = "All") => {
    try {
      setLoading(true);
      
      // Tạo URL cho API tìm kiếm với các tham số
      let url = '/api/projects';
      
      // Nếu có từ khóa tìm kiếm hoặc danh mục đã chọn, sử dụng API search
      if (title || (category && category !== "All")) {
        url = `/api/projects/search?${title ? `title=${encodeURIComponent(title)}` : ''}${
          category && category !== "All" ? `&category=${encodeURIComponent(category)}` : ''
        }`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      const data = await response.json();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách dự án khi component được tải
  useEffect(() => {
    fetchProjects();
  }, []);

  // Xử lý sự kiện khi người dùng thay đổi từ khóa tìm kiếm
  const handleSearch = () => {
    fetchProjects(searchTerm, selectedCategory);
  };

  // Xử lý sự kiện khi người dùng thay đổi danh mục
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    fetchProjects(searchTerm, category);
  };

  return (
    <div className="text-white pt-26 mt-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <button
            onClick={() => router.push('/create')}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black px-4 py-2 rounded-md transition-colors"
          >
            <Plus size={20} />
            <span>Create Project</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Search size={20} />
            </button>
          </div>
          
          <select
            className="p-3 border border-gray-700 bg-gray-800 text-white rounded-md md:w-48"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-400 border-r-transparent"></div>
            <p className="mt-4 text-lg text-gray-300">Loading projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">
            <p className="text-lg">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-300">No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <CardProject
                key={project.id}
                id={project.id}
                image={project.image || "/placeholder.svg"}
                title={project.title}
                content={project.content}
                target={project.target}
                raised={project.raised}
                author={{
                  name: project.author?.name || "Unknown Author",
                  avatar: project.author?.avatar || "/placeholder.svg"
                }}
                category={project.category}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Project;
