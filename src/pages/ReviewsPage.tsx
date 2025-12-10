import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import '../App.css'
import { useAuth } from '../context/AuthContext'

type Review = {
  id: string
  rating: number
  comment: string
  author: string
  createdAt: string
}

type FormStatus = {
  type: 'success' | 'error'
  text: string
} | null

const MAX_RATING = 5
const MIN_COMMENT_LENGTH = 10

const seededReviews: Review[] = [
  {
    id: 'seed-1',
    rating: 5,
    comment: 'LaunchPad let us reuse a polished layout, then tweak copy for an investor update in under an hour.',
    author: 'Daria Patel · Helios Ops',
    createdAt: '2024-06-12T12:00:00.000Z',
  },
  {
    id: 'seed-2',
    rating: 4,
    comment: 'We shared the link with design, product, and execs—everyone could react in context which kept scope calm.',
    author: 'Northwind Program Team',
    createdAt: '2024-05-19T15:30:00.000Z',
  },
]

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={['review-star-icon', filled ? 'review-star-icon--filled' : ''].join(' ').trim()}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  )
}

function RatingDisplay({ value }: { value: number }) {
  return (
    <div className="review-stars review-stars--static" aria-label={`Average rating: ${value.toFixed(1)} out of ${MAX_RATING}`}>
      {Array.from({ length: MAX_RATING }, (_, index) => {
        const filled = index < Math.round(value)
        return <StarIcon key={index} filled={filled} />
      })}
    </div>
  )
}

export default function ReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>(seededReviews)
  const [form, setForm] = useState({ rating: 5, comment: '' })
  const [status, setStatus] = useState<FormStatus>(null)

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0
    }
    const total = reviews.reduce((sum, review) => sum + review.rating, 0)
    return total / reviews.length
  }, [reviews])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedComment = form.comment.trim()

    if (trimmedComment.length < MIN_COMMENT_LENGTH) {
      setStatus({
        type: 'error',
        text: `Tell us a bit more (minimum ${MIN_COMMENT_LENGTH} characters).`,
      })
      return
    }

    const displayName = user?.name ?? 'LaunchPad Pilot'
    const newReview: Review = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      rating: form.rating,
      comment: trimmedComment,
      author: displayName,
      createdAt: new Date().toISOString(),
    }

    setReviews((prev) => [newReview, ...prev])
    setForm({ rating: MAX_RATING, comment: '' })
    setStatus({ type: 'success', text: 'Thanks for sharing your review!' })
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, comment: event.target.value }))
    if (status) {
      setStatus(null)
    }
  }

  const handleRatingSelect = (value: number) => {
    setForm((prev) => ({ ...prev, rating: value }))
    if (status?.type === 'error') {
      setStatus(null)
    }
  }

  return (
    <main className="app reviews-page">
      <section className="reviews-hero">
        <p className="eyebrow">Issue #28 · Reviews</p>
        <h1>Leave a quick review for LaunchPad</h1>
        <p className="lead">
          Share a rating and a short comment so the next product team knows what to expect from this starter kit.
        </p>
        <div className="review-stats">
          <article className="review-stats__card">
            <p className="eyebrow">Average rating</p>
            <p className="review-stat__value">
              {averageRating.toFixed(1)}
              <span>/ {MAX_RATING}</span>
            </p>
            <RatingDisplay value={reviews.length ? averageRating : MAX_RATING} />
          </article>
          <article className="review-stats__card">
            <p className="eyebrow">Reviews collected</p>
            <p className="review-stat__value">{reviews.length}</p>
            <p className="review-stat__muted">Fresh notes from LaunchPad accounts</p>
          </article>
        </div>
      </section>

      <section className="panel panel--split review-panel">
        <div>
          <p className="eyebrow">Leave a note</p>
          <h2>Pick your stars, then tell us why</h2>
          <p>
            Every review is private within LaunchPad so teams can be candid about what helped or blocked their launch.
          </p>
          <form className="review-form" onSubmit={handleSubmit}>
            <div className="review-form__group" aria-live="polite">
              <label className="review-form__label">Rating</label>
              <div className="review-stars" role="radiogroup" aria-label="Select a rating from 1 to 5 stars">
                {Array.from({ length: MAX_RATING }, (_, index) => {
                  const value = index + 1
                  const filled = value <= form.rating

                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={form.rating === value}
                      className={['review-star-button', filled ? 'review-star-button--active' : ''].join(' ').trim()}
                      onClick={() => handleRatingSelect(value)}
                    >
                      <StarIcon filled={filled} />
                      <span className="sr-only">{`${value} star${value > 1 ? 's' : ''}`}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="review-form__group">
              <label className="review-form__label" htmlFor="review-comment">
                Comment
              </label>
              <textarea
                id="review-comment"
                name="comment"
                rows={5}
                value={form.comment}
                onChange={handleCommentChange}
                placeholder="What worked well? Where should we polish next?"
                minLength={MIN_COMMENT_LENGTH}
                required
              />
              <p className="review-form__hint">Minimum {MIN_COMMENT_LENGTH} characters.</p>
            </div>

            <div className="review-form__actions">
              <button className="button button--primary" type="submit">
                Publish review
              </button>
              <p className="review-form__meta">
                Signed in as <strong>{user?.name ?? 'LaunchPad Pilot'}</strong>
              </p>
            </div>

            {status && (
              <p
                className={[
                  'review-form__status',
                  status.type === 'error' ? 'review-form__status--error' : 'review-form__status--success',
                ]
                  .join(' ')
                  .trim()}
              >
                {status.text}
              </p>
            )}
          </form>
        </div>

        <div className="review-panel__aside">
          <p className="eyebrow">Guidelines</p>
          <h3>Helpful feedback looks like…</h3>
          <ul>
            <li>Be specific: mention the layout, auth flow, or copy tweaks you shipped.</li>
            <li>Share the outcome: did stakeholders sign off faster, or did QA find fewer bugs?</li>
            <li>Keep it kind: highlight the win and the next improvement opportunity.</li>
          </ul>
          <p className="review-panel__footnote">Reviews are visible to anyone logged into LaunchPad.</p>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Recent comments</p>
          <h2>What teams are saying</h2>
          <p>New reviews appear instantly below so everyone can see real-world usage notes.</p>
        </div>
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-card">
              <div className="review-meta">
                <div>
                  <p className="review-card__author">{review.author}</p>
                  <p className="review-card__date">
                    {new Date(review.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="review-stars review-stars--static" aria-label={`${review.rating} out of ${MAX_RATING} stars`}>
                  {Array.from({ length: MAX_RATING }, (_, index) => (
                    <StarIcon key={index} filled={index < review.rating} />
                  ))}
                </div>
              </div>
              <p className="review-card__comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

