import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import '../App.css'

type SupportFormValues = {
  name: string
  email: string
  company: string
  topic: string
  details: string
}

type SupportStatus = 'idle' | 'submitting' | 'success'

const contactChannels = [
  {
    label: 'Email',
    value: 'support@launchpad.app',
    description: '24/7 inbox for account changes, invoices, or urgent help.',
    href: 'mailto:support@launchpad.app',
  },
  {
    label: 'Direct line',
    value: '+1 (415) 555-0112',
    description: 'Talk to an on-call support engineer between 8a–8p PT.',
    href: 'tel:+14155550112',
  },
  {
    label: 'Workspace chat',
    value: 'Slack Connect · #launchpad-support',
    description: 'Add our shared channel so we can unblock your releases in real time.',
    href: 'https://slack.com/connect',
  },
]

const responseBadges = [
  { label: 'Avg. first reply', value: '< 22 minutes' },
  { label: 'Resolution time', value: '95% within 1 business day' },
  { label: 'Coverage', value: 'Live humans · Mon–Sun' },
]

const faqs = [
  {
    question: 'When should I pick "urgent" in the topic field?',
    answer: 'Use it for production outages, billing holds, or security incidents. Those tickets page our on-call lead instantly.',
  },
  {
    question: 'How do you keep my ticket details secure?',
    answer:
      'All submissions are encrypted at rest, routed through our SOC 2 controls, and scrubbed of secrets before sharing with engineers.',
  },
  {
    question: 'Can I book a standing office-hours session?',
    answer:
      'Yes—pick "Success planning" as the topic and suggest a cadence in the message. Our customer success team will confirm within one business day.',
  },
]

const topics = ['Billing or invoices', 'Integrations & APIs', 'Bug or outage report', 'Security review', 'Success planning']

const initialFormValues: SupportFormValues = {
  name: '',
  email: '',
  company: '',
  topic: '',
  details: '',
}

export default function SupportPage() {
  const [formValues, setFormValues] = useState<SupportFormValues>(initialFormValues)
  const [status, setStatus] = useState<SupportStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.topic) {
      return 'Name, email, and topic help us route your request.'
    }

    const emailPattern = /.+@.+\..+/
    if (!emailPattern.test(formValues.email.trim())) {
      return 'Share a valid email address so we can follow up.'
    }

    if (formValues.details.trim().length < 30) {
      return 'Add at least 30 characters so we understand the full context.'
    }

    return null
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const validationResult = validate()
    if (validationResult) {
      setError(validationResult)
      return
    }

    setStatus('submitting')

    await new Promise((resolve) => setTimeout(resolve, 600))

    setStatus('success')
    setFormValues(initialFormValues)
  }

  const isSubmitting = status === 'submitting'

  return (
    <main className="app support-page">
      <section className="support-hero">
        <p className="eyebrow">Customer support</p>
        <h1>Help when launches are on the line</h1>
        <p className="lead">
          Our support engineers sit next to the product team, so you get answers from the people who ship the features you
          rely on.
        </p>
        <div className="support-meta">
          {responseBadges.map((badge) => (
            <article className="support-meta__card" key={badge.label}>
              <p className="support-meta__value">{badge.value}</p>
              <p className="support-meta__label">{badge.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="support-grid">
        <div className="contact-column">
          <div className="contact-card">
            <p className="eyebrow">Contact information</p>
            <h2>Reach us the moment you get stuck</h2>
            <p className="contact-card__description">
              Message us through the channel that matches your urgency. Every path routes into the same queue so nothing slips
              through.
            </p>
            <dl className="contact-list">
              {contactChannels.map((channel) => (
                <div className="contact-list__item" key={channel.label}>
                  <dt>{channel.label}</dt>
                  <dd>
                    <a href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {channel.value}
                    </a>
                    <p>{channel.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="contact-card__footnote">
              <p>
                Prefer status updates? <a href="https://status.launchpad.app">status.launchpad.app</a> shows live incidents and
                planned maintenance.
              </p>
            </div>
          </div>
        </div>

        <form className="support-form" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">Submit a ticket</p>
          <h2>Tell us what you need help with</h2>
          <div className="support-form__grid">
            <label className="support-form__group">
              <span>Full name*</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                value={formValues.name}
                onChange={handleChange}
                placeholder="Alex Rivera"
              />
            </label>
            <label className="support-form__group">
              <span>Work email*</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={formValues.email}
                onChange={handleChange}
                placeholder="alex@studio.dev"
              />
            </label>
            <label className="support-form__group">
              <span>Company</span>
              <input
                type="text"
                name="company"
                autoComplete="organization"
                value={formValues.company}
                onChange={handleChange}
                placeholder="Studio Labs"
              />
            </label>
            <label className="support-form__group">
              <span>Topic*</span>
              <select name="topic" required value={formValues.topic} onChange={handleChange}>
                <option value="" disabled hidden>
                  Pick one
                </option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="support-form__group">
            <span>What happened?*</span>
            <textarea
              name="details"
              rows={6}
              minLength={30}
              required
              value={formValues.details}
              onChange={handleChange}
              placeholder="Share steps to reproduce, error IDs, links to screenshots, or anything else that helps us fix things fast."
            />
          </label>
          <div className="support-form__actions">
            <label className="support-form__group support-form__group--inline">
              <input type="checkbox" name="include-logs" defaultChecked />
              <span>Attach diagnostic logs when available</span>
            </label>
            <button className="button button--primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit request'}
            </button>
          </div>
          {(status === 'success' || error) && (
            <p
              className={`support-form__status${error ? ' support-form__status--error' : ''}`}
              role="status"
              aria-live="polite"
            >
              {error ? error : 'Thanks for the context. Expect a reply in under an hour.'}
            </p>
          )}
        </form>
      </section>

      <section className="panel faq-panel">
        <div className="section-heading">
          <p className="eyebrow">Common questions</p>
          <h2>Before you write in</h2>
          <p>Save a back-and-forth with answers to the things founders and platform teams ask most.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <article className="faq-list__item" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
