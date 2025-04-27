import { CreateProject } from "@/app/components/projects/CreateProject";


export default function CreateProjectPage() {
  return (
    <div className="container mx-auto py-8 px-4 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-center">Tạo dự án mới</h1>
      <CreateProject />
    </div>
  )
}
