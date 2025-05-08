'use client'

import { useRouter } from "next/navigation"
import Image from 'next/image'
import WalletConnect from './WalletConnect'
import { useState } from 'react'

const Navbar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="fixed w-full bg-black z-10 shadow-lg border-b border-border ">
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
                onClick={() => router.push("/")}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* Desktop Navigation */}
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

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              <WalletConnect />
              
              {/* Hamburger Menu Button */}
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
                onClick={toggleMobileMenu}
              >
                <svg 
                  className="h-6 w-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16" 
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 bg-black border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div 
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md cursor-pointer" 
                  onClick={() => {
                    router.push("/")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Home
                </div>
                <div 
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md cursor-pointer" 
                  onClick={() => {
                    router.push("/projects")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Project
                </div>
                <div 
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md cursor-pointer" 
                  onClick={() => {
                    router.push("/services")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Services
                </div>
                <div 
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-gray-700 rounded-md cursor-pointer" 
                  onClick={() => {
                    router.push("/about")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  About us
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
