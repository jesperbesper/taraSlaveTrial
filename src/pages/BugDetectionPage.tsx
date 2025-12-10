import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import '../App.css'

type BugFormValues = {
  title: string
  email: string
  severity: string
  environment: string
  releaseChannel: string
  owner: string
  steps: string
  expected: string
  actual: string
  logs: string
}

type SubmissionStatus = 'idle' | 'submitting' | 'success'

const detectionStats = [
  { label: 'Bugs triaged weekly', value: '320' },
  { label: 'Median fix time', value: '7h 12m' },
  { label: 'Escaped regressions', value: '< 0.3%' },
]

const qualityChecklist = [
  'Include commit, build number, or Linear ticket if known',
  'Paste the command, feature flag, or URL that triggered the bug',
  'List exact reproduction steps in numbered order',
  'Describe the impact to customers or internal teams',
  'Add logs, screenshots, or HAR files if they exist',
]

const detectionStreams = [
  { label: 'Nightly regression pack', description: '1,200 scenarios across web, API, and auth flows' },
  { label: 'Real-time anomaly alerts', description: 'Latency, error budgets, and auth spikes stream into PagerDuty' },
  { label: 'Release QA squads', description: 'Dedicated rotation watches every feature flag as it rolls out' },
]

const triageStages = [
  {
    title: 'Capture & validate',
    details: 'Intake bot checks metadata, severity, and duplicates. On-call triage lead confirms repro and tags the owning squad.',
  },
  {
    title: 'Fix & verify',
    details: 'Engineers ship a patch, link it to the ticket, and run targeted regression suites plus accessibility audits.',
  },
  {
    title: 'Deploy & learn',
    details: 'Release managers monitor dashboards for 30 minutes, then add a summary to the incident log and weekly retro.',
  },
]

const severityOptions = ['P0 · Security or data risk', 'P1 · Production outage', 'P2 · Functional bug', 'P3 · Cosmetic issue']

const environmentOptions = ['Production', 'Staging', 'Preview link', 'Local dev']

const releaseChannels = ['Global rollout', 'Beta cohort', 'Internal dogfood', 'Feature flag']

const initialFormValues: BugFormValues = {
  title: '',
  email: '',
  severity: '',
  environment: '',
  releaseChannel: '',
  owner: '',
  steps: '',
  expected: '',
  actual: '',
  logs: '',
}

export default function BugDetectionPage() {
  const [formValues, setFormValues] = useState<BugFormValues>(initialFormValues)
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    if (!formValues.title.trim() || !formValues.email.trim()) {
      return 'Add a title and contact email so we can follow up.'
    }

    if (!formValues.severity || !formValues.environment) {
      return 'Pick a severity and environment so we can route this correctly.'
    }

    const emailPattern = /.+@.+\..+/
    if (!emailPattern.test(formValues.email.trim())) {
      return 'Share a valid email address.'
    }

    if (formValues.steps.trim().length < 40) {
      return 'Walk us through the steps in at least 40 characters.'
    }

    if (formValues.actual.trim().length < 20 || formValues.expected.trim().length < 20) {
      return 'Explain both the expected and actual result so we can confirm the bug.'
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
    await new Promise((resolve) => setTimeout(resolve, 800))
    setStatus('success')
    setFormValues(initialFormValues)
  }

  const isSubmitting = status === 'submitting'

  return (
    <main className="app bug-page">
      <section className="bug-hero">
        <div>
          <p className="eyebrow">Issue #24 · Bug detection desk</p>
          <h1>Escalate bugs with everything QA needs to fix them fast</h1>
          <p className="lead">
            Surface regressions, broken flows, or glitchy UI the second you spot them. The triage squad monitors this queue in real time and loops in
            the on-call engineer with full context.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="https://status.launchpad.app" target="_blank" rel="noreferrer">
              View incident log
            </a>
            <a className="button" href="mailto:bugs@launchpad.app?subject=Urgent%20bug">
              Escalate via email
            </a>
          </div>
        </div>
        <div className="bug-hero__stats">
          {detectionStats.map((stat) => (
            <article className="stat-card bug-stat-card" key={stat.label}>
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__label">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bug-grid">
        <form className="bug-form" onSubmit={handleSubmit} noValidate>
          <p className="eyebrow">Submit a bug</p>
          <h2>Share reproduction steps, context, and impact</h2>
          <p className="bug-form__hint">The more detail you provide, the faster the fix leaves QA.</p>
          <div className="bug-form__grid">
            <label className="bug-form__group">
              <span>Bug title*</span>
              <input
                type="text"
                name="title"
                required
                value={formValues.title}
                onChange={handleChange}
                placeholder="Publishing modal crashes on save"
              />
            </label>
            <label className="bug-form__group">
              <span>Contact email*</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="you@company.com"
              />
            </label>
            <label className="bug-form__group">
              <span>Severity*</span>
              <select name="severity" required value={formValues.severity} onChange={handleChange}>
                <option value="" disabled hidden>
                  Choose one
                </option>
                {severityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="bug-form__group">
              <span>Environment*</span>
              <select name="environment" required value={formValues.environment} onChange={handleChange}>
                <option value="" disabled hidden>
                  Where did this happen?
                </option>
                {environmentOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="bug-form__group">
              <span>Release channel</span>
              <select name="releaseChannel" value={formValues.releaseChannel} onChange={handleChange}>
                <option value="" disabled hidden>
                  Optional
                </option>
                {releaseChannels.map((channel) => (
                  <option key={channel} value={channel}>
                    {channel}
                  </option>
                ))}
              </select>
            </label>
            <label className="bug-form__group">
              <span>Owning squad (if you know it)</span>
              <input
                type="text"
                name="owner"
                value={formValues.owner}
                onChange={handleChange}
                placeholder="Publishing team, Growth squad, etc."
              />
            </label>
          </div>

          <label className="bug-form__group">
            <span>Steps to reproduce*</span>
            <textarea
              name="steps"
              rows={5}
              required
              minLength={40}
              value={formValues.steps}
              onChange={handleChange}
              placeholder="1) Open Scenes > Publishing · 2) Toggle 'Send notifications' · 3) Click Save... (continue)"
            />
          </label>

          <div className="bug-form__grid bug-form__grid--split">
            <label className="bug-form__group">
              <span>Expected behavior*</span>
              <textarea
                name="expected"
                rows={4}
                required
                minLength={20}
                value={formValues.expected}
                onChange={handleChange}
                placeholder="The modal should close and show a confirmation toast."
              />
            </label>
            <label className="bug-form__group">
              <span>Actual behavior*</span>
              <textarea
                name="actual"
                rows={4}
                required
                minLength={20}
                value={formValues.actual}
                onChange={handleChange}
                placeholder="Modal flashes, buttons grey out, and the console logs `Cannot read properties of undefined`."
              />
            </label>
          </div>

          <label className="bug-form__group">
            <span>Logs, links, or extra notes</span>
            <textarea
              name="logs"
              rows={4}
              value={formValues.logs}
              onChange={handleChange}
              placeholder="Paste console output, Grafana links, or anything else the triage engineer should inspect."
            />
          </label>

          <div className="bug-form__actions">
            <label className="bug-form__group bug-form__group--inline">
              <input type="checkbox" name="notify-team" defaultChecked />
              <span>Ping the owning squad in Slack when this submits</span>
            </label>
            <button className="button button--primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit bug'}
            </button>
          </div>

          {(status === 'success' || error) && (
            <p className={`bug-form__status${error ? ' bug-form__status--error' : ''}`} role="status" aria-live="polite">
              {error ? error : 'Thanks! We’ll update you as soon as the fix rolls out.'}
            </p>
          )}
        </form>

        <aside className="bug-sidebar" aria-label="Bug submission guidelines">
          <article className="bug-card">
            <p className="eyebrow">Quality checklist</p>
            <h3>What to include</h3>
            <ul className="bug-checklist">
              {qualityChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="bug-card">
            <p className="eyebrow">Detection streams</p>
            <h3>Where the alert came from</h3>
            <ul className="bug-intel-list">
              {detectionStreams.map((stream) => (
                <li key={stream.label}>
                  <strong>{stream.label}</strong>
                  <p>{stream.description}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="bug-card bug-card--accent">
            <p className="bug-card__title">Triage guardrails</p>
            <p className="bug-card__description">
              Every bug gets an owner within 15 minutes. P0/P1 issues page engineering and incident command instantly.
            </p>
            <ul className="bug-tips">
              <li>Tag security if auth, permissions, or billing is affected.</li>
              <li>Attach HAR files for network or caching issues.</li>
              <li>Use severity P0 only for customer-impacting incidents.</li>
            </ul>
          </article>
        </aside>
      </section>

      <section className="panel bug-timeline">
        <div className="section-heading">
          <p className="eyebrow">What happens next</p>
          <h2>Every regression flows through the same triage path</h2>
          <p>We pair human QA with automation so nothing slips through review or deployment.</p>
        </div>
        <ol className="bug-timeline__list">
          {triageStages.map((stage) => (
            <li key={stage.title} className="bug-timeline__item">
              <h3>{stage.title}</h3>
              <p>{stage.details}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
