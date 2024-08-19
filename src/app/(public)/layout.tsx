'use client'

import { Footer } from './(landing)/footer'
import { usePathname } from 'next/navigation'

const noFooterPages = ['/login']

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const isFooterPage = !noFooterPages.includes(pathname)

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">{children}</div>
      {isFooterPage && <Footer />}
    </div>
  )
}
