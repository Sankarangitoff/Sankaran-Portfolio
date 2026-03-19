import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import ThemeProvider from '@/components/providers/ThemeProvider'
import Navigation from '@/components/layout/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Sankaran Rajendran | Backend Software Engineer',
  description: 'Backend Software Engineer specializing in Ruby on Rails, Golang, and AWS. Building scalable systems serving 10,000+ users.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-text-primary`}>
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
