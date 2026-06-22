'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '500+', label: '500+ employees' },
]

const industries = [
  { value: 'saas', label: 'SaaS / Technology' },
  { value: 'finance', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'retail', label: 'Retail / E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'professional', label: 'Professional Services' },
  { value: 'other', label: 'Other' },
]

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [gdprConsent, setGdprConsent] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    if (!gdprConsent) {
      setErrorMessage('You must agree to the data processing terms.')
      setIsLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    const payload = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      companySize: formData.get('companySize') as string,
      industry: formData.get('industry') as string,
      message: formData.get('message') as string,
      gdprConsent,
    }

    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form.')
      }

      setIsSubmitted(true)
    } catch (error: any) {
      console.error('Submission error:', error)
      setErrorMessage(error.message || 'An error occurred during submission. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Request Received!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for your interest. We have received your roadmap request and will initiate the process.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            required
            className="glass"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            required
            className="glass"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@company.com"
          required
          className="glass"
        />
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company name</Label>
        <Input
          id="company"
          name="company"
          placeholder="Acme Inc"
          required
          className="glass"
        />
      </div>

      {/* Company size & Industry */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companySize">Company size</Label>
          <Select name="companySize" required>
            <SelectTrigger className="glass">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {companySizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select name="industry" required>
            <SelectTrigger className="glass">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">
          What processes are you looking to automate?
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your current workflows and pain points..."
          rows={4}
          className="glass resize-none"
        />
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-secondary/10 p-4">
        <Checkbox
          id="gdprConsent"
          name="gdprConsent"
          checked={gdprConsent}
          onCheckedChange={(checked) => setGdprConsent(checked === true)}
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="gdprConsent"
            className="text-xs font-medium text-muted-foreground leading-normal cursor-pointer select-none"
          >
            I consent to the collection and processing of my business details and agree to receive my personalized Audit Roadmap via email in accordance with the Privacy Policy.
          </Label>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
          {errorMessage}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className={cn('w-full shimmer', isLoading && 'opacity-80')}
        disabled={isLoading}
      >
        {isLoading ? (
          'Submitting...'
        ) : (
          <>
            Get My Full Audit RoadMap
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {/* Privacy note */}
      <p className="text-xs text-center text-muted-foreground">
        By submitting, you agree to our{' '}
        <a href="#" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        . We&apos;ll never share your information.
      </p>
    </form>
  )
}
