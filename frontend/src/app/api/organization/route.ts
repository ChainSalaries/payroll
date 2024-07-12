import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const owner = searchParams.get('owner')

    //As a mock, return empty organization info:
    const response = {
        name: "",
        balance: 0,
        employees: []
    }

    // const client = createPublicClient({
    //     chain: baseSepolia,
    //     transport: http(),
    // })

    // // 3. Consume an action!
    // const blockNumber = await client.getBlockNumber()

    // const data = {
    //     "block": blockNumber.toString()
    // } 

    return Response.json(response)
}