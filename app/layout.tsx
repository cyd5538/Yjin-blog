import { ThemeProvider } from "@/components/ui/theme-provider"
import Container from '@/components/ui/Container'
import Nav from '@/components/ui/Nav'
import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'BLOG',
  description: '개발 블로그입니다.',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className='font-HakgyoansimWoojuR bg-violet-500 text-black dark:bg-zinc-800 dark:text-white'>
            <Nav />
            <Toaster />
            <Container>
              {children}
            </Container>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
