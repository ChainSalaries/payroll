'use client'

import React, { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as ApolloInterProvider,
  HttpLink,
} from '@apollo/client'
import { config, projectId } from '@/config'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { State, WagmiProvider } from 'wagmi'
import store from '@/state/store'

// Setup queryClient
const queryClient = new QueryClient()

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeMode: 'light',
})

export function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>
}

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.studio.thegraph.com/proxy/83088/chainsalaries/version/latest',
  }),
  cache: new InMemoryCache(),
})

export function ApolloProvider({ children }: { children: ReactNode }) {
  return <ApolloInterProvider client={client}>{children}</ApolloInterProvider>
}
