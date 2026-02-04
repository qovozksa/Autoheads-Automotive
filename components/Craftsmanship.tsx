
import React from 'react';
import { motion } from 'framer-motion';

const Craftsmanship: React.FC = () => {
  const items = [
    {
      title: "Precision Engineering",
      desc: "Every heart of an Autohead is built with obsessive attention to detail. Whether it's our dual-motor electric drivetrain or our signature biturbo V8, performance is non-negotiable.",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=600",
      tag: "Power"
    },
    {
      title: "Artisanal Interior",
      desc: "Sustainable leathers, hand-finished carbon fiber, and immersive ambient lighting. We create a sanctuary that stimulates every sense, ensuring every mile is a masterpiece.",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600",
      tag: "Elegance"
    },
    {
      title: "Safety Mastery",
      desc: "Intelligent driver-assist systems powered by neural-network sensing. We believe that true luxury is the peace of mind knowing you are protected by the cutting edge of tech.",
      image: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?auto=format&fit=crop&q=80&w=600",
      tag: "Protection"
    }
  ];

  return (
    <section id="about-us" className="py-32 px-6 bg-[#080808] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-xs font-bold tracking-[0.4em] uppercase text-blue-500 mb-4 block">About Us</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">Uncompromising Detail</h2>
          <div className="w-24 h-[1px] bg-white/20 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {items.map((item, idx) => (
            <motion.div 
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-8 overflow-hidden aspect-square bg-neutral-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-blue-500 font-bold mb-4 block">{item.tag}</span>
              <h3 className="text-2xl font-bold text-white mb-6 font-serif italic">{item.title}</h3>
              <p className="text-[#A0A0A0] leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
