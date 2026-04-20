import CardClient from './CardClient'

export const metadata = {
  title: 'Kevin Moreau | Digital Business Card',
  description: 'Save Kevin Moreau\'s contact information. Software Engineer / Architect at KevCo.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/card' },
  openGraph: {
    title: 'Kevin Moreau | Digital Business Card',
    description: 'Software Engineer / Architect at KevCo',
    url: 'https://kevco.co/card',
    images: [{ url: '/images/kevco-logo4.svg' }],
  },
}

export default function CardPage() {
  return <CardClient />
}
