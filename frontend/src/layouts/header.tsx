// @mui
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
// hooks
import { useOffSetTop } from '@/hooks/use-off-set-top'
import { useResponsive } from '@/hooks/use-responsive'
// theme
// import { bgBlur } from '@/theme/css'
// routes
import { navConfig } from './config-navigation'
import NavMobile from './nav/mobile'
import NavDesktop from './nav/desktop'
import ConnectButton from '@/components/connect-button'
import { HEADER } from '@/config/constants'
import { useAppSelector } from '@/state/hooks'
import { selectRole } from '@/state/selectors'
import { Typography } from '@mui/material'
import { bgBlur } from '@/theme/css'

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme()
  const mdUp = useResponsive('up', 'md')
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP)
  const role = useAppSelector(selectRole)

  return (
    <AppBar
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container>
          <Typography
            variant="h4"
            sx={{ display: { xs: 'none', md: 'block' }, textTransform: 'capitalize' }}
          >
            {role}
          </Typography>
        </Container>
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop offsetTop={offsetTop} data={navConfig} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            <w3m-button balance="hide" />

            {!mdUp && <NavMobile offsetTop={offsetTop} data={navConfig} />}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}
