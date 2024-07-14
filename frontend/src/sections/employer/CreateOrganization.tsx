'use client'

import { toast } from 'react-toastify'
import { useState } from 'react'
import Box from '@mui/material/Box'
import { Button, Stack, TextField, Typography } from '@mui/material'
import { Address } from '@/state/types'
import { createOrg } from '@/services/write-services'

type Props = {
  address: Address
}

export default function CreateOrganization({ address }: Props) {
  const [orgName, setOrgName] = useState<string>('')

  const onSubmit = async () => {
    if (!!orgName) {
      try {
        const tx = await createOrg(orgName)
        toast.success(`Create organization transaction submitted. transaction: ${tx}`)
      } catch (err) {
        toast.error(`Create organization: ${err}`)
      }

      console.log('create org with name', orgName)
    }
  }

  return (
    <div>
      <Stack sx={{ width: '100%' }}>
        <Typography textAlign={'center'} variant="h2">
          Welcome, please give a name to your organization
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
          <TextField
            autoFocus
            fullWidth
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            margin="dense"
            variant="outlined"
            label="Organization Name"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained" size="large" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </Stack>
    </div>
  )
}
