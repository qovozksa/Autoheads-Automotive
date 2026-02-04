
import React from 'react';
import { Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin, LayoutDashboard } from 'lucide-react';

interface FooterProps {
  onDashboardClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onDashboardClick }) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact-us" className="bg-[#0D0D0D] pt-32 pb-12 px-6 border-t border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold tracking-tighter uppercase mb-8 cursor-pointer" onClick={scrollToTop}>Autoheads</h3>
            <p className="text-[#666] mb-8 leading-relaxed max-w-xs">
              Defining the future of luxury automotive experiences. Driven by performance, defined by craftsmanship.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:border-white/40 text-white/40 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm text-[#666]">
              <li><a href="#cars" onClick={(e) => handleNavClick(e, 'cars')} className="hover:text-white transition-colors">Showroom</a></li>
              <li><a href="#about-us" onClick={(e) => handleNavClick(e, 'about-us')} className="hover:text-white transition-colors">Our Craft</a></li>
              <li><a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="hover:text-white transition-colors">Client Reviews</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Finance Program</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-8">Contact</h4>
            <ul className="space-y-6 text-sm text-[#666]">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>100 Automotive Way,<br />Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+1 (800) AUTO-HEADS</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>concierge@autoheads.luxury</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white mb-8">Newsletter</h4>
            <p className="text-sm text-[#666] mb-6">Receive exclusive updates on new releases.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 border-r-0 px-4 py-3 text-sm text-white outline-none w-full"
              />
              <button className="bg-white text-black px-6 text-[10px] font-bold tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs text-[#444] tracking-widest uppercase">
            &copy; 2024 Autoheads Automotive Group. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8 text-[10px] tracking-widest uppercase font-bold text-[#444]">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Terms of Use</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">Cookies</a>
            <button 
              onClick={onDashboardClick}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/5 rounded hover:border-blue-500/50 hover:text-white transition-all group"
            >
              <LayoutDashboard size={14} className="group-hover:text-blue-500 transition-colors" />
              Dashboard
            </button>
          </div>
        </div>

        <div className="mt-24 text-center overflow-hidden">
          <h1 className="text-[12vw] font-bold uppercase tracking-tighter text-white/5 select-none leading-none -mb-8">
            Autoheads
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
