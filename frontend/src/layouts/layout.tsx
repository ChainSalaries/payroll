'use client'

// @mui
import Box from '@mui/material/Box'
// routes
import { usePathname } from 'next/navigation'

//
import Header from './header'
import { useAccount } from 'wagmi'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { address } = useAccount()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      {address && <Header />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...(!isHome && {
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
