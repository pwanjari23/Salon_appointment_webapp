import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import Staff from "./components/Staff";
import TestimonialsHero from "./components/TestimonialsHero";
import ReviewSection from "./components/ReviewSection";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUpPage";
import BookAppointment from "./pages/BookAppointment";
import ServicesPage from "./pages/ServicesPage";
import BookingSuccess from "./pages/BookingSuccess";

const App = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route
        path="/"
        element={
          <>
            <LandingPage />
            <Staff />
            <TestimonialsHero />
            <ReviewSection />
          </>
        }
      />

      {/* Auth Pages */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
    </Routes>
  );
};

export default App;
