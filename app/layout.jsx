import Script from 'next/script'
import Providers from '../components/Providers'
import AppShell from '../components/AppShell'
import './globals.css'

export const metadata = {
  title: 'KevCo | Professional Web, Mobile & Desktop Development Agency',
  description: 'KevCo is a full-stack development agency specializing in React, React Native, and Electron. We build premium web applications, mobile apps, and desktop software. Based in South Florida, serving clients across the United States.',
  keywords: 'KevCo, web development agency, mobile app development, full stack development, React developer, React Native, Electron, Miami web developer, South Florida web developer, Broward web developer, web design agency, app development company, custom software development, website design Miami, professional web development, Node.js developer, UI UX design, Fort Lauderdale web developer',
  authors: [{ name: 'KevCo' }],
  metadataBase: new URL('https://kevco.co'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'aUs-0GbV4QsAP-LPPKdHBFIDsSUc5TaAkxwBg6XE8fE',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/images/kevco-logo.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'KevCo',
    url: 'https://kevco.co/',
    title: 'KevCo | Professional Web, Mobile & Desktop Development Agency',
    description: 'KevCo is a full-stack development agency specializing in React, React Native, and Electron. We build premium web applications, mobile apps, and desktop software. Based in South Florida.',
    images: [
      {
        url: 'https://kevco.co/images/kevco-logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KevCo | Professional Web, Mobile & Desktop Development Agency',
    description: 'KevCo is a full-stack development agency specializing in React, React Native, and Electron. We build premium web applications, mobile apps, and desktop software. Based in South Florida.',
    images: ['https://kevco.co/images/kevco-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'theme-color': '#C5A059',
    'geo.region': 'US-FL',
    'geo.placename': 'Miami',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* DNS Prefetch & Preconnect for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.iconify.design" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.iconify.design" crossOrigin="anonymous" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Fonts with display=swap for better performance */}
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HZMMLB321E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZMMLB321E');
          `}
        </Script>

        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  )
}
