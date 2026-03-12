import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      //   alert(res.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[600px]">
        {/* FORM */}
        <div className="w-full md:w-[45%] p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              Start your 30-day free trial.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="text-xs font-semibold text-gray-400">
                Name
              </label>
              <input
                name="name"
                onChange={handleChange}
                required
                className="w-full py-1.5 border-b border-gray-200 focus:border-black outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">
                Email
              </label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
                className="w-full py-1.5 border-b border-gray-200 focus:border-black outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                onChange={handleChange}
                required
                className="w-full py-1.5 border-b border-gray-200 focus:border-black outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-400">
                Password
              </label>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                required
                className="w-full py-1.5 border-b border-gray-200 focus:border-black outline-none text-sm"
              />
            </div>

            <button
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-800"
              onClick={handleRegister}
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400 text-center">
            Already have an account?{" "}
            <button
              className="text-black font-bold hover:underline"
              onClick={handlelogin}
            >
              Log in
            </button>
          </p>
        </div>

        {/* IMAGE */}
        <div className="hidden md:block w-[55%] p-3">
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
              className="absolute inset-0 h-full w-full object-cover"
              alt="signup"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm">
                "Untitled Labs helped us launch earlier than expected."
              </p>
              <p className="text-xs mt-2">Founder, Sisyphus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
