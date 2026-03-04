import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // using both namespaces: popularDestinations for content and translation for UI labels
  const { t } = useTranslation(['popularDestinations', 'translation']);
  const destination = location.state?.destination;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  if (!destination) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>{t('translation:destinationNotFound.title', { defaultValue: 'Destination not found' })}</h2>
          <p>{t('translation:destinationNotFound.description', { defaultValue: "Sorry, we couldn't find the destination you're looking for." })}</p>
          <button onClick={() => navigate('/info')} className="back-btn">
            {t('translation:goBack', { defaultValue: 'Go Back to Destinations' })}
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAssistantClick = () => {
    const boat = {
      title: 'Houseboat in Alleppey day and night 1 bedroom upper deck private houseboat'
    };
    navigate(`/destinationfeed`, { state: { selectedOffer: boat } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate email sending (in production, use EmailJS or backend API)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }, 1500);
  };

  const handleWhatsAppClick = () => {
    const message = t(
      'translation:whatsappMessage',
      {
        name: destination.name ?? t(destination.nameKey, { ns: 'popularDestinations', defaultValue: destination.name }),
        country: destination.country ?? t(destination.countryKey, { ns: 'popularDestinations', defaultValue: destination.country }),
        defaultValue: `Hi! I'm interested in visiting ${destination.name}, ${destination.country}. Can you provide more information?`
      }
    );
    const whatsappNumber = '919349401700';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Prepend '/' to local image paths
  const imageUrl = destination.image?.startsWith('http') 
    ? destination.image 
    : `/${destination.image}`;

  return (
    <div className="destination-details-page">

      {/* Hero Section */}
      <div className="hero-section">
        <img 
          src={imageUrl} 
          alt={destination.name}
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            {/* destination.nameKey assumed to be a key in popularDestinations namespace */}
            <h1 className="destination-title">{t(destination.nameKey, { ns: 'popularDestinations', defaultValue: destination.name })}</h1>
            <div className="destination-meta">
              <span className="location-badge">
                <FaMapMarkerAlt /> {t(destination.countryKey, { ns: 'popularDestinations', defaultValue: destination.country })}
              </span>
              <span className="activities-badge">
                <FaClock /> {`${destination.thingsToDo?.toLocaleString() ?? ''} ${t('translation:thingsToDo', { defaultValue: 'things to do' })}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="content-grid">
          {/* Left Column - Information */}
          <div className="info-section">
            {/* History Section - check for historyKey */}
            {destination.historyKey && (
              <div className="info-card history-card">
                <div className="card-header">
                  <h2>{t('translation:aboutDestination', { defaultValue: 'About' })} {t(destination.nameKey, { ns: 'popularDestinations', defaultValue: destination.name })}</h2>
                </div>
                <p className="history-text">{t(destination.historyKey, { ns: 'popularDestinations', defaultValue: destination.history })}</p>
              </div>
            )}

            {/* Quick Contact Buttons */}
            <div className="quick-contact-section">
              <h3 className="section-title">{t('translation:getInTouch', { defaultValue: 'Get in Touch' })}</h3>
              <div className="contact-buttons">
                <button
                  className="contact-btn whatsapp-btn"
                  onClick={handleWhatsAppClick}
                >
                  <FaWhatsapp className="btn-icon" />
                  <div className="btn-content">
                    <span className="btn-label">{t('translation:chatOnWhatsApp', { defaultValue: 'Chat on WhatsApp' })}</span>
                    <span className="btn-sublabel">{t('translation:instantResponse', { defaultValue: 'Instant Response' })}</span>
                  </div>
                </button>

                {destination.email && (
                  <a
                    href={`mailto:tourismparadiseajai@gmail.com?subject=${encodeURIComponent(t('translation:emailSubject', { defaultValue: `Inquiry about ${destination.name}` , destinationName: destination.name }))}&body=${encodeURIComponent(t('translation:emailBodyTemplate', { name: formData.name || '', destination: destination.name, defaultValue: `Hello,\n\nI am interested in learning more about ${destination.name}. Please provide me with more information.\n\nThank you!` }))}`}
                    className="contact-btn email-btn"
                  >
                    <FaEnvelope className="btn-icon" />
                    <div className="btn-content">
                      <span className="btn-label">{t('translation:sendEmail', { defaultValue: 'Send Email' })}</span>
                      <span className="btn-sublabel">{t('translation:emailAddress', { defaultValue: 'tourismparadiseajai@gmail.com' })}</span>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Additional Info Box */}
            <div 
              className="info-box"
              style={{ 
                backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/Travel_image/Houseboats in Allapuzha day cruise 1 bedroom upper deck private.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: '#fff',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
                padding: '3.5rem 2rem'
              }}
            >
              <p>{t('translation:houseboatShort', { defaultValue: 'Houseboat in Alleppey day and night 1 bedroom upper deck private houseboat.' })}</p>
              <button className="whatsapp-quick-btn" onClick={handleAssistantClick}>
                {t('translation:exploreNow', { defaultValue: 'Explore Now' })}
              </button>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="form-section">
            <div className="form-card">
              <div className="form-header">
                <h2>{t('translation:planYourVisitTitle', { defaultValue: 'Plan Your Visit' })}</h2>
                <p>{t('translation:planYourVisitSubtitle', { defaultValue: "Fill out the form and we'll get back to you within 24 hours" })}</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t('translation:labelFullName', { defaultValue: 'Full Name *' })}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t('translation:placeholderFullName', { defaultValue: 'Enter your full name' })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('translation:labelEmail', { defaultValue: 'Email Address *' })}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={t('translation:placeholderEmail', { defaultValue: 'your.email@example.com' })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('translation:labelPhone', { defaultValue: 'Phone Number' })}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('translation:placeholderPhone', { defaultValue: '+91 98765 43210' })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('translation:labelMessage', { defaultValue: 'Your Message *' })}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder={t('translation:placeholderMessage', { defaultValue: 'Tell us about your travel plans, preferences, and any specific questions...' })}
                    className="form-textarea"
                  />
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? t('translation:sending', { defaultValue: 'Sending...' }) : t('translation:sendInquiry', { defaultValue: 'Send Inquiry' })}
                </button>

                {formStatus === 'success' && (
                  <div className="success-message">
                    {t('translation:successMessage', { defaultValue: "✓ Message sent successfully! We'll contact you soon." })}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
