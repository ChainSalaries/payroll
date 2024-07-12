import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const owner = searchParams.get('owner')

    //As a mock, return empty organization info:
    const emptyResponse = {
        name: "",
        id: 0,
        balance: 0,
        employees: []
    }

    const fullResponse = {
        name: "ABC Organization",
        id: 7,
        balance: 1565,
        employees: [
            {
                address: 0xabcdef,
                salary: 230,
                joined: 1720825372,
                balance: 660,
                verified: false,
            },
            {
                address: 0x1234567,
                salary: 185,
                joined: 1719825372,
                balance: 840,
                verified: true,
            },
        ]
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

    return Response.json(owner == "0xABC" ? fullResponse : emptyResponse)
}