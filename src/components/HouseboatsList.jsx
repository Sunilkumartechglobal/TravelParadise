import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HouseboatsList.css';


const dummyHouseboats = [
  { id: 1, titleKey: 'House Boats Hotels In Alleppey Alappuzha Kerala' },
  { id: 2, titleKey: 'House Boats Hotels in Munnar' },
  { id: 3, titleKey: 'House Boats Hotels in Cochin' },
  { id: 4, titleKey: 'House Boats Hotels in KumarakomLake' },
  { id: 5, titleKey: 'House Boats Hotels in Kottayam' },
  { id: 6, titleKey: 'House Boats Hotels in Alleppey' },
  { id: 7, titleKey: 'House Boats Hotels in Chottanikara' },
  { id: 8, titleKey: 'House Boats Hotels in Thiruvananthapuram' },
  { id: 9, titleKey: 'House Boats Hotels in KovalamBeach' },
  { id: 10, titleKey: 'House Boats Hotels in Thekkady' },
  { id: 11, titleKey: 'House Boats Hotels in Wayanad' },
  { id: 12, titleKey: 'House Boats Hotels in Alappuzha' },
  { id: 13, titleKey: 'House Boats Hotels in Guruvayur' },
  { id: 14, titleKey: 'House Boats Hotels in Vagamon' },
  { id: 15, titleKey: 'House Boats Hotels in AthirapillyWaterFalls' },
  { id: 16, titleKey: 'House Boats Hotels in Marari Beach' },
  { id: 17, titleKey: 'House Boats Hotels in Poovar Beach' },
  { id: 18, titleKey: 'House Boats Hotels in Varkala Beach' },
  { id: 19, titleKey: 'House Boats Hotels in Ashtamudi Lake' },
  { id: 20, titleKey: 'House Boats Hotels in Kanyakumari Beach' },
  { id: 21, titleKey: 'House Boats Hotels in Alleppey Beach' },
  { id: 22, titleKey: 'House Boats Hotels in Alappuzha Lake' },
  { id: 23, titleKey: 'House Boats Hotels in India' },
  { id: 24, titleKey: 'House Boats Hotels in Kerala' },
  { id: 25, titleKey: 'House Boat Hotels in Alleppey' },
  { id: 26, titleKey: 'Boat House Hotels in India' },
  { id: 27, titleKey: 'Boat House Hotels in Kerala' },
  { id: 28, titleKey: 'Sharing Houseboats Hotels in Alleppey' },
  { id: 29, titleKey: 'Sharing Boat House Hotels in Kerala' },
  { id: 30, titleKey: 'Day Trip House Boats Hotels in Alleppey' },
  { id: 31, titleKey: 'Day Cruise House Boats Hotels in Alleppey' },
  { id: 32, titleKey: 'Sharing House Boats Hotels in Alleppey' },
  { id: 33, titleKey: 'Five Star Houseboats Hotels in Alleppey' },
  { id: 34, titleKey: 'Four Star Houseboats Hotels in Alleppey' },
  { id: 35, titleKey: 'Three Star Houseboats Hotels in Alleppey' },
  { id: 36, titleKey: 'TwoStar Houseboats Hotels in Alleppey' },
  { id: 37, titleKey: 'Budget Houseboats Hotels in Alleppey' },
  { id: 38, titleKey: 'Standard BoatHouse Hotels in Alleppey' },
];

const HouseboatsList = () => {
  const [houseboats] = useState(dummyHouseboats);
  const [searchTerm] = useState('');
  const { t } = useTranslation(['houseboatList', 'translation']);
  const navigate = useNavigate();

  // Fetch houseboats from backend
  // useEffect(() => {
  //   axios.get('http://localhost:8080/TourismParadise/home')
  //     .then(response => {
  //       if (response.data && Array.isArray(response.data.houseboats)) {
  //         setHouseboats(response.data.houseboats);
  //       } else {
  //         console.warn("Houseboats data not found:", response.data);
  //         setHouseboats([]);
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching houseboats:", error);
  //       setHouseboats([]);
  //     });
  // }, []);

  // Filter by search term
  const filteredHouseboats = houseboats.filter(boat =>
    t(boat.titleKey, { ns: 'houseboatList' }).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (boat) => {
    const key = boat.titleKey.toLowerCase();

    // Alleppey / Alappuzha -> alpy.html (opens in new tab)
    const isAlpy =
      key.includes('alleppey') ||
      key.includes('alappuzha') ||
      key.includes('alpy');

    // Munnar -> munnar.html (opens in new tab)
    const isMunnar = key.includes('munnar');

    if (isAlpy) {
      window.open('/alpy.html', '_blank');
      return;
    }
    if (isMunnar) {
      window.open('/munnar.html', '_blank');
      return;
    }

    // All other cards -> existing destination feed
    const translatedTitle = t(boat.titleKey, { ns: 'houseboatList' });
    navigate('/destinationfeed', { state: { selectedOffer: { title: translatedTitle } } });
  };

  return (
    <div className="houseboats-container">
      {/* Header */}
      <div
        className="houseboats-header"
        onClick={() => navigate('/destinationfeed', { state: { selectedOffer: { title: 'Houseboats' } } })}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter') navigate('/destinationfeed', { state: { selectedOffer: { title: 'Houseboats' } } }); }}
      >
        <h1 className="houseboats-title">
          {t('houseboats', { ns: 'translation' })}
        </h1>
      </div>

      {/* Results */}
      <div className="houseboats-results-grid">
        {filteredHouseboats.map((boat) => (
          <div
            key={boat.id}
            onClick={() => handleCardClick(boat)}
            className="houseboats-result-card"
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') handleCardClick(boat); }}
          >
            <div className="houseboats-card-content">
              <h3 className="houseboats-card-title">{t(boat.titleKey, { ns: 'houseboatList' })}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredHouseboats.length === 0 && (
        <div className="houseboats-no-results">
          <p className="houseboats-no-results-text">
            {t('noHouseboatsFound', { ns: 'translation' })}
          </p>
        </div>
      )}
    </div>
  );
};

export default HouseboatsList;
