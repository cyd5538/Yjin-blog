import './globals.css'
import { ThemeProvider } from "@/components/ui/theme-provider"
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import Container from '@/components/ui/Container'
import Nav from '@/components/ui/Nav'
import Footer from "@/components/ui/Footer"
import Script from 'next/script'


export const metadata: Metadata = {
  title: 'YJin BLOG',
  description: '프론트엔드 개발자 YJin의 블로그입니다. JavaScript, React, Next.js, TypeScript, CS 지식 등 프론트엔드 개발과 관련된 다양한 글을 소개하는 블로그입니다.',
  generator: 'Next.js',
  applicationName: 'Yjin Blog',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'tailwindcss', 'markdown', 'node', 'react-native','html','css',"알고리즘", "데이터구조", "네트워크", "데이터베이스"],
  authors: [{ name: 'YJin' }, { name: 'YJin', url: 'https://yjin.vercel.app/' }],
  creator: 'YJin',
  publisher: 'YJin',
  alternates: {},
  icons: {
    icon: '/favicon.ico'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Next.js',
    description: '프론트엔드 개발자 YJin의 블로그입니다. JavaScript, React, Next.js, TypeScript, CS 지식 등 프론트엔드 개발과 관련된 다양한 글을 소개하는 블로그입니다.',
    url: 'https://yjin.vercel.app/',
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
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAGMANAGER_ID

  return (
    <html lang="ko">
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>

      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleTagManagerId}`} />
      <Script id="google-tag-manager">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleTagManagerId}');
        `}
      </Script>

      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className='font-HakgyoansimWoojuR text-black dark:bg-[#040D12] dark:text-white'>
            <Toaster />
            <Nav />
            <Container>
              {children}
            </Container>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}