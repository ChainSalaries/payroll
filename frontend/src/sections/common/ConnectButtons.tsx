'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'

import { setRole } from '@/state/app'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function ConnectButtons() {
  const dispatch = useAppDispatch()
  const { open } = useWeb3Modal()

  return (
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
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          dispatch(setRole('employee'))
          open({ view: 'Connect' })
        }}
      >
        Employee
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          dispatch(setRole('employer'))
          open({ view: 'Connect' })
        }}
      >
        Employer
      </Button>
    </Box>
  )
}
