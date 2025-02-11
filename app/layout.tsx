import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nexite',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased dark`}>
        <div className='flex flex-col h-screen'>
          <Navbar />
          <div className='flex h-screen items-center justify-center'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
