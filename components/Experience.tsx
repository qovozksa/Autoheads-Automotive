
import React from 'react';
import { Play } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section className="relative py-24 min-h-[80vh] flex items-center overflow-hidden scroll-mt-24">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920" 
          alt="Luxury Car Driving"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <span className="text-xs font-bold tracking-[0.5em] uppercase text-blue-400 mb-6 block">
          The Experience
        </span>
        <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
          Engineering <span className="italic font-serif font-normal text-blue-400">Emotion</span>
        </h2>
        <p className="text-lg md:text-xl text-[#A0A0A0] max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          At Autoheads, we don't just build vehicles; we craft experiences that resonate with the human spirit. 
          Our designs offer more than just comfort—they provide a sanctuary of speed and sophistication.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button className="group flex items-center gap-4 px-10 py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-blue-600 hover:text-white transition-all duration-300">
            <Play className="w-4 h-4 fill-current" />
            Experience the Drive
          </button>
          
          <div className="flex items-center gap-4 text-white/40 cursor-pointer hover:text-white transition-colors">
            <div className="w-12 h-[1px] bg-current" />
            <span className="text-[10px] tracking-widest uppercase font-bold">Discover Heritage</span>
          </div>
        </div>
      </div>

      {/* Floating Macro Details Decor */}
      <div className="absolute bottom-12 right-12 text-right hidden lg:block opacity-20">
        <p className="text-6xl font-serif italic text-white/10">Velocity & Vision</p>
      </div>
    </section>
  );
};

export default Experience;
