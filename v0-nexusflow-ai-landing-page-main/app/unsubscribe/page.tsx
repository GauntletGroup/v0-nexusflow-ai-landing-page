'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Mail, AlertCircle, HeartCrack } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BackToTop } from '@/components/back-to-top'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const reasons = [
  { value: 'never_signed_up', label: 'I never signed up for this list' },
  { value: 'too_frequent', label: 'Emails are too frequent' },
  { value: 'not_relevant', label: 'Content is not relevant to me' },
  { value: 'no_longer_needed', label: 'I no longer need these services' },
  { value: 'other', label: 'Other (please specify below)' },
]

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [isResubscribed, setIsResubscribed] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason) {
      setError('Please select a reason first.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'feedback',
          email,
          reason,
          details,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to submit feedback.')
      }

      setFeedbackSubmitted(true)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResubscribe = async () => {
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'resubscribe',
          email,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to resubscribe.')
      }

      setIsResubscribed(true)
      setFeedbackSubmitted(false)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl glass p-8 sm:p-12 relative overflow-hidden transition-all duration-300">
      {/* Decorative accent glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {isResubscribed ? (
        <div className="text-center animate-fade-in space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">You&apos;re Back!</h2>
          <p className="text-muted-foreground text-pretty max-w-md mx-auto leading-relaxed">
            Welcome back! We&apos;ve successfully re-subscribed{' '}
            {email ? <strong className="text-foreground">{email}</strong> : 'your email address'}{' '}
            to our newsletters and roadmap updates.
          </p>
          <div className="pt-6">
            <Button asChild className="shimmer px-8">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main Unsubscribe Confirmation */}
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <HeartCrack className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Unsubscribed Successfully</h2>
            <p className="text-muted-foreground text-pretty leading-relaxed">
              We&apos;ve removed{' '}
              {email ? <strong className="text-foreground">{email}</strong> : 'your email address'}{' '}
              from our communication lists. You will no longer receive updates, roadmaps, or news.
            </p>
          </div>

          <div className="border-t border-border/50 my-6" />

          {/* Feedback Form */}
          {feedbackSubmitted ? (
            <div className="text-center py-6 space-y-3">
              <p className="text-lg font-semibold text-primary">Thank you for your feedback!</p>
              <p className="text-sm text-muted-foreground">
                Your input helps us improve our communication and content.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild variant="outline" className="glass">
                  <Link href="/">Go to Homepage</Link>
                </Button>
                <button
                  onClick={handleResubscribe}
                  disabled={isLoading}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                >
                  Unsubscribed by mistake? Re-subscribe
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Help us improve</h3>
                <p className="text-sm text-muted-foreground">
                  Could you tell us why you are unsubscribing? (Optional)
                </p>
              </div>

              <div className="space-y-3">
                {reasons.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      reason === opt.value
                        ? 'border-primary bg-primary/5 text-foreground'
                        : 'border-border/50 hover:bg-secondary/20 text-muted-foreground'
                    }`}
                  >
                    <input
                      type="radio"
                      name="unsubscribe_reason"
                      value={opt.value}
                      checked={reason === opt.value}
                      onChange={() => setReason(opt.value)}
                      className="sr-only"
                    />
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        reason === opt.value ? 'border-primary' : 'border-muted-foreground/50'
                      }`}
                    >
                      {reason === opt.value && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm font-medium leading-none">{opt.label}</span>
                  </label>
                ))}
              </div>

              {reason === 'other' && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="otherDetails" className="text-sm font-medium">
                    Please specify:
                  </Label>
                  <Textarea
                    id="otherDetails"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us how we can improve..."
                    rows={3}
                    className="glass resize-none"
                    required
                  />
                </div>
              )}

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  type="submit"
                  disabled={isLoading || !reason}
                  className="w-full sm:w-auto shimmer px-6"
                >
                  {isLoading ? 'Submitting...' : 'Submit Feedback'}
                </Button>
                <button
                  type="button"
                  onClick={handleResubscribe}
                  disabled={isLoading}
                  className="w-full sm:w-auto text-sm text-muted-foreground hover:text-primary transition-colors underline py-2"
                >
                  Re-subscribe by mistake?
                </button>
              </div>
            </form>
          )}

          {!feedbackSubmitted && (
            <div className="text-center pt-4 border-t border-border/50">
              <Button asChild variant="outline" className="glass w-full sm:w-auto">
                <Link href="/">
                  Return to Homepage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen flex items-center justify-center px-4">
        {/* Ambient Grid overlay to keep it consistent with landing page */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <Suspense
          fallback={
            <div className="w-full max-w-xl mx-auto rounded-2xl glass p-8 sm:p-12 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-12 w-12 bg-muted rounded-full mx-auto" />
                <div className="h-6 bg-muted rounded w-2/3 mx-auto" />
                <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              </div>
            </div>
          }
        >
          <UnsubscribeContent />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
