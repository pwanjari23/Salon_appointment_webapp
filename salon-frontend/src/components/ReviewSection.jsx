import React from "react";
import { Quote, Star } from "lucide-react";

const ReviewSection = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-12 font-sans">
      {/* Container with Masonry Columns */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {/* VARIANT 1: Avatar Overlap (Top Left in your image) */}
        <div className="relative bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <img src="https://i.pravatar.cc/150?u=1" alt="Avatar" />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-gray-800">Good Services!</h4>
            <p className="text-gray-500 text-xs mt-4 italic leading-relaxed">
              "Lorem ipsum is simply dummy text of the printing and typesetting
              industry."
            </p>
            <div className="flex justify-center gap-1 text-yellow-400 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>

        {/* VARIANT 2: Dark Quote (Center Bottom in your image) */}
        <div className="bg-black text-white p-8 rounded-3xl break-inside-avoid flex flex-col justify-between min-h-[250px]">
          <Quote size={40} className="opacity-50" />
          <div>
            <h3 className="text-xl font-medium leading-snug">
              "Direct yet Friendly Tone"
            </h3>
            <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
              Merry Vane — CEO
            </p>
          </div>
        </div>

        {/* VARIANT 3: Side Image (Left Middle in your image) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid flex gap-4">
          <div className="relative shrink-0">
            <img
              src="https://i.pravatar.cc/150?u=2"
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute -top-1 -right-1 bg-black text-white p-1 rounded">
              <Quote size={10} fill="currentColor" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm italic">I really appreciate!!</h4>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* VARIANT 4: The Large Circle Design (Bottom Right in your image) */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 break-inside-avoid relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-50 rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="bg-white shadow-sm w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-gray-100">
              <Quote size={20} />
            </div>
            <p className="text-lg font-semibold leading-tight">
              "When an unknown printer took a galley of type and scrambled it to
              make a type specimen book."
            </p>
            <div className="flex items-center gap-3 mt-8">
              <img
                src="https://i.pravatar.cc/150?u=5"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-bold">Charli Hapan</span>
            </div>
          </div>
        </div>

        <div className="relative bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <img src="https://i.pravatar.cc/150?u=1" alt="Avatar" />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-gray-800">Good Services!</h4>
            <p className="text-gray-500 text-xs mt-4 italic leading-relaxed">
              "Lorem ipsum is simply dummy text of the printing and typesetting
              industry."
            </p>
            <div className="flex justify-center gap-1 text-yellow-400 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-black text-white p-8 rounded-3xl break-inside-avoid flex flex-col justify-between min-h-[250px]">
          <Quote size={40} className="opacity-50" />
          <div>
            <h3 className="text-xl font-medium leading-snug">
              "Direct yet Friendly Tone"
            </h3>
            <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
              Merry Vane — CEO
            </p>
          </div>
        </div>

        {/* VARIANT 3: Side Image (Left Middle in your image) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 break-inside-avoid flex gap-4">
          <div className="relative shrink-0">
            <img
              src="https://i.pravatar.cc/150?u=2"
              className="w-16 h-16 rounded-full"
            />
            <div className="absolute -top-1 -right-1 bg-black text-white p-1 rounded">
              <Quote size={10} fill="currentColor" />
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm italic">I really appreciate!!</h4>
            <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        {/* VARIANT 4: The Large Circle Design (Bottom Right in your image) */}
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 break-inside-avoid relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-50 rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="bg-white shadow-sm w-12 h-12 rounded-full flex items-center justify-center mb-6 border border-gray-100">
              <Quote size={20} />
            </div>
            <p className="text-lg font-semibold leading-tight">
              "When an unknown printer took a galley of type and scrambled it to
              make a type specimen book."
            </p>
            <div className="flex items-center gap-3 mt-8">
              <img
                src="https://i.pravatar.cc/150?u=5"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-sm font-bold">Charli Hapan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
