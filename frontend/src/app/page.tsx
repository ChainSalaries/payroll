'use client'

import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'

import MainLayout from '@/layouts'
import ConnectButtons from '@/sections/common/ConnectButtons'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnecting, isDisconnected } = useAccount()

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center p-24">
        <Stack sx={{ width: '100%' }}>
          <Typography textAlign={'center'} variant="h2">
            Login
          </Typography>
          {isDisconnected && <ConnectButtons />}
          {isConnecting && <Typography textAlign={'center'}>Connecting...</Typography>}
        </Stack>
      </div>
    </MainLayout>
  )
}
