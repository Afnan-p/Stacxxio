import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { theme, toggleTheme } = useTheme();

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
          ? 'px-6 md:px-10 py-4 bg-brand-bg/80 backdrop-blur-2xl border border-gray-200/50 shadow-premium rounded-full' 
          : 'py-6 md:py-10 bg-transparent border border-transparent rounded-none'
      }`}>
        {/* Logo */}
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-2 md:gap-2.5 shrink-0 group"
          aria-label="ZYNEXTA Home"
        >
          <img src="/zynexta-logo.png" alt="ZYNEXTA Logo" className="w-14 h-14 md:w-[65px] md:h-[65px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm theme-invert" />
          
          <div className="flex flex-col justify-center">
            <span 
              className="text-[1.1rem] md:text-[26px] font-bold tracking-[0.3em] text-brand-text leading-none mt-1 pl-2"
              style={{ fontFamily: "'Syncopate', sans-serif" }}
            >
              ZYNEXTΛ
            </span>
            <div className="flex items-center gap-1.5 w-full opacity-80 mt-1.5">
              <div className="h-[1px] flex-grow bg-brand-text/20"></div>
              <span className="text-[5.5px] md:text-[6.5px] font-bold uppercase tracking-[0.25em] whitespace-nowrap text-brand-text">
                WHERE INNOVATION MEETS EXECUTION.
              </span>
              <div className="h-[1px] flex-grow bg-brand-text/20"></div>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-2 font-sans">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-3 text-[15px] font-bold text-gray-500 hover:text-brand-text hover:bg-brand-accent/5 rounded-full transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-[1px] h-6 bg-gray-200 mx-2"></div>
          
          <button 
            onClick={toggleTheme}
            className="p-3 text-brand-text hover:bg-brand-accent/5 rounded-full transition-all duration-300 ml-2"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a
            href={isHome ? "#contact" : "/#contact"}
            className="ml-4 px-8 py-3.5 bg-brand-accent text-brand-bg rounded-full text-[15px] font-bold hover:shadow-brand-glow hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 text-brand-text hover:bg-brand-accent/5 rounded-full transition-all duration-300"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          <button 
            className={`p-2 -mr-2 rounded-full transition-colors duration-300 ${isScrolled ? 'text-brand-text hover:bg-gray-100' : 'text-brand-text'}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 h-[100dvh] bg-brand-bg/95 backdrop-blur-3xl z-[10000] flex flex-col items-center justify-center md:hidden p-10"
          >
            <button 
              className="absolute top-8 right-8 p-3 bg-gray-100 rounded-full text-brand-text hover:bg-gray-200 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close Menu"
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
                className="w-full max-w-xs py-5 bg-brand-accent text-brand-bg rounded-full text-center text-lg font-bold mt-8 hover:shadow-brand-glow hover:-translate-y-0.5 transition-all"
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
