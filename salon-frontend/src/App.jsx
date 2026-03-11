import React from "react";
import LandingPage from "./components/LandingPage";
import Staff from "./components/Staff";
import TestimonialsHero from "./components/TestimonialsHero";
import ReviewSection from "./components/ReviewSection";

const App = () => {
  return (
    <div>
      <LandingPage />
      <Staff />
      <TestimonialsHero />
      <ReviewSection/>
    </div>
  );
};

export default App;
