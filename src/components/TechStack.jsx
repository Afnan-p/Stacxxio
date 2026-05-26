import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Cpu } from 'lucide-react';
import API from '../api/axios';
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

const TechStack = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchTech = async () => {
      try {
        const res = await API.get('/api/tech');
        setTechs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTech();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIcon = (iconName) => {
    const IconComponent = SiIcons[iconName] || FaIcons[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  if (techs.length === 0) return null;

  return (
    <section className="py-24 md:py-40 bg-brand-bg relative luxury-noise overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-accent/5 rounded-full blur-[250px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-brand-accent mb-6 block">Architecture</span>
            <h2 className="text-5xl md:text-8xl font-display font-medium text-brand-text mb-8 tracking-tighter leading-none">
              The <span className="text-brand-accent/20 italic">Architectural</span> Stack.
            </h2>
            <p className="max-w-2xl mx-auto text-brand-text-dim text-base md:text-lg font-light italic leading-relaxed">
              A high-density ecosystem of precision-engineered tools and frameworks.
            </p>
          </motion.div>
        </div>

        {/* Double-Row Horizontal Scroll Container */}
        <div className="relative group/slider">
          {/* Much Softer Edge Fading Masks */}
          <div className="absolute inset-y-0 -left-2 w-20 md:w-40 bg-gradient-to-r from-brand-bg/10 via-transparent to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 -right-2 w-20 md:w-40 bg-gradient-to-l from-brand-bg/10 via-transparent to-transparent z-20 pointer-events-none" />

          {/* Navigation Controls */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-4 bg-brand-surface/80 backdrop-blur-xl border border-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex shadow-2xl"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-4 bg-brand-surface/80 backdrop-blur-xl border border-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex shadow-2xl"
          >
            <ChevronRight size={18} />
          </button>

          <div 
            ref={scrollRef}
            className="grid grid-rows-2 grid-flow-col gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-10 px-4 md:px-10 justify-start"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {techs.map((tech) => (
              <motion.div
                key={tech._id}
                className="flex-shrink-0 w-[115px] md:w-[130px] snap-center"
              >
                <div className="flex flex-col items-center justify-center aspect-square p-4 rounded-[18px] bg-white/5 backdrop-blur-md border border-white/10 group/card cursor-default transition-all duration-500 hover:border-brand-accent/30 hover:bg-white/[0.08] relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-accent/0 group-hover/card:bg-brand-accent/[0.02] transition-all duration-500" />
                  
                  <div className="relative z-10 text-brand-text-dim/30 group-hover/card:text-brand-accent group-hover/card:scale-110 transition-all duration-500 mb-3 drop-shadow-[0_0_8px_rgba(45,212,191,0)] group-hover/card:drop-shadow-[0_0_8px_rgba(45,212,191,0.15)]">
                    {getIcon(tech.icon) || <Cpu size={20} />}
                  </div>
                  
                  <span className="relative z-10 text-[7px] font-bold uppercase tracking-[0.2em] text-brand-text-dim/50 group-hover/card:text-brand-text transition-colors duration-500 text-center leading-none">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TechStack;
