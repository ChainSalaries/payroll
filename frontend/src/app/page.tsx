'use client'

import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'

import MainLayout from '@/layouts'
import ConnectButtons from '@/sections/common/ConnectButtons'
import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { selectRole } from '@/state/selectors'
import { useAppSelector } from '@/state/hooks'
import CreateOrganization from '@/sections/employer/CreateOrganization'

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const role = useAppSelector(selectRole)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/organization?owner=' + address)
      const data = await response.json()
      console.log('response', data)
    }
    fetchData()
  }, [address])

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center p-24">
        <Stack sx={{ width: '100%' }}>
          {isDisconnected && (
            <>
              <Typography textAlign={'center'} variant="h2">
                Login
              </Typography>
              <ConnectButtons />
            </>
          )}
          {isConnecting && <Typography textAlign={'center'}>Connecting...</Typography>}
          {role === 'employer' && <CreateOrganization />}
        </Stack>
      </div>
    </MainLayout>
  )
}
