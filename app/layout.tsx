import './globals.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import Container from '@/components/ui/Container'
import Nav from '@/components/ui/Nav'
import Footer from "@/components/ui/Footer"

export const metadata: Metadata = {
  title: 'YJin BLOG',
  description: '프론트엔드 개발자 YJin의 블로그입니다.',
  generator: 'Next.js',
  applicationName: 'Yjin Blog',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'tailwindcss', 'markdown', 'node', 'react-native','html','css'],
  authors: [{ name: 'YJin' }, { name: 'YJin', url: 'https://yjin.vercel.app/' }],
  creator: 'YJin',
  publisher: 'YJin',
  alternates: {},
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Next.js',
    description: '프론트엔드 개발자 YJin 블로그입니다.',
    url: '',
    siteName: 'YJin Blog',
    locale: 'ko-KR',
    type: 'website',
  },
  verification: {
    google: "tjds44T2-XqHHOXFyJUnYo6ifLC9cqhzeN13AUAxN4k",
  },
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
          <div className='font-HakgyoansimWoojuR text-black dark:bg-zinc-800 dark:text-white'>
            <Toaster />
            <Nav />
            <Container>
              {children}
              <Footer />
            </Container>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
