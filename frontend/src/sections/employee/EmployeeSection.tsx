'use client'

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Stack, TextField, Typography } from '@mui/material'

export default function CreateOrganization() {
  const dispatch = useAppDispatch()

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
          <Button variant="contained" size="large">
            WorldID verify
          </Button>
        </Box>
      </Stack>
    </div>
  )
}
