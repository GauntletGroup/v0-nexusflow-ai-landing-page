'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tiers = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started with automation.',
    price: '$2,500',
    period: '/month',
    features: [
      'Up to 5 automated workflows',
      '10,000 tasks per month',
      'Email support',
      'Basic analytics dashboard',
      'Standard integrations',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Professional',
    description: 'For growing businesses ready to scale their automation.',
    price: '$7,500',
    period: '/month',
    features: [
      'Unlimited workflows',
      '100,000 tasks per month',
      'Priority support',
      'Advanced analytics & reporting',
      'Custom integrations',
      'Dedicated success manager',
      'SLA guarantee',
    ],
    cta: 'Get My Automation Roadmap',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large-scale operations.',
    price: 'Custom',
    period: '',
    features: [
      'Unlimited everything',
      'Custom task volume',
      '24/7 dedicated support',
      'Custom AI model training',
      'On-premise deployment option',
      'Executive business reviews',
      'Custom SLA',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Transparent pricing that{' '}
            <span className="text-primary">scales with you</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={cn(
                'fade-in-up relative flex flex-col rounded-2xl p-8 transition-all duration-300',
                tier.featured
                  ? 'glass border-primary/50 shadow-lg shadow-primary/10'
                  : 'glass hover:border-primary/30'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Featured badge */}
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Recommended
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-muted-foreground">{tier.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                asChild
                variant={tier.featured ? 'default' : 'outline'}
                className={cn(
                  'w-full',
                  tier.featured && 'shimmer'
                )}
              >
                <Link href="/contact">{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* Money-back guarantee */}
        <p className="mt-12 text-center text-sm text-muted-foreground fade-in-up">
          All plans include a 30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  )
}
