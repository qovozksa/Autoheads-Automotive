
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Zap, Gauge, Timer, Cpu } from 'lucide-react';
import { CarModel } from '../types';

interface SpecModalProps {
  car: CarModel | null;
  onClose: () => void;
}

const SpecModal: React.FC<SpecModalProps> = ({ car, onClose }) => {
  if (!car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0D0D0D] border border-white/10 shadow-2xl overflow-hidden rounded-sm"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/40 hover:text-white z-10 p-2 bg-black/50 rounded-full backdrop-blur-md"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col lg:flex-row h-full">
            <div className="lg:w-1/2 relative h-[300px] lg:h-auto">
              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] to-transparent lg:hidden" />
            </div>

            <div className="lg:w-1/2 p-8 lg:p-16 overflow-y-auto max-h-[70vh] lg:max-h-none">
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-blue-500 mb-2 block">{car.category}</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{car.name}</h2>
              <p className="text-lg text-[#A0A0A0] font-serif italic mb-8">{car.tagline}</p>

              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                    <Zap className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#666]">Horsepower</p>
                    <p className="text-lg font-bold text-white">{car.details.hp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                    <Gauge className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#666]">Top Speed</p>
                    <p className="text-lg font-bold text-white">{car.details.topSpeed}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                    <Timer className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#666]">Acceleration</p>
                    <p className="text-lg font-bold text-white">{car.details.acceleration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                    <Cpu className="text-blue-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#666]">Engine / Battery</p>
                    <p className="text-lg font-bold text-white">{car.details.engine}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-4">Included Premium Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Adaptive Suspension', '12-Speaker Meridian Sound', 'Autonomous Pilot 3.0', 'Nappa Leather Interior'].map(feature => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-[#A0A0A0]">
                      <CheckCircle2 size={16} className="text-blue-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#666] mb-1">MSRP Starting At</p>
                  <p className="text-3xl font-bold text-white tracking-tighter">{car.price}</p>
                </div>
                <button className="w-full md:w-auto px-10 py-5 bg-white text-black text-[10px] font-bold tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all duration-300">
                  Configure This Model
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpecModal;
