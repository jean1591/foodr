import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { StoreProvider } from './lib/store/storeProvider'
import { Toaster } from 'react-hot-toast'
import { classNames } from '@/utils/classNames'

const inter = Inter({ subsets: ['latin'] })

const metaDescription =
  'Say goodbye to the overwhelm of meal planning. Effortlessly enjoy healthy, delicious meals tailored to your preferences, without the hassle.'

export const metadata: Metadata = {
  title: {
    template: 'Foodr - AI powered weekly meal plan',
    default: 'Foodr - AI powered weekly meal plan',
  },
  description: metaDescription,
  keywords: 'meal, planning, food, ai',
  metadataBase: new URL('https://foodr.jeanrobertou.com'),
  openGraph: {
    title: 'Foodr - AI powered weekly meal plan',
    description: metaDescription,
    url: 'https://foodr.jeanrobertou.com',
    siteName: 'Foodr - AI powered weekly meal plan',
    images: [
      {
        url: '/hero-profile.jpeg',
        width: 500,
        height: 500,
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StoreProvider>
      <html lang="fr" className="scroll-smooth">
        <body
          className={classNames(inter.className, 'bg-slate-50 text-slate-900')}
        >
          <Toaster position="bottom-right" reverseOrder={true} />
          <p>This website is under construction</p>
          <Analytics />
        </body>
      </html>
    </StoreProvider>
  )
}
