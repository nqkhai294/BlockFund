'use client'

import { ConnectWallet, useAddress, useDisconnect, useBalance, useChain } from "@thirdweb-dev/react"
import * as Dialog from '@radix-ui/react-dialog'
import { X, Copy, ExternalLink, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

const WalletConnect = () => {
  const address = useAddress()
  const disconnect = useDisconnect()
  const { data: balance } = useBalance()
  const chain = useChain()
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!address) {
    return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200">
            Connect Wallet
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-800 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-white text-2xl font-bold">
                Connect Your Wallet
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </Dialog.Close>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg flex justify-center items-center">
              <ConnectWallet 
                theme="dark"
                btnTitle="Connect Wallet"
                modalSize="wide"
                className="w-full max-w-md"
              />
            </div>

            <div className="mt-6 text-center text-gray-400 text-sm">
              <p>By connecting your wallet, you agree to our</p>
              <div className="flex justify-center gap-2 mt-2">
                <a href="#" className="text-amber-400 hover:text-amber-300">Terms of Service</a>
                <span>and</span>
                <a href="#" className="text-amber-400 hover:text-amber-300">Privacy Policy</a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <h3 className="text-white text-lg font-semibold mb-3">Supported Networks</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Ethereum</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Polygon</span>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <div className="relative">
      <button 
        className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-3 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-end">
          <span className="text-gray-300 text-sm">
            {balance?.displayValue} {balance?.symbol}
          </span>
          <span className="text-gray-400 text-xs">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
          <div className="p-3 border-b border-gray-700">
            <div className="text-sm text-gray-400">Connected with {chain?.name}</div>
          </div>

          <div className="p-2">
            <button 
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
              onClick={copyAddress}
            >
              <Copy size={16} />
              <span>{copied ? 'Copied!' : 'Copy Address'}</span>
            </button>

            <a 
              href={`https://etherscan.io/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer"
            >
              <ExternalLink size={16} />
              <span>View on Explorer</span>
            </a>

            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
              <Settings size={16} />
              <span>Settings</span>
            </button>

            <div className="h-px bg-gray-700 my-1"></div>

            <button 
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => {
                disconnect()
                setIsOpen(false)
              }}
            >
              <LogOut size={16} />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WalletConnect 