import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Work', href: isHome ? '#work' : '/#work' },
    { name: 'Expertise', href: isHome ? '#services' : '/#services' },
    { name: 'Studio', href: isHome ? '#team' : '/#team' },
    { name: 'Inquiry', href: isHome ? '#contact' : '/#contact' },
  ];

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav style={{ zIndex: 9999 }} className={`fixed left-0 right-0 w-full flex justify-center transition-all duration-500 ease-[0.16,1,0.3,1] ${isScrolled ? 'top-4 px-4' : 'top-0 px-6 md:px-10'}`}>
      <div className={`flex items-center justify-between w-full max-w-[1400px] transition-all duration-500 ${
        isScrolled 
          ? 'px-6 md:px-10 py-4 bg-white/80 backdrop-blur-2xl border border-gray-200/80 shadow-[0_16px_40px_rgb(0,0,0,0.08)] rounded-full' 
          : 'py-6 md:py-10 bg-transparent border border-transparent rounded-none'
      }`}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center shrink-0 group gap-1.5 md:gap-2"
        >
          <img src="/zynexta-logo.png" alt="ZYNEXTA Logo" className="w-12 h-12 md:w-[55px] md:h-[55px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm mix-blend-multiply" />
          <div className="flex flex-col justify-center items-start mt-1">
            <span 
              className="text-2xl md:text-[32px] font-extrabold tracking-wide text-brand-text leading-[0.9] mt-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ZYNEXTΛ
            </span>
            <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 w-full opacity-95">
              <div className="h-[1px] flex-grow min-w-[12px] bg-gray-400"></div>
              <span className="text-[6.5px] md:text-[7.5px] font-bold uppercase tracking-[0.2em] whitespace-nowrap text-brand-text">
                WHERE INNOVATION MEETS EXECUTION.
              </span>
              <div className="h-[1px] flex-grow min-w-[12px] bg-gray-400"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2 font-sans">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-3 text-[15px] font-bold text-gray-600 hover:text-brand-accent hover:bg-brand-accent/5 rounded-full transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="ml-4 px-8 py-3.5 bg-[#111111] text-white rounded-full text-[15px] font-bold hover:shadow-brand-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 -mr-2 rounded-full transition-colors duration-300 ${isScrolled ? 'text-brand-text hover:bg-gray-100' : 'text-brand-text'}`} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 h-[100dvh] bg-white/95 backdrop-blur-3xl z-[10000] flex flex-col items-center justify-center md:hidden p-10"
          >
            <button 
              className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full text-brand-text hover:bg-gray-200 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center space-y-6 w-full">
              {navLinks.map((link, index) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl font-display font-medium text-brand-text hover:text-brand-accent transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                href={isHome ? "#contact" : "/#contact"} 
                className="w-full max-w-xs py-5 bg-[#111111] text-white rounded-full text-center text-lg font-bold mt-8 hover:shadow-brand-glow hover:-translate-y-0.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Start Project
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
