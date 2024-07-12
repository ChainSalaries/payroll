import { memo } from 'react'
// @mui
import Stack from '@mui/material/Stack'
//
import { NavSectionProps, NavListProps, NavConfigProps } from '../types'
import { navHorizontalConfig } from '../config'
import NavList from './nav-list'

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, config, sx, ...other }: NavSectionProps) {
  return (
    <Stack
      direction="row"
      sx={{
        mx: 'auto',
        ...sx,
      }}
      {...other}
    >
      {data.map((group, index) => (
        <Group
          key={group.subheader || index}
          items={group.items}
          config={navHorizontalConfig(config)}
        />
      ))}
    </Stack>
  )
}

export default memo(NavSectionHorizontal)

// ----------------------------------------------------------------------

type GroupProps = {
  items: NavListProps[]
  config: NavConfigProps
}

function Group({ items, config }: GroupProps) {
  return (
    <>
      {items.map((list) => (
        <NavList
          key={list.title + list.path}
          data={list}
          depth={1}
          hasChild={!!list.children}
          config={config}
        />
      ))}
    </>
  )
}
