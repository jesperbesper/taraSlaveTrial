import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import '../App.css'

type SupportFormValues = {
  name: string
  email: string
  company: string
  accountId: string
  topic: string
  details: string
}

type SupportStatus = 'idle' | 'submitting' | 'success'

const contactChannels = [
  {
    label: 'Email',
    value: 'support@launchpad.app',
    description: 'Fastest for detailed walkthroughs · replies under 2 hours on weekdays.',
    href: 'mailto:support@launchpad.app',
  },
  {
    label: 'Phone',
    value: '+1 (415) 555-0112',
    description: 'Talk to an on-call specialist 6am–8pm PT, Monday through Saturday.',
    href: 'tel:+14155550112',
  },
  {
    label: 'Slack Connect',
    value: '#launchpad-support',
    description: 'Enterprise plans get a shared channel with screen-share-ready engineers.',
    href: 'https://slack.com/connect',
  },
]

const responseBadges = [
  { label: 'Avg. first reply', value: '2m 14s' },
  { label: 'Tickets resolved / week', value: '1.4k' },
  { label: 'CSAT', value: '98% from founders' },
]

const coverageSnapshot = [
  { label: 'Weekday response', value: 'Chat 2m · Email 2h' },
  { label: 'Weekend response', value: '8a–10p PT · on-call overnight' },
  { label: 'Enterprise SLA', value: 'Critical <15m · High <1h · Normal <4h' },
]

const coverageHighlights = [
  'Follow-the-sun teams in SF, Dublin, and Singapore',
  'Incident bridge lines & retros for every severity 1',
  'SOC 2 Type II controls plus weekly pen tests',
]

const faqs = [
  {
    question: 'When should I mark a request as urgent?',
    answer:
      'Use urgent for production outages, billing holds, or security incidents. Those tickets ping the on-call lead instantly.',
  },
  {
    question: 'Can I include sensitive logs in the form?',
    answer:
      'Yes. Everything is encrypted at rest, scrubbed of access tokens, and only routed to the product squad assigned to your workspace.',
  },
  {
    question: 'Do you offer recurring office hours or success planning?',
    answer:
      'Absolutely—choose "Partnership" as the topic, share your preferred cadence, and your CSM will propose a standing slot within one business day.',
  },
]

const topics = ['Billing question', 'Technical troubleshooting', 'Security & compliance', 'Feature request', 'Partnership']

const initialFormValues: SupportFormValues = {
  name: '',
  email: '',
  company: '',
  accountId: '',
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
        <p className="eyebrow">Issue #18 · Customer support hub</p>
        <h1>Talk to a product specialist in minutes</h1>
        <p className="lead">
          Share context once, loop in a human instantly, and track every SLA inside one workspace. Our support engineers sit next to the product team,
          so the people who ship features respond to your requests.
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
              Pick the channel that matches your urgency. Everything routes into the same queue and tags the engineer on call.
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
            <div className="coverage-card">
              <p className="coverage-card__eyebrow">Coverage snapshot</p>
              <dl className="coverage-card__list">
                {coverageSnapshot.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <ul className="coverage-pill-grid">
                {coverageHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="contact-card__footnote">
              <p>
                Prefer status updates? <a href="https://status.launchpad.app">status.launchpad.app</a> shows incidents and planned maintenance in real
                time.
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
              <span>Account ID (optional)</span>
              <input
                type="text"
                name="accountId"
                autoComplete="off"
                value={formValues.accountId}
                onChange={handleChange}
                placeholder="ACME-4291"
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
            <p className={`support-form__status${error ? ' support-form__status--error' : ''}`} role="status" aria-live="polite">
              {error ? error : 'Thanks! Expect a confirmation email within a few minutes.'}
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
