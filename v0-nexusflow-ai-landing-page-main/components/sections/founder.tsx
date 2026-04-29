'use client'

import { useEffect, useRef } from 'react'
import { Linkedin, Twitter, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FounderSection() {
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
    <section ref={sectionRef} className="py-24 sm:py-32 bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="fade-in-up rounded-2xl glass p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 p-1">
                  <div className="h-full w-full rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary">MC</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-4 -left-4 h-10 w-10 text-primary/20 hidden md:block" />
                  <p className="text-xl text-muted-foreground italic leading-relaxed">
                    &ldquo;I founded NexusFlow after spending 15 years watching talented teams waste 
                    countless hours on repetitive tasks. My mission is simple: free human potential 
                    by letting AI handle the mundane.&rdquo;
                  </p>
                </div>

                {/* Author info */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold">Marcus Chen</h3>
                  <p className="text-muted-foreground">Founder & CEO, NexusFlow AI</p>
                </div>

                {/* Credentials */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground mb-6">
                  <span className="px-3 py-1 rounded-full bg-secondary">Ex-Google</span>
                  <span className="px-3 py-1 rounded-full bg-secondary">Stanford MBA</span>
                  <span className="px-3 py-1 rounded-full bg-secondary">3x Founder</span>
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
