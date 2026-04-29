import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ContactForm } from '@/components/contact-form'
import { BackToTop } from '@/components/back-to-top'
import { Calendar, Clock, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact | NexusFlow AI - Get Your Free Automation Roadmap',
  description: 'Schedule your free 15-minute consultation with our automation experts. Get a personalized roadmap to transform your business operations.',
}

const benefits = [
  'Personalized workflow analysis',
  'Custom automation roadmap',
  'ROI projection for your business',
  'No commitment required',
]

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@nexusflow.ai',
    href: 'mailto:hello@nexusflow.ai',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'San Francisco, CA',
    href: '#',
  },
]

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-6">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Free 15-minute Strategy Call
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-balance">
              Get Your{' '}
              <span className="text-primary">Automation Roadmap</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Schedule a free consultation with Marcus and our automation experts. 
              We&apos;ll analyze your workflows and create a personalized plan for your business.
            </p>
          </div>

          {/* Content grid */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column - Info */}
            <div className="space-y-10">
              {/* What to expect */}
              <div className="rounded-2xl glass p-8">
                <h2 className="text-xl font-semibold mb-6">What to expect</h2>
                <ul className="space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Meeting details */}
              <div className="rounded-2xl glass p-8">
                <h2 className="text-xl font-semibold mb-6">Meeting details</h2>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>15 minutes via Google Meet or Zoom</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="rounded-2xl glass p-8">
                <h2 className="text-xl font-semibold mb-6">Other ways to reach us</h2>
                <ul className="space-y-4">
                  {contactInfo.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        <span>{item.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="rounded-2xl glass p-8">
              <h2 className="text-xl font-semibold mb-6">Schedule your call</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
