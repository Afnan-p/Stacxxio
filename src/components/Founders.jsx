import React from 'react';
import { motion } from 'framer-motion';
import foundersImg from '../assets/grouppic3.png';

const Founders = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-bg relative luxury-noise">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-accent mb-4">Founding Team</span>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-brand-text mb-2">
              The Minds <span className="text-brand-accent/20 italic">Behind It.</span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
            className="relative"
          >
            {/* Blending Image Container */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%),linear-gradient(to top, black 90%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in'
              }}
            >
              <img
                src={foundersImg}
                alt="ZYNEXTA Founders"
                className="w-full h-auto max-h-[850px] object-cover opacity-80 brightness-[0.9] contrast-[0.95] transition-all duration-[3000ms] ease-out hover:scale-105"
                style={{ objectPosition: 'center 20%' }}
              />

              {/* Deep Cinematic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/40 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-brand-bg/20 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
