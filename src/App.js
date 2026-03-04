import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// Layout & Navigation
import RootLayout from './components/layout/RootLayout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import HouseboatsList from './components/HouseboatsList';
import HouseboatDetail from './pages/HouseboatDetail';
import DestinationFeed from './pages/DestinationFeed';
import DestinationDetails from './pages/DestinationDetail';
import FlightsPage from './pages/flights/FlightsPage';
import BusesPage from './pages/buses/BusesPage';
import TrainsPage from './pages/trains/TrainsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Admin & Components
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import InfoPage from './components/info';
import DestinationsPage from './components/DestinationsPage';
import CookieConsentWithUserData from './components/CookieConsentWithUserData';

export default function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* RootLayout-നുള്ളിൽ വരുന്ന പേജുകൾ. 
              ഇവ കാണുന്നതിന് RootLayout-ൽ <Outlet /> ഉണ്ടെന്ന് ഉറപ്പാക്കണം. */}
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            
            {/* Houseboat Routes: Path Consistency ഉറപ്പാക്കിയിട്ടുണ്ട് */}
            <Route path="houseboats" element={<HouseboatsList />} />
            <Route path="houseboats/:id" element={<HouseboatDetail />} />
            
            {/* Destination Routes */}
            <Route path="destinationfeed" element={<DestinationFeed />} />
            <Route path="destination/:id" element={<DestinationDetails />} />
            
            {/* Other Services */}
            <Route path="flights" element={<FlightsPage />} />
            <Route path="buses" element={<BusesPage />} />
            <Route path="trains" element={<TrainsPage />} />
            
            {/* Static Pages */}
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="info" element={<InfoPage />} />
            <Route path="destinations" element={<DestinationsPage />} />
          </Route>

          {/* Admin Routes (RootLayout-ന് പുറത്ത്) */}
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />

          {/* 404 Redirect: തെറ്റായ പാതകൾ വന്നാൽ ഹോം പേജിലേക്ക് മാറ്റുന്നു */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CookieConsentWithUserData />
      </BrowserRouter>
    </CookiesProvider>
  );
}