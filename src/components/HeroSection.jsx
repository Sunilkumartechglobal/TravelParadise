 // src/components/HeroSection.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaPlane, FaHotel, FaTrain, FaBus, FaShip, FaCar,
  FaUmbrellaBeach, FaMountain, FaCompass,
  FaCamera, FaCalendarAlt,
  FaSun, FaHome, FaWallet, FaBicycle, FaAnchor, FaUtensils
} from "react-icons/fa";
import { Fish, Home, Box, Scissors, Anchor } from "lucide-react";
import { FaSailboat } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import './HeroSection.css';

const categories = [
  { key: 'houseboats', label: 'houseboats', icon: FaShip }, 
  { key: 'shikara', label: 'shikara', icon: FaSailboat }, 
  { key: 'flights', label: 'flights', icon: FaPlane },
  { key: 'hotels', label: 'hotels', icon: FaHotel },
  { key: 'trains', label: 'trains', icon: FaTrain },
  { key: 'buses', label: 'buses', icon: FaBus },
  { key: 'cars', label: 'cars', icon: FaCar },
  { key: 'tours', label: 'tours', icon: FaCompass },
  { key: 'cruises', label: 'cruises', icon: FaAnchor },
  { key: 'seaFishRestaurants', label: 'seaFishRestaurants', icon: Fish },
  { key: 'packages', label: 'packages', icon: FaCalendarAlt },
  { key: 'weekend', label: 'weekend', icon: FaSun },
  { key: 'beaches', label: 'beaches', icon: FaUmbrellaBeach },
  { key: 'mountains', label: 'mountains', icon: FaMountain },
  { key: 'adventure', label: 'adventure', icon: FaCompass },
  { key: 'backwaterVillageStay', label: 'backwaterVillageStay', icon: Home },
  { key: 'photography', label: 'photography', icon: FaCamera },
  { key: 'keralaChipsAndSpices', label: 'keralaChipsAndSpices', icon: Box },
  { key: 'keralaHandlooms', label: 'keralaHandlooms', icon: Scissors },
  { key: 'budget', label: 'budget', icon: FaWallet },
  { key: 'bikes', label: 'bikes', icon: FaBicycle },
  { key: 'villas', label: 'villas', icon: FaHome },
  { key: 'food', label: 'food', icon: FaUtensils },
  { key: 'honeymoonBoatHouse', label: 'honeymoonBoatHouse', icon: Anchor },
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => { 
    setIsVisible(true); 
  }, []);

  const handleCardClick = (categoryKey) => {
    // Find the category object to pass to the destination feed
    const selectedCategory = categories.find(cat => cat.key === categoryKey);
    if (selectedCategory) {
      navigate('/destinationfeed', { state: { selectedOffer: { title: selectedCategory.label } } });
    }
  };

  const handleExploreClick = () => {
  navigate('/destinationfeed');
};

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-container">
        <div className={`cards-container ${isVisible ? 'animate-in' : ''}`}>
          <ul className="card-grid">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <li
                  key={category.key}
                  className="card-item"
                  style={{ '--animation-delay': `${(index * 0.05 + 0.4)}s` }}
                >
                  <div
                    className="travel-card"
                    onClick={() => handleCardClick(category.key)}
                  >
                    <div className="card-content">
                      <div className="icon-wrapper">
                        <Icon className="card-icon" />
                      </div>
                      <h3 className="card-title">{t(category.label)}</h3>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <header className={`hero-headline ${isVisible ? 'animate-in' : ''}`}>
          <h1 id="hero-title" className="hero-title">
            {t('heroTitle')}
          </h1>
          <p className="hero-subtitle">
            {t('heroSubtitle')}
          </p>
        </header>
        <div className={`quick-actions ${isVisible ? 'animate-in' : ''}`}>
          <button className="btn btn-primary" onClick={handleExploreClick}>
            {t('todaysDeals')}
          </button>
          <button className="btn btn-secondary" onClick={handleExploreClick}>
              {t('exploreDestinations')}
            </button>
          </div>
      </div>
    </section>
  );
}
