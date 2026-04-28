'use client'

import { useEffect, useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'How long does implementation typically take?',
    answer: 'Most implementations are completed within 2-4 weeks, depending on the complexity of your workflows. We start with a discovery phase to understand your processes, then design and deploy your custom automation solution. Our team handles everything from integration setup to training your staff.',
  },
  {
    question: 'What systems can NexusFlow integrate with?',
    answer: 'NexusFlow integrates with over 500+ popular business tools including Salesforce, HubSpot, Slack, Microsoft 365, Google Workspace, Zapier, and many more. We also offer custom API integrations for proprietary systems. If you use it, chances are we can connect to it.',
  },
  {
    question: 'Is my data secure with NexusFlow?',
    answer: 'Absolutely. We maintain SOC 2 Type II compliance, GDPR compliance, and ISO 27001 certification. All data is encrypted at rest and in transit using AES-256 encryption. We never access your data unless explicitly authorized for support purposes, and we offer data residency options for enterprise clients.',
  },
  {
    question: 'What kind of ROI can I expect?',
    answer: 'Our clients typically see 4.2x ROI within the first year. The exact return depends on your current manual processes and team size. During our free consultation, we will analyze your workflows and provide a detailed ROI projection specific to your business.',
  },
  {
    question: 'Do I need technical expertise to use NexusFlow?',
    answer: 'No technical expertise required. Our platform is designed for business users with an intuitive drag-and-drop interface. However, we also provide full technical support and can handle complex custom implementations for teams that prefer a hands-off approach.',
  },
  {
    question: 'What happens if something goes wrong with an automation?',
    answer: 'We have multiple safeguards in place. All automations include error handling, automatic retries, and human-in-the-loop fallbacks when needed. Our monitoring dashboard alerts you instantly of any issues, and our support team is available 24/7 for enterprise clients.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, all our plans are month-to-month with no long-term contracts required. We also offer annual plans with a 20% discount for clients who prefer to commit upfront. If you are not satisfied, we offer a 30-day money-back guarantee.',
  },
]

export function FAQSection() {
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
    <section id="faq" ref={sectionRef} className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Frequently asked{' '}
            <span className="text-primary">questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Everything you need to know about NexusFlow and workflow automation.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="mt-12 fade-in-up">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50 px-4 rounded-lg mb-2 glass"
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
