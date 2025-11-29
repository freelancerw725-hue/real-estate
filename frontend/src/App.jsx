import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './component/Navbar';
import Header from './component/Header';
import Properties from './component/Properties';
import PropertyDetails from './component/PropertyDetails';
import AgentsSection from './component/AgentsSection';
import PropertySection from './component/PropertySection';
import ContactForm from './component/ContactForm';
import Footer from './component/Footer';

import FAQs from './component/FAQs';
import TermsConditions from './component/TermsConditions';
import PrivacyPolicy from './component/PrivacyPolicy';
import HelpCenter from './component/HelpCenter';
import AdminDashboard from './component/AdminDashboard';

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <PropertySection />
              <Properties />
              <AgentsSection />
              <ContactForm />
              <Footer />
            </>
          }
        />

        {/* Property Details Page */}
        <Route path="/property/:id" element={<PropertyDetails />} />

        {/* Other Pages */}
        <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms-conditions" element={<><Navbar /><TermsConditions /><Footer /></>} />
        <Route path="/faqs" element={<><Navbar /><FAQs /><Footer /></>} />
        <Route path="/help-center" element={<><Navbar /><HelpCenter /><Footer /></>} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
