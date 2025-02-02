import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ApolloProvider, AppStateProvider, Web3ModalProvider } from '@/context'
import { ToastContainer } from 'react-toastify'
import ThemeProvider from '@/theme'
import './globals.css'
import './employee.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChainSalaries',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider>
          <AppStateProvider>
            <ThemeProvider>
              <Web3ModalProvider>{children}</Web3ModalProvider>
            </ThemeProvider>
          </AppStateProvider>
        </ApolloProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
