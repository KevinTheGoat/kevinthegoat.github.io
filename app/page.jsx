import HomeClient from './HomeClient'

export const metadata = {
  title: 'KevCo | Professional Web, Mobile & Desktop Development',
  description: 'KevCo is a full-stack development agency specializing in React, React Native, and Electron. We build premium web applications, mobile apps, and desktop software. Based in South Florida, serving clients across the United States.',
  alternates: {
    canonical: '/',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'KevCo',
  url: 'https://kevco.co',
  logo: 'https://kevco.co/images/kevco-logo.png',
  image: 'https://kevco.co/images/kevco-logo.png',
  description: 'Full-stack development agency specializing in web applications, mobile apps, and desktop software.',
  email: 'kevinmoreau@kevco.co',
  foundingDate: '2026-02',
  paymentAccepted: 'Zelle',
  areaServed: {
    '@type': 'Country',
    name: 'United States'
  },
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '25.7617',
    longitude: '-80.1918'
  },
  knowsAbout: [
    'React', 'React Native', 'Electron', 'JavaScript', 'TypeScript',
    'Node.js', 'Web Development', 'Mobile App Development',
    'Desktop App Development', 'UI/UX Design'
  ],
  serviceType: [
    'Web Development', 'Mobile App Development', 'Desktop App Development',
    'Backend API Development', 'UI/UX Design'
  ]
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'KevCo',
  url: 'https://kevco.co',
  description: 'KevCo is a full-stack development agency specializing in React, React Native, and Electron. We build premium web applications, mobile apps, and desktop software. Based in South Florida, serving clients across the United States.',
  publisher: {
    '@type': 'Organization',
    name: 'KevCo'
  }
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <HomeClient />
    </>
  )
}
