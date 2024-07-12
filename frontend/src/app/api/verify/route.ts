import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'

export async function POST() {
    const client = createPublicClient({
        chain: baseSepolia,
        transport: http("https://sepolia.base.org"),
    })

    // 3. Consume an action!
    const blockNumber = await client.getBlockNumber()

    const data = {
        "block": blockNumber.toString()
    }

    return Response.json(data)
}