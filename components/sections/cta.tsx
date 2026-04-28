'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function CTASection() {
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
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="fade-in-up relative overflow-hidden rounded-3xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20" />
          <div className="absolute inset-0 glass" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />

          <div className="relative px-8 py-16 sm:px-16 sm:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-4 py-2 mb-8">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Free 15-minute Strategy Call
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              Ready to reclaim your team&apos;s time?
            </h2>

            {/* Description */}
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Join 150+ companies already transforming their operations. Get a personalized 
              automation roadmap tailored to your business needs.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="shimmer glow text-base px-8">
                <Link href="/contact">
                  Get My Automation Roadmap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground">
                No commitment required
              </p>
            </div>

            {/* Trust note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Trusted by forward-thinking teams at 150+ companies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
