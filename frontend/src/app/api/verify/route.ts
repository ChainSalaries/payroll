import { PAYROLL_CONTRACT_ADDRESS } from '@/config/constants';
import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit-core/backend'
import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'
import payrollAbi from '@/config/payrollAbi'


export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const { proof, signal } = body
    const app_id = "app_staging_d159dd1d864c0bd25f6341f2f4a9cbc5"
    const action = "employee-verification"
    const verifyRes = (await verifyCloudProof(proof, app_id, action, signal)) as IVerifyResponse
    console.log(verifyRes)
    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        // Update verified field

        const account = privateKeyToAccount('0x438c11131c7187a906b8896ad030712e348a19af14a82dd80635be807259454f')

        const client = createWalletClient({
            account,
            chain: baseSepolia,
            transport: http()
        })

        console.log("Updating verified status")
        await client.writeContract({
            address: PAYROLL_CONTRACT_ADDRESS,
            abi: payrollAbi,
            functionName: 'verifyEmployee',
            args: [signal],
            account,
        })
        console.log("Status updated!")

        return NextResponse.json(verifyRes);
    } else {
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        return NextResponse.json(verifyRes);
    }
};
