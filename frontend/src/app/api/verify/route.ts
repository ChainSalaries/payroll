import { type IVerifyResponse, verifyCloudProof } from '@worldcoin/idkit-core/backend'
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
    const body = await req.json()
    const { proof, signal } = body
    const app_id = "app_staging_d159dd1d864c0bd25f6341f2f4a9cbc5"
    const action = "employee-verification"
    const verifyRes = (await verifyCloudProof(proof, app_id, action, signal)) as IVerifyResponse
    if (verifyRes.success) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        return NextResponse.json(verifyRes);
    } else {
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        return NextResponse.json(verifyRes);
    }
};
