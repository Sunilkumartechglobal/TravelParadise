// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularDestinations from '../components/PopularDestinations';
import TestimonialsSection from '../components/TestimonialsSection';
//import NewsletterSection from '../components/NewsletterSection';
//import StatsSection from '../components/StatsSection';
import Offers from '../components/OffersCarousel';
import HouseboatsList from '../components/HouseboatsList';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navbar removed — now provided by RootLayout */}
      <HeroSection />
      <Offers />
      <HouseboatsList />
      <PopularDestinations />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;
