import type { Metadata } from 'next'
import { Inter, Spectral } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spectral = Spectral({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-spectral'
})

export const metadata: Metadata = {
  title: 'Dark Story AI',
  description: 'Generate personalized horror stories with AI',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${spectral.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
