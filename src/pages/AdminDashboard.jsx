import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentOffer, setCurrentOffer] = useState({
    description: '',
    email: '',
    id: '',
    image: '',
    location: '',
    map: '',
    price: '',
    rating: '',
    reviews: '',
    title: '',
    whatsapp: ''
  });
  const [rowIndex, setRowIndex] = useState(null);
  
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchOffers();
  }, [token, navigate]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/.netlify/functions/adminOffers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const rows = res.data.rows || [];
      if (rows.length > 0) {
        // ✅ Map columns in the exact order from Google Sheets
        const dataRows = rows.slice(1).map((row, index) => ({
          rowIndex: index + 2, // +2 because header is row 1
          description: row[0] || '',  // Column A
          email: row[1] || '',        // Column B
          id: row[2] || '',           // Column C
          image: row[3] || '',        // Column D
          location: row[4] || '',     // Column E
          map: row[5] || '',          // Column F
          price: row[6] || '',        // Column G
          rating: row[7] || '',       // Column H
          reviews: row[8] || '',      // Column I
          title: row[9] || '',        // Column J
          whatsapp: row[10] || ''     // Column K
        }));
        setOffers(dataRows);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentOffer(prev => ({ ...prev, [name]: value }));
  };

  const openAddModal = () => {
    setEditMode(false);
    const nextId = offers.length > 0 
      ? Math.max(...offers.map(o => Number(o.id) || 0)) + 1 
      : 1;
    
    setCurrentOffer({
      description: '',
      email: 'tourismparadiseajai@gmail.com',
      id: nextId.toString(),
      image: '/Travel_image/',
      location: '',
      map: '',
      price: '',
      rating: '4.5',
      reviews: '0',
      title: '',
      whatsapp: '919495401700'
    });
    setShowModal(true);
  };

  const openEditModal = (offer) => {
    setEditMode(true);
    setCurrentOffer(offer);
    setRowIndex(offer.rowIndex);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editMode) {
        // Update existing - maintain column order
        await axios.put('/.netlify/functions/adminOffers', 
          { ...currentOffer, rowIndex },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Offer updated successfully!');
      } else {
        // Add new - maintain column order
        await axios.post('/.netlify/functions/adminOffers',
          currentOffer,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Offer added successfully!');
      }
      
      setShowModal(false);
      fetchOffers();
    } catch (error) {
      console.error('Error saving offer:', error);
      alert('Failed to save offer: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async (offer) => {
    if (!window.confirm(`Delete "${offer.title}"?`)) return;
    
    try {
      await axios.delete('/.netlify/functions/adminOffers', {
        headers: { Authorization: `Bearer ${token}` },
        data: { rowIndex: offer.rowIndex }
      });
      alert('Offer deleted successfully!');
      fetchOffers();
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Failed to delete offer');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>🏝️ Tourism Paradise - Admin Dashboard</h1>
        <div className="admin-actions">
          <button className="btn-add" onClick={openAddModal}>
            ➕ Add New Offer
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>{offers.length}</h3>
          <p>Total Offers</p>
        </div>
        <div className="stat-card">
          <h3>{offers.filter(o => Number(o.price) < 5000).length}</h3>
          <p>Budget Offers</p>
        </div>
        <div className="stat-card">
          <h3>{offers.filter(o => Number(o.rating) >= 4.5).length}</h3>
          <p>Top Rated</p>
        </div>
      </div>

      <div className="offers-table-container">
        <table className="offers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer.rowIndex}>
                <td>{offer.id}</td>
                <td>
                  <img 
                    src={offer.image || '/placeholder.jpg'} 
                    alt={offer.title}
                    className="offer-thumbnail"
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                </td>
                <td className="offer-title">{offer.title}</td>
                <td className="offer-price">
                  ₹{Number(offer.price || 0).toLocaleString('en-IN')}
                </td>
                <td>
                  <span className="rating-badge">
                    ⭐ {offer.rating || 'N/A'}
                  </span>
                  <span className="reviews-count">({offer.reviews || 0})</span>
                </td>
                <td>{offer.location || '-'}</td>
                <td>
                  <div className="contact-info">
                    {offer.whatsapp && (
                      <span className="contact-item">
                        📱 {offer.whatsapp}
                      </span>
                    )}
                    {offer.email && (
                      <span className="contact-item">
                        ✉️ {offer.email}
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => openEditModal(offer)}
                      title="Edit offer"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleDelete(offer)}
                      title="Delete offer"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editMode ? '✏️ Edit Offer' : '➕ Add New Offer'}</h2>
              <button 
                className="btn-close" 
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="offer-form">
              {/* ID and Title */}
              <div className="form-row">
                <div className="form-group">
                  <label>ID *</label>
                  <input
                    type="text"
                    name="id"
                    value={currentOffer.id}
                    onChange={handleInputChange}
                    required
                    disabled={editMode}
                    placeholder="Auto-generated"
                  />
                </div>
                
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={currentOffer.title}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Hotels in Kerala"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={currentOffer.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                  placeholder="Detailed description of the offer..."
                />
              </div>

              {/* Price, Rating, Reviews */}
              <div className="form-row form-row-3">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={currentOffer.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="14999"
                  />
                </div>

                <div className="form-group">
                  <label>Rating *</label>
                  <input
                    type="number"
                    name="rating"
                    value={currentOffer.rating}
                    onChange={handleInputChange}
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    placeholder="4.5"
                  />
                </div>

                <div className="form-group">
                  <label>Reviews *</label>
                  <input
                    type="number"
                    name="reviews"
                    value={currentOffer.reviews}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="247"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="form-group">
                <label>Image Path *</label>
                <input
                  type="text"
                  name="image"
                  value={currentOffer.image}
                  onChange={handleInputChange}
                  required
                  placeholder="/Travel_image/Hotel.jpg"
                />
                <small>Upload images to /public/Travel_image/ folder</small>
              </div>

              {/* Location and Map */}
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={currentOffer.location}
                    onChange={handleInputChange}
                    placeholder="Alleppey, Kerala"
                  />
                </div>

                <div className="form-group">
                  <label>Map URL</label>
                  <input
                    type="text"
                    name="map"
                    value={currentOffer.map}
                    onChange={handleInputChange}
                    placeholder="Google Maps link"
                  />
                </div>
              </div>

              {/* Email and WhatsApp */}
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={currentOffer.email}
                    onChange={handleInputChange}
                    placeholder="contact@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={currentOffer.whatsapp}
                    onChange={handleInputChange}
                    placeholder="919876543210"
                    maxLength="12"
                  />
                  <small>Format: 919876543210 (with country code)</small>
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  {editMode ? '💾 Update Offer' : '➕ Add Offer'}
                </button>
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
