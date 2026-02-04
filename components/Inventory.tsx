
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, SlidersHorizontal, X, Filter } from 'lucide-react';
import SpecModal from './SpecModal';
import { CarModel } from '../types';

interface InventoryProps {
  inventoryCars: CarModel[];
}

const Inventory: React.FC<InventoryProps> = ({ inventoryCars }) => {
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeType, setActiveType] = useState<string>('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Derive unique categories and types for filters
  const categories = useMemo(() => 
    ['All', ...new Set(inventoryCars.map(car => car.category))], 
    [inventoryCars]
  );
  
  const types = useMemo(() => 
    ['All', 'NEW ARRIVAL', 'LIMITED EDITION', 'CERTIFIED PRE-OWNED'], 
    []
  );

  const filteredCars = useMemo(() => {
    return inventoryCars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           car.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || car.category === activeCategory;
      const matchesType = activeType === 'All' || car.type === activeType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [inventoryCars, searchQuery, activeCategory, activeType]);

  return (
    <section id="cars" className="py-32 px-6 bg-[#0D0D0D] scroll-mt-24 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-[0.4em] uppercase text-blue-500 mb-4 block"
            >
              The Showroom
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              Our Fleet
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[#A0A0A0] max-w-xl text-lg"
            >
              Precision search and refined selection. Find your next masterpiece from our curated inventory.
            </motion.p>
          </div>
          
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm focus-within:border-blue-500/50 transition-all">
              <Search size={18} className="text-blue-500" />
              <input 
                type="text" 
                placeholder="Search by model or category..." 
                className="bg-transparent outline-none text-white w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 py-4 rounded-full border transition-all ${isFilterOpen ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
            >
              <SlidersHorizontal size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Filters</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="p-8 glass-morphism rounded-2xl border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase mb-6 flex items-center gap-2">
                      <Filter size={12} /> Category
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest text-blue-500 uppercase mb-6 flex items-center gap-2">
                      <Filter size={12} /> Status
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {types.map(t => (
                        <button
                          key={t}
                          onClick={() => setActiveType(t)}
                          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeType === t ? 'bg-white text-black' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {(activeCategory !== 'All' || activeType !== 'All') && (
                  <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
                    <button 
                      onClick={() => { setActiveCategory('All'); setActiveType('All'); }}
                      className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-white transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car, idx) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group cursor-pointer relative"
                onClick={() => setSelectedCar(car)}
              >
                <div className="relative overflow-hidden aspect-[4/5] bg-neutral-900 rounded-sm">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Status Tag */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-widest text-white border border-white/10 uppercase">
                      {car.type}
                    </span>
                  </div>

                  {/* Car Info Overlay */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-blue-400 mb-1">{car.category}</p>
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{car.name}</h3>
                    
                    <div className="mt-4 pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Estimated MSRP</span>
                        <span className="text-xl font-bold text-white tracking-tight">{car.price}</span>
                      </div>
                      <button className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
              <Search size={32} className="text-[#333]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No Vehicles Found</h3>
            <p className="text-[#666] max-w-md mx-auto mb-8">
              We couldn't find any vehicles matching your current search or filter criteria. Try adjusting your selections.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); setActiveType('All'); }}
              className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>

      <SpecModal car={selectedCar} onClose={() => setSelectedCar(null)} />
    </section>
  );
};

export default Inventory;
