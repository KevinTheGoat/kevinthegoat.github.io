import ProjectsClient from './ProjectsClient'

export const metadata = {
  title: 'Featured Projects | KevCo - Web Development Portfolio',
  description: 'View our best web development work including Stuttgart International Collision, Accident Assist Network, and Monexus Logistics. Professional websites and web applications built with React and modern technologies.',
  keywords: 'web development portfolio, React projects, business websites, web applications, professional web design, Stuttgart International Collision, Accident Assist Network, logistics platform',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Featured Projects | KevCo - Web Development Portfolio',
    description: 'View our best web development work. Professional websites and web applications built with React and modern technologies.',
    url: 'https://kevco.co/projects',
  },
  twitter: {
    title: 'Featured Projects | KevCo - Web Development Portfolio',
    description: 'View our best web development work. Professional websites and web applications built with React and modern technologies.',
  },
}

const projects = [
  { title: 'Stuttgart International Collision', description: 'A premium auto body and collision repair service website', url: 'https://stuttgart-international.pages.dev/', image: '/images/projects/stuttgart-collision.png' },
  { title: 'Panda Depot Inc', description: 'A wholesale restaurant supply company website', url: 'https://panda-depot.pages.dev/', image: '/images/projects/panda-depot.png' },
  { title: 'Titan Plumbing', description: 'A professional plumbing service website', url: 'https://plumbing-showcase.pages.dev/', image: '/images/projects/titan-plumbing.png' },
  { title: 'Accident Assist Network', description: 'A comprehensive accident assistance platform', url: 'https://accident-assist.pages.dev/', image: '/images/projects/accident-assist.png' },
  { title: 'Monexus Logistics', description: 'A professional logistics and freight forwarding platform', url: 'https://harborlink-logistics.pages.dev/', image: '/images/projects/monexus-logistics.png' },
]

const projectsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'KevCo Portfolio',
  description: 'Web development projects by KevCo',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      url: project.url,
      image: `https://kevco.co${project.image}`,
      creator: {
        '@type': 'Organization',
        name: 'KevCo'
      }
    }
  }))
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kevco.co' },
    { '@type': 'ListItem', position: 2, name: 'Featured Projects', item: 'https://kevco.co/projects' }
  ]
}

export default function ProjectsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProjectsClient />
    </>
  )
}
