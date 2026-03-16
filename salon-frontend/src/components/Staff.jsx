import React from 'react';
import { ArrowRight, MessageSquare, Calendar, BarChart3, CheckSquare } from 'lucide-react';

const Staff = () => {
  return (
    <div className="bg-[#F9F5F0] min-h-screen font-sans text-stone-900">
      
      {/* --- HERO SECTION --- */}
      <section className="pt-20 pb-32 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6">
            Streamline Your Team, <br />
            <span className="font-bold">Supercharge Your Workflow</span>
          </h1>
          <p className="text-stone-500 max-w-lg mx-auto mb-10 text-lg">
            All-in-one platform to plan, collaborate, and deliver—faster and smarter.
          </p>
        </div>

        {/* 3D Perspective Gallery */}
        <div className="flex justify-center items-end gap-3 md:gap-6 h-[400px] perspective-1000">
          <div className="w-40 h-64 bg-stone-300 rounded-2xl -rotate-12 translate-y-12 overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" className="w-full h-full object-cover grayscale" />
          </div>
          <div className="w-44 h-72 bg-stone-300 rounded-2xl -rotate-6 translate-y-6 overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" className="w-full h-full object-cover" />
          </div>
          <div className="w-52 h-80 bg-stone-400 rounded-2xl z-10 scale-110 overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-white">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500" className="w-full h-full object-cover" />
          </div>
          <div className="w-44 h-72 bg-stone-300 rounded-2xl rotate-6 translate-y-6 overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" className="w-full h-full object-cover" />
          </div>
          <div className="w-40 h-64 bg-stone-300 rounded-2xl rotate-12 translate-y-12 overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" className="w-full h-full object-cover grayscale" />
          </div>
        </div>
      </section>

      {/* --- SERVICES BENTO GRID --- */}
      <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Everything Your Team Needs to Work Smarter</h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            From task tracking to real-time chat, our features are built to keep your team connected and moving forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[320px]">
          
          {/* Card 1: Large Image Feature */}
          <div className="md:col-span-3 relative rounded-[2.5rem] overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg w-fit mb-4"><MessageSquare size={20}/></div>
              <h3 className="text-2xl font-bold mb-2">Built-In Team Chat</h3>
              <p className="text-stone-200 max-w-xs text-sm">Communicate instantly within projects so you never need to switch apps.</p>
            </div>
          </div>

          {/* Card 2: Solid Color Accent */}
          <div className="md:col-span-1 bg-[#EAE3D9] rounded-[2.5rem] p-10 flex flex-col justify-end border border-stone-200">
            <div className="bg-stone-900 text-white p-2 rounded-lg w-fit mb-6"><CheckSquare size={20}/></div>
            <h3 className="text-xl font-bold mb-2">Task Assignment</h3>
            <p className="text-stone-600 text-sm">Easily create, assign, and track tasks to keep everyone aligned.</p>
          </div>

          {/* Card 3: Darker Tone Accent */}
          <div className="md:col-span-1 bg-[#C4B39C] rounded-[2.5rem] p-10 flex flex-col justify-end text-white shadow-inner">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg w-fit mb-6"><Calendar size={20}/></div>
            <h3 className="text-xl font-bold mb-2">Real-Time Scheduling</h3>
            <p className="text-stone-100 text-sm">Plan meetings and sync calendars seamlessly across your team.</p>
          </div>

          {/* Card 4: Horizontal Large Feature */}
          <div className="md:col-span-3 bg-[#5F6A53] rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden text-white">
            <div className="max-w-xs">
              <div className="bg-white/10 p-2 rounded-lg w-fit mb-6"><BarChart3 size={20}/></div>
              <h3 className="text-2xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-stone-200 text-sm">Visualize performance with dashboards that highlight what's done and what's next.</p>
            </div>
            <div className="mt-8 md:mt-0 md:translate-x-12 md:translate-y-12 rotate-3 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500" className="rounded-2xl w-64 md:w-80 grayscale" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Staff;