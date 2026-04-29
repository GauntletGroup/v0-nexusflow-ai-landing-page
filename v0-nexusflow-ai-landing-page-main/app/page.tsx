import { Navbar } from '@/components/navbar'
import { BackToTop } from '@/components/back-to-top'
import { HeroSection } from '@/components/sections/hero'
import { FeaturesSection } from '@/components/sections/features'
import { PricingSection } from '@/components/sections/pricing'
import { SocialProofSection } from '@/components/sections/social-proof'
import { CaseStudiesSection } from '@/components/sections/case-studies'
import { TrustBadgesSection } from '@/components/sections/trust-badges'
import { FounderSection } from '@/components/sections/founder'
import { FAQSection } from '@/components/sections/faq'
import { CTASection } from '@/components/sections/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <CaseStudiesSection />
        <PricingSection />
        <FounderSection />
        <TrustBadgesSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
