
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { CarModel } from '../types';

interface HeroProps {
  flagshipCars: CarModel[];
}

const Hero: React.FC<HeroProps> = ({ flagshipCars }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % (flagshipCars.length || 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + flagshipCars.length) % (flagshipCars.length || 1));

  useEffect(() => {
    if (flagshipCars.length > 0) {
      const timer = setInterval(nextSlide, 8000);
      return () => clearInterval(timer);
    }
  }, [flagshipCars]);

  if (flagshipCars.length === 0) return <div className="h-screen bg-black flex items-center justify-center text-white/20 font-serif italic text-3xl">Autoheads Showroom</div>;

  const currentCar = flagshipCars[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
            style={{ backgroundImage: `url(${currentCar.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

          <div className="relative h-full flex flex-col justify-center px-6 md:px-24 max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center gap-2 mb-4"
            >
              <Zap className="w-4 h-4 text-blue-500 fill-blue-500" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-500">
                {currentCar.category}
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-6xl md:text-9xl font-bold mb-6 tracking-tight leading-none"
            >
              {currentCar.name}
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl md:text-2xl text-[#A0A0A0] mb-8 max-w-2xl font-serif italic"
            >
              {currentCar.tagline}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap items-center gap-12 mb-12"
            >
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] mb-1">Performance</p>
                <p className="text-lg font-medium tracking-tight text-white">{currentCar.specs}</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#666] mb-1">Starting From</p>
                <p className="text-lg font-medium tracking-tight text-white">{currentCar.price}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex gap-4"
            >
              <button className="px-10 py-4 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-blue-600 hover:text-white transition-all duration-300">
                Configure Your Model
              </button>
              <button className="px-10 py-4 border border-white/20 text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300">
                Explore Details
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 right-12 flex gap-4 z-20">
        <button onClick={prevSlide} className="p-4 border border-white/10 hover:border-white/40 transition-colors bg-black/20 backdrop-blur-md rounded-full text-white">
          <ChevronLeft />
        </button>
        <button onClick={nextSlide} className="p-4 border border-white/10 hover:border-white/40 transition-colors bg-black/20 backdrop-blur-md rounded-full text-white">
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Hero;
