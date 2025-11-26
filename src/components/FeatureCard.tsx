type FeatureCardProps = {
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function FeatureCard({ title, description, action }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <a className="feature-card__action" href={action.href} target="_blank" rel="noreferrer">
          {action.label} →
        </a>
      )}
    </article>
  )
}

export type { FeatureCardProps }
