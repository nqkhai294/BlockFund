import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import { Sepolia } from "@thirdweb-dev/chains"

// refer to https://portal.thirdweb.com/typescript/v3/sdk on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

export const client = new ThirdwebSDK(Sepolia, {
  clientId,
})
