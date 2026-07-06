import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } 
  }
};

const keywords = ["Growth.", "Scale.", "Results.", "Performance."];

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoaded]);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden pt-20 md:pt-16 pb-8 md:pb-12">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Soft Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[600px] md:h-[800px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200/60 via-gray-100/20 to-transparent blur-3xl opacity-70" />
      </div>
      
      {/* Main Content Reveal */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col items-start md:items-center text-left md:text-center mt-4 md:mt-8">
        <div className="flex flex-col items-start md:items-center w-full max-w-5xl">
          
          {/* Agency Badge */}
          <motion.div
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={fadeUpVariants}
            className="mb-6 md:mb-8"
          >
            <div className="px-5 py-2 rounded-full border border-gray-200 bg-white/60 backdrop-blur-md shadow-sm">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
                Crafting Digital Experiences
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="text-[11vw] md:text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold text-gray-900 tracking-tight leading-tight mb-3 md:mb-4"
          >
            <span className="block overflow-hidden"><motion.span variants={textVariants} className="block pb-1">Premium Digital Products</motion.span></span>
            <span className="block overflow-hidden"><motion.span variants={textVariants} className="block pb-1">Engineered For</motion.span></span>
            
            {/* Rotating Keyword */}
            <span className="block h-[1.2em] relative w-full mt-1 md:mt-1 overflow-hidden">
              <span className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-auto text-left md:text-center text-gray-400">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keywordIndex}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="block text-gray-900 drop-shadow-sm"
                  >
                    {keywords[keywordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            transition={{ delay: 0.6 }}
          >
            <p className="text-base md:text-lg lg:text-xl text-gray-500 font-sans font-normal max-w-[700px] mb-6 md:mb-8 leading-relaxed tracking-tight">
              We build fast, scalable, and conversion-focused websites that help modern businesses grow online.
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={fadeUpVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 w-full md:w-auto"
          >
            <a 
              href="#contact" 
              className="group relative w-full sm:w-auto px-8 py-4 md:px-10 md:py-4 bg-[#111111] text-white font-sans font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-brand-glow hover:-translate-y-1 text-center text-[15px] tracking-wide"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start A Project
                <span className="block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
            </a>
            <a 
              href="#work" 
              className="group w-full sm:w-auto px-8 py-4 md:px-10 md:py-4 bg-gray-50 text-gray-900 border border-gray-200 font-sans font-semibold rounded-full hover:border-brand-accent hover:text-brand-accent hover:bg-white transition-all duration-300 hover:shadow-sm hover:-translate-y-1 text-center text-[15px] tracking-wide"
            >
              Explore Projects
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ delay: 1.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden md:flex"
      >
        <div className="w-px h-16 bg-gradient-to-b from-gray-300 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
