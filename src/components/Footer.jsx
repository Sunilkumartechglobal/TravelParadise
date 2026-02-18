import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import './Footer.css';
import { useTranslation } from 'react-i18next';  

const Footer = () => {
  const { t } = useTranslation('footer');

  const destinationLinks = [
    'keralaBudgetHouseboat', 'luxuryTopEndHouseboat', 'b2bPriceKeralaHouseboats',
    'houseboatsInAlappuzha', 'budgetBoatHouseAllepey', 'budgetBoatHouseAlappuzha',
    'budgetHouseboatAllepey', 'budgetHouseboatAlappuzha', 'budgetAlleppeyBoatHouse',
    'spotBookingBoatHouse', 'prepaidTaxiCochinAirport', 'budgetAlappuzhaHouseboats',
    'budgetAlleppeyHouseboats', 'b2bAlleppeyHouseboats', 'privateAlleppeyHouseboats',
    'houseboatsInIndia', 'sharedHouseboatsInAlleppey', 'sharingHouseboatsInAlleppey',
    'sharingBoathouseInAlleppey', 'clubbingHouseboatsInAlleppey', 'clubbingBoathouseInAlleppey',
    'luxuryHouseboatsInAlleppey', 'premiumHouseboatsInAlleppey', 'deluxeHouseboatsInAlleppey',
    'standardHouseboatsInAlleppey', 'ultraLuxuryHouseboatsInAlleppey', 'ultraLuxurySharingHouseboatsInAlleppey',
    'bestHouseboatsInAlleppey', 'bestLuxuryHouseboatsInAlleppey', 'bestPremiumHouseboatsInAlleppey',
    'bestDeluxeHouseboatsInAlleppey', 'bestStandardHouseboatsInAlleppey', 'bestAlappuzhaHouseboatPackages',
    'bestAlappuzhaBoatHousePackages',
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          
          <div className="footer-grid">
            {/* Brand & Social Section */}
            <div className="footer-section footer-brand-section">
              <div className="footer-brand">
                <Link to="/info" className="brand-logo">
                  <span className="brand-text">
                    <span style={{color: 'red'}}>T</span>ourism <span style={{color: 'red'}}>P</span>aradise
                  </span>
                </Link>
                <p className="footer-description">
                  {t('description')}
                </p>
                
                <div className="social-links">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/kerala_tourist_information" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram" 
                    className="social-link instagram"
                  >
                    <Instagram size={24} /><span>Instagram</span>
                  </a>

                  {/* YouTube */}
                  <a 
                    href="https://www.youtube.com/@ajayakumar4885/featured" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="YouTube" 
                    className="social-link youtube"
                  >
                    <Youtube size={24} /><span>YouTube</span>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/share/1Aqr8LQUgm/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook" 
                    className="social-link facebook"
                  >
                    <Facebook size={24} /><span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Sections */}
            <div className="footer-section">
              <h3 className="footer-title">{t('services.title')}</h3>
              <ul className="footer-links">
                <li><Link to="/destinationfeed">{t('services.flightBooking')}</Link></li>
                <li><Link to="/destinationfeed">{t('services.hotelReservation')}</Link></li>
                <li><Link to="/destinationfeed">{t('services.tourPackages')}</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">{t('company.title')}</h3>
              <ul className="footer-links">
                <li><Link to="/about">{t('company.aboutUs')}</Link></li>    
                <li><Link to="/contact">{t('company.contact')}</Link></li>
                <li>
                  <Link to="/admin/login" className="admin-link">
                    🔐 Admin Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Destination Section */}
          <div className="footer-section-destination">
            <h3 className="footer-title-destination">
              <Link to="/destinations" className="footer-title-link">{t('destinations.title')}</Link>
            </h3>
            <ul className="footer-links-destination">
              {destinationLinks.map(linkKey => (
                <li key={linkKey}>
                  <Link to="/destinationfeed">{t(`destinations.${linkKey}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      
      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="copyright-text">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
