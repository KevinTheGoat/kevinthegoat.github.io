import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { gsap } from 'gsap'
import { useTheme } from '../context/ThemeContext'
import SEO from '../components/SEO'
import Footer from '../components/Footer'

const contactMethods = [
  {
    icon: 'ph:envelope-bold',
    title: 'Email',
    value: 'kevinmoreau@kevco.co',
    href: 'mailto:kevinmoreau@kevco.co',
    description: 'Best for project inquiries',
  },
]

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We specialize in full-stack development including web applications, mobile apps (iOS/Android), desktop applications, and backend API development. We also offer UI/UX design services.',
  },
  {
    question: 'What is your typical project timeline?',
    answer:
      'Project timelines vary based on complexity. A simple website might take 2-4 weeks, while a full-featured application could take 2-3 months. We provide detailed estimates after our initial consultation.',
  },
  {
    question: 'Do you offer ongoing maintenance?',
    answer:
      'Yes! We offer maintenance packages to keep your application secure, updated, and running smoothly. This includes bug fixes, security updates, and minor feature additions.',
  },
  {
    question: 'What is your development process?',
    answer:
      'We follow an agile approach: Discovery → Design → Development → Testing → Launch. You are involved at every stage with regular updates and opportunities for feedback.',
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
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const validateForm = () => {
    const errors = {}

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Project type validation
    if (!formData.project) {
      errors.project = 'Please select a project type'
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use gsap.from() instead of fromTo() to avoid jitter on mobile
      gsap.from('.contact-header', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
      })

      gsap.from('.contact-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power3.out',
        clearProps: 'all',
      })

      gsap.from('.contact-form', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
        ease: 'power3.out',
        clearProps: 'all',
      })

      gsap.from('.faq-section', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'power3.out',
        clearProps: 'all',
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)

    // Validate form before submitting
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mgoolpye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          project: formData.project,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', project: '', message: '' })
      } else {
        setError(true)
      }
    } catch (err) {
      setError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact KevCo | Get in Touch for Your Next Project"
        description="Ready to start your web, mobile, or desktop app project? Contact KevCo at kevinmoreau@kevco.co for professional development services. Based in South Florida, serving clients across the United States."
        keywords="contact KevCo, hire web developer Miami, hire mobile app developer, web development agency South Florida, custom software development, project inquiry, web development services Miami, app development quote"
        canonicalPath="/contact"
        faqData={faqs}
      />
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
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl mb-6" style={{ color: theme.muted }}>
            Have a project in mind or just want to chat? We'd love to hear from you.
            Let's create something amazing together.
          </p>

          {/* Email Contact - Integrated */}
          <a
            href="mailto:kevinmoreau@kevco.co"
            className="contact-card flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] w-full sm:w-auto"
            style={{
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
            }}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accentAlt}25)` }}
            >
              <Icon
                icon="ph:envelope-bold"
                className="w-5 h-5 sm:w-6 sm:h-6"
                style={{
                  background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm mb-1" style={{ color: theme.muted }}>Email us at</div>
              <div className="font-semibold text-sm sm:text-base truncate" style={{ color: theme.accent }}>kevinmoreau@kevco.co</div>
            </div>
            <Icon icon="ph:arrow-right-bold" className="w-5 h-5 flex-shrink-0" style={{ color: theme.muted }} />
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className="contact-form p-5 sm:p-8 rounded-2xl sm:rounded-3xl"
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
                  Thank you for reaching out. We'll get back to you within 24 hours.
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
              <>
                {error && (
                  <div
                    className="mb-5 p-4 rounded-xl flex items-center gap-3"
                    style={{ backgroundColor: '#ef444420', border: '1px solid #ef4444' }}
                  >
                    <Icon icon="ph:warning-circle-bold" className="w-5 h-5 flex-shrink-0" style={{ color: '#ef4444' }} />
                    <p className="text-sm" style={{ color: '#ef4444' }}>
                      Failed to send message. Please try again or email us directly.
                    </p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (formErrors.name) setFormErrors({ ...formErrors, name: '' })
                      }}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        backgroundColor: theme.elevated,
                        color: theme.text,
                        border: `1px solid ${formErrors.name ? '#ef4444' : theme.border}`,
                        '--tw-ring-color': theme.accent,
                      }}
                      placeholder="John Doe"
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' })
                      }}
                      className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        backgroundColor: theme.elevated,
                        color: theme.text,
                        border: `1px solid ${formErrors.email ? '#ef4444' : theme.border}`,
                        '--tw-ring-color': theme.accent,
                      }}
                      placeholder="john@example.com"
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                    Project Type
                  </label>
                  <select
                    value={formData.project}
                    onChange={(e) => {
                      setFormData({ ...formData, project: e.target.value })
                      if (formErrors.project) setFormErrors({ ...formErrors, project: '' })
                    }}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2"
                    style={{
                      backgroundColor: theme.elevated,
                      color: theme.text,
                      border: `1px solid ${formErrors.project ? '#ef4444' : theme.border}`,
                      '--tw-ring-color': theme.accent,
                    }}
                    aria-invalid={!!formErrors.project}
                    aria-describedby={formErrors.project ? 'project-error' : undefined}
                  >
                    <option value="">Select a project type</option>
                    <option value="website">Website Development</option>
                    <option value="webapp">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="desktop">Desktop Application</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.project && (
                    <p id="project-error" className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                      {formErrors.project}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.muted }}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' })
                    }}
                    className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-300 focus:ring-2 resize-none"
                    style={{
                      backgroundColor: theme.elevated,
                      color: theme.text,
                      border: `1px solid ${formErrors.message ? '#ef4444' : theme.border}`,
                      '--tw-ring-color': theme.accent,
                    }}
                    placeholder="Tell us about your project..."
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-sm" style={{ color: '#ef4444' }}>
                      {formErrors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-3"
                  style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentAlt})`, color: theme.bg }}
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
              </>
            )}
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2 className="font-display font-bold text-2xl mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
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
                We're currently accepting new projects. Typical response time is within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <Footer />
    </>
  )
}
