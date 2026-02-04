
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Review } from '../types';

interface TestimonialsProps {
  reviews: Review[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ reviews }) => {
  return (
    <section id="reviews" className="py-32 px-6 bg-black border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
          <div>
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-blue-500 mb-4 block">The Reviews</span>
            <h2 className="text-5xl md:text-6xl font-bold">Client Perspectives</h2>
          </div>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-blue-500 text-blue-500" />)}
            <span className="ml-2 text-white font-bold">4.9/5 Average Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="glass-morphism p-10 relative group hover:border-blue-500/30 transition-all duration-500">
              <Quote className="absolute top-6 right-8 text-white/5 w-12 h-12 group-hover:text-blue-500/10 transition-colors" />
              <div className="flex items-center gap-4 mb-8">
                <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full border border-white/10 object-cover" />
                <div>
                  <h4 className="font-bold text-white text-lg">{review.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#666] uppercase tracking-wider">{review.role}</span>
                    {review.verified && (
                      <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">VERIFIED OWNER</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-blue-500 text-blue-500" />
                ))}
              </div>
              <p className="text-[#A0A0A0] italic font-serif leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
