'use client'

import { useEffect, useRef } from 'react'
import { Shield, Lock, Award, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const certifications = [
  {
    icon: Shield,
    name: 'SOC 2 Type II',
    description: 'Certified compliance',
  },
  {
    icon: Lock,
    name: 'GDPR Compliant',
    description: 'Data protection ready',
  },
  {
    icon: Award,
    name: 'ISO 27001',
    description: 'Information security',
  },
  {
    icon: CheckCircle2,
    name: 'HIPAA Ready',
    description: 'Healthcare compliant',
  },
]

const guarantees = [
  'Enterprise-grade encryption',
  'Role-based access controls',
  '99.99% uptime SLA',
  '24/7 security monitoring',
]

export function TrustBadgesSection() {
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
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            The <span className="text-primary">NexusFlow</span> Guarantee
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Your data security and privacy are our top priorities. We maintain the highest 
            standards of compliance and protection.
          </p>
        </div>

        {/* Certification badges */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className={cn(
                'fade-in-up flex flex-col items-center text-center rounded-2xl glass p-6',
                'transition-all duration-300 hover:border-primary/30'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <cert.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Additional guarantees */}
        <div className="mt-12 fade-in-up">
          <div className="mx-auto max-w-3xl rounded-2xl glass p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {guarantees.map((guarantee) => (
                <div key={guarantee} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-muted-foreground">{guarantee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
