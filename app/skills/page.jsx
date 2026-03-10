import SkillsClient from './SkillsClient'

export const metadata = {
  title: 'Skills & Technologies | KevCo - Full-Stack Development Expertise',
  description: "KevCo's expertise in React, React Native, Electron, Node.js, and modern web technologies. Frontend, mobile, desktop, backend development, and UI/UX design skills. View our comprehensive technical expertise.",
  keywords: 'React developer, React Native, Electron developer, Node.js, full stack skills, frontend development, mobile development, desktop apps, backend APIs, UI/UX design, TypeScript, Tailwind CSS, GSAP animations',
  alternates: {
    canonical: '/skills',
  },
  openGraph: {
    title: 'Skills & Technologies | KevCo - Full-Stack Development Expertise',
    description: "KevCo's expertise in React, React Native, Electron, Node.js, and modern web technologies. View our comprehensive technical expertise.",
    url: 'https://kevco.co/skills',
  },
  twitter: {
    title: 'Skills & Technologies | KevCo - Full-Stack Development Expertise',
    description: "KevCo's expertise in React, React Native, Electron, Node.js, and modern web technologies. View our comprehensive technical expertise.",
  },
}

const breadcrumbSchema = {
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
      name: 'Skills & Technologies',
      item: 'https://kevco.co/skills'
    }
  ]
}

export default function SkillsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SkillsClient />
    </>
  )
}
