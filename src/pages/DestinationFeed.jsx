// src/pages/OffersFeed.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, MapPin, DollarSign, Heart, Mail, Phone, Send } from 'lucide-react';
import './DestinationFeed.css';

const OffersFeed = () => {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const observer = useRef();
  const inquiryRef = useRef(null);

  // Dummy data - replace with API call
  const DUMMY_OFFERS = [
    {
      id: 1,
      title: "Hotels",
      price: 12999,
      description: " Wildlife/Forest Areas & Related Activities:  •	Periyar Wildlife Sanctuary (or Periyar Tiger Reserve)•	Kerala Forest Areas•	Trekking Areas•	Mountain Areas•	Elephant Interaction/Viewing (Commonly offered as Elephant Safari, Elephant Ride, or seen in the wild/sanctuaries. In festivals, it's an Elephant Procession or Gajamela).",
      image: "/Travel_image/Hotel.jpg",
      rating: 4.8,
      reviews: 247,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 2,
      title: "Houseboats in Alleppey day and night cruise",
      price: 7999,
      description: "Houseboats Hotels in Alleppey, 1/2/3...22 bedroom houseboats in Alappuzha, one/two/three...twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay houseboats in Kerala, budget Boathouse in Alleppey, muhama boat jetty, nehru trophy boat race, starting point Alappuzha, finishing point Alleppey, house boat route area, kannankara boat tour area. 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 bedroom houseboats in Alappuzha, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen nineteen, twenty one, twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay  houseboats in Kerala.",
      image: "/Travel_image/Houseboats in Alleppey day and night cruise.jpeg",
      rating: 4.5,
      reviews: 189,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 3,
      title: "Houseboats in Alleppey day and night 1 bedroom",
      price: 15999,
      description: "homestay in Alleppey backwater, Alappuzha village stay, apartments in pallathuruthi, Villa in Alleppey town, jungle tree house, island backwaters resorts in Kerala, Lake frontage properties, beach frontage property. 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 bedroom houseboats in Alappuzha, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen nineteen, twenty one, twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay  houseboats in Kerala.",
      image: "/Travel_image/Houseboats in Alleppey day and night 1 bedroom.jpg",
      reviews: 312,
      rating: 4.9,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 4,
      title: "Houseboats in Alappuzha day cruise 1 bedroom upper deck private",
      price: 299,
      description: "Houseboats Hotels in Alleppey, 1/2/3...22 bedroom houseboats in Alappuzha, one/two/three...twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay houseboats in Kerala, budget Boathouse in Alleppey, muhama boat jetty, nehru trophy boat race, starting point Alappuzha, finishing point Alleppey, house boat route area, kannankara boat tour area 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 bedroom houseboats in Alappuzha, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen nineteen, twenty one, twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay  houseboats in Kerala.",
      image: "/Travel_image/Houseboats in Allapuzha day cruise 1 bedroom upper deck private.jpg",
      rating: 4.7,
      reviews: 156,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 5,
      title: "Kerala honeymoon houseboat",
      price: 4999,
      description: "A honeymoon cottage on an Alappuzha houseboat is a private, romantically decorated boat with luxury amenities like air-conditioned bedrooms, private bathrooms, and scenic decks. It typically includes onboard meals, often with special arrangements like candlelit dinners and flower-decorated beds, and offers a secluded and exclusive experience for couples traveling through Kerala's backwaters.",
      image: "/Travel_image/Kerala honeymoon houseboat.png",
      rating: 4.6,
      reviews: 98,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 6,
      title: "Houseboat in Alleppey day and night 1 bedroom upper deck private houseboat",
      price: 18999,
      description: "homestay in Alleppey backwater, Alappuzha village stay, apartments in pallathuruthi, Villa in Alleppey town, jungle tree house, island backwaters resorts in Kerala, Lake frontage properties, beach frontage property. 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 bedroom houseboats in Alappuzha, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen nineteen, twenty one, twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay  houseboats in Kerala.",
      image: "/Travel_image/Houseboats in Allapuzha day cruise 1 bedroom upper deck private.jpg",
      rating: 4.8,
      reviews: 203,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 7,
      title: "Houseboats in Alleppey day and night 1 bedroom upper deck private houseboat",
      price: 2999,
      description: "Alleppey (Alappuzha), kumarakom, kollam, Ashtamudi Lake, kovalam, Varkala, cherai beach, marari Beach, Kainakari village area, Punnamada, aryad village area, kerala backwaters area. 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 bedroom houseboats in Alappuzha, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen nineteen, twenty one, twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay  houseboats in Kerala.",
      image: "/Travel_image/Houseboat in Alleppey day and night 1 bedroom upper deck private houseboat.jpg",
      rating: 4.7,
      reviews: 421,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 8,
      title: "Houseboats in Alleppey day trip upper deck houseboat",
      price: 3499,
      description: "Kainakari village area, Punnamada, aryad village area, apartments in pallathuruthi, muhama boat jetty 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 bedroom houseboats in Alappuzha, one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen nineteen, twenty one, twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay  houseboats in Kerala.",
      image: "/Travel_image/Houseboats in Alleppey day trip upper deck houseboat.jpg",
      rating: 4.6,
      reviews: 287,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 9,
      title: "Houseboats in Alleppey b2b price for 1 bedroom",
      price: 8999,
      description: "We avail them in deluxe, premium and luxury categories starting from ₹5499 There are 2 types of 1 Bedroom houseboats in Alleppey – with upper deck and without upper deck. There are advantages to both. The former type, with an upper deck , offers you a better view of the route through which it cruises.",
      image: "/Travel_image/Houseboats in Alleppey b2b price for 1 bedroom.jpg",
      rating: 4.5,
      reviews: 334,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 10,
      title: "Sharing houseboats in Alleppey 2 people price",
      price: 6999,
      description: "Discover the magic of Kerala’s backwaters with our budget-friendly shared houseboat in Alleppey. Ideal for couples or travel buddies, this 1-night cruise includes cozy accommodation, authentic Kerala meals, and scenic views. Enjoy the tranquil waters, lush landscapes, and warm hospitality without breaking the bank. Advance booking recommended for best rates!",
      image: "/Travel_image/Sharing houseboats in Alleppey 2 people price.jpg",
      rating: 4.8,
      reviews: 192,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 11,
      title: "Ultra premium houseboats in Alleppey",
      price: 1299,
      description: "Ultra premium houseboats in Alleppey. •  Types: Houseboats are generally categorized as Deluxe, Premium, Luxury, and Ultra Luxury.•  Bedrooms: Houseboats are available from 1 to over 22 bedrooms (e.g., 1, 2, 3, 4, 5, 6-bedroom houseboats), accommodating couples, families, and large groups. Finding houseboats with 22 bedrooms might require booking multiple large boats or a very specific, rare vessel, as typical large boats range up to 10-12 bedrooms.•  Stay: They offer both Day Cruises and Day and Night (Overnight) stays.•  Budget: Budget/Cheapest Houseboats (often Deluxe or shared boats) (prices can vary greatly based on season, availability, and category). Premium and Luxury houseboats are significantly higher.•  Backwater Areas: Popular locations include Alleppey Backwaters, Punnamada, Kainakari village, Aryad village, and Muhama boat jetty.",
      image: "/Travel_image/Ultra premium houseboats in Alleppey.jpg",
      rating: 4.4,
      reviews: 567,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 12,
      title: "Kerala tour budget packages",
      price: 11999,
      description: "munnar, thekkady, periyar wildlife, wayanad, vagamon, ponmudi, Idukki, devikulam, kuttikanam, vattavada, kanthalloor, mountain area, kerala forest area, elefent Walk in Kerala, trekking area.",
      image: "/Travel_image/Kerala tour budget packages.jpg",
      rating: 4.9,
      reviews: 445,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 13,
      title: "Kerala Boating",
      price: 1999,
      description: "Embark on a serene boating journey through Kerala’s enchanting backwaters. Whether you're gliding past lush paddy fields or drifting through tranquil village canals, our Kerala boating packages offer a peaceful retreat into nature. Perfect for couples, families, or solo travelers, enjoy traditional wooden boats, authentic Kerala meals, and the gentle rhythm of life on water. Starting at just ₹1,999 per person!",
      image: "/Travel_image/Kerala Boating.jpg",
      rating: 4.7,
      reviews: 213,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 14,
      title: "B2B price travel deals for - kerala house boat packages",
      price: 2499,
      description: "Houseboats Hotels in Alleppey, 1/2/3...22 bedroom houseboats in Alappuzha, one/two/three...twenty two bed rooms Boathouse in Alleppey, premium and luxury day and night stay houseboats in Kerala, budget Boathouse in Alleppey, muhama boat jetty, nehru trophy boat race, starting point Alappuzha, finishing point Alleppey, house boat route area, kannankara boat tour area.",
      image: "/Travel_image/B2B price travel deals for - kerala house boat packages.jpg",
      rating: 4.6,
      reviews: 178,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 15,
      title: "Petals flower's",
      price: 899,
      description: "Welcome to Petals Flowers, your trusted destination for premium flowering plants in Kerala. Specializing in exotic orchids, we offer a vibrant selection perfect for home décor, gifting, and garden enthusiasts. Each plant is carefully nurtured to ensure healthy blooms and lasting beauty. Whether you're looking for a single orchid or bulk floral arrangements, Petals Flowers brings nature’s elegance to your doorstep.",
      image: "/Travel_image/Petals flower's.jpg",
      rating: 4.5,
      reviews: 389,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 16,
      title: "Orchid flowering plants",
      price: 699,
      description: "Bring home the elegance of tropical blooms with our vibrant orchid flowering plants. Available in stunning varieties like Phalaenopsis and Vanda, these orchids feature vivid colors, unique patterns, and long-lasting flowers. Perfect for indoor décor, gifting, or garden display, each plant is easy to care for and thrives in indirect light. Starting at just ₹399, elevate your space with nature’s finest artistry.",
      image: "/Travel_image/Orchid flowering plants.jpg",
      rating: 4.7,
      reviews: 156,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 17,
      title: "Oxidised Ornaments",
      price: 1499,
      description: "Kerala's oxidized jewelry is characterized by its dark, antique-like finish, achieved by intentionally oxidizing metals like silver or brass. These pieces, which are popular for their unique aesthetic and affordability, come in both traditional Kerala designs and more contemporary styles. They are often used with ethnic wear like sarees, but also pair well with modern outfits due to their versatility. Common styles include intricate necklaces, statement earrings, and matching jewelry sets.",
      image: "/Travel_image/Oxidised Ornaments.jpg",
      rating: 4.6,
      reviews: 298,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 18,
      title: "Kerala Handlooms - kerala kasavu sarees",
      price: 5499,
      description: "Kerala Handloom Silk, Kerala Kasavu Sarees, Kasavu Churidar meterials in Kerala, Kerala Handloom Shirts.",
      image: "/Travel_image/Kerala Handlooms - kerala kasavu sarees.jpg",
      rating: 4.8,
      reviews: 167,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 19,
      title: "Kerala handicrafts",
      price: 3999,
      description: "Kerala's handicrafts are diverse, reflecting the state's rich culture and artistic tradition through items made from materials like wood, metal, coir, and coconut shell. Key examples include intricate wood carvings, bell metal products, decorative coir mats, and products made from coconut shells like bowls and toys. Other notable crafts are vibrant Kathakali masks, the elaborate elephant headgear called Nettipattam, and unique Aranmula metal mirrors.",
      image: "/Travel_image/Kerala handicrafts.jpg",
      rating: 4.9,
      reviews: 234,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com"
    },
    {
      id: 20,
      title: "kerala banana chips",
      price: 2299,
      description: "Kerala chips, nendran chips in Kerala, jackfruit chips in Kerala.",
      image: "/Travel_image/Food order online - kerala banana chips.jpg",
      rating: 4.5,
      reviews: 143,
      whatsapp: "919999999999",
      email: "hotels@keralatourism.com",
      location: "Kozhikode, Kerala",
      map: "https://maps.google.com/?q=Kozhikode+Kerala",
    }, 
    {
      id: 21,
      title: "Kerala Spices",
      price: 650,
      description: "Premium quality Kerala spices including cardamom, black pepper, cinnamon, cloves, and nutmeg sourced directly from organic farms in the Western Ghats.",
      image: "https://tse4.mm.bing.net/th/id/OIP.h8g8FW499Ga90twq5xa2RwHaDt?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      rating: 4.8,
      reviews: 289,
      whatsapp: "919846780080",
      email: "info@keralaspicesonline.com"
    },
    {
      id: 22,
      title: "Dried Fish - Kerala Dried Shrimp",
      price: 589,
      description: "Premium export-quality dried freshwater prawns from Ashtamudi Lake, hygienically sun-dried without salt. Medium-large sized shrimps perfect for masala, gravy, and chutney.",
      image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800",
      rating: 4.6,
      reviews: 156,
      whatsapp: "919790131444",
      email: "sales@karuvadukadai.com"
    },
    {
      id: 23,
      title: "Kerala Real Estate",
      price: 269000000,
      description: "4 BHK independent house (3200 sq.ft) in prime location. Buy, sell, and rent properties including villas, land, houses, and flats across Kerala.",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
      rating: 4.3,
      reviews: 87,
      whatsapp: "919895123456",
      email: "info@keralarealestate.com"
    },
    {
      id: 24,
      title: "Kerala Lottery Tickets",
      price: 50,
      description: "Official Kerala State Lottery tickets with weekly draws. Win Win, Sthree Sakthi, Fifty Fifty, and Karunya lotteries. First prizes up to ₹1 Crore.",
      image: "https://tse1.mm.bing.net/th/id/OIP.aBgXwEuvoH4I5v2oZbsEgAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3",
      rating: 4.2,
      reviews: 512,
      whatsapp: "919447000000",
      email: "lottery@kerala.gov.in"
    },
    {
      id: 25,
      title: "Kerala Home Decor",
      price: 2500,
      description: "Kerala Home Decor, Kerala Coir Products",
      image: "Travel_image/kerala_home_decor.jpg",
      rating: 4.2,
      reviews: 512,
      whatsapp: "919447000000",
      email: "lottery@kerala.gov.in"
    },
    {
      id: 26,
      title: "Transportation in Kerala",
      price: 2500,
      description: "Guruvayur, Athirapilly Water Falls, vazhachal water falls, arthunkal Basilica, fort Cochin, neeleswaram, thenmala Eco spot.Guruvayur, Padmanabhaswami temple, chottanikara temple, arthunkal Basilica, Sabarimala temple, nilackal to pampa kanyakumari, Ooty, kodaikanal, Kuttalam (Kutralam/courtalam water falls), palani, Goa, Maharashtra tourism, karnataka tourism area, bangalore, tamilnadu, chennai, madurai, ramesvaram, coimbatore, Valparai, thakala Kainakari village area, Punnamada, aryad village area, apartments in pallathuruthi, muhama boat jetty",
      image: "Travel_image/Transportation in Kerala.jpg",
      rating: 4.2,
      reviews: 512,
      whatsapp: "919447000000",
      email: "lottery@kerala.gov.in"
    },
    {
      id: 27,
      title: "Kerala Coir Products",
      price: 2500,
      description: "The eco-friendly and biodegradable nature of coir makes it suitable for sustainable development initiatives, aligning with Kerala’s vision for an environmentally responsible economy. Overall, Kerala coir products combine natural utility, cultural heritage, and commercial viability, making them prominent in both local and international markets.",
      image: "Travel_image/choir.jpg",
      rating: 4.2,
      reviews: 512,
      whatsapp: "919447000000",
      email: "lottery@kerala.gov.in"
    },
    {
      id: 28,
      title: "Food Order Online",
      price: 2500,
      description: "Experience the convenience of ordering food online in Kerala. From authentic local Kerala cuisine to international dishes, satisfy your cravings with just a few clicks. Whether you are in Cochin, Trivandrum, Kozhikode, or anywhere else in Kerala, your favorite meals are now just a doorstep away.",
      image: "Travel_image/Food.jpg",
      rating: 4.2,
      reviews: 512,
      whatsapp: "919447000000",
      email: "lottery@kerala.gov.in",
      location: "Cochin, Kerala",
      map: "https://maps.google.com/?q=Cochin+Kerala"
    }
  ];

  // Track scroll position to show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load more offers (simulating infinite scroll)
  const loadMoreOffers = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    setTimeout(() => {
      const startIndex = (page - 1) * 5;
      const endIndex = startIndex + 5;
      const newOffers = DUMMY_OFFERS.slice(startIndex, endIndex);

      if (newOffers.length === 0) {
        setHasMore(false);
      } else {
        setOffers(prev => [...prev, ...newOffers]);
        setPage(prev => prev + 1);
      }

      setLoading(false);
    }, 1000);
  }, [page, loading, hasMore]);

  const lastOfferRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreOffers();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMoreOffers]);

  useEffect(() => {
    loadMoreOffers();
  }, []);

  const handleWhatsAppBook = (offer) => {
    const message = `Hi! I'm interested in booking: ${offer.title}\nLocation: ${offer.location}\nPrice: ₹${offer.price.toLocaleString('en-IN')}\n\nPlease provide more details.`;
    const whatsappUrl = `https://wa.me/${offer.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInquiryFormChange = (field, value) => {
    setInquiryForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link
    const subject = encodeURIComponent(inquiryForm.subject || 'General Inquiry about Kerala Tourism');
    const body = encodeURIComponent(
      `Name: ${inquiryForm.name}\nEmail: ${inquiryForm.email}\nPhone: ${inquiryForm.phone}\n\nMessage:\n${inquiryForm.message}`
    );
    
    window.location.href = `mailto:hotels@keralatourism.com?subject=${subject}&body=${body}`;
    
    // Reset form
    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const scrollToInquiry = () => {
    // If form is not loaded yet, scroll to bottom of page
    if (inquiryRef.current) {
      inquiryRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className="offers-feed-container">
      <div className="offers-feed-list">
        {offers.map((offer, index) => {
          const isLastItem = index === offers.length - 1;

          return (
            <div
              key={offer.id} // Using just the unique ID for the key is sufficient.
              ref={isLastItem ? lastOfferRef : null}
              className="offer-row-card"
            >
              {/* Image Section */}
              <div className="offer-row-image">
                <img src={offer.image} alt={offer.title} />
                <button className="offer-like-btn" aria-label="Like offer">
                  <Heart size={20} />
                </button>
              </div>

              {/* Details Section */}
              <div className="offer-row-details">
                <h2 className="offer-row-title">{offer.title}</h2>

                {/* Conditionally render location with an icon if it exists */}
                {offer.location && (
                  <div className="offer-row-location">
                    <MapPin size={14} /> <span>{offer.location}</span>
                  </div>
                )}

                <p className="offer-row-description">{offer.description}</p>

                <div className="offer-row-info">
                  <div className="offer-row-price">
                    <span className="price-amount">₹{offer.price.toLocaleString('en-IN')}</span>
                    <span className="price-label">/ night</span>
                  </div>
                  <div className="offer-row-rating">
                    <span className="rating-star">⭐</span>
                    <span>{offer.rating}</span>
                    <span className="rating-reviews">({offer.reviews})</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="offer-contact-info">
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>+{offer.whatsapp}</span>
                  </div>
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>{offer.email}</span>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <button
                  onClick={() => handleWhatsAppBook(offer)}
                  className="offer-whatsapp-btn-inline"
                >
                  <MessageCircle size={18} />
                  Book via WhatsApp
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {loading && (
        <div className="offers-feed-loading" role="status" aria-live="polite">
          <div className="loading-spinner"></div>
          <p>Loading more offers...</p>
        </div>
      )}

      {/* Inquiry Form Section at Bottom of Page */}
      {!hasMore && (
        <div className="general-inquiry-section" ref={inquiryRef}>
          <div className="inquiry-container">
            <h2 className="inquiry-title">Have Questions? Get in Touch!</h2>
            <p className="inquiry-subtitle">
              Send us your inquiry and our team will get back to you within 24 hours
            </p>
            
            <form onSubmit={handleInquirySubmit} className="general-inquiry-form">
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={inquiryForm.name}
                    onChange={(e) => handleInquiryFormChange('name', e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your Email *"
                    value={inquiryForm.email}
                    onChange={(e) => handleInquiryFormChange('email', e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={inquiryForm.phone}
                    onChange={(e) => handleInquiryFormChange('phone', e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={inquiryForm.subject}
                    onChange={(e) => handleInquiryFormChange('subject', e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Your Message *"
                  value={inquiryForm.message}
                  onChange={(e) => handleInquiryFormChange('message', e.target.value)}
                  required
                  rows="5"
                  className="form-textarea"
                />
              </div>

              <button type="submit" className="inquiry-submit-btn">
                <Mail size={18} />
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Scroll to Inquiry Button - Shows immediately when scrolling */}
      {showScrollBtn && (
        <button
          onClick={scrollToInquiry}
          className="scroll-to-inquiry-btn"
          aria-label="Scroll to inquiry form"
        >
          <Send size={24} />
        </button>
      )}
    </div>
  );
};

export default OffersFeed;
