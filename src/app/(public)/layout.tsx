import { Footer } from './(landing)/footer'

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="mx-auto my-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  )
}
