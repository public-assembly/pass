import { createPublicClient, http } from 'viem'
import { polygon, polygonMumbai } from 'viem/chains'
import type { PublicClient } from 'viem'

export const mumbaiClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: polygonMumbai,
  transport: http(process.env.NEXT_PUBLIC_MUMBAI_ENDPOINT),
})

export const polygonClient: PublicClient = createPublicClient({
  batch: {
    multicall: true,
  },
  chain: polygon,
  transport: http(process.env.NEXT_PUBLIC_POLYGON_ENDPOINT),
})

export const viemClient: PublicClient | undefined =
  process.env.NEXT_PUBLIC_CHAIN_ID == '80001' ? mumbaiClient : polygonClient