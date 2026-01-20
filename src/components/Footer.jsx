import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useTheme } from '../context/ThemeContext'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Demos', path: '/demos' },
  { label: 'Contact', path: '/contact' },
]

const socialLinks = [
  { icon: 'ph:envelope-bold', url: 'mailto:kevinmoreau@kevco.co', label: 'Email' },
]

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ borderColor: theme.border }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src="/images/kevco-logo4.svg"
                alt="KevCo"
                className="h-8"
                style={{ filter: 'drop-shadow(0 0 8px rgba(197, 160, 89, 0.3))' }}
              />
            </Link>
            <p className="text-sm max-w-xs" style={{ color: theme.muted }}>
              Building exceptional digital experiences across Web, Mobile, Desktop & Backend.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold mb-4" style={{ color: theme.text }}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm transition-colors duration-300 hover:translate-x-1 inline-flex items-center gap-2"
                  style={{ color: theme.muted }}
                >
                  <Icon icon="ph:caret-right-bold" className="w-3 h-3" style={{ color: theme.accent }} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4" style={{ color: theme.text }}>
              Get In Touch
            </h3>
            <a
              href="mailto:kevinmoreau@kevco.co"
              className="text-sm transition-colors duration-300 block mb-4"
              style={{ color: theme.muted }}
            >
              kevinmoreau@kevco.co
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? undefined : '_blank'}
                  rel={social.url.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: theme.elevated,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                  }}
                  aria-label={social.label}
                >
                  <Icon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t"
          style={{ borderColor: theme.border }}
        >
          <p className="text-sm" style={{ color: theme.muted }}>
            &copy; {new Date().getFullYear()} KevCo. All rights reserved.
          </p>
          <p className="text-sm flex items-center gap-2" style={{ color: theme.muted }}>
            Built with
            <Icon icon="ph:heart-fill" className="w-4 h-4" style={{ color: theme.accent }} />
            using React & GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
