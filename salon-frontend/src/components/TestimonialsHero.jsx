import React from "react";
import { ArrowRight } from "lucide-react";

const TestimonialsHero = () => {
  // Mock data for the columns
  const columns = [
    {
      images: [
        "https://i.pravatar.cc/150?u=1",
        "https://i.pravatar.cc/150?u=2",
      ],
      offset: "pt-24",
    },
    {
      images: [
        "https://i.pravatar.cc/150?u=3",
        "https://i.pravatar.cc/150?u=4",
      ],
      offset: "pt-12",
    },
    { images: ["https://i.pravatar.cc/150?u=5"], offset: "pt-32" },
    { images: ["https://i.pravatar.cc/150?u=6"], offset: "pt-16" },
    { images: ["https://i.pravatar.cc/150?u=7"], offset: "pt-24" },
    { images: ["https://i.pravatar.cc/150?u=8"], offset: "pt-12" },
    {
      images: [
        "https://i.pravatar.cc/150?u=9",
        "https://i.pravatar.cc/150?u=10",
      ],
      offset: "pt-20",
    },
    {
      images: [
        "https://i.pravatar.cc/150?u=11",
        "https://i.pravatar.cc/150?u=12",
      ],
      offset: "pt-32",
    },
  ];

  return (
    <section className="bg-white py-20 overflow-hidden relative min-h-[800px] flex flex-col items-center">
      {/* --- FLOATING AVATAR GRID --- */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-4 px-4 pointer-events-none opacity-90">
        {columns.map((col, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-4 w-28 md:w-36 ${col.offset}`}
          >
            {/* Light placeholders to match the image top-fade */}
            <div className="w-full aspect-square bg-gray-50 rounded-2xl border border-gray-100 hidden md:block" />

            {col.images.map((src, i) => (
              <div
                key={i}
                className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-200 transition-transform duration-500 hover:scale-105 pointer-events-auto cursor-pointer"
              >
                <img
                  src={src}
                  alt="Leader"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* --- CONTENT CENTER --- */}
      <div className="relative z-10 mt-[450px] text-center px-6">
        <span className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-medium border border-gray-200">
          Testimonials
        </span>

        <h2 className="mt-8 text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Trusted by leaders <br />
          <span className="text-gray-400">from various industries</span>
        </h2>

        <p className="mt-6 text-gray-500 max-w-md mx-auto text-base md:text-lg leading-relaxed">
          Learn why professionals trust our solutions to complete their customer
          journeys.
        </p>

        <button className="mt-10 bg-black text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 mx-auto hover:bg-zinc-800 transition shadow-lg hover:shadow-xl">
          Read Success Stories 
        </button>
      </div>

      {/* --- VERTICAL GUIDELINE OVERLAYS (Optional Subtle Design) --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center gap-4 px-4 opacity-[0.03]">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-28 md:w-36 border-l border-black h-full" />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsHero;
