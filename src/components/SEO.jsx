import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'KevCo | Professional Web, Mobile & Desktop Development Agency',
  description = 'KevCo is a full-stack development agency specializing in React, React Native, and Electron. We build premium web applications, mobile apps, and desktop software. Based in South Florida, serving clients across the United States.',
  keywords = 'KevCo, web development agency, mobile app development, full stack development, React developer, React Native, Electron, Miami web developer, South Florida web developer, Broward web developer, web design agency, app development company, custom software development, website design Miami, professional web development, Node.js developer, UI UX design, Fort Lauderdale web developer',
  ogImage = 'https://kevco.co/images/kevco-logo.png',
  canonicalPath = '',
  type = 'website',
  article = null,
  faqData = null
}) {
  const canonicalUrl = `https://kevco.co${canonicalPath}`
  const siteName = 'KevCo'

  // JSON-LD Structured Data - Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'KevCo',
    url: 'https://kevco.co',
    logo: ogImage,
    image: ogImage,
    description: 'Full-stack development agency specializing in web applications, mobile apps, and desktop software.',
    email: 'kevinmoreau@kevco.co',
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
      'React',
      'React Native',
      'Electron',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Web Development',
      'Mobile App Development',
      'Desktop App Development',
      'UI/UX Design'
    ],
    serviceType: [
      'Web Development',
      'Mobile App Development',
      'Desktop App Development',
      'Backend API Development',
      'UI/UX Design'
    ]
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: 'https://kevco.co',
    description: description,
    publisher: {
      '@type': 'Organization',
      name: 'KevCo'
    }
  }

  // FAQ Schema for rich snippets
  const faqSchema = faqData ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null

  const breadcrumbSchema = canonicalPath ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kevco.co'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: title.split('|')[0].trim(),
        item: canonicalUrl
      }
    ]
  } : null

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  )
}
