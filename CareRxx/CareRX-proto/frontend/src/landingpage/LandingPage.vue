<template>
  <PageLayout>
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <BenefitsSection />
    <StatsSection />
    <TestimonialsSection />
    <CTASection />
  </PageLayout>
</template>

<script>
import { PageLayout } from '../shared/components'
import HeroSection from './components/sections/HeroSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
import HowItWorksSection from './components/sections/HowItWorksSection.vue'
import BenefitsSection from './components/sections/BenefitsSection.vue'
import StatsSection from './components/sections/StatsSection.vue'
import TestimonialsSection from './components/sections/TestimonialsSection.vue'
import CTASection from './components/sections/CTASection.vue'

export default {
  name: 'LandingPage',
  components: {
    PageLayout,
    HeroSection,
    FeaturesSection,
    HowItWorksSection,
    BenefitsSection,
    StatsSection,
    TestimonialsSection,
    CTASection
  }
}
</script>