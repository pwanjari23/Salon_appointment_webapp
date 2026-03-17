import React, { useState } from "react";
import { Play, Scissors, Users, MapPin, Mail, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleBook = () => {
    if (isLoggedIn) {
      navigate("/services");
    } else {
      navigate("/login");
    }
  };

  const handleServices = () => {
    navigate("/services");
  };

  const handleProfile = () => {
    navigate("/userprofile");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const galleryItems = [
    {
      id: 1,
      title: "Lash Extensions",
      category: "Before/After",
      img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=600",
    },
    {
      id: 2,
      title: "Now Booking",
      category: "Promo",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
    },
    {
      id: 3,
      title: "Lash Facts",
      category: "Tips",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
    },
    {
      id: 4,
      title: "Volume Lashes",
      category: "Service",
      img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600",
    },
    {
      id: 5,
      title: "Aftercare",
      category: "Guide",
      img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600",
    },
    {
      id: 6,
      title: "International Lash Day",
      category: "Event",
      img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600",
    },
    {
      id: 7,
      title: "Classic Set",
      category: "Before/After",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
    },
    {
      id: 8,
      title: "Salon Interior",
      category: "Studio",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600",
    },
    {
      id: 9,
      title: "Aftercare",
      category: "Guide",
      img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600",
    },
    {
      id: 10,
      title: "International Lash Day",
      category: "Event",
      img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=600",
    },
    {
      id: 11,
      title: "Classic Set",
      category: "Before/After",
      img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600",
    },
    {
      id: 12,
      title: "Salon Interior",
      category: "Studio",
      img: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600",
    },
  ];

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* --- TOP BAR (Hidden on small mobile) --- */}
      <div className="hidden sm:flex bg-black text-white text-[10px] md:text-xs py-2 px-6 md:px-16 justify-between items-center border-b border-gray-800">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-gold-500" /> 24 Tech Road, NY
            10003
          </span>
          <span className="hidden lg:flex items-center gap-1">
            <Mail size={12} className="text-gold-500" /> info@example.com
          </span>
        </div>
        <div className="flex gap-4 uppercase tracking-widest font-medium">
          <a
            href="#"
            className="hover:text-gold-500 transition"
            onClick={handleBook}
          >
            Book Now!
          </a>
        </div>
      </div>

      {/* --- HERO & NAV --- */}
      <section className="relative min-h-[70vh] md:h-[90vh] bg-black text-white">
        <div className="absolute inset-0 opacity-60">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1600"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Responsive Navbar */}
        <nav className="relative z-20 flex justify-between items-center px-6 md:px-16 py-6 bg-black/20 backdrop-blur-sm md:bg-transparent">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-gold-500">◆</span> FYNA
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 text-xs uppercase tracking-widest font-semibold">
            {isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={handleProfile}
                    className="hover:text-gold-500"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleServices}
                    className="hover:text-gold-500"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleContact}
                    className="hover:text-gold-500"
                  >
                    Contact
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={handleServices}
                    className="hover:text-gold-500"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-gold-500">
                    Gallery
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleContact}
                    className="hover:text-gold-500"
                  >
                    Contact
                  </button>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute inset-0 z-10 bg-black flex flex-col items-center justify-center gap-8 text-xl uppercase tracking-widest lg:hidden">
            {isLoggedIn ? (
              <>
                <button onClick={handleServices}>Services</button>
                <button onClick={handleContact}>Contact</button>
                <button onClick={handleProfile}>Profile</button>
                {/* <button onClick={handleLogout}>Logout</button> */}
              </>
            ) : (
              <>
                <button onClick={handleServices}>Services</button>
                <button>Gallery</button>
                <button onClick={handleContact}>Contact</button>
              </>
            )}
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 pt-20 pb-12">
          <h4 className="italic text-lg md:text-2xl text-gold-500 font-serif mb-2">
            Creative Styling
          </h4>
          <h1 className="text-4xl md:text-7xl font-bold max-w-3xl leading-tight uppercase mb-4">
            Beauty Salon <br /> Fashion For Woman
          </h1>
          <p className="text-gray-300 tracking-[0.2em] uppercase text-xs md:text-sm mb-4">
            Hair • Skincare • Nails • Makeup
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              className="w-full sm:w-auto border border-white px-8 py-4 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition duration-300"
              onClick={handleBook}
            >
              Get An Appointment
            </button>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-16 md:py-24 px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white">
        <div className="flex gap-4 md:gap-8 order-2 lg:order-1">
          <div className="w-1/2 pt-10">
            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=600"
              alt="Salon"
              className="rounded-sm shadow-2xl w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="w-1/2 pb-10">
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600"
              alt="Stylist"
              className="rounded-sm shadow-2xl w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>

        <div className="bg-stone-50 p-8 md:p-16 order-1 lg:order-2">
          <h4 className="italic text-xl md:text-2xl text-gold-500 font-serif mb-2">
            About Us
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase leading-tight">
            We Understand Your Style
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
            Parlour's talented team specializes in customized haircuts, color &
            waxing services to create unique looks for every client. Each of our
            stylists is committed to expanding their skillset world of overall
            beauty.
          </p>

          <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-3 bg-white shadow-sm rounded-lg">
                <Scissors className="text-gold-500" size={24} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">308</p>
                <p className="text-[10px] uppercase tracking-tighter text-gray-500">
                  Branches
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="p-3 bg-white shadow-sm rounded-lg">
                <Users className="text-gold-500" size={24} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold">4570</p>
                <p className="text-[10px] uppercase tracking-tighter text-gray-500">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-16 md:py-24 bg-[#fdfbf7] text-center px-6 md:px-16">
        <h4 className="italic text-xl md:text-2xl text-gold-500 font-serif mb-2">
          Welcome
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold mb-12 uppercase">
          Explore Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {[
            {
              title: "Hair Styling",
              img: "https://images.unsplash.com/photo-1595476108010-b4d1f80d77d2?auto=format&fit=crop&q=80&w=500",
            },
            {
              title: "Makeup Artist",
              img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=500",
            },
            {
              title: "Skin Care",
              img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=500",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-white shadow-lg cursor-pointer"
              onClick={handleServices}
            >
              <div className="overflow-hidden h-64 md:h-80">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-6 translate-y-2 group-hover:translate-y-0 transition duration-300">
                <h3 className="text-lg font-bold uppercase tracking-widest">
                  {service.title}
                </h3>
                <p className="text-gold-500 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More +
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div>
        <section className="bg-[#f9f8f6] py-20 px-6 md:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h4 className="italic text-xl text-gold-500 font-serif mb-2">
                Portfolio
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-gray-900">
                Our Work & Results
              </h2>
              <div className="w-20 h-1 bg-gold-500 mx-auto mt-4"></div>
            </div>

            {/* Masonry Gallery */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Image Container */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto object-cover filter grayscale-[20%] group-hover:grayscale-0 transition duration-700"
                  />

                  {/* Minimal Overlay (Instagram Style) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <p className="text-gold-500 text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">
                      {item.category}
                    </p>
                    <h3 className="text-white text-lg font-serif italic tracking-wide">
                      {item.title}
                    </h3>
                  </div>

                  {/* Optional: Simple Border for that "Print" look */}
                  <div className="absolute inset-4 border border-white/20 pointer-events-none group-hover:inset-2 transition-all duration-500"></div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-16 text-center">
              <button className="bg-transparent border-2 border-gray-900 px-10 py-3 uppercase text-xs font-bold tracking-[0.3em] hover:bg-gray-900 hover:text-white transition duration-300">
                Follow Us @YourBrand
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
