
import React, { useState, useEffect } from 'react';
import { Menu, X, Car } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Cars', href: '#cars' },
    { name: 'Contact Us', href: '#contact-us' },
    { name: 'About us', href: '#about-us' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
        isScrolled ? 'bg-[#0D0D0D]/95 border-b border-white/5 py-3 shadow-2xl backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-blue-500 transition-colors">
            <Car className="w-5 h-5 text-white group-hover:text-blue-400" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white font-serif uppercase">
            Autoheads
          </span>
        </a>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link text-[10px] font-bold tracking-[0.25em] uppercase text-[#A0A0A0] hover:text-white hover:tracking-[0.3em] transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase border border-white/20 hover:border-blue-500 hover:text-white transition-all duration-300 border-glow bg-transparent text-white/90"
          >
            Book a Test Drive
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-10 md:hidden z-[60]">
          <button 
            className="absolute top-6 right-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-3xl font-serif text-white hover:text-blue-400 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <button 
            onClick={() => { setMobileMenuOpen(false); document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="mt-4 px-10 py-4 text-sm font-semibold tracking-widest uppercase border border-white/20 text-white"
          >
            Book a Test Drive
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
