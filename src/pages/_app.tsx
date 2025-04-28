import { ThirdwebProvider } from "@thirdweb-dev/react"
import { Sepolia } from "@thirdweb-dev/chains"
import type { AppProps } from 'next/app'
import { StateContextProvider } from '../app/context'
import '../app/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={Sepolia} 
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      supportedChains={[Sepolia]}
      dAppMeta={{
        name: "BlockFund",
        description: "A decentralized crowdfunding platform",
        logoUrl: "/thirdweb.png",
        url: "https://blockfund.com",
      }}
    >
      <StateContextProvider>
        <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
          <Component {...pageProps} />
        </div>
      </StateContextProvider>
    </ThirdwebProvider>
  )
} 