import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
  }
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden pt-28 md:pt-32 pb-12">
      {/* Soft Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-surface -skew-x-12 transform origin-top-right z-0" />
      
      {/* Main Content Reveal */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-start md:items-center text-left md:text-center mt-8 md:mt-0">
        <div className="flex flex-col items-start md:items-center w-full max-w-5xl">
          
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="text-[14vw] md:text-7xl lg:text-[7.5rem] font-display font-extrabold text-brand-text tracking-tighter leading-[0.95] mb-8"
          >
            <span className="block overflow-hidden"><motion.span variants={textVariants} className="block pb-2">We build modern</motion.span></span>
            <span className="block overflow-hidden"><motion.span variants={textVariants} className="block pb-2">websites</motion.span></span>
            <span className="block overflow-hidden"><motion.span variants={textVariants} className="block pb-2">and software</motion.span></span>
            <span className="block overflow-hidden"><motion.span variants={textVariants} className="block text-gray-400 pb-2">solutions.</motion.span></span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(5px)" }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-500 font-sans font-normal max-w-2xl mb-12 leading-relaxed tracking-tight"
          >
            Custom websites, e-commerce platforms, and software solutions engineered for performance, scalability, and growth.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 30, filter: "blur(5px)" }}
            transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto"
          >
            <a href="#work" className="w-full sm:w-auto px-8 py-4 bg-brand-accent text-white font-sans font-semibold rounded-full hover:bg-[#222222] transition-colors text-center">
              View Our Work
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-white text-brand-accent border border-brand-accent font-sans font-semibold rounded-full hover:bg-brand-surface transition-colors text-center shadow-sm">
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 1.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
      >
        <div className="w-px h-16 bg-gradient-to-b from-[#D1D5DB] to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
