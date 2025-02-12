import type { Metadata } from 'next'
import Navbar from '@/components/navbar'
import { ThemeProvider } from 'next-themes'
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
    <html lang='en' suppressHydrationWarning>
      <body className='antialiased'>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex h-screen items-center justify-center'>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
