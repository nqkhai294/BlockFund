"use client";

import Footer from "../layout/Footer";
import Feature from "./sections/Feature";
import Hero from "./sections/Hero";
import HpHowItWorks from "./sections/HowItWorks";
import HpTestimonials from "./sections/Testimonial";
import TokenInfo from "./sections/TokenInfo";
import FeaturedProjects from "./sections/FeaturedProjects";
import { useCrowdfunding } from "@/app/hooks/useCrowdfunding";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { campaigns, isLoadingCampaigns } = useCrowdfunding();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <div className="py-20">
          <FeaturedProjects />
        </div>
        <div className="py-20">
          <Feature />
        </div>
        <div className="py-20">
          <HpHowItWorks />
        </div>
        <div className="py-20">
          <HpTestimonials />
        </div>
        <div className="py-20">
          <TokenInfo />
        </div>
      </div>
    </div>
  );
};

export default HomePage;