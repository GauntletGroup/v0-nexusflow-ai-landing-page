'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGradientMesh } from '@/components/animated-gradient-mesh'
import { FloatingAINodes } from '@/components/floating-ai-nodes'

export function HeroSection() {
  const [backgroundMode, setBackgroundMode] = useState<'mesh' | 'nodes'>('mesh')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background - toggle between mesh and nodes */}
      {backgroundMode === 'mesh' ? (
        <AnimatedGradientMesh />
      ) : (
        <FloatingAINodes />
      )}

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Background toggle button - dev only */}
          <div className="absolute top-4 right-4 flex gap-2 text-xs">
            <button
              onClick={() => setBackgroundMode('mesh')}
              className={`px-3 py-1 rounded-full transition-all ${
                backgroundMode === 'mesh'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              Gradient Mesh
            </button>
            <button
              onClick={() => setBackgroundMode('nodes')}
              className={`px-3 py-1 rounded-full transition-all ${
                backgroundMode === 'nodes'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              }`}
            >
              Floating Nodes
            </button>
          </div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              AI-Powered Workflow Automation
            </span>
          </div>

          {/* Main headline */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
            Stop Drowning in{' '}
            <span className="text-primary">Manual Workflows</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed text-pretty">
            Transform your business operations with intelligent automation. 
            We help growing companies save thousands of hours while scaling 
            without adding headcount.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Button asChild size="lg" className="shimmer glow text-base px-8">
              <Link href="/contact">
                Get My Automation Roadmap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="glass text-base">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Trusted by forward-thinking companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
              {['TechCorp', 'Innovate Inc', 'ScaleUp', 'DataFlow', 'AutomateX'].map((company) => (
                <div
                  key={company}
                  className="text-lg font-semibold tracking-tight text-muted-foreground"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
