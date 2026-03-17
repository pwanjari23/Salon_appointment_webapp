import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Calendar,
  LogOut,
  Camera,
  CreditCard,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  getMyAppointments,
  updateProfile,
  cancelAppointment,
} from "../api/userProfileapi";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchProfile();
    fetchAppointments();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.user);
      setFormData({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
      });
    } catch (error) {
      console.log("Profile Error:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointments();
      setAppointments(res.data);
    } catch (error) {
      console.log("Appointments Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(formData);
      alert("Profile Updated successfully");
      fetchProfile();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      await cancelAppointment(id);
      alert("Appointment cancelled successfully");
      fetchAppointments();
    } catch (error) {
      console.log("Cancel Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-4 md:p-10 font-sans text-[#4A3728]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* --- TOP LEFT: PROFILE MAIN CARD (Matches Image Top Left) --- */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-8 shadow-sm flex flex-col md:flex-row gap-8 relative">
          <button className="absolute top-6 right-6 text-[#A1887F] hover:text-[#8D6E63]">
            <Settings size={20} />
          </button>

          <div className="relative shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#F3EBE3]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#8D6E63] p-2 rounded-full text-white shadow-md border-2 border-white">
              <Camera size={14} />
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#3E2723]">
              {user.name || "User Name"}
            </h1>
            <div className="mt-4 space-y-2 text-sm text-[#7D6E63]">
              <p className="flex items-center gap-3">
                <Calendar size={16} className="text-[#BCAAA4]" /> Registration:
                2026
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[#BCAAA4]" />{" "}
                {user.email || "email@example.com"}
              </p>
            </div>
            {/* Social Icons Placeholder to match reference image */}
            <div className="flex gap-3 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#EFEBE9] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-colors cursor-pointer"
                >
                  <User size={14} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- TOP RIGHT: SECONDARY INFO (Matches Image Top Right) --- */}
        <div className="lg:col-span-4 bg-white rounded-[32px] p-8 shadow-sm">
          <h3 className="font-bold text-[#3E2723] mb-4">Account Security</h3>
          <p className="text-xs text-[#A1887F] mb-1 uppercase tracking-wider font-bold">
            Current Password
          </p>
          <div className="bg-[#F8F9FA] p-3 rounded-xl flex justify-between items-center mb-6">
            <span className="text-sm tracking-widest font-mono">••••••••</span>
            <Lock size={16} className="text-[#D7CCC8]" />
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-2xl bg-[#FDFBF9] border-2 border-[#E6D5C3] text-[#8D6E63] font-bold text-sm hover:bg-[#E6D5C3] transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* --- BOTTOM LEFT: APPOINTMENTS LIST (Matches Image "My Courses") --- */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-[#3E2723]">
              Appointment History
            </h2>
            <span className="text-xs font-bold text-[#8D6E63] bg-[#F3EBE3] px-3 py-1 rounded-full">
              {appointments.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((apt, index) => (
                <div key={apt.id} className="group flex items-center gap-4 p-1">
                  {/* Visual Timeline Marker from image */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${index === 0 ? "bg-[#8D6E63] border-[#8D6E63]" : "border-[#D7CCC8]"}`}
                    />
                    {index !== appointments.length - 1 && (
                      <div className="w-0.5 h-12 bg-[#F3EBE3]" />
                    )}
                  </div>

                  <div
                    className={`flex-1 flex items-center justify-between p-5 rounded-2xl transition-all ${index % 2 === 0 ? "bg-[#F3EBE3]/40" : "bg-[#EFEBE9]/40"} hover:bg-white hover:shadow-md border border-transparent hover:border-[#E6D5C3]`}
                  >
                    <div>
                      <h4 className="font-bold text-[#5D4037]">
                        {apt.Service?.name || "Service"}
                      </h4>
                      <p className="text-xs text-[#A1887F] mt-1">
                        {apt.date ? new Date(apt.date).toDateString() : "TBD"} •{" "}
                        {apt.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <span className="text-[10px] font-bold uppercase py-1 px-3 rounded-lg bg-green-100 text-green-700">
                        Confirmed
                      </span> */}

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[10px] font-bold uppercase py-1 px-3 rounded-lg ${
                            apt.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {apt.status || "Confirmed"}
                        </span>

                        {/* Cancel Button */}
                        {apt.status !== "cancelled" && (
                          <button
                            onClick={() => handleCancelAppointment(apt.id)}
                            className="text-[10px] font-bold uppercase py-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                      <div className="p-2 bg-white rounded-full text-[#8D6E63] shadow-sm group-hover:bg-[#8D6E63] group-hover:text-white transition-colors">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[#A1887F] py-10">
                No history found
              </p>
            )}
          </div>
        </div>

        {/* --- BOTTOM RIGHT: UPDATE FORM (Matches Image Subscription Card) --- */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-[#5D4037] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
            {/* Decorative circles to match reference */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />

            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={20} /> Update Profile
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold opacity-60">
                  Full Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:bg-white/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold opacity-60">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2 mt-1 focus:outline-none focus:bg-white/20 transition-all text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full mt-8 bg-white text-[#5D4037] py-3 rounded-2xl font-bold hover:bg-[#FDFBF9] transition-all shadow-lg active:scale-95"
            >
              Save Changes
            </button>
          </div>

          <div className="bg-white rounded-[32px] p-6 border-2 border-dashed border-[#D7CCC8] flex flex-col items-center justify-center text-center">
            <CreditCard className="text-[#D7CCC8] mb-2" size={32} />
            <p className="text-xs font-bold text-[#A1887F]">
              Need help with billing?
            </p>
            <button className="text-[10px] text-[#8D6E63] underline mt-1 uppercase font-black">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
