'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission (placeholder - no backend integration)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Request Received!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for your interest. Marcus or a member of our team will reach out 
          within 24 hours to schedule your consultation.
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
            Get My Automation Roadmap
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
