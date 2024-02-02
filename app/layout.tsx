import type { Metadata } from 'next'
import Link from 'next/link'

import './globals.css'

export const metadata: Metadata = {
  title: 'mister deejay',
  description: 'Put a record on with mister deejay 📀',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col items-center w-full">
          <nav className='bg-green-400 p-4 flex justify-between items-center w-full'>
            <a className='text-black font-bold text-2xl tracking-wide' href="/">mister deejay</a>
            <ul className='flex justify-end gap-8 text-black font-semibold'>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
          <section className='w-full max-w-7xl px-4 py-8'>
            {children}
          </section>
        </main>
        <footer className='absolute bottom-0 w-full py-8 px-4'>
          <div className='flex flex-col items-center md:flex-row md:justify-center'>
            <small className='text-sm text-center md:text-left'>Copyright © {new Date().getFullYear()}. <a href='https://codingzeal.com' target='_blank' className='text-green-700 underline font-semibold hover:no-underline'>ZEAL</a>. All Rights Reserved.</small>
            <small className='text-sm hidden md:block'>&nbsp;&nbsp;|&nbsp;&nbsp;</small>
            <small><a href='https://github.com/CodingZeal/nextjs-server-action-validation' target='_blank' className='text-sm text-green-700 underline font-semibold hover:no-underline'>Source Code</a></small>
          </div>
        </footer>
      </body>
    </html>
  )
}
