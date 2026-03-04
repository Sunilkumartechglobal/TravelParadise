import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './PopularDestinations.css';

const PopularDestinations = () => {
  const { t } = useTranslation(['popularDestinations']);
  const [selectedContinent, setSelectedContinent] = useState('northIndia');
  const [visibleCards, setVisibleCards] = useState([]);
  const navigate = useNavigate();
  
  const continents = [
    'northIndia', 'southIndia', 'eastIndia', 'centralIndia'
  ];

  const destinations = useMemo(() => ({
    'northIndia': [
      {
        id: 1,
        nameKey: 'delhi.name',
        countryKey: 'india',
        thingsToDo: 5000,
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80',
        historyKey: 'delhi.history',
        whatsapp: '919876543210',
        email: 'delhi.tourism@example.com'
      },
      {
        id: 2,
        nameKey: 'jaipur.name',
        countryKey: 'india',
        thingsToDo: 2500,
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80',
        historyKey: 'jaipur.history',
        whatsapp: '919876543211',
        email: 'jaipur.tourism@example.com'
      },
      {
        id: 3,
        nameKey: 'agra.name',
        countryKey: 'india',
        thingsToDo: 1500,
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80',
        historyKey: 'agra.history',
        whatsapp: '919876543212',
        email: 'agra.tourism@example.com'
      },
      {
        id: 4,
        nameKey: 'varanasi.name',
        countryKey: 'india',
        thingsToDo: 1200,
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80',
        historyKey: 'varanasi.history',
        whatsapp: '919876543213',
        email: 'varanasi.tourism@example.com'
      },
      {
        id: 5,
        nameKey: 'amritsar.name',
        countryKey: 'india',
        thingsToDo: 800,
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80',
        historyKey: 'amritsar.history',
        whatsapp: '919876543214',
        email: 'amritsar.tourism@example.com'
      },
      {
        id: 6,
        nameKey: 'manali.name',
        countryKey: 'india',
        thingsToDo: 750,
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80',
        historyKey: 'manali.history',
        whatsapp: '919876543215',
        email: 'manali.tourism@example.com'
      },
      {
        id: 7,
        nameKey: 'leh.name',
        countryKey: 'india',
        thingsToDo: 600,
        image: 'Travel_image/Leh-Palace.jpg',
        historyKey: 'leh.history',
        whatsapp: '919876543216',
        email: 'leh.tourism@example.com'
      },
      {
        id: 8,
        nameKey: 'rishikesh.name',
        countryKey: 'india',
        thingsToDo: 900,
        image: 'Travel_image/Rishikesh.jpg',
        historyKey: 'rishikesh.history',
        whatsapp: '919876543217',
        email: 'rishikesh.tourism@example.com'
      },
      {
        id: 9,
        nameKey: 'udaipur.name',
        countryKey: 'india',
        thingsToDo: 1800,
        image: 'Travel_image/Udaipur.jpg',
        historyKey: 'udaipur.history',
        whatsapp: '919876543218',
        email: 'udaipur.tourism@example.com'
      },
      {
        id: 10,
        nameKey: 'shimla.name',
        countryKey: 'india',
        thingsToDo: 700,
        image: 'Travel_image/Shimla.jpg',
        historyKey: 'shimla.history',
        whatsapp: '919876543219',
        email: 'shimla.tourism@example.com'
      },
      {
        id: 11,
        nameKey: 'mussoorie.name',
        countryKey: 'india',
        thingsToDo: 650,
        image: 'Travel_image/Mussoorie.webp',
        historyKey: 'mussoorie.history',
        whatsapp: '919876543220',
        email: 'mussoorie.tourism@example.com'
      },
      {
        id: 12,
        nameKey: 'srinagar.name',
        countryKey: 'india',
        thingsToDo: 1100,
        image: 'Travel_image/Srinagar.jpg',
        historyKey: 'srinagar.history',
        whatsapp: '919876543221',
        email: 'srinagar.tourism@example.com'
      },
      {
        id: 13,
        nameKey: 'jaisalmer.name',
        countryKey: 'india',
        thingsToDo: 1300,
        image: 'Travel_image/Jaisalmer_History.avif',
        historyKey: 'jaisalmer.history',
        whatsapp: '919876543222',
        email: 'jaisalmer.tourism@example.com'
      },
      {
        id: 14,
        nameKey: 'nainital.name',
        countryKey: 'india',
        thingsToDo: 550,
        image: 'Travel_image/Nainital.jpg',
        historyKey: 'nainital.history',
        whatsapp: '919876543223',
        email: 'nainital.tourism@example.com'
      },
      {
        id: 15,
        nameKey: 'vrindavan.name',
        countryKey: 'india',
        thingsToDo: 900,
        image: 'Travel_image/Vrindavan.jpg',
        historyKey: 'vrindavan.history',
        whatsapp: '919876543224',
        email: 'vrindavan.tourism@example.com'
      },
      {
        id: 16,
        nameKey: 'haridwar.name',
        countryKey: 'india',
        thingsToDo: 850,
        image: 'Travel_image/Haridwar.jpg',
        historyKey: 'haridwar.history',
        whatsapp: '919876543225',
        email: 'haridwar.tourism@example.com'
      },
    ],
    'southIndia': [
      {
        id: 17,
        nameKey: 'mumbai.name',
        countryKey: 'india',
        thingsToDo: 4000,
        image: 'Travel_image/Mumbai.jpg',
        historyKey: 'mumbai.history',
        whatsapp: '919876543226',
        email: 'mumbai.tourism@example.com'
      },
      {
        id: 18,
        nameKey: 'bengaluru.name',
        countryKey: 'india',
        thingsToDo: 3200,
        image: 'Travel_image/Bengaluru.jpg',
        historyKey: 'bengaluru.history',
        whatsapp: '919876543227',
        email: 'bengaluru.tourism@example.com'
      },
      {
        id: 19,
        nameKey: 'goa.name',
        countryKey: 'india',
        thingsToDo: 2800,
        image: 'Travel_image/Goa.avif',
        historyKey: 'goa.history',
        whatsapp: '919876543228',
        email: 'goa.tourism@example.com'
      },
      {
        id: 20,
        nameKey: 'kerala.name',
        countryKey: 'india',
        thingsToDo: 2500,
        image: 'Travel_image/Kerala.jpg',
        historyKey: 'kerala.history',
        whatsapp: '919876543229',
        email: 'kerala.tourism@example.com'
      },
      {
        id: 21,
        nameKey: 'hyderabad.name',
        countryKey: 'india',
        thingsToDo: 2000,
        image: 'Travel_image/Hyderabad.jpg',
        historyKey: 'hyderabad.history',
        whatsapp: '919876543230',
        email: 'hyderabad.tourism@example.com'
      },
      {
        id: 22,
        nameKey: 'chennai.name',
        countryKey: 'india',
        thingsToDo: 1900,
        image: 'Travel_image/Chennai.jpg',
        historyKey: 'chennai.history',
        whatsapp: '919876543231',
        email: 'chennai.tourism@example.com'
      },
      {
        id: 23,
        nameKey: 'kochi.name',
        countryKey: 'india',
        thingsToDo: 1500,
        image: 'Travel_image/Kochi.jpg',
        historyKey: 'kochi.history',
        whatsapp: '919876543232',
        email: 'kochi.tourism@example.com',
      },
      {
        id: 24,
        name: 'Mysuru',
        nameKey: 'mysuru.name',
        countryKey: 'karnataka',
        thingsToDo: 1400,
        image: 'Travel_image/Mysuru.avif',
        historyKey: 'mysuru.history',
        whatsapp: '919876543233',
        email: 'mysuru.tourism@example.com'
      },
      {
        id: 25,
        nameKey: 'madurai.name',
        countryKey: 'tamilnadu',
        thingsToDo: 1000,
        image: 'Travel_image/Madurai.jpg',
        historyKey: 'madurai.history',
        whatsapp: '919876543234',
        email: 'madurai.tourism@example.com'
      },
      {
        id: 26,
        nameKey: 'alleppey.name',
        countryKey: 'kerala',
        thingsToDo: 950,
        image: 'Travel_image/Alleppey.jpg',
        historyKey: 'alleppey.history',
        whatsapp: '919876543235',
        email: 'alleppey.tourism@example.com'
      },
      {
        id: 27,
        nameKey: 'ooty.name',
        countryKey: 'tamilnadu',
        thingsToDo: 800,
        image: 'Travel_image/Ooty.jpg',
        historyKey: 'ooty.history',
        whatsapp: '919876543236',
        email: 'ooty.tourism@example.com'
      },
      {
        id: 28,
        nameKey: 'coorg.name',
        countryKey: 'karnataka',
        thingsToDo: 750,
        image: 'Travel_image/Coorg.jpg',
        historyKey: 'coorg.history',
        whatsapp: '919876543237',
        email: 'coorg.tourism@example.com'
      },
      {
        id: 29,
        nameKey: 'hampi.name',
        countryKey: 'karnataka',
        thingsToDo: 600,
        image: 'Travel_image/Hampi.jpg',
        historyKey: 'hampi.history',
        whatsapp: '919876543238',
        email: 'hampi.tourism@example.com'
      },
      {
        id: 30,
        nameKey: 'pondicherry.name',
        countryKey: 'puducherry',
        thingsToDo: 1200,
        image: 'Travel_image/Pondicherry.jpg',
        historyKey: 'pondicherry.history',
        whatsapp: '919876543239',
        email: 'pondicherry.tourism@example.com'
      },
      {
        id: 31,
        nameKey: 'visakhapatnam.name',
        countryKey: 'andhrapradesh',
        thingsToDo: 1100,
        image: 'Travel_image/Visakhapatnam.jpg',
        historyKey: 'visakhapatnam.history',
        whatsapp: '919876543240',
        email: 'visakhapatnam.tourism@example.com'
      },
      {
        id: 32,
        nameKey: 'tirupati.name',
        countryKey: 'andhrapradesh',
        thingsToDo: 900,
        image: 'Travel_image/Tirupati.jpg',
        historyKey: 'tirupati.history',
        whatsapp: '919876543241',
        email: 'tirupati.tourism@example.com'
      },
    ],
    'eastIndia': [
      {
        id: 33,
        nameKey: 'kolkata.name',
        countryKey: 'westbengal',
        thingsToDo: 1800,
        image: 'Travel_image/Kolkata.jpg',
        historyKey: 'kolkata.history',
        whatsapp: '919876543242',
        email: 'kolkata.tourism@example.com'
      },
      {
        id: 34,
        nameKey: 'gangtok.name',
        countryKey: 'sikkim',
        thingsToDo: 700,
        image: 'Travel_image/Gangtok.jpeg',
        historyKey: 'gangtok.history',
        whatsapp: '919876543243',
        email: 'gangtok.tourism@example.com'
      },
      {
        id: 35,
        nameKey: 'shillong.name',
        countryKey: 'meghalaya',
        thingsToDo: 600,
        image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?auto=format&fit=crop&q=80',
        historyKey: 'shillong.history',
        whatsapp: '919876543244',
        email: 'shillong.tourism@example.com'
      },
      {
        id: 36,
        nameKey: 'darjeeling.name',
        countryKey: 'westbengal',
        thingsToDo: 850,
        image: 'Travel_image/Darjeeling.jpg',
        historyKey: 'darjeeling.history',
        whatsapp: '919876543245',
        email: 'darjeeling.tourism@example.com'
      },
      {
        id: 37,
        nameKey: 'puri.name',
        countryKey: 'odisha',
        thingsToDo: 600,
        image: 'Travel_image/Puri.jpg',
        historyKey: 'puri.history',
        whatsapp: '919876543246',
        email: 'puri.tourism@example.com'
      },
      {
        id: 38,
        nameKey: 'guwahati.name',
        countryKey: 'assam',
        thingsToDo: 1000,
        image: 'Travel_image/Guwahati.jpg',
        historyKey: 'guwahati.history',
        whatsapp: '919876543247',
        email: 'guwahati.tourism@example.com'
      },
      {
        id: 39,
        nameKey: 'kohima.name',
        countryKey: 'nagaland',
        thingsToDo: 400,
        image: 'Travel_image/Kohima.jpg',
        historyKey: 'kohima.history',
        whatsapp: '919876543248',
        email: 'kohima.tourism@example.com'
      },
      {
        id: 40,
        nameKey: 'itanagar.name',
        countryKey: 'arunachalpradesh',
        thingsToDo: 280,
        image: 'Travel_image/Itanagar.jpg',
        historyKey: 'itanagar.history',
        whatsapp: '919876543249',
        email: 'itanagar.tourism@example.com'
      },
      {
        id: 41,
        nameKey: 'bhubaneswar.name',
        countryKey: 'odisha',
        thingsToDo: 1300,
        image: 'Travel_image/Bhubaneswar.jpg',
        historyKey: 'bhubaneswar.history',
        whatsapp: '919876543250',
        email: 'bhubaneswar.tourism@example.com'
      },
      {
        id: 42,
        nameKey: 'portblair.name',
        countryKey: 'andamannicobarislands',
        thingsToDo: 750,
        image: 'Travel_image/Port Blair.webp',
        historyKey: 'portblair.history',
        whatsapp: '919876543251',
        email: 'portblair.tourism@example.com'
      },
      {
        id: 43,
        nameKey: 'pelling.name',
        countryKey: 'sikkim',
        thingsToDo: 450,
        image: 'Travel_image/Pelling.jpg',
        historyKey: 'pelling.history',
        whatsapp: '919876543252',
        email: 'pelling.tourism@example.com'
      },
      {
        id: 44,
        nameKey: 'tawang.name',
        countryKey: 'arunachalpradesh',
        thingsToDo: 350,
        image: 'Travel_image/Tawang.jpg',
        historyKey: 'tawang.history',
        whatsapp: '919876543253',
        email: 'tawang.tourism@example.com'
      },
      {
        id: 45,
        nameKey: 'cherrapunji.name',
        countryKey: 'meghalaya',
        thingsToDo: 480,
        image: 'Travel_image/Cherrapunji.jpg',
        historyKey: 'cherrapunji.history',
        whatsapp: '919876543254',
        email: 'cherrapunji.tourism@example.com'
      },
      {
        id: 46,
        nameKey: 'imphal.name',
        countryKey: 'manipur',
        thingsToDo: 300,
        image: 'Travel_image/Imphal.jpg',
        historyKey: 'imphal.history',
        whatsapp: '919876543255',
        email: 'imphal.tourism@example.com'
      },
      {
        id: 47,
        nameKey: 'aizawl.name',
        countryKey: 'mizoram',
        thingsToDo: 250,
        image: 'Travel_image/Aizawl.jpg',
        historyKey: 'aizawl.history',
        whatsapp: '919876543256',
        email: 'aizawl.tourism@example.com'
      },
      {
        id: 48,
        nameKey: 'agartala.name',
        countryKey: 'tripura',
        thingsToDo: 200,
        image: 'Travel_image/Agartala.jpg',
        historyKey: 'agartala.history',
        whatsapp: '919876543257',
        email: 'agartala.tourism@example.com'
      },
    ],
    'centralIndia': [
      {
        id: 49,
        nameKey: 'khajuraho.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 450,
        image: 'Travel_image/Khajuraho.jpg',
        historyKey: 'khajuraho.history',
        whatsapp: '919876543258',
        email: 'khajuraho.tourism@example.com'
      },
      {
        id: 50,
        nameKey: 'bhopal.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 800,
        image: 'Travel_image/Bhopal.jpg',
        historyKey: 'bhopal.history',
        whatsapp: '919876543259',
        email: 'bhopal.tourism@example.com'
      },
      {
        id: 51,
        nameKey: 'gwalior.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 650,
        image: 'Travel_image/Gwalior.jpg',
        historyKey: 'gwalior.history',
        whatsapp: '919876543260',
        email: 'gwalior.tourism@example.com'
      },
      {
        id: 52,
        nameKey: 'indore.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 1200,
        image: 'Travel_image/Indore.jpg',
        historyKey: 'indore.history',
        whatsapp: '919876543261',
        email: 'indore.tourism@example.com'
      },
      {
        id: 53,
        nameKey: 'orchha.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 500,
        image: 'Travel_image/Orchha.jpg',
        historyKey: 'orchha.history',
        whatsapp: '919876543262',
        email: 'orchha.tourism@example.com'
      },
      {
        id: 54,
        nameKey: 'ujjain.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 700,
        image: 'Travel_image/Ujjain.jpg',
        historyKey: 'ujjain.history',
        whatsapp: '919876543263',
        email: 'ujjain.tourism@example.com'
      },
      {
        id: 55,
        nameKey: 'ranchi.name',
        countryKey: 'jharkhand',
        thingsToDo: 900,
        image: 'Travel_image/Ranchi.jpg',
        historyKey: 'ranchi.history',
        whatsapp: '919876543264',
        email: 'ranchi.tourism@example.com'
      },
      {
        id: 56,
        nameKey: 'daman.name',
        countryKey: 'damananddiu',
        thingsToDo: 350,
        image: 'Travel_image/Daman.webp',
        historyKey: 'daman.history',
        whatsapp: '919876543265',
        email: 'daman.tourism@example.com'
      },
      {
        id: 57,
        nameKey: 'silvassa.name',
        countryKey: 'dadraandnagarhaveli',
        thingsToDo: 200,
        image: 'Travel_image/Silvassa.webp',
        historyKey: 'silvassa.history',
        whatsapp: '919876543266',
        email: 'silvassa.tourism@example.com'
      },
      {
        id: 58,
        nameKey: 'nagpur.name',
        countryKey: 'maharashtra',
        thingsToDo: 1100,
        image: 'Travel_image/Nagpur.jpg',
        historyKey: 'nagpur.history',
        whatsapp: '919876543267',
        email: 'nagpur.tourism@example.com'
      },
      {
        id: 59,
        nameKey: 'raipur.name',
        countryKey: 'chhattisgarh',
        thingsToDo: 850,
        image: 'Travel_image/Raipur.avif',
        historyKey: 'raipur.history',
        whatsapp: '919876543268',
        email: 'raipur.tourism@example.com'
      },
      {
        id: 60,
        nameKey: 'jabalpur.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 750,
        image: 'Travel_image/Jabalpur.avif',
        historyKey: 'jabalpur.history',
        whatsapp: '919876543269',
        email: 'jabalpur.tourism@example.com'
      },
      {
        id: 61,
        nameKey: 'pachmarhi.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 400,
        image: 'Travel_image/Pachmarhi.avif',
        historyKey: 'pachmarhi.history',
        whatsapp: '919876543270',
        email: 'pachmarhi.tourism@example.com'
      },
      {
        id: 62,
        nameKey: 'amarkantak.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 300,
        image: 'Travel_image/Amarkantak.jpg',
        historyKey: 'amarkantak.history',
        whatsapp: '919876543271',
        email: 'amarkantak.tourism@example.com'
      },
      {
        id: 63,
        nameKey: 'chitrakoot.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 550,
        image: 'Travel_image/Chitrakoot.jpg',
        historyKey: 'chitrakoot.history',
        whatsapp: '919876543272',
        email: 'chitrakoot.tourism@example.com'
      },
      {
        id: 64,
        nameKey: 'bhimbetka.name',
        countryKey: 'madhyapradesh',
        thingsToDo: 250,
        image: 'Travel_image/Bhimbetka.jpg',
        historyKey: 'bhimbetka.history',
        whatsapp: '919876543273',
        email: 'bhimbetka.tourism@example.com'
      },
    ],
  }), [t]);

  useEffect(() => {
    setVisibleCards([]);
    const timer = setTimeout(() => {
      destinations[selectedContinent]?.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, index * 100);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedContinent, destinations]);

  const handleCardClick = (destination) => {
    const translatedDestination = {
      ...destination,
      name: destination.nameKey ? t(destination.nameKey) : destination.name
    };
    navigate(`/destination/${destination.id}`, { state: { destination: translatedDestination } });
  };

  const currentDestinations = destinations[selectedContinent] || [];

  return (
    <div className="destinations-container">
      <div className="destinations-content">
        {/* Header */}
        <div className="header-section">
          <h1 className="main-title">
            {t('title')}
          </h1>
          <p className="subtitle">
            {t('subtitle')}
          </p>
        </div>

        {/* Continent Navigation */}
        <div className="navigation-section">
          <div className="continent-buttons">
            {continents.map((continent) => (
              <button
                key={continent}
                onClick={() => setSelectedContinent(continent)}
                className={`continent-btn ${selectedContinent === continent ? 'active' : ''}`}
              >
                {t(continent)}
              </button>
            ))}
          </div>
          {/* Active indicator line */}
          <div className="indicator-container">
            <div 
              className="indicator-line"
              style={{
                width: `${100 / continents.length}%`,
                left: `${(continents.indexOf(selectedContinent) * 100) / continents.length}%`
              }}
            />
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="destinations-grid">
          {currentDestinations.map((destination, index) => (
            <div
              key={destination.id}
              onClick={() => handleCardClick(destination)}
              className={`destination-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Image Container */}
              <div className="image-container">
                <img
                  src={destination.image}
                  alt={t(destination.nameKey)}
                  className="destination-image"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="image-overlay"></div>
                
                {/* City name and things to do - overlay on image */}
                <div className="image-content">
                  <h3 className="destination-name">{destination.nameKey ? t(destination.nameKey) : destination.name}</h3>
                  <p className="things-to-do">
                    {destination.thingsToDo.toLocaleString()} {t('thingsToDo')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No destinations message */}
        {currentDestinations.length === 0 && (
          <div className="no-destinations">
            <div className="empty-icon">🌍</div>
            <h3 className="empty-title">{t('comingSoonTitle')}</h3>
            <p className="empty-description">
              {t('comingSoonDescription', { continent: t(selectedContinent) })}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularDestinations;