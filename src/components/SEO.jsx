import { Helmet } from 'react-helmet-async'

export default function SEO({
  title = 'KevCo | Professional Web, Mobile & Desktop Development',
  description = 'Expert full-stack developer specializing in React, React Native, and Electron. Building premium web applications, mobile apps, and desktop software. Based in the Bahamas, serving clients worldwide.',
  keywords = 'web developer, mobile app developer, full stack developer, React developer, React Native, Electron, Bahamas developer, freelance developer, web design, app development, custom software',
  ogImage = 'https://kevinthegoat.github.io/images/kevco-logo.png',
  canonicalPath = ''
}) {
  const canonicalUrl = `https://kevinthegoat.github.io${canonicalPath}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:url" content={canonicalUrl} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  )
}
