import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[600px]">
        {/* FORM */}
        <div className="w-full md:w-[45%] p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Welcome back</h2>
            <p className="text-gray-500 text-xs mt-1">
              Please enter your details.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-xs text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full py-1.5 border-b border-gray-200 focus:border-black outline-none text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                required
                onChange={handleChange}
                className="w-full py-1.5 border-b border-gray-200 focus:border-black outline-none text-sm"
              />
            </div>

            <button className="w-full bg-black text-white py-2.5 rounded-lg text-sm hover:bg-zinc-800">
              Sign in
            </button>
          </form>

          <p className="mt-6 text-xs text-gray-400 text-center">
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="text-black font-bold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* IMAGE */}
        <div className="hidden md:block w-[55%] p-3">
          <div className="relative h-full w-full rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
              className="absolute inset-0 h-full w-full object-cover"
              alt="login"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-sm">
                "Untitled UI saved us hundreds of hours."
              </p>
              <p className="text-xs mt-2">Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
