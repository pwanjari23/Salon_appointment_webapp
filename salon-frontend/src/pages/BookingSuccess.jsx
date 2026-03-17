import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold text-green-600">
        Booking Confirmed 🎉
      </h1>

      <p className="mt-4">Your appointment has been successfully booked.</p>
    </div>
  );
};

export default BookingSuccess;
