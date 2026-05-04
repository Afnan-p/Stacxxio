import React from 'react';
import { motion } from 'framer-motion';
import heroTeam from '../assets/hero_team.png';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-[#030303] overflow-hidden luxury-noise">
      {/* Full Screen Team Background */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={heroTeam} 
          alt="Stackxxio Team" 
          className="w-full h-full object-cover grayscale brightness-[0.4] contrast-125"
        />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/70" /> {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" /> {/* Bottom Fade */}
        
        {/* Soft Radial Glow in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>

      {/* Main Content Reveal */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-[15vw] md:text-[12rem] font-display font-medium text-brand-text tracking-tighter leading-none relative group">
            <span className="relative z-10">STACKXXIO</span>
            
            {/* Subtle Light Sweep Effect */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-accent/20 to-transparent z-20 pointer-events-none skew-x-12"
            />
            
            {/* Soft Green Glow Behind Text */}
            <div className="absolute inset-0 bg-brand-accent/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-8 text-xl md:text-2xl text-brand-text font-light italic tracking-wide max-w-2xl"
          >
            "We build digital products with precision and passion."
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.6em]">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
