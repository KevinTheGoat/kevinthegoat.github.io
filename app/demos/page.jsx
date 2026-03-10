import DemosClient from './DemosClient'

export const metadata = {
  title: 'Interactive Demos | KevCo - Live Web, Mobile & Desktop App Showcases',
  description: 'Experience fully interactive demo websites, mobile app mockups, and desktop applications. Explore e-commerce sites, SaaS platforms, fitness apps, restaurants, and agency sites built with React, React Native, and Electron.',
  keywords: 'interactive demos, web development demos, mobile app mockups, desktop app demos, React demos, e-commerce demo, SaaS demo, fitness app, restaurant website, agency portfolio',
  alternates: {
    canonical: '/demos',
  },
  openGraph: {
    title: 'Interactive Demos | KevCo - Live Web, Mobile & Desktop App Showcases',
    description: 'Experience fully interactive demo websites, mobile app mockups, and desktop applications built with React, React Native, and Electron.',
    url: 'https://kevco.co/demos',
  },
  twitter: {
    title: 'Interactive Demos | KevCo - Live Web, Mobile & Desktop App Showcases',
    description: 'Experience fully interactive demo websites, mobile app mockups, and desktop applications built with React, React Native, and Electron.',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kevco.co' },
    { '@type': 'ListItem', position: 2, name: 'Interactive Demos', item: 'https://kevco.co/demos' }
  ]
}

export default function DemosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DemosClient />
    </>
  )
}
