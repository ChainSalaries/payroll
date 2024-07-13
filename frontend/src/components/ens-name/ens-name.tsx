'use client'

import { Address } from '@/state/types'
import { getEnsName } from '@wagmi/core'
import { mainnet } from 'wagmi/chains'
import { config } from '@/config'
import { useState } from 'react'

type Props = {
  address: Address
}

export default function EnsName({ address }: Props) {
  const [ensName, setEnsName] = useState<string>('')
  getEnsName(config, {
    chainId: mainnet.id,
    address,
  }).then((ensName) => {
    if (!ensName) return
    setEnsName(ensName)
  })

  return ensName
}
