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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-1000 ${isScrolled ? 'py-4' : 'py-10'}`}>
      <div className="container mx-auto px-10 flex justify-between items-center">
        <Link to="/" className="text-xl font-display font-medium tracking-tighter text-brand-text">
          STACKXXIO<span className="text-brand-accent">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center space-x-2 px-2 py-2 rounded-full transition-all duration-1000 ${
          isScrolled ? 'bg-brand-surface/40 backdrop-blur-2xl border border-white/5 shadow-2xl' : 'bg-transparent'
        }`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-8 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text-dim hover:text-brand-accent transition-all duration-500"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-4 px-10 py-2.5 btn-luxury rounded-full text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all duration-500"
          >
            Commence Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-text" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="fixed inset-0 bg-brand-bg z-[90] flex flex-col items-center justify-center space-y-12 md:hidden p-10"
          >
            <button className="absolute top-10 right-10 text-brand-text" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-6xl font-display font-medium text-brand-text hover:text-brand-accent transition-colors duration-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              className="w-full py-6 btn-luxury rounded-full text-center text-[10px] font-bold uppercase tracking-widest"
              onClick={() => setMobileMenuOpen(false)}
            >
              Commence Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
