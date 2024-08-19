'use client'

import './globals.css'

import { Inter } from 'next/font/google'
import { StoreProvider } from './lib/store/storeProvider'
import { Toaster } from 'react-hot-toast'
import { classNames } from '@/utils/classNames'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isLandingPage = pathname === '/'
  const backgroundColor = isLandingPage ? 'bg-white' : 'bg-green-100'

  return (
    <StoreProvider>
      <html lang="fr">
        <body
          className={classNames(
            inter.className,
            backgroundColor,
            'text-slate-900'
          )}
        >
          <Toaster position="bottom-right" reverseOrder={true} />
          {children}
        </body>
      </html>
    </StoreProvider>
  )
}
