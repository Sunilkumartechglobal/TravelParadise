import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import RootLayout from './components/layout/RootLayout';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/flights/FlightsPage';
import BusesPage from './pages/buses/BusesPage';
import TrainsPage from './pages/trains/TrainsPage';
import HouseboatDetail from './pages/HouseboatDetail';
import HouseboatsList from './components/HouseboatsList';
import ScrollToTop from './components/ScrollToTop';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import DestinationFeed from './pages/DestinationFeed';
import AboutPage from './pages/AboutPage';
import InfoPage from './components/info';
import DestinationDetails from './pages/DestinationDetail';
import ContactPage from './pages/ContactPage';
import DestinationsPage from './components/DestinationsPage';
import CookieConsentWithUserData from './components/CookieConsentWithUserData';

export default function App() {
return (
<CookiesProvider>
<BrowserRouter>
<ScrollToTop />
<Routes>
<Route element={<RootLayout />}>
<Route index element={ <HomePage /> } />
<Route path="flights" element={ <FlightsPage /> } />
<Route path="buses" element={ <BusesPage /> } />
<Route path="trains" element={ <TrainsPage /> } />
<Route path="houseboats" element={ <HouseboatsList /> } />
<Route path="houseboats/:id" element={ <HouseboatDetail /> } />
<Route path="destinationfeed" element={ <DestinationFeed /> } />
<Route path="destination/:id" element={ <DestinationDetails /> } />
<Route path="info" element={ <InfoPage /> } />
<Route path="contact" element={ <ContactPage /> } />
<Route path="destinations" element={ <DestinationsPage /> } />
</Route>
<Route path="/admin/login" element={ <AdminLogin /> } />
<Route path="/admin/dashboard" element={ <AdminDashboard /> } />
<Route path="about" element={ <AboutPage /> } />
<Route path="*" element={ <Navigate to="/" replace /> } />
</Routes>
<CookieConsentWithUserData />
</BrowserRouter>
</CookiesProvider>
);
}
