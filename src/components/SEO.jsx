import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'KevCo | Professional Web, Mobile & Desktop Development',
  description = 'Expert full-stack developer specializing in React, React Native, and Electron. Building premium web applications, mobile apps, and desktop software. Based in the Bahamas, serving clients worldwide.',
  keywords = 'web developer, mobile app developer, full stack developer, React developer, React Native, Electron, Bahamas developer, freelance developer, web design, app development, custom software',
  ogImage = 'https://kevinthegoat.github.io/images/kevco-logo.png',
  canonicalPath = '',
  type = 'website',
  article = null
}) {
  const canonicalUrl = `https://kevinthegoat.github.io${canonicalPath}`
  const siteName = 'KevCo'

  // JSON-LD Structured Data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kevin Moreau',
    jobTitle: 'Full-Stack Developer',
    url: 'https://kevinthegoat.github.io',
    image: ogImage,
    sameAs: [],
    knowsAbout: [
      'React',
      'React Native',
      'Electron',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Web Development',
      'Mobile App Development',
      'Desktop App Development'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'KevCo'
    }
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: 'https://kevinthegoat.github.io',
    description: description,
    author: {
      '@type': 'Person',
      name: 'Kevin Moreau'
    }
  }

  const breadcrumbSchema = canonicalPath ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kevinthegoat.github.io'
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
      <meta name="twitter:site" content="@kevco" />
      <meta name="twitter:creator" content="@kevco" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={canonicalUrl} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  )
}
