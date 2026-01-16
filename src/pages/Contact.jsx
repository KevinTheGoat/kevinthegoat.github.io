import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'

const contactMethods = [
  {
    icon: 'ph:envelope-bold',
    title: 'Email',
    value: 'kevinmoreau@kevco.co',
    href: 'mailto:kevinmoreau@kevco.co',
    description: 'Best for project inquiries',
  },
  {
    icon: 'mdi:github',
    title: 'GitHub',
    value: '@KevinTheGoat',
    href: 'https://github.com/KevinTheGoat',
    description: 'Check out my code',
  },
  {
    icon: 'mdi:linkedin',
    title: 'LinkedIn',
    value: 'Connect with me',
    href: '#',
    description: 'Professional network',
  },
]

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'I specialize in full-stack development including web applications, mobile apps (iOS/Android), desktop applications, and backend API development. I also offer UI/UX design services.',
  },
  {
    question: 'What is your typical project timeline?',
    answer:
      'Project timelines vary based on complexity. A simple website might take 2-4 weeks, while a full-featured application could take 2-3 months. I provide detailed estimates after our initial consultation.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Yes! I offer maintenance packages to keep your application secure, updated, and running smoothly. This includes bug fixes, security updates, and minor feature additions.',
  },
  {
    question: 'What is your development process?',
    answer:
      'I follow an agile approach: Discovery → Design → Development → Testing → Launch. You are involved at every stage with regular updates and opportunities for feedback.',
  },
]

export default function Contact() {
  const { theme } = useTheme()
  const pageRef = useRef(null)
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-header',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.contact-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.2, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.contact-form',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power3.out' }
      )

      gsap.fromTo(
        '.faq-section',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power3.out' }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: '', email: '', project: '', message: '' })
  }

  return (
    <div ref={pageRef} className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="contact-header max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Icon icon="ph:chat-circle-bold" className="w-4 h-4" style={{ color: theme.accent }} />
            <span className="text-sm font-medium" style={{ color: theme.muted }}>
              Let's Connect
            </span>
          </div>
          <h1 className="font-display font-bold text-display-lg mb-6">
            Get in <span style={{ color: theme.accent }}>Touch</span>
          </h1>
          <p className="text-xl" style={{ color: theme.muted }}>
            Have a project in mind or just want to chat? I'd love to hear from you.
            Let's create something amazing together.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method) => (
            <a
              key={method.title}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="contact-card group p-6 rounded-2xl transition-all duration-500 card-hover"
              style={{
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${theme.accent}20` }}
              >
                <Icon icon={method.icon} className="w-7 h-7" style={{ color: theme.accent }} />
              </div>
              <h3 className="font-display font-semibold text-lg mb-1">{method.title}</h3>
              <p className="font-medium mb-1" style={{ color: theme.accent }}>
                {method.value}
              </p>
              <p className="text-sm" style={{ color: theme.muted }}>
                {method.description}
              </p>
            </a>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className="contact-form p-8 rounded-3xl"
            style={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
            }}
          >
            <h2 className="font-display font-bold text-2xl mb-6">Send a Message</h2>

            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${theme.accent}20` }}
                >
                  <Icon icon="ph:check-circle-bold" className="w-10 h-10" style={{ color: theme.accent }} />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">Message Sent!</h3>
                <p style={{ color: theme.muted }}>
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                  style={{ backgroundColor: theme.elevated, color: theme.text }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        backgroundColor: theme.elevated,
                        color: theme.text,
                        border: `1px solid ${theme.border}`,
                        '--tw-ring-color': theme.accent,
                      }}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        backgroundColor: theme.elevated,
                        color: theme.text,
                        border: `1px solid ${theme.border}`,
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                    Project Type
                  </label>
                  <select
                    required
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      backgroundColor: theme.elevated,
                      color: theme.text,
                      border: `1px solid ${theme.border}`,
                    }}
                  >
                    <option value="">Select a project type</option>
                    <option value="website">Website Development</option>
                    <option value="webapp">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="desktop">Desktop Application</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 resize-none"
                    style={{
                      backgroundColor: theme.elevated,
                      color: theme.text,
                      border: `1px solid ${theme.border}`,
                    }}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3"
                  style={{ backgroundColor: theme.accent, color: theme.bg }}
                >
                  {isSubmitting ? (
                    <>
                      <Icon icon="ph:spinner" className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Icon icon="ph:paper-plane-right-bold" className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2 className="font-display font-bold text-2xl mb-6">
              Frequently Asked <span style={{ color: theme.accent }}>Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <span className="font-medium pr-4">{faq.question}</span>
                    <Icon
                      icon="ph:caret-down-bold"
                      className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                      style={{ color: theme.accent }}
                    />
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'pb-5 max-h-96' : 'max-h-0'
                    }`}
                  >
                    <p style={{ color: theme.muted }}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability Card */}
            <div
              className="mt-8 p-6 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}15, ${theme.accentAlt}15)`,
                border: `1px solid ${theme.border}`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Currently Available</span>
              </div>
              <p className="text-sm" style={{ color: theme.muted }}>
                I'm currently accepting new projects. Typical response time is within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
