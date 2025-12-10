import '../App.css'

type HeroStat = {
  label: string
  value: string
}

type Founder = {
  name: string
  role: string
  bio: string
  location: string
  focus: string[]
  socials: { label: string; href: string; handle: string }[]
}

type TimelineEntry = {
  year: string
  headline: string
  description: string
}

type Channel = {
  label: string
  description: string
  href: string
}

const heroStats: HeroStat[] = [
  { label: 'Studios launched', value: '160+' },
  { label: 'Deploys per week', value: '48' },
  { label: 'People behind LaunchPad', value: '8 core crew + partners' },
]

const founders: Founder[] = [
  {
    name: 'Mara Ibarra',
    role: 'Co-founder & CEO',
    location: 'Oakland, CA · PST',
    bio: 'Previously led narrative & growth launches at Northwind Labs. Favorite projects blend storytelling, ops rigor, and a stubborn belief that every release deserves a beautiful front door.',
    focus: ['Creative direction', 'Customer interviews', 'Pitch reviews'],
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/maraibarra', handle: '/maraibarra' },
      { label: 'Twitter', href: 'https://twitter.com/marastudio', handle: '@marastudio' },
      { label: 'GitHub', href: 'https://github.com/maraibarra', handle: 'maraibarra' },
    ],
  },
  {
    name: 'Rowan Ellis',
    role: 'Co-founder & CTO',
    location: 'Portland, OR · PST',
    bio: 'Rowan shipped DX tooling at Vercel and built internal site generators for global product teams. Now obsessed with helping lean teams ship updates without the copy/paste spiral.',
    focus: ['Design systems', 'Platform reliability', 'AI copilots'],
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rowanellis', handle: '/rowanellis' },
      { label: 'Twitter', href: 'https://twitter.com/rowan_codes', handle: '@rowan_codes' },
      { label: 'GitHub', href: 'https://github.com/rowan-ellis', handle: 'rowan-ellis' },
    ],
  },
  {
    name: 'Priya Raman',
    role: 'Head of Experience',
    location: 'New York, NY · EST',
    bio: 'Priya keeps our launch playbooks grounded in real ops workflows. She has guided 70+ founders through their first public ship and still replies to every support ping personally.',
    focus: ['Customer education', 'Accessibility QA', 'Community programs'],
    socials: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyar', handle: '/priyar' },
      { label: 'Twitter', href: 'https://twitter.com/priya-raman', handle: '@priya_raman' },
      { label: 'Dribbble', href: 'https://dribbble.com/priya', handle: 'priya' },
    ],
  },
]

const timeline: TimelineEntry[] = [
  {
    year: '2019',
    headline: 'First playbooks drafted',
    description: 'Mara and Rowan swapped a Notion doc of favorite hero sections and realized nearly every studio struggled with the same “weekend landing page”.',
  },
  {
    year: '2021',
    headline: 'LaunchPad becomes a product',
    description: 'We quit contracting, incorporated, and shipped the first React + Vite starter that bundled copy, tone, and system tokens.',
  },
  {
    year: '2023',
    headline: 'Support crew formed',
    description: 'Priya joined with a bench of part-time operators to provide premiere launch coverage for YC, seed, and Series A teams.',
  },
  {
    year: '2025',
    headline: 'AI-native storytelling',
    description: 'We added context packs for popular AI copilots so teams can brief assistants with the same voice we use in our templates.',
  },
]

const studioValues = [
  {
    title: 'Ship the backstage, too',
    detail: 'Frontpages age fast. We build docs, token libraries, and ops rituals so refreshes take hours—not weeks.',
  },
  {
    title: 'Creators over hype',
    detail: 'We profile and celebrate the humans shipping products, giving credit before algorithms take it away.',
  },
  {
    title: 'Every pixel earns trust',
    detail: 'Copy, motion, and loading states are treated as product features. Rough edges erode credibility during launches.',
  },
]

const studioChannels: Channel[] = [
  {
    label: 'Newsletter',
    description: 'Monthly breakdowns of favorite product launches and the templates behind them.',
    href: 'https://launchpad.app/newsletter',
  },
  {
    label: 'YouTube',
    description: 'Creator diaries, teardown live streams, and behind-the-scenes footage.',
    href: 'https://youtube.com/@launchpad-studio',
  },
  {
    label: 'Community Discord',
    description: 'Drop drafts for feedback and see what the crew is prototyping after hours.',
    href: 'https://discord.gg/launchpadstudio',
  },
  {
    label: 'Instagram',
    description: 'Photo essays from field research trips, studio builds, and Nimbus the cat.',
    href: 'https://instagram.com/launchpadstudio',
  },
]

export default function AboutPage() {
  return (
    <main className="app about-page">
      <section className="about-hero">
        <p className="eyebrow">About LaunchPad</p>
        <h1>The builders behind the landing pages</h1>
        <p className="lead">
          LaunchPad started as a weekend ritual for friends helping friends tell better product stories. Today our tiny crew
          blends editorial muscle, DX tooling, and obsessive support so you can focus on the launch—not the layout.
        </p>
        <div className="hero__actions about-hero__actions">
          <a className="button button--primary" href="mailto:hello@launchpad.app">
            Email the founders
          </a>
          <a className="button" href="https://cal.com/launchpad/intro" target="_blank" rel="noreferrer">
            Book a 20‑minute studio tour
          </a>
        </div>
        <div className="hero__meta about-hero__meta">
          {heroStats.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel about-mission">
        <div className="section-heading">
          <p className="eyebrow">Our focus</p>
          <h2>Make launches feel handcrafted—even when teams are sprinting</h2>
          <p>
            We obsess over the connective tissue between product, marketing, and support so the people behind the launch feel
            seen. Templates are just the starting point; the magic lives in the crew coaching you through every headline and
            every final QA checklist.
          </p>
        </div>
        <ul className="about-mission__list">
          {studioValues.map((value) => (
            <li key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="section-heading">
          <p className="eyebrow">Creator spotlight</p>
          <h2>Meet the people shaping LaunchPad every day</h2>
          <p>These are the humans answering tickets, QA'ing copy, and sending you Looms at midnight.</p>
        </div>
        <div className="founder-grid">
          {founders.map((founder) => (
            <article className="founder-card" key={founder.name}>
              <header className="founder-card__header">
                <div>
                  <p className="founder-card__eyebrow">{founder.location}</p>
                  <h3>{founder.name}</h3>
                  <p className="founder-card__role">{founder.role}</p>
                </div>
              </header>
              <p className="founder-card__bio">{founder.bio}</p>
              <ul className="founder-card__focus">
                {founder.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="founder-card__socials" aria-label={`${founder.name} social media links`}>
                {founder.socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    <span>{social.label}</span>
                    <span className="founder-card__handle">{social.handle}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel timeline-panel">
        <div className="section-heading">
          <p className="eyebrow">Timeline</p>
          <h2>How a side project became the default launch starter</h2>
        </div>
        <ol className="timeline">
          {timeline.map((entry) => (
            <li key={entry.year} className="timeline__item">
              <div className="timeline__year">{entry.year}</div>
              <div className="timeline__content">
                <h3>{entry.headline}</h3>
                <p>{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel channel-panel">
        <div className="section-heading">
          <p className="eyebrow">Follow the studio</p>
          <h2>Social channels, drop-ins, and ways to say hi</h2>
          <p>Every channel is run by the founders. Expect behind-the-scenes notes, candid metrics, and Friday playlist swaps.</p>
        </div>
        <div className="channel-grid">
          {studioChannels.map((channel) => (
            <article key={channel.label} className="channel-card">
              <h3>{channel.label}</h3>
              <p>{channel.description}</p>
              <a href={channel.href} target="_blank" rel="noreferrer">
                Visit {channel.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="cta about-cta">
        <div>
          <p className="eyebrow">Ready to collaborate?</p>
          <h2>Bring us into your next launch doc</h2>
          <p className="lead">
            Share your product outline, the date you&apos;re targeting, and where you need the most help—copy, visuals, or
            customer onboarding. We'll come back with a detailed plan in under 48 hours.
          </p>
        </div>
        <div className="hero__actions">
          <a className="button button--primary" href="mailto:hello@launchpad.app?subject=Let%E2%80%99s%20plan%20a%20launch">
            Send the brief
          </a>
          <a className="button" href="https://cal.com/launchpad/office-hours" target="_blank" rel="noreferrer">
            Grab office hours
          </a>
        </div>
      </section>
    </main>
  )
}

