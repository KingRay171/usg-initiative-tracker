import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'USG Initiative Tracker',
  description: 'An initiative tracker for CWRU Undergraduate Student Government',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark:bg-[#1B1D1E]'>
      
      <body className={`${inter.className} dark:bg-[#1B1D1E]`}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
