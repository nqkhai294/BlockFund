"use client";

import Footer from "../layout/Footer";
import Feature from "./sections/Feature";
import Hero from "./sections/Hero";
import HowItWork from "./sections/HowItWork";
import Testimonial from "./sections/Testinomial";
import TokenInfo from "./sections/TokenInfo";

const HomePage = () => {
  return (
    <div className="block">
      <Hero />
      <Feature />
      <HowItWork />
      <Testimonial />
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <TokenInfo />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;