import Image from "next/image"
import Link from "next/link"

interface CardProjectProps {
  id: string
  image: string
  title: string
  content: string
  target: number
  raised: number
  author: {
    name: string
    avatar: string
  }
  category?: string
}

export function CardProject({
  id,
  image,
  title,
  content,
  target,
  raised,
  author,
  category,
}: CardProjectProps) {

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-black shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg?height=192&width=384"} alt={title} fill className="object-cover" />
        {category && (
          <span className="absolute right-2 top-2 rounded-full bg-[#4acd8d] px-3 py-1 text-xs font-medium text-white capitalize">
            {category}
          </span>
        )}
      </div>
      <div className="p-4">
        <Link 
          href={`/project/${encodeURIComponent(id)}`}
          className="hover:underline"
        >
          <h3 className="line-clamp-1 text-xl font-bold text-black ">{title}</h3>
        </Link>
        <p className="line-clamp-2 mt-1 text-sm text-gray-500">{content}</p>
      </div>
      <div className="px-4 pb-0">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{raised / target}% Complete</span>
            <span>
              {raised} / {target} ETH
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#4acd8d]"
              style={{ width: `${(raised / target) > 100 ? 100 :  (raised / target)}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={author.avatar || "/placeholder.svg?height=32&width=32"}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium">{author.name}</span>
        </div>
      </div>
    </div>
  )
}
