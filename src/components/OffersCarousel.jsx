import React, { useEffect, useState } from 'react';
import './OffersCarousel.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { API_ROUTES } from '../config/amplifyConfig';

const dummyOffers = [
  {
    id: 1,
    title: "offerHotels",
    price: 12999,
    imagePath: "/Travel_image/Hotel.jpg",
  },
  {
    id: 2,
    title: "offerHouseboatsDayNightCruise",
    price: 7999,
    imagePath: "/Travel_image/Houseboats in Alleppey day and night cruise.jpeg",
  },
  {
    id: 3,
    title: "offerHouseboatsDayNight1Bedroom",
    price: 15999,
    imagePath: "/Travel_image/Houseboats in Alleppey day and night 1 bedroom.jpg",
  },
  {
    id: 4,
    title: "offerHouseboatsDayCruise1BedroomUpperDeck",
    price: 299,
    imagePath: "/Travel_image/Houseboats in Allapuzha day cruise 1 bedroom upper deck private.jpg",
  },
  {
    id: 5,
    title: "offerKeralaHoneymoonHouseboat",
    price: 4999,
    imagePath: "/Travel_image/Kerala honeymoon houseboat.png",
  },
  {
    id: 6,
    title: "offerHouseboatDayNight1BedroomUpperDeck",
    price: 18999,
    imagePath: "/Travel_image/Houseboats in Allapuzha day cruise 1 bedroom upper deck private.jpg",
  },
  {
    id: 7,
    title: "offerHouseboatDayNight1BedroomUpperDeck",
    price: 2999,
    imagePath: "/Travel_image/Houseboat in Alleppey day and night 1 bedroom upper deck private houseboat.jpg",
  },
  {
    id: 8,
    title: "offerHouseboatsAlleppeyDayTripUpperDeck",
    price: 3499,
    imagePath: "/Travel_image/Houseboats in Alleppey day trip upper deck houseboat.jpg",
  },
  {
    id: 9,
    title: "offerHouseboatsB2BPrice1Bedroom",
    price: 8999,
    imagePath: "/Travel_image/Houseboats in Alleppey b2b price for 1 bedroom.jpg",
  },
  {
    id: 10,
    title: "offerSharingHouseboats2People",
    price: 6999,
    imagePath: "/Travel_image/Sharing houseboats in Alleppey 2 people price.jpg",
  },
  {
    id: 11,
    title: "offerUltraPremiumHouseboats",
    price: 1299,
    imagePath: "/Travel_image/Ultra premium houseboats in Alleppey.jpg",
  },
  {
    id: 12,
    title: "offerKeralaTourBudgetPackages",
    price: 11999,
    imagePath: "/Travel_image/Kerala tour budget packages.jpg",
  },
  {
    id: 13,
    title: "offerKeralaBoating",
    price: 1999,
    imagePath: "/Travel_image/Kerala Boating.jpg",
  },
  {
    id: 14,
    title: "offerB2BTravelDealsKeralaHouseboat",
    price: 2499,
    imagePath: "/Travel_image/B2B price travel deals for - kerala house boat packages.jpg",
  },
  {
    id: 15,
    title: "offerPetalsFlowers",
    price: 899,
    imagePath: "/Travel_image/Petals flower's.jpg",
  },
  {
    id: 16,
    title: "offerOrchidForSale",
    price: 699,
    imagePath: "/Travel_image/Orchid flowering plants.jpg",
  },
  {
    id: 17,
    title: "offerOxidisedOrnaments",
    price: 1499,
    imagePath: "/Travel_image/Oxidised Ornaments.jpg",
  },
  {
    id: 18,
    title: "offerKeralaHandloomsSarees",
    price: 5499,
    imagePath: "/Travel_image/Kerala Handlooms - kerala kasavu sarees.jpg",
  },
  {
    id: 19,
    title: "offerKeralaHandicrafts",
    price: 3999,
    imagePath: "/Travel_image/Kerala handicrafts.jpg",
  },
  {
    id: 20,
    title: "offerKeralaChips",
    price: 2299,
    imagePath: "/Travel_image/Food order online - kerala banana chips.jpg",
  },
  {
    id: 21,
    title: "offerKeralaSpices",
    price: 650,
    imagePath: "https://tse4.mm.bing.net/th/id/OIP.h8g8FW499Ga90twq5xa2RwHaDt?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 22,
    title: "offerDriedFish",
    price: 589,
    imagePath: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800",
  },
  {
    id: 23,
    title: "offerKeralaRealEstate",
    price: 269000000,
    imagePath: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
  },
  {
    id: 24,
    title: "offerKeralaLottery",
    price: 50,
    imagePath: "https://tse1.mm.bing.net/th/id/OIP.aBgXwEuvoH4I5v2oZbsEgAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 25,
    title: "offerKeralaHomeDecor",
    price: 2500,
    imagePath: "Travel_image/kerala_home_decor.jpg",
  },
  {
    id: 26,
    title: "offerTransportationInKerala",
    price: 2500,
    imagePath: "Travel_image/Transportation in Kerala.jpg",
  },
  {
    id: 27,
    title: "offerKeralaCoirProducts",
    price: 2500,
    imagePath: "Travel_image/choir.jpg",
  },
  {
    id: 28,
    title: "food",
    price: 2500,
    imagePath: "Travel_image/Food.jpg",
  },
];


const OffersGrid = () => {
  const [offers, setOffers] = useState(dummyOffers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { t } = useTranslation(['translation', 'destinationOffers']); // ✅ Added destinationOffers namespace

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(API_ROUTES.offers2);
        const data = res.data;

        if (data && Array.isArray(data.offers) && data.offers.length > 0) {
          setOffers(data.offers);
        } else {
          console.warn('No offers in sheet, using dummyOffers');
          setOffers(dummyOffers);
        }
      } catch (err) {
        console.error('Error fetching offers from sheet:', err);
        setError('Failed to load live offers, showing defaults.');
        setOffers(dummyOffers);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleCardClick = (offer) => {
    navigate('/destinationfeed', { state: { selectedOffer: offer } });
  };

  if (loading) {
    return (
      <section className="offers-grid-section">
        <h2 className="section-title">{t('budgetTravelDeals')}</h2>
        <div>Loading offers...</div>
      </section>
    );
  }

  return (
    <section className="offers-grid-section">
      <h2 className="section-title">{t('budgetTravelDeals')}</h2>
      {error && (
        <p style={{ color: 'red', textAlign: 'center', marginBottom: 12 }}>
          {error}
        </p>
      )}
      <div className="grid-container">
        {offers.map((item) => {
          // ✅ Create translation key based on offer ID
          const titleKey = `destinationOffers:${item.id}.title`;
          
          return (
            <div
              key={item.id}
              className="grid-card"
              onClick={() => handleCardClick(item)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleCardClick(item);
              }}
            >
              <div className="card-image-container">
                <img
                  src={item.image || item.imagePath} // ✅ Handle both field names
                  alt={t(titleKey, { defaultValue: item.title })}
                  className="card-image"
                />
                <div className="card-price-tag">
                  ₹{Number(item.price).toLocaleString('en-IN')}
                </div>
              </div>
              <div className="card-content-below">
                {/* ✅ Use translation with fallback to original title */}
                <h3 className="card-title-below">
                  {t(titleKey, { defaultValue: item.title })}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OffersGrid;