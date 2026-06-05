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
      setIsScrolled(window.scrollY > 20);
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
    <nav style={{ zIndex: 9999 }} className={`fixed top-0 left-0 right-0 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'py-4 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm' : 'py-6 md:py-8 bg-transparent border-b border-transparent'}`}>
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center h-full relative z-[10001]">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="text-xl md:text-2xl font-display font-extrabold tracking-tight text-brand-text shrink-0"
        >
          STACKXXIO  
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-2 font-sans">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-5 py-2 text-sm font-medium text-gray-500 hover:text-brand-text transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="ml-4 px-6 py-2.5 bg-brand-accent text-white rounded-full text-sm font-semibold hover:bg-[#222222] transition-colors duration-300"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-brand-text hover:text-brand-accent transition-colors duration-300" 
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 h-[100dvh] bg-white z-[10000] flex flex-col items-center justify-center md:hidden p-10"
          >
            <div className="flex flex-col items-center space-y-8 w-full">
              {navLinks.map((link, index) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  className="text-3xl font-display font-medium text-brand-text hover:text-brand-text-dim transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                href={isHome ? "#contact" : "/#contact"} 
                className="w-full max-w-xs py-4 bg-brand-accent text-white rounded-full text-center text-sm font-medium mt-4 hover:bg-[#222222] transition-colors"
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
