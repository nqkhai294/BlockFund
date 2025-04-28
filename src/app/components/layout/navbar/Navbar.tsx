'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'
import WalletConnect from './WalletConnect'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className="fixed w-full bg-gray-950 z-10 shadow-lg">
      <div className="py-3 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/logo2.jpg"
                alt="BlockFund Logo"
                width={45}
                height={45}
                className="rounded-full shadow-md"
              />
            </div>

            {/* Navigation */}
            <div className="hidden lg:flex flex-row items-center justify-between text-gray-300">
              <div 
                className="text-lg px-6 cursor-pointer hover:text-amber-400 transition-colors duration-200" 
                onClick={() => router.push("/")}
              >
                Home
              </div>
              <div 
                className="text-lg px-6 cursor-pointer hover:text-amber-400 transition-colors duration-200" 
                onClick={() => router.push("/projects")}
              >
                Project
              </div>
              <div 
                className="text-lg px-6 cursor-pointer hover:text-amber-400 transition-colors duration-200" 
                onClick={() => router.push("/")}
              >
                Services
              </div>
              <div 
                className="text-lg px-6 cursor-pointer hover:text-amber-400 transition-colors duration-200" 
                onClick={() => router.push("/")}
              >
                About us
              </div>
            </div>

            <WalletConnect />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
