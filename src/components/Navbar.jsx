import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Expertise', href: '#services' },
    { name: 'Studio', href: '#team' },
    { name: 'Inquiry', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8 md:py-10'}`}>
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center h-full">
        {/* Logo - Fixed Width Area */}
        <Link to="/" className="relative z-[110] text-xl md:text-2xl font-display font-medium tracking-tighter text-brand-text shrink-0">
          STACKXXIO<span className="text-brand-accent">.</span>
        </Link>

        {/* Desktop Nav - Pill Style */}
        <div className={`hidden md:flex items-center space-x-1 px-1.5 py-1.5 rounded-full border transition-all duration-700 ${
          isScrolled 
            ? 'bg-brand-surface/60 backdrop-blur-3xl border-white/10 shadow-2xl translate-y-0' 
            : 'bg-transparent border-transparent translate-y-0'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 xl:px-8 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text-dim hover:text-brand-accent transition-all duration-500 whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 px-8 xl:px-10 py-2.5 btn-luxury rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all duration-500 whitespace-nowrap"
          >
            Commence Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[110] p-2 -mr-2 text-brand-text hover:text-brand-accent transition-colors duration-300" 
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-brand-bg/95 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center md:hidden p-10"
          >
            <div className="flex flex-col items-center space-y-10 w-full">
              {navLinks.map((link, index) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  className="text-4xl sm:text-5xl font-display font-medium text-brand-text hover:text-brand-accent transition-colors duration-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href="#contact" 
                className="w-full max-w-xs py-5 btn-luxury rounded-full text-center text-[10px] font-bold uppercase tracking-widest"
                onClick={() => setMobileMenuOpen(false)}
              >
                Commence Project
              </motion.a>
            </div>

            {/* Bottom Branding Decoration */}
            <div className="absolute bottom-12 text-brand-text-dim/20 text-[9px] font-bold uppercase tracking-[1em]">
              Architectural Digital Sovereignty
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
