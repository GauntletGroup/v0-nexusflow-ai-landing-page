'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const caseStudies = [
  {
    id: 1,
    company: 'TechScale Solutions',
    industry: 'SaaS',
    avatar: '/images/avatar-sarah.jpg',
    name: 'Sarah Jenkins',
    role: 'VP of Operations',
    quote: 'NexusFlow transformed how we handle customer onboarding. What used to take our team 4 hours per client now happens automatically in minutes.',
    metrics: {
      before: '4 hours per onboarding',
      after: '12 minutes automated',
      improvement: '95% time reduction',
    },
    results: [
      '3,200 hours saved annually',
      'Customer satisfaction up 40%',
      'Team capacity increased 3x',
    ],
  },
  {
    id: 2,
    company: 'DataDriven Inc',
    industry: 'Financial Services',
    avatar: '/images/avatar-david.jpg',
    name: 'David Velez',
    role: 'Chief Technology Officer',
    quote: 'The ROI was immediate. Within 30 days, we had automated our entire reporting pipeline and freed up our analysts to focus on strategic work.',
    metrics: {
      before: '20 analysts needed',
      after: '8 analysts + AI',
      improvement: '60% cost reduction',
    },
    results: [
      '$2.4M annual savings',
      'Report accuracy 99.9%',
      'Real-time insights unlocked',
    ],
  },
]

export function CaseStudiesSection() {
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
    <section id="case-studies" ref={sectionRef} className="py-24 sm:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Real results from{' '}
            <span className="text-primary">real companies</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            See how businesses like yours are transforming their operations with NexusFlow.
          </p>
        </div>

        {/* Case study cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={cn(
                'fade-in-up rounded-2xl glass p-8 transition-all duration-300',
                'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Company & Industry */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{study.company}</h3>
                  <p className="text-sm text-muted-foreground">{study.industry}</p>
                </div>
                <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Case Study
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                <p className="pl-6 text-muted-foreground italic leading-relaxed">
                  {study.quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {study.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{study.name}</div>
                  <div className="text-sm text-muted-foreground">{study.role}</div>
                </div>
              </div>

              {/* Metrics comparison */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Before</div>
                  <div className="text-sm font-medium text-destructive/80">{study.metrics.before}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">After</div>
                  <div className="text-sm font-medium text-primary">{study.metrics.after}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Result</div>
                  <div className="text-sm font-bold text-primary">{study.metrics.improvement}</div>
                </div>
              </div>

              {/* Results list */}
              <ul className="space-y-2">
                {study.results.map((result) => (
                  <li key={result} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center fade-in-up">
          <Button variant="outline" className="glass">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
