"use client";

import GrainOverlay from "./components/GrainOverlay";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import { SvgDefs } from "./components/SvgIcons";
import SiteHeader from "./components/site-header";
import HeroSection from "./components/sections/HeroSection";
import MarqueeSection from "./components/sections/MarqueeSection";
import CalculatorSection from "./components/sections/CalculatorSection";
import ServicesSection from "./components/sections/ServicesSection";
import MaterialsSection from "./components/sections/MaterialsSection";
import WorksSection from "./components/sections/WorksSection";
import ProcessSection from "./components/sections/ProcessSection";
import FaqSection from "./components/sections/FaqSection";
import StatsSection from "./components/sections/StatsSection";
import ContactSection from "./components/sections/ContactSection";
import SiteFooter from "./components/site-footer";
import RevealObserver from "./components/RevealObserver";

export default function Home() {
  return (
    <>
      <SvgDefs />
      <ScrollProgress />
      <CustomCursor />
      <GrainOverlay />
      <Preloader />
      <RevealObserver />

      <SiteHeader />
      <main>
        <HeroSection />
        <MarqueeSection />
        <CalculatorSection />
        <ServicesSection />
        <MaterialsSection />
        <WorksSection />
        <ProcessSection />
        <FaqSection />
        <StatsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
