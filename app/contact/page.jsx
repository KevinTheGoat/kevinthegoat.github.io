import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact KevCo | Get in Touch for Your Next Project',
  description: 'Ready to start your web, mobile, or desktop app project? Contact KevCo at kevinmoreau@kevco.co for professional development services. Based in South Florida, serving clients across the United States.',
  keywords: 'contact KevCo, hire web developer Miami, hire mobile app developer, web development agency South Florida, custom software development, project inquiry, web development services Miami, app development quote',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact KevCo | Get in Touch for Your Next Project',
    description: 'Ready to start your project? Contact KevCo for professional web, mobile, and desktop development services.',
    url: 'https://kevco.co/contact',
  },
  twitter: {
    title: 'Contact KevCo | Get in Touch for Your Next Project',
    description: 'Ready to start your project? Contact KevCo for professional web, mobile, and desktop development services.',
  },
}

const faqs = [
  { question: 'What services do you offer?', answer: 'We specialize in full-stack development including web applications, mobile apps (iOS/Android), desktop applications, and backend API development. We also offer UI/UX design services.' },
  { question: 'What is your typical project timeline?', answer: 'Project timelines vary based on complexity. A simple website might take 2-4 weeks, while a full-featured application could take 2-3 months. We provide detailed estimates after our initial consultation.' },
  { question: 'Do you offer ongoing maintenance?', answer: 'Yes! We offer maintenance packages to keep your application secure, updated, and running smoothly. This includes bug fixes, security updates, and minor feature additions.' },
  { question: 'What is your development process?', answer: 'We follow an agile approach: Discovery → Design → Development → Testing → Launch. You are involved at every stage with regular updates and opportunities for feedback.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kevco.co' },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://kevco.co/contact' }
  ]
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactClient />
    </>
  )
}
