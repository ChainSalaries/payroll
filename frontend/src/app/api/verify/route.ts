import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'

export async function POST(req: Request) {
    const { employee, organization, worldID } = await req.json()

    console.log(employee)

    // const client = createPublicClient({
    //     chain: baseSepolia,
    //     transport: http(),
    // })

    // // 3. Consume an action!
    // const blockNumber = await client.getBlockNumber()

    // const data = {
    //     "block": blockNumber.toString()
    // }

    return Response.json(organization)
}