import { Link } from 'react-router-dom'
import '../App.css'

type Product = {
  id: string
  name: string
  category: string
  priceLabel: string
  billingNote: string
  description: string
  badge?: string
  highlight?: boolean
  features: string[]
  cta: {
    label: string
    href: string
  }
}

const heroStats = [
  { label: 'Products live', value: '10 ready-to-ship kits' },
  { label: 'Average payback', value: '41 days' },
  { label: 'Support SLA', value: '< 60 min response' },
]

const products: Product[] = [
  {
    id: 'sandbox',
    name: 'LaunchPad Sandbox',
    category: 'Prototype kit',
    priceLabel: '$0',
    billingNote: 'Free forever · 1 editor seat',
    description: 'Build proof-of-concepts with our starter layouts, copy decks, and asset pack.',
    badge: 'New',
    features: ['Two launch templates', 'Basic analytics wiring', 'Community-only support'],
    cta: { label: 'Start free', href: 'https://cal.com/launchpad/sandbox' },
  },
  {
    id: 'starter',
    name: 'LaunchPad Starter',
    category: 'Core platform',
    priceLabel: '$39',
    billingNote: 'Per editor / month',
    description: 'Ship marketing launches with guardrails, theme tokens, and instant preview links.',
    features: ['Unlimited launches', 'Theme token manager', 'Email support in < 4h'],
    cta: { label: 'Upgrade now', href: 'https://cal.com/launchpad/starter' },
  },
  {
    id: 'studio',
    name: 'LaunchPad Studio',
    category: 'Collaboration',
    priceLabel: '$79',
    billingNote: 'Per workspace / month',
    description: 'Unlock shared content approvals, annotations, and reusable copy libraries.',
    features: ['Comment + approval flows', 'Versioned content blocks', 'Slack + Linear integrations'],
    cta: { label: 'Book a tour', href: 'https://cal.com/launchpad/studio' },
  },
  {
    id: 'growth',
    name: 'LaunchPad Growth',
    category: 'Go-to-market',
    priceLabel: '$129',
    billingNote: 'Per workspace / month',
    description: 'Pair experimentation tooling with high-converting modules for growth teams.',
    badge: 'Most popular',
    highlight: true,
    features: ['A/B experiment kit', 'Reusable pricing tables', 'Dedicated CSM office hours'],
    cta: { label: 'Talk to sales', href: 'mailto:sales@launchpad.app?subject=LaunchPad%20Growth' },
  },
  {
    id: 'scale',
    name: 'LaunchPad Scale',
    category: 'Platform',
    priceLabel: '$249',
    billingNote: 'Per workspace / month',
    description: 'Bring in advanced roles, branching, and enterprise change control.',
    features: ['SAML + SCIM provisioning', 'Branch previews for reviews', 'SOC 2 Type II controls'],
    cta: { label: 'Request pilot', href: 'https://cal.com/launchpad/scale' },
  },
  {
    id: 'enterprise',
    name: 'LaunchPad Enterprise',
    category: 'Enterprise',
    priceLabel: 'Custom',
    billingNote: 'Annual agreement · volume pricing',
    description: 'Bundle advanced add-ons, white-glove migrations, and shared OKR planning.',
    features: ['24/7 named TAM', 'Private networking + BYOK', 'Launch labs with our design team'],
    cta: { label: 'Design your plan', href: 'mailto:enterprise@launchpad.app' },
  },
  {
    id: 'automation',
    name: 'Automation Runner',
    category: 'Add-on',
    priceLabel: '$59',
    billingNote: 'Per workflow / month',
    description: 'Trigger data syncs, approvals, and publishing automatically from your stack.',
    features: ['25K tasks included', 'Airflow & Zapier bridges', 'Ops center with audit log'],
    cta: { label: 'Enable automation', href: 'https://cal.com/launchpad/automation' },
  },
  {
    id: 'observability',
    name: 'Observability Pack',
    category: 'Add-on',
    priceLabel: '$79',
    billingNote: 'Per environment / month',
    description: 'Track performance, uptime, and lighthouse scores right next to your releases.',
    features: ['Live lighthouse reports', 'Alerting to Slack + PagerDuty', 'Data export to BigQuery'],
    cta: { label: 'Monitor launches', href: 'https://cal.com/launchpad/observability' },
  },
  {
    id: 'ai-storyboard',
    name: 'AI Storyboard Studio',
    category: 'AI co-pilot',
    priceLabel: '$149',
    billingNote: 'Per creator / month',
    description: 'Draft copy, product shots, and changelog videos with AI tuned to your brand.',
    badge: 'Beta',
    features: ['Brand voice training', 'Image + video generations', 'Guardrails for legal + tone'],
    cta: { label: 'Join the beta', href: 'https://cal.com/launchpad/ai' },
  },
  {
    id: 'field-kit',
    name: 'Field Ops Kit',
    category: 'Expansion',
    priceLabel: '$35',
    billingNote: 'Per field rep / month',
    description: 'Arm sellers with interactive demos, ROI calculators, and localized one-pagers.',
    features: ['Offline-ready demo mode', 'Regional content variants', 'CRM attribution sync'],
    cta: { label: 'Enable field reps', href: 'https://cal.com/launchpad/field' },
  },
]

const planSignals = [
  { label: 'Viewer seats', value: 'Unlimited viewers on every plan' },
  { label: 'Billing', value: 'Monthly or annual with 10% savings' },
  { label: 'Guarantee', value: '30-day pilot on paid tiers' },
]

export default function ProductsPage() {
  return (
    <main className="app products-page">
      <section className="products-hero">
        <div>
          <p className="eyebrow">Products & pricing</p>
          <h1>Pick the LaunchPad kit that matches your next milestone</h1>
          <p className="lead">
            Every plan ships with the same design system, routing, and hosting-ready builds. Scale up with add-ons when you
            need automation, governance, or AI copilots.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="https://cal.com/launchpad/demo" target="_blank" rel="noreferrer">
              Schedule a walk-through
            </a>
            <Link className="button" to="/support">
              Ask support first
            </Link>
          </div>
        </div>
        <div className="products-hero__meta">
          {heroStats.map((stat) => (
            <article key={stat.label} className="products-hero__card">
              <p className="products-hero__value">{stat.value}</p>
              <p className="products-hero__label">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <p className="eyebrow">What every plan includes</p>
          <h2>Productized governance, lightning-fast assets, and calm launches</h2>
          <p>
            Start anywhere—tokens, hosting, and previews are part of the bundle. Add automation or AI later without
            re-implementing the foundations.
          </p>
        </div>
        <div className="products-legend">
          {planSignals.map((signal) => (
            <article key={signal.label}>
              <p className="products-legend__label">{signal.label}</p>
              <p className="products-legend__value">{signal.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="products-grid-section">
        <div className="products-grid">
          {products.map((product) => (
            <article
              key={product.id}
              className={`product-card${product.highlight ? ' product-card--highlighted' : ''}`}
              aria-label={`${product.name} plan`}
            >
              <div className="product-card__header">
                <div>
                  <p className="product-card__category">{product.category}</p>
                  <h3>{product.name}</h3>
                </div>
                {product.badge && <span className="product-card__badge">{product.badge}</span>}
              </div>
              <p className="product-card__price">
                {product.priceLabel}
                <span>{product.billingNote}</span>
              </p>
              <p className="product-card__description">{product.description}</p>
              <ul className="product-card__features">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="product-card__actions">
                <a className="button button--primary" href={product.cta.href} target="_blank" rel="noreferrer">
                  {product.cta.label}
                </a>
                <a className="button button--ghost" href="mailto:support@launchpad.app?subject=Product%20question">
                  Compare with support
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel products-proof">
        <div>
          <p className="eyebrow">How we partner</p>
          <h2>No-surprise rollouts, even for regulated teams</h2>
          <p>
            Product, security, and RevOps each get their own kickoff. We review integrations, add-ons, and change windows
            before the first dollar is invoiced.
          </p>
        </div>
        <div className="products-proof__list">
          <p>✔ Shared roadmap reviews every quarter</p>
          <p>✔ Migration assistance included on Scale and higher</p>
          <p>✔ Dedicated incident bridge for Automation & Observability packs</p>
          <p>✔ Outcome tracking inside your CRM and data warehouse</p>
        </div>
      </section>
    </main>
  )
}
