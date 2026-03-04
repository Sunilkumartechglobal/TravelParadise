import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* വെബ്സൈറ്റിന്റെ തലക്കെട്ട് ഭാഗം */}
      <Navbar />
      
      {/* പ്രധാന ഉള്ളടക്കം വരുന്ന ഭാഗം. 
          ഇവിടെയാണ് App.js-ൽ നൽകിയിരിക്കുന്ന സബ്-പേജുകൾ കാണിക്കുക. */}
      <main id="content" className="flex-grow">
        <Outlet />
      </main>
      
      {/* വെബ്സൈറ്റിന്റെ പാദഭാഗം */}
      <Footer />
    </div>
  );
}