import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
  "DISCOVER",
  "STRATEGIZE",
  "DESIGN",
  "DEVELOP",
  "OPTIMIZE",
  "LAUNCH"
];

const statuses = [
  "Initializing Experience...",
  "Loading Projects...",
  "Preparing Interface...",
  "Ready."
];

const Preloader = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (showFinal) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 3500); 
      return () => clearTimeout(timeout);
    }

    if (index === words.length) {
      setShowFinal(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 450); // Clean, steady pacing

    return () => clearTimeout(timeout);
  }, [index, showFinal, onComplete]);

  // Update status text based on sequence progress
  useEffect(() => {
    if (index === 0) setStatusIndex(0);
    else if (index === 2) setStatusIndex(1);
    else if (index === 4) setStatusIndex(2);
    else if (index >= words.length) setStatusIndex(3);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
      style={{ zIndex: 99999 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-white text-[#111111] overflow-hidden font-sans"
    >
      {/* Minimal Corporate Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 h-full">
        <AnimatePresence mode="wait">
          {!showFinal ? (
             <motion.h2
               key={index}
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -15 }}
               transition={{ duration: 0.25, ease: "easeOut" }}
               className="text-[12vw] md:text-[7rem] font-display font-medium tracking-tighter uppercase text-[#111111]"
             >
               {words[index]}
             </motion.h2>
          ) : (
            <motion.div
               key="final"
               className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8"
              >
                <h1 className="text-[14vw] md:text-[9rem] font-display font-bold tracking-tighter leading-none mb-6 text-[#111111]">
                  STACKXXIO<span className="text-gray-300">.</span>
                </h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-block px-5 py-2 border border-gray-200 rounded-full text-xs md:text-sm font-semibold tracking-widest uppercase bg-gray-50 text-gray-700 shadow-sm"
                >
                  WEB SOLUTIONS
                </motion.div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl"
              >
                Crafting scalable digital products,<br className="hidden md:block" />
                web experiences and software solutions.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Footer */}
      <div className="absolute bottom-10 left-0 right-0 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6 z-20">
        
        {/* Status Message */}
        <motion.div 
          key={statuses[statusIndex]}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 w-full md:w-auto text-center md:text-left"
        >
          {statuses[statusIndex]}
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-full md:w-80 h-[2px] bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
          <motion.div 
            className="h-full bg-[#111111]"
            initial={{ width: "0%" }}
            animate={{ width: showFinal ? "100%" : `${((index) / words.length) * 100}%` }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
        </div>
        
        {/* Percentage Counter */}
        <div className="text-[10px] md:text-xs font-mono font-semibold tracking-widest text-gray-400 w-full md:w-auto text-center md:text-right hidden md:block">
          {showFinal ? '100%' : `${Math.round(((index) / words.length) * 100)}%`}
        </div>

      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute top-8 right-8 md:top-10 md:right-12 z-50 px-5 py-2 border border-gray-200 text-gray-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase hover:bg-gray-50 hover:text-[#111111] transition-all duration-300 rounded-full flex items-center gap-2 group cursor-pointer"
      >
        <span>Skip</span> 
        <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">→</span>
      </motion.button>
    </motion.div>
  );
};

export default Preloader;
