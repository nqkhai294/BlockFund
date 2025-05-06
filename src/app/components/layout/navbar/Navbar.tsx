'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'
import WalletConnect from './WalletConnect'

const Navbar = () => {
  const router = useRouter()

  return (
    <div className="fixed w-full bg-black z-10 shadow-lg border-b border-border">
      <div className="py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Image
                src="/images/logo2.jpg"
                alt="BlockFund Logo"
                width={175}
                height={175}
                className="shadow-md"
              />
            </div>

            {/* Navigation */}
            <div className="hidden lg:flex flex-row items-center justify-between text-muted-foreground">
              <div 
                className="text-lg px-6 cursor-pointer hover:text-hufa transition-colors duration-200" 
                onClick={() => router.push("/")}
              >
                Home
              </div>
              <div 
                className="text-lg px-6 cursor-pointer hover:text-hufa transition-colors duration-200" 
                onClick={() => router.push("/projects")}
              >
                Project
              </div>
              <div 
                className="text-lg px-6 cursor-pointer hover:text-hufa transition-colors duration-200" 
                onClick={() => router.push("/services")}
              >
                Services
              </div>
              <div 
                className="text-lg px-6 cursor-pointer hover:text-hufa transition-colors duration-200" 
                onClick={() => router.push("/about")}
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
