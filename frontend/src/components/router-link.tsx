import { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'

// ----------------------------------------------------------------------

const RouterLink = forwardRef<HTMLAnchorElement, LinkProps>(function RouterLink({ ...other }, ref) {
  return <Link ref={ref} {...other} />
})

export default RouterLink
