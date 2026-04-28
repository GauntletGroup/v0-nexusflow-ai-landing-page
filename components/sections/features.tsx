'use client'

import { useEffect, useRef } from 'react'
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  BarChart3,
  Bot,
  Workflow
} from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Bot,
    title: 'Intelligent Automation',
    description: 'AI-powered workflows that learn from your processes and continuously optimize for efficiency.',
  },
  {
    icon: Clock,
    title: 'Time Recovery',
    description: 'Reclaim thousands of hours annually by automating repetitive tasks and manual data entry.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Growth',
    description: 'Scale your operations without proportionally increasing headcount or operational costs.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC2 compliant infrastructure with end-to-end encryption and role-based access controls.',
  },
  {
    icon: Workflow,
    title: 'Seamless Integration',
    description: 'Connect with your existing tools and systems through our extensive API integrations.',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Monitor performance, track ROI, and identify optimization opportunities with detailed dashboards.',
  },
]

export function FeaturesSection() {
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
    <section id="features" ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Everything you need to{' '}
            <span className="text-primary">automate intelligently</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Our comprehensive platform provides all the tools and integrations 
            you need to transform your workflows.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'fade-in-up group relative rounded-2xl glass p-6 transition-all duration-300',
                'hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
