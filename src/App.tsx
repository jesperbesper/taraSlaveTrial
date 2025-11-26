import './App.css'
import { FeatureCard, type FeatureCardProps } from './components/FeatureCard'

type ResourceLink = {
  label: string
  href: string
  description: string
}

const features: FeatureCardProps[] = [
  {
    title: 'Modern toolchain',
    description: 'Vite + React + TypeScript are configured out of the box for fast iteration.',
    action: { label: 'Why Vite', href: 'https://vite.dev/guide/why.html' },
  },
  {
    title: 'Quality gates',
    description: 'ESLint ships with React Hooks and TypeScript rules so issues are caught early.',
    action: { label: 'ESLint flat config', href: 'https://eslint.org/docs/latest/use/configure/configuration-files' },
  },
  {
    title: 'Production builds',
    description: 'Run `npm run build` to emit an optimized, ready-to-deploy bundle.',
    action: { label: 'Vite build docs', href: 'https://vite.dev/guide/build' },
  },
]

const resources: ResourceLink[] = [
  {
    label: 'React docs',
    href: 'https://react.dev/learn',
    description: 'Deep-dive into components, hooks, and architectural guidance.',
  },
  {
    label: 'TypeScript handbook',
    href: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    description: 'Brush up on the language features used throughout the project.',
  },
  {
    label: 'Vite config reference',
    href: 'https://vite.dev/config/',
    description: 'Extend the tooling pipeline with aliases, env vars, and plugins.',
  },
]

function App() {
  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Issue #7 · React project bootstrap</p>
        <h1>Welcome to your React starter</h1>
        <p className="lead">
          This repository now ships with a modern Vite + React + TypeScript setup so you can focus on
          delivering product features instead of wiring tooling.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="https://vite.dev/guide/" target="_blank" rel="noreferrer">
            Explore the stack
          </a>
          <a className="button" href="https://react.dev/learn" target="_blank" rel="noreferrer">
            React quickstart
          </a>
        </div>
      </section>

      <section>
        <h2>Included tooling</h2>
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Next steps</h2>
        <ol className="next-steps">
          <li>
            <code>npm run dev</code> starts the development server on <code>http://localhost:5173</code>.
          </li>
          <li>
            Add components inside <code>src/</code> and update <code>App.tsx</code> to reflect your product surface.
          </li>
          <li>
            Use <code>npm run lint</code> and <code>npm run build</code> before opening pull requests.
          </li>
        </ol>
      </section>

      <section>
        <h2>Helpful resources</h2>
        <ul className="resource-list">
          {resources.map((resource) => (
            <li key={resource.label}>
              <a href={resource.href} target="_blank" rel="noreferrer">
                {resource.label}
              </a>
              <p>{resource.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
