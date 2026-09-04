import React from "react";
import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import TrustPartnersSection from "./TrustPartnersSection";
import InvestmentPlansSection from "./InvestmentPlansSection";
import ReviewsSection from "./ReviewsSection";
import FaqSection from "./FaqSection";
import CtaBanner from "./CtaBanner";

const HomeSection = () => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 overflow-hidden">
      <HeroSection />
      <StatsBar />
      <ServicesSection />
      <AboutSection />
      <TrustPartnersSection />
      <InvestmentPlansSection />
      <ReviewsSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
};

export default HomeSection;
