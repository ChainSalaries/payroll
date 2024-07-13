'use client'

import { useEffect } from 'react'
// @mui
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
// hooks
import { useBoolean } from '@/hooks/use-boolean'
// components
import SvgColor from '@/components/svg-color'
import Scrollbar from '@/components/scrollbar'
//
import { NavProps } from '../types'
import NavList from './nav-list'
import { usePathname } from 'next/navigation'

// ----------------------------------------------------------------------

export default function NavMobile({ offsetTop, data }: NavProps) {
  const pathname = usePathname()

  const nav = useBoolean()

  useEffect(() => {
    if (nav.value) {
      nav.onFalse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      <IconButton
        onClick={nav.onTrue}
        sx={{
          ml: 1,
          ...(offsetTop && {
            color: 'text.primary',
          }),
        }}
      >
        <SvgColor src="/assets/icons/ic_menu_item.svg" />
      </IconButton>

      <Drawer
        open={nav.value}
        onClose={nav.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: 260,
          },
        }}
      >
        <Scrollbar>
          <List component="nav" disablePadding>
            {data.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  )
}
