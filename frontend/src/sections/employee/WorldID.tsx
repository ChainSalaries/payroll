import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import Iconify from '@/components/iconify'
import { Button } from '@mui/material'
type Props = {
    address: `0x${string}` | undefined
}
export default function VerifyWorldID({ address }: Props) {
    const onSuccess = (result: ISuccessResult) => {
        console.log("success")
    }
    const verifyProof = async (result: ISuccessResult) => {
        //const proof = JSON.stringify(result) // worldID proof
        //console.log(result)
        const response = await fetch("/api/verify", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                proof: result,
                verification_level: "device",
                organization: 5,
                signal: address
            })
        })
    }

    return (
        <div>
            <IDKitWidget
                app_id="app_staging_d159dd1d864c0bd25f6341f2f4a9cbc5" // obtained from the Developer Portal
                action="employee-verification" // this is your action name from the Developer Portal
                signal={address} // any arbitrary value the user is committing to, e.g. a vote
                onSuccess={onSuccess}
                handleVerify={verifyProof}
                verification_level={VerificationLevel.Device} // minimum verification level accepted, defaults to "orb"
            >
                {({ open }) => <Button variant='contained' onClick={open} color='primary'><Iconify icon="tabler:world" />World ID Verification</Button>}
            </IDKitWidget>
        </div>
    )
}