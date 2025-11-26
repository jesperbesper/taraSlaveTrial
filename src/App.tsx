import './App.css'
import { FeatureCard, type FeatureCardProps } from './components/FeatureCard'

type Stat = {
  label: string
  value: string
}

type Testimonial = {
  quote: string
  author: string
  role: string
}

type SmartResource = {
  label: string
  href: string
}

const stats: Stat[] = [
  { label: 'Launch-ready sections', value: '12' },
  { label: 'Teams shipped', value: '300+' },
  { label: 'NPS from stakeholders', value: '74' },
]

const logos = ['Northwind Labs', 'Helios', 'Pulse', 'Waypoint', 'Evergreen']

const features: FeatureCardProps[] = [
  {
    title: 'Composable sections',
    description: 'Mix hero, stats, testimonials, and pricing modules to fit any launch.',
    action: { label: 'See layout ideas', href: 'https://www.sequoiacap.com/article/how-to-build-landing-page/' },
  },
  {
    title: 'Theme-ready tokens',
    description: 'Update a single accent color to roll out light, dark, or brand-specific themes.',
    action: { label: 'Design token tips', href: 'https://web.dev/design-system/' },
  },
  {
    title: 'Built for velocity',
    description: 'Vite, TypeScript, and ESLint are tuned so you can ship copy tweaks in minutes.',
    action: { label: 'See tooling stack', href: 'https://vite.dev/guide/why.html' },
  },
]

const checklist = ['Pick the hero and supporting sections you need', 'Swap copy, logos, and metrics for your audience', 'Preview in Vite and ship with confidence']

const smartLinks = [
  {
    label: 'MDN Web Docs',
    href: 'https://developer.mozilla.org/',
    description: 'Authoritative reference for the core web platform.',
  },
  {
    label: 'web.dev Guides',
    href: 'https://web.dev/learn/',
    description: 'Deep dives on performance, accessibility, and UX.',
  },
  {
    label: 'StackBlitz Turbo',
    href: 'https://stackblitz.com/',
    description: 'Spin up instant web containers to prototype ideas.',
  },
  {
    label: 'CodeSandbox',
    href: 'https://codesandbox.io/',
    description: 'Link PRs to live previews and QA collaboratively.',
  },
  {
    label: 'Vercel Docs',
    href: 'https://vercel.com/docs',
    description: 'Ship frontend changes with zero-config deployments.',
  },
  {
    label: 'Netlify Platform',
    href: 'https://docs.netlify.com/',
    description: 'Automate builds, previews, and site analytics.',
  },
  {
    label: 'Supabase',
    href: 'https://supabase.com/docs',
    description: 'Drop-in backend APIs, storage, and auth workflows.',
  },
  {
    label: 'OpenAI Developers',
    href: 'https://platform.openai.com/docs',
    description: 'Add AI copilots and tooling into your stack.',
  },
  {
    label: 'GitHub Copilot',
    href: 'https://github.com/features/copilot',
    description: 'Pair program with AI suggestions inside your IDE.',
  },
]

const testimonials: Testimonial[] = [
  {
    quote: 'We swapped the copy, added our product shots, and were live before lunch.',
    author: 'Leah Chen',
    role: 'VP of Product · Waveform',
  },
  {
    quote: 'The sections already knew about dark mode and responsive layouts. Zero rewrites.',
    author: 'Mateo Silva',
    role: 'Design Lead · Northwind',
  },
]

const smartDevResources: SmartResource[] = [
  { label: 'MDN Web Docs', href: 'https://developer.mozilla.org/' },
  { label: 'web.dev Patterns', href: 'https://web.dev/patterns/' },
  { label: 'OpenAI Developer Docs', href: 'https://platform.openai.com/docs/overview' },
  { label: 'Hugging Face Course', href: 'https://huggingface.co/learn' },
  { label: 'LangChain Playbook', href: 'https://python.langchain.com/docs/use_cases/' },
  { label: 'Vercel AI SDK', href: 'https://sdk.vercel.ai/docs' },
  { label: 'Supabase AI Helpers', href: 'https://supabase.com/ai' },
  { label: 'StackBlitz WebContainers', href: 'https://developer.stackblitz.com/' },
]

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Issue #13 · Smart dev hub</p>
        <h1>Launch a polished frontpage without starting from scratch</h1>
        <p className="lead">
          Drop this starter into any React project to kick off a modern landing page. Swap the copy, adjust the accent,
          and publish a convincing story in an afternoon.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
            Preview the demo
          </a>
          <a className="button" href="https://react.dev/learn" target="_blank" rel="noreferrer">
            View docs
          </a>
        </div>
        <div className="hero__meta">
          {stats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__label">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="logo-row">
          <p className="logo-row__eyebrow">Trusted by lean product teams</p>
          <div className="logo-row__logos">
            {logos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="panel smart-links">
        <div className="section-heading">
          <p className="eyebrow">Smart development</p>
          <h2>Keep the smartest build guides one click away</h2>
          <p>Jump straight into AI-ready patterns, API references, and launch playbooks.</p>
        </div>
        <div className="resource-buttons">
          {smartDevResources.map((resource) => (
            <a
              key={resource.label}
              className="button button--neutral"
              href={resource.href}
              target="_blank"
              rel="noreferrer"
            >
              {resource.label}
            </a>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <p className="eyebrow">Why it works</p>
          <h2>Build once, reuse for every launch</h2>
          <p>Reusable cards, panels, and lists cover the sections most landing pages need.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="panel panel--split">
        <div>
          <p className="eyebrow">Launch playbook</p>
          <h2>Roll out a frontpage in three steps</h2>
          <p>Follow a predictable flow so writers, designers, and engineers stay in sync.</p>
          <ul className="bullet-list">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="panel panel--accent">
          <p className="panel__title">What ships with this starter</p>
          <div className="pill-grid">
            <span className="pill">Hero + CTA</span>
            <span className="pill">Stats & proof</span>
            <span className="pill">Testimonials</span>
            <span className="pill">Feature grid</span>
            <span className="pill">Dark mode tokens</span>
            <span className="pill">Vite build</span>
          </div>
        </div>
      </section>

      <section>
        <div className="section-heading">
          <p className="eyebrow">Proof</p>
          <h2>Stories from recent launches</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <article className="testimonial" key={testimonial.author}>
              <p className="testimonial__quote">{testimonial.quote}</p>
              <p className="testimonial__author">{testimonial.author}</p>
              <p className="testimonial__role">{testimonial.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="smart-links">
        <div className="section-heading">
          <p className="eyebrow">Smart development</p>
          <h2>Buttons to open your build brain-trust</h2>
          <p>Jump straight into the docs, sandboxes, and automation platforms teams lean on.</p>
        </div>
        <div className="resource-grid">
          {smartLinks.map((link) => (
            <a className="button resource-button" key={link.label} href={link.href} target="_blank" rel="noreferrer">
              <span className="resource-button__label">{link.label}</span>
              <span className="resource-button__subtext">{link.description}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="cta">
        <div>
          <p className="eyebrow">Next up</p>
          <h2>Ready to publish your frontpage?</h2>
          <p className="lead">
            Duplicate this layout, hook up analytics, and hand it over to growth. Everything else is wired for you.
          </p>
        </div>
        <div className="hero__actions">
          <a className="button button--primary" href="https://vite.dev/guide/build" target="_blank" rel="noreferrer">
            Start building
          </a>
          <a className="button" href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">
            Browse the repo
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
