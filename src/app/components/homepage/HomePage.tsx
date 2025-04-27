"use client";

import Footer from "../layout/Footer";
import Feature from "./sections/Feature";
import Hero from "./sections/Hero";
import HowItWork from "./sections/HowItWork";
import Testimonial from "./sections/Testinomial";

const HomePage = () => {
  return (
    <div className="block">
      <Hero />
      <Feature />
      <HowItWork />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default HomePage;