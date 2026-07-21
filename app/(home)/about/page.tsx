"use client";

import HeroSection from "@/components/about/HeroSection";
import CoreValues from "@/components/about/CoreValues";
import StatsSection from "@/components/about/StateSection";
import BrandStoryTabs from "@/components/about/BrandStoryTab";
import TestimonialsCarousel from "@/components/about/TestemonialsCarousels";
import ParallaxCTA from "@/components/about/ParalaxCTA";


export default function AboutUsPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-bone-white'>
      <HeroSection />
      <StatsSection />
      <BrandStoryTabs />
      <CoreValues />
      <TestimonialsCarousel />
      <ParallaxCTA />
    </main>
  );
}
