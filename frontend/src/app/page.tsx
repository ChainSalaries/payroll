import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'

import MainLayout from '@/layouts'

export default function Home() {
  return (
    <MainLayout>
      <div className="flex min-h-screen items-center p-24">
        <Stack sx={{ width: '100%' }}>
          <Typography textAlign={'center'} variant="h2">
            Login
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
              Employee
            </Button>
            <Button variant="contained" size="large">
              Employer
            </Button>
          </Box>
        </Stack>
      </div>
    </MainLayout>
  )
}
