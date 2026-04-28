'use client'

import { useEffect, useRef } from 'react'
import { Clock, Target, TrendingUp, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

const metrics = [
  {
    icon: Clock,
    value: '14,200+',
    label: 'Hours Saved Annually',
    description: 'Average time recovered per client',
  },
  {
    icon: Target,
    value: '99.8%',
    label: 'Accuracy Rate',
    description: 'Automated task completion accuracy',
  },
  {
    icon: TrendingUp,
    value: '4.2x',
    label: 'Average ROI',
    description: 'Return on investment within first year',
  },
  {
    icon: Users,
    value: '150+',
    label: 'Companies Transformed',
    description: 'Businesses scaling with NexusFlow',
  },
]

export function SocialProofSection() {
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
    <section ref={sectionRef} className="py-20 border-y border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                'fade-in-up relative flex flex-col items-center text-center p-6 rounded-2xl',
                'transition-all duration-300 hover:bg-secondary/30'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <metric.icon className="h-7 w-7" />
              </div>

              {/* Value */}
              <div className="text-4xl font-bold text-primary">
                {metric.value}
              </div>

              {/* Label */}
              <div className="mt-2 text-lg font-semibold">
                {metric.label}
              </div>

              {/* Description */}
              <p className="mt-1 text-sm text-muted-foreground">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
