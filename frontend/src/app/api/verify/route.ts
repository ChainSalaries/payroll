import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'
import fetch from 'node-fetch'

export async function POST(req: Request) {
    //const { employee, organization, worldID } = await req.json()
    const worldIdUrl = "https://developer.worldcoin.org"

    const response = await fetch(worldIdUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nullifier_hash: '0x2bf8406809dcefb1486dadc96c0a897db9bab002053054cf64272db512c6fbd8',
            merkle_root: '0x2264a66d162d7893e12ea8e3c072c51e785bc085ad655f64c10c1a61e00f0bc2',
            proof: '0x1aa8b8f3b2d2de5ff452c0e1a83e29d6bf46fb83ef35dc5957121ff3d3698a1119090fb',
            verification_level: 'orb',
            action: 'my_action',
            signal_hash: '0x00c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4',
        }),
    })

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