import type { Metadata } from 'next'
import { EB_Garamond } from 'next/font/google'
import './globals.css'

const garamond = EB_Garamond({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aadil\'s Acknowledgements',
  description: 'Thank you to all the people who have helped me along the way.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={garamond.className}>{children}</body>
    </html>
  )
}
