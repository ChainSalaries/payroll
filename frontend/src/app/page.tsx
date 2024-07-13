'use client'

import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'

import MainLayout from '@/layouts'
import ConnectButtons from '@/sections/common/ConnectButtons'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { selectRole } from '@/state/selectors'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import CreateOrganization from '@/sections/employer/CreateOrganization'
import { Organization } from '@/state/types'
import OrganizationSection from '@/sections/employer/OrganizationSection'
import EmployeeSection from '@/sections/employee/EmployeeSection'
import { setOrganization } from '@/state/app'

export default function Home() {
  const dispatch = useAppDispatch()
  const { address, isConnecting, isDisconnected } = useAccount()
  const [org, setOrg] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(false)
  const role = useAppSelector(selectRole)
  const isEmployer = role === 'employer'

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const response = await fetch('/api/organization?owner=0xABC') // + address)
      const data = (await response.json()) as Organization
      setOrg(data)
      dispatch(setOrganization(data))
      setLoading(false)
    }
    fetchData()
  }, [address, dispatch])

  return (
    <MainLayout>
      <div className="min-h-screen items-center pt-28 pb-20 px-20">
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
          {loading && <Typography textAlign={'center'}>Loading...</Typography>}
          {!loading && isEmployer && !org?.name && <CreateOrganization />}
          {!loading && isEmployer && !!org?.name && <OrganizationSection organization={org} />}
          {!loading && !isEmployer && !isConnecting && !isDisconnected && <EmployeeSection />}
        </Stack>
      </div>
    </MainLayout>
  )
}
