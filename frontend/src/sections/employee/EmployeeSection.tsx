'use client'

// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { IDKitWidget, ISuccessResult, VerificationLevel } from '@worldcoin/idkit'
import { useAccount } from 'wagmi'
//import fetch from 'node-fetch'

export default function VerifyWorldID() {
  const dispatch = useAppDispatch()
  const { address, isConnecting, isDisconnected } = useAccount()
  console.log("address: " + address)
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
      <Stack sx={{ width: '100%' }}>
        <Typography textAlign={'center'} variant="h2">
          Welcome, PERSON
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 1,
            m: 1,
            gap: 2,
            width: '100%',
            borderRadius: 1,
          }}
        >
          <IDKitWidget
            app_id="app_staging_d159dd1d864c0bd25f6341f2f4a9cbc5" // obtained from the Developer Portal
            action="employee-verification" // this is your action name from the Developer Portal
            signal={address} // any arbitrary value the user is committing to, e.g. a vote
            onSuccess={onSuccess}
            handleVerify={verifyProof}
            verification_level={VerificationLevel.Device} // minimum verification level accepted, defaults to "orb"
          >
            {({ open }) => <button onClick={open}>Verify with World ID</button>}
          </IDKitWidget>
        </Box>
      </Stack>
    </div>
  )


}


