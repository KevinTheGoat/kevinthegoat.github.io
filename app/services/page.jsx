import ServicesClient from './ServicesClient'

export const metadata = {
  title: 'Services | KevCo · Websites, Apps, AI & Integrations',
  description:
    'KevCo is your digital partner. We design, build, integrate, and maintain websites, e-commerce stores, custom web and mobile apps, AI assistants, and the integrations that tie your business together (Stripe, Shopify, WordPress, QuickBooks, Xero, and more).',
  keywords:
    'web development services, e-commerce development, Shopify, WooCommerce, WordPress, custom web apps, mobile apps, AI chatbots, RAG, Stripe integration, QuickBooks integration, ERP integration, hosting, maintenance',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | KevCo · Websites, Apps, AI & Integrations',
    description:
      'Websites, e-commerce, custom apps, AI assistants, integrations, hosting and maintenance. Your digital partner for real businesses.',
    url: 'https://kevco.co/services',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kevco.co' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://kevco.co/services' },
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesClient />
    </>
  )
}
