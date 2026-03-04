import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Wifi,
  Wind,
  Utensils,
  Phone,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import "./HouseboatDetail.css";

const HOUSEBOAT_DATA = {
  "1": { name: "Houseboats Hotels in Alleppey Alappuzha Kerala", location: "Alleppey", price: 8500 },
  "2": { name: "Houseboats Hotels in Munnar", location: "Munnar", price: 6000 },
  "3": { name: "Houseboats Hotels in Cochin", location: "Kochi", price: 7500 },
  "4": { name: "Houseboats Hotels in Kumarakom Lake", location: "Kumarakom", price: 9000 },
  "5": { name: "Houseboats Hotels in Kottayam", location: "Kottayam", price: 7000 },
  "6": { name: "Houseboats Hotels in Alleppey", location: "Alleppey", price: 8000 },
  "7": { name: "Houseboats Hotels in Chottanikara", location: "Ernakulam", price: 5500 },
  "8": { name: "Houseboats Hotels in Thiruvananthapuram", location: "Trivandrum", price: 8500 },
  "9": { name: "Houseboats Hotels in Kovalam Beach", location: "Kovalam", price: 9500 },
  "10": { name: "Houseboats Hotels in Thekkady", location: "Idukki", price: 7000 },
  "11": { name: "Houseboats Hotels in Wayanad", location: "Wayanad", price: 6500 },
  "12": { name: "Houseboats Hotels in Alappuzha", location: "Alappuzha", price: 7500 },
  "13": { name: "Houseboats Hotels in Guruvayur", location: "Thrissur", price: 5000 },
  "14": { name: "Houseboats Hotels in Vagamon", location: "Idukki", price: 6000 },
  "15": { name: "Houseboats Hotels in Athirapilly Water Falls", location: "Thrissur", price: 7000 },
  "16": { name: "Houseboats Hotels in Marari Beach", location: "Alappuzha", price: 8500 },
  "17": { name: "Houseboats Hotels in Poovar Beach", location: "Trivandrum", price: 9000 },
  "18": { name: "Houseboats Hotels in Varkala Beach", location: "Varkala", price: 8000 },
  "19": { name: "Houseboats Hotels in Ashtamudi Lake", location: "Kollam", price: 7500 },
  "20": { name: "Houseboats Hotels in Kanyakumari Beach", location: "Kanyakumari", price: 8500 },
  "21": { name: "Houseboats Hotels in Alleppey Beach", location: "Alappuzha", price: 7000 },
  "22": { name: "Houseboats Hotels in Alappuzha Lake", location: "Alappuzha", price: 7500 },
  "23": { name: "Houseboats Hotels in India", location: "Various", price: 10000 },
  "24": { name: "Houseboats Hotels in Kerala", location: "Kerala", price: 9000 },
  "25": { name: "House Boat Hotels in Alleppey", location: "Alleppey", price: 8000 },
  "26": { name: "Boat House Hotels in India", location: "India", price: 9500 },
  "27": { name: "Boat House Hotels in Kerala", location: "Kerala", price: 8500 },
  "28": { name: "Sharing Houseboats Hotels in Alleppey", location: "Alleppey", price: 4000 },
  "29": { name: "Sharing Boat House Hotels in Kerala", location: "Kerala", price: 4500 },
  "30": { name: "Day Trip Houseboats Hotels in Alleppey", location: "Alleppey", price: 5000 },
  "31": { name: "Day Cruise Houseboats Hotels in Alleppey", location: "Alleppey", price: 5500 },
  "32": { name: "Sharing Houseboats Hotels in Alleppey", location: "Alleppey", price: 4000 },
  "33": { name: "Five Star Houseboats Hotels in Alleppey", location: "Alleppey", price: 15000 },
  "34": { name: "Four Star Houseboats Hotels in Alleppey", location: "Alleppey", price: 12000 },
  "35": { name: "Three Star Houseboats Hotels in Alleppey", location: "Alleppey", price: 9000 },
  "36": { name: "Two Star Houseboats Hotels in Alleppey", location: "Alleppey", price: 7000 },
  "37": { name: "Budget Houseboats Hotels in Alleppey", location: "Alleppey", price: 5000 },
  "38": { name: "Standard Boat House Hotels in Alleppey", location: "Alleppey", price: 6500 }
};

const DEFAULT_DETAILS = {
  rating: 4.8,
  reviews: 150,
  description: "Experience the serene backwaters of Kerala in this luxurious houseboat.",
  fullDescription: "Our premium houseboat offers an unforgettable journey through the enchanting backwaters of Kerala. With spacious rooms and modern amenities.",
  features: [
    { icon: Wind, text: "AC & Non-AC Rooms" },
    { icon: Utensils, text: "All Meals Included" },
    { icon: Phone, text: "24/7 Support" },
    { icon: Wifi, text: "Free WiFi" },
  ],
  amenities: ["King Size Beds", "Private Bathroom", "Hot Water", "Life Jackets"],
  images: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544148103-0771bd102f3b?auto=format&fit=crop&w=800&q=80"
  ],
  host: {
    name: "Rajesh Kumar",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    verified: true,
    responseTime: "Within 1 hour",
  },
};

const HouseboatDetail = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // ID സ്ട്രിംഗായി മാറ്റി ഡാറ്റ ലഭ്യമാണോ എന്ന് നോക്കുന്നു
  const boatId = String(id);
  const boat = HOUSEBOAT_DATA[boatId]
    ? { ...DEFAULT_DETAILS, ...HOUSEBOAT_DATA[boatId] }
    : DEFAULT_DETAILS;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const grandTotal = nights * boat.price + Math.round(nights * boat.price * 0.1);

  const handleBooking = () => {
    const message = `Booking: ${boat.name} (ID: ${id})\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}`;
    window.open(`https://wa.me/919349401700?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="houseboat-booking-container">
      <div className="houseboat-main-content">
        <div className="houseboat-grid-layout">
          <div className="houseboat-content-section">
            <div className="houseboat-image-gallery">
              <img
                src={boat.images[currentImage]}
                alt="Houseboat"
                className="houseboat-gallery-image"
              />
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % boat.images.length)}
                className="houseboat-gallery-btn houseboat-gallery-btn-right"
              >
                <ChevronRight />
              </button>
            </div>
            <div className="houseboat-card">
              <h1 className="houseboat-card-title">{boat.name}</h1>
              <div className="houseboat-location-row">
                <MapPin className="w-5 h-5" />
                <span>{boat.location}</span>
              </div>
            </div>
          </div>
          <div className="houseboat-booking-card-wrapper">
            <div className="houseboat-booking-card">
              <div className="houseboat-price-display">
                <span>₹{boat.price.toLocaleString("en-IN")}</span>
                <span>/ night</span>
              </div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="houseboat-form-input"
              />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="houseboat-form-input"
              />
              {nights > 0 && (
                <div className="price-summary">
                  <p>Nights: {nights}</p>
                  <p>Total: ₹{grandTotal.toLocaleString("en-IN")}</p>
                </div>
              )}
              <button
                onClick={handleBooking}
                disabled={!checkIn || !checkOut}
                className="houseboat-book-btn houseboat-book-btn-active"
              >
                <MessageCircle /> Book on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseboatDetail;