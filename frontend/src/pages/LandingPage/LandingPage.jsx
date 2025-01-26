import React, { useState } from "react";
import HeroSection from "../../components/LandingPageComponents/HeroSection/HeroSection";
import FeaturesSection from "../../components/LandingPageComponents/FeaturesSection/FeaturesSection";
import Footer from "../../components/LandingPageComponents/Footer/Footer";
import Navbar from "../../components/LandingPageComponents/Navbar/Navbar";

const LandingPage = () => {
  return (
    <div className="bg-light-gray">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
