import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Check,
  X,
  ArrowLeft,
  ChevronRight,
  Star,
  ShieldCheck,
  User,
} from "lucide-react";
import HorizontalCalendar from "../components/HorizontalCalendar";
import { Navigate, useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

const ServicesPage = () => {
  const [step, setStep] = useState(1);

  const [services, setServices] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const [availableSlots, setAvailableSlots] = useState([]);
  const [cashfree, setCashfree] = useState(null);

  const API = "http://localhost:5000/api";

  useEffect(() => {
    fetchServices();
    fetchStaff();
  }, []);

  const navigate = useNavigate();

  const handleLandingPage = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      handleLandingPage();
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/services`);
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${API}/staff`);
      setStaffList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSlots = async () => {
    if (!selectedStaff || !selectedDate) return;

    try {
      const res = await axios.get(
        `${API}/appointments/available-slots?staffId=${selectedStaff.id}&date=${selectedDate}`,
      );

      setAvailableSlots(res.data.availableSlots);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [selectedStaff, selectedDate]);

  const handleContinue = () => {
    if (step === 1 && selectedService) setStep(2);
    else if (step === 2 && selectedStaff) setStep(3);
    else if (step === 3 && selectedTime) setStep(4);
  };

  const bookAppointment = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      // 1️⃣ Create Appointment (status should be pending)
      const appointmentRes = await axios.post(
        `${API}/appointments`,
        {
          serviceId: selectedService.id,
          staffId: selectedStaff.id,
          date: selectedDate,
          time: selectedTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const appointment = appointmentRes.data.appointment;

      // 2️⃣ Create Cashfree Order
      const orderRes = await axios.post(`${API}/payments/create-order`, {
        appointmentId: appointment.id,
        amount: selectedService.price,
        email: user.email,
        phone: user.phone,
      });

      const { paymentSessionId, orderId } = orderRes.data;

      // 3️⃣ Open Cashfree Popup
      const result = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });

      // 4️⃣ If user cancelled
      if (result?.error) {
        alert("Payment cancelled");
        return;
      }

      // 5️⃣ If payment success
      if (result?.paymentDetails?.paymentMessage === "Payment successful") {
        await axios.post(`${API}/payments/verify-payment`, {
          orderId: orderId,
        });

        navigate("/booking-success", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const cf = await load({ mode: "sandbox" });
      setCashfree(cf);
    };

    init();
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] text-slate-900 antialiased">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white z-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={handleBackClick}
          className="p-2 hover:bg-slate-50 rounded-full"
        >
          <ArrowLeft size={20} className="text-slate-600" />
        </button>

        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          <span className={step >= 1 ? "text-black" : ""}>Services</span>
          <ChevronRight size={12} />
          <span className={step >= 2 ? "text-black" : ""}>Staff</span>
          <ChevronRight size={12} />
          <span className={step >= 3 ? "text-black" : ""}>Time</span>
          <ChevronRight size={12} />
          <span className={step >= 4 ? "text-black" : ""}>Confirm</span>
        </div>

        <button className="p-2 hover:bg-slate-50 rounded-full">
          <X size={20} />
        </button>
      </header>

      <main className="max-w-[1200px] mx-auto pt-24 pb-12 px-6 grid grid-cols-1 lg:grid-cols-12 gap-x-12">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8">
          {/* STEP 1 SERVICES */}
          {step === 1 && (
            <div>
              <h1 className="text-[32px] font-bold tracking-tight mb-8">
                Select services
              </h1>

              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`p-6 rounded-xl border cursor-pointer flex justify-between ${
                      selectedService?.id === service.id
                        ? "border-indigo-600 bg-indigo-50/20"
                        : "border-slate-100"
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-lg">{service.name}</h4>
                      <p className="text-slate-400 text-sm mt-1">
                        {service.duration}
                      </p>
                      <p className="font-bold text-indigo-600 mt-4">
                        ₹{service.price}
                      </p>
                    </div>

                    {selectedService?.id === service.id && (
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 STAFF */}
          {step === 2 && (
            <div>
              <h1 className="text-[32px] font-bold tracking-tight mb-8">
                Select staff
              </h1>

              <div className="grid grid-cols-1 gap-3">
                {staffList.map((staff) => (
                  <div
                    key={staff.id}
                    onClick={() => setSelectedStaff(staff)}
                    className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between ${
                      selectedStaff?.id === staff.id
                        ? "border-indigo-600 bg-indigo-50/20"
                        : "border-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                        {staff.img ? (
                          <img src={staff.img} />
                        ) : (
                          <User className="text-slate-300" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold">{staff.name}</h4>
                        <p className="text-slate-400 text-xs">
                          {staff.specialty}
                        </p>
                      </div>
                    </div>

                    {selectedStaff?.id === staff.id && (
                      <Check size={20} className="text-indigo-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 TIME */}
          {step === 3 && (
            <div>
              <h1 className="text-[32px] font-bold tracking-tight mb-8">
                Select time
              </h1>

              <HorizontalCalendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />

              <div className="grid grid-cols-4 gap-3">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-4 border-2 rounded-xl font-bold ${
                      selectedTime === slot
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-slate-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 CONFIRM */}
          {step === 4 && (
            <div>
              <h1 className="text-[32px] font-bold tracking-tight mb-8">
                Confirm Booking
              </h1>

              <button
                onClick={bookAppointment}
                className="bg-black text-white px-6 py-4 rounded-xl"
              >
                Confirm Appointment
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold mb-4">Summary</h4>

            {selectedService && (
              <p className="text-sm">
                Service: <b>{selectedService.name}</b>
              </p>
            )}

            {selectedStaff && (
              <p className="text-sm">
                Staff: <b>{selectedStaff.name}</b>
              </p>
            )}

            {selectedTime && (
              <p className="text-sm">
                Time: <b>{selectedTime}</b>
              </p>
            )}

            <button
              onClick={handleContinue}
              disabled={
                (step === 1 && !selectedService) ||
                (step === 2 && !selectedStaff) ||
                (step === 3 && !selectedTime)
              }
              className="w-full bg-black text-white py-4 rounded-xl font-bold mt-6"
            >
              {step === 4 ? "Confirm Booking" : "Continue"}
            </button>

            <div className="mt-8 flex items-center justify-center gap-2 text-[9px] text-slate-300 font-black uppercase tracking-[0.2em]">
              <ShieldCheck size={14} />
              <span>Secure Booking</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
