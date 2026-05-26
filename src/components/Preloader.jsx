import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "Branding",
  "Web Development",
  "App Development",
  "Video Editing",
  "SEO & Marketing",
  "STACKXXIO"
];

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Change the word every 2.0 seconds to give enough time to read on all devices
    if (index === words.length - 1) {
      // For the last word (STACKXXIO logo), hold it a bit longer
      const timeout = setTimeout(() => {
        onComplete();
      }, 3500); 
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg text-brand-text overflow-hidden"
    >
      {/* Background Cinematic Effects */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Glowing accents that pulse slightly */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" 
      />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-full">
        <AnimatePresence mode="wait">
          {index < words.length - 1 ? (
             <motion.h2
               key={index}
               initial={{ opacity: 0, y: 40, filter: "blur(10px)", scale: 0.9 }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
               exit={{ opacity: 0, y: -40, filter: "blur(10px)", scale: 1.1 }}
               transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
               className="text-[8vw] md:text-[5rem] font-display font-light text-white/80 tracking-widest text-center uppercase"
             >
               {words[index]}
             </motion.h2>
          ) : (
            <motion.div
               key="logo"
               className="flex flex-col items-center justify-center"
            >
              <motion.h1 
                initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[10rem] font-display font-medium tracking-tighter leading-none text-brand-text relative group"
              >
                STACKXXIO
                {/* Text Inner Glow Sweep */}
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent z-20 pointer-events-none skew-x-12"
                />
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6 text-brand-text-dim tracking-[0.4em] uppercase text-[10px] md:text-sm font-bold"
              >
                Building Digital Excellence
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Loading Progress Bar at the bottom */}
        <div className="absolute bottom-24 w-64 md:w-96 flex flex-col items-center gap-3">
           <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
             <motion.div
               className="absolute top-0 left-0 h-full bg-brand-accent shadow-[0_0_10px_var(--color-brand-accent)]"
               initial={{ width: "0%" }}
               animate={{ width: `${((index + 1) / words.length) * 100}%` }}
               transition={{ duration: index === words.length - 1 ? 3.5 : 2.0, ease: "linear" }}
             />
           </div>
           <div className="text-[9px] text-brand-text-dim font-mono tracking-widest uppercase opacity-50">
             Loading Experience
           </div>
        </div>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 px-6 py-2 border border-white/10 text-white/50 text-[10px] md:text-xs tracking-widest uppercase hover:bg-brand-accent/10 hover:text-brand-accent hover:border-brand-accent/30 transition-all duration-300 rounded-full backdrop-blur-md cursor-pointer flex items-center gap-2 group"
      >
        <span>Skip</span> 
        <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
      </motion.button>
    </motion.div>
  );
};

export default Preloader;
