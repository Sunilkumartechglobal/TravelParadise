import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, MapPin, Heart, Mail } from 'lucide-react';
import './DestinationFeed.css';
import axios from 'axios';
import { API_ROUTES } from '../config/amplifyConfig';

const PAGE_SIZE = 10;

// Fallback sample data shown when API is unavailable (local dev)
const FALLBACK_OFFERS = [
  {
    id: 1,
    title: 'Premium Houseboat Stay - Alleppey',
    location: 'Alleppey, Kerala',
    description: 'Experience the magical backwaters of Kerala on a premium houseboat. Enjoy scenic views, authentic Kerala cuisine, and a peaceful night on the water.',
    price: 8500,
    rating: 4.8,
    reviews: 124,
    whatsapp: '919876543210',
    image: 'https://images.unsplash.com/photo-1544148103-0771bd102f3b?w=800'
  },
  {
    id: 2,
    title: 'Luxury Shikara Boat Day Cruise',
    location: 'Kumarakom, Kerala',
    description: 'Glide through the serene backwaters on a traditional Shikara boat. Spot exotic birds, lush paddy fields and enjoy a relaxing day on the water.',
    price: 3200,
    rating: 4.6,
    reviews: 89,
    whatsapp: '919876543210',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800'
  },
  {
    id: 3,
    title: 'Honeymoon Special Houseboat Package',
    location: 'Alleppey, Kerala',
    description: 'Celebrate your love on a beautifully decorated houseboat. Includes candlelight dinner, flower decoration, and a private guided backwater tour.',
    price: 12000,
    rating: 4.9,
    reviews: 67,
    whatsapp: '919876543210',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'
  },
  {
    id: 4,
    title: 'Munnar Tea Garden Resort Stay',
    location: 'Munnar, Kerala',
    description: 'Wake up to misty mountains and sprawling tea gardens. Enjoy trekking, plantation tours and the cool fresh air of the Western Ghats.',
    price: 5500,
    rating: 4.7,
    reviews: 201,
    whatsapp: '919876543210',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
  },
  {
    id: 5,
    title: 'Kovalam Beach Resort Package',
    location: 'Kovalam, Kerala',
    description: 'Relax on the golden sands of Kovalam beach. Package includes beachside accommodation, Ayurvedic massage, and seafood dining.',
    price: 7000,
    rating: 4.5,
    reviews: 155,
    whatsapp: '919876543210',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
  },
];

const OffersFeed = () => {
  const [allOffers, setAllOffers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [apiError, setApiError] = useState(false);

  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const offerRefs = useRef({});
  const inquiryRef = useRef(null);
  const scrollObserver = useRef();

  useEffect(() => {
    const loadFromSheet = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_ROUTES.offers2, { timeout: 5000 });
        let loaded = Array.isArray(res.data.offers) ? res.data.offers : [];

        if (loaded.length === 0) throw new Error('Empty response');

        loaded = loaded.map(o => ({
          ...o,
          id: Number(o.id),
          price: Number(o.price) || 0,
          rating: o.rating ? Number(o.rating) : 4.5,
          reviews: o.reviews ? Number(o.reviews) : 0,
          image: o.image || 'https://images.unsplash.com/photo-1544148103-0771bd102f3b?w=800'
        }));

        setAllOffers(loaded);
        setOffers(loaded.slice(0, PAGE_SIZE));
        setHasMore(loaded.length > PAGE_SIZE);
        setPage(2);
      } catch (err) {
        console.warn('API unavailable, using fallback data:', err.message);
        setApiError(true);
        setAllOffers(FALLBACK_OFFERS);
        setOffers(FALLBACK_OFFERS.slice(0, PAGE_SIZE));
        setHasMore(FALLBACK_OFFERS.length > PAGE_SIZE);
        setPage(2);
      } finally {
        setLoading(false);
      }
    };
    loadFromSheet();
  }, []);

  const loadMoreOffers = useCallback(() => {
    if (loading || !hasMore) return;
    const start = (page - 1) * PAGE_SIZE;
    const nextBatch = allOffers.slice(start, start + PAGE_SIZE);

    if (nextBatch.length > 0) {
      setOffers(prev => [...prev, ...nextBatch]);
      setPage(prev => prev + 1);
    } else {
      setHasMore(false);
    }
  }, [allOffers, page, hasMore, loading]);

  const lastOfferRef = useCallback(node => {
    if (loading) return;
    if (scrollObserver.current) scrollObserver.current.disconnect();
    scrollObserver.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMoreOffers();
    });
    if (node) scrollObserver.current.observe(node);
  }, [loading, hasMore, loadMoreOffers]);

  const handleWhatsAppBook = (offer) => {
    const message = `Hi, I'm interested in: ${offer.title}\nPrice: ₹${offer.price}`;
    window.open(`https://wa.me/${offer.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:tourismparadiseajai@gmail.com?subject=Inquiry from ${inquiryForm.name}&body=${encodeURIComponent(inquiryForm.message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="offers-feed-container">

      {/* Dev warning banner */}
      {apiError && (
        <div style={{
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: 8,
          padding: '10px 16px',
          marginBottom: 20,
          maxWidth: 1400,
          margin: '0 auto 20px',
          fontSize: 14,
          color: '#856404'
        }}>
          ⚠️ API unavailable — showing sample data. Connect your backend to see live listings.
        </div>
      )}

      <div className="offers-feed-list">
        {offers.map((offer, index) => (
          <div
            key={`${offer.id}-${index}`}
            ref={el => {
              offerRefs.current[offer.id] = el;
              if (index === offers.length - 1) lastOfferRef(el);
            }}
            className="offer-row-card"
          >
            <div className="offer-row-image">
              <img
                src={offer.image}
                alt={offer.title}
                onError={e => e.target.src = 'https://images.unsplash.com/photo-1544148103-0771bd102f3b?w=800'}
              />
              <button className="offer-like-btn"><Heart size={20} /></button>
            </div>
            <div className="offer-row-details">
              <h2 className="offer-row-title">{offer.title}</h2>
              <div className="offer-row-location"><MapPin size={14} /> {offer.location || 'Kerala'}</div>
              <p className="offer-row-description">{offer.description}</p>
              <div className="offer-row-info">
                <div className="offer-row-price">
                  <span className="price-amount">₹{offer.price.toLocaleString('en-IN')}</span>
                  <span className="price-label">/ night</span>
                </div>
                <div className="offer-row-rating">⭐ {offer.rating} ({offer.reviews})</div>
              </div>
              <button onClick={() => handleWhatsAppBook(offer)} className="offer-whatsapp-btn-inline">
                <MessageCircle size={18} /> Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="loading-spinner" style={{ margin: '40px auto', display: 'block' }} />}

      {!hasMore && (
        <div className="general-inquiry-section" ref={inquiryRef}>
          <div className="inquiry-container">
            <h2 className="inquiry-title">Need Help?</h2>
            <form onSubmit={handleInquirySubmit} className="general-inquiry-form">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={inquiryForm.name}
                onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={inquiryForm.email}
                onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
              />
              <textarea
                placeholder="Your Message"
                required
                value={inquiryForm.message}
                onChange={e => setInquiryForm({ ...inquiryForm, message: e.target.value })}
              ></textarea>
              <button type="submit" className="inquiry-submit-btn">
                <Mail size={18} /> Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OffersFeed;
