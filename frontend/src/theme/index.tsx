'use client'

import merge from 'lodash/merge'
import { useMemo } from 'react'
// @mui
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles'
// system
import { palette } from './palette'
import { shadows } from './shadows'
import { typography } from './typography'
import { customShadows } from './custom-shadows'
// options
import { darkMode } from './options/dark-mode'
//
import NextAppDirEmotionCacheProvider from './next-emotion-cache'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: Props) {
  const darkModeOption = darkMode('dark')
  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    [],
  )

  const memoizedValue = useMemo(
    () => merge(baseOption, darkModeOption),
    [baseOption, darkModeOption],
  )

  const theme = createTheme(memoizedValue as ThemeOptions)

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
