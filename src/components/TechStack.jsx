import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

const TechStack = () => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getIcon = (iconName) => {
    // Dynamically pick icon from SimpleIcons or FontAwesome
    const IconComponent = SiIcons[iconName] || FaIcons[iconName];
    return IconComponent ? <IconComponent size={32} /> : null;
  };

  if (techs.length === 0) return null;

  return (
    <section className="py-24 md:py-40 bg-brand-bg relative luxury-noise overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-accent mb-6 block">Technology</span>
            <h2 className="text-5xl md:text-8xl font-display font-medium text-brand-text mb-8 tracking-tighter">
              We Build With the <span className="text-brand-accent/20 italic">Best.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-brand-text-dim text-base md:text-lg font-light italic leading-relaxed">
              Leveraging a world-class architectural stack to deliver high-performance digital ecosystems.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-10">
          {techs.map((tech, index) => (
            <motion.div
              key={tech._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="flex flex-col items-center justify-center p-8 rounded-[2rem] bg-brand-surface border border-white/5 group transition-all duration-500 hover:border-brand-accent/30 relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-brand-accent/0 group-hover:bg-brand-accent/5 blur-2xl transition-all duration-500 rounded-full" />
              
              <div className="relative z-10 text-brand-text-dim group-hover:text-brand-accent transition-colors duration-500 mb-6 drop-shadow-[0_0_15px_rgba(45,212,191,0)] group-hover:drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                {getIcon(tech.icon) || <div className="w-8 h-8 bg-white/5 rounded-full" />}
              </div>
              
              <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.3em] text-brand-text-dim group-hover:text-brand-text transition-colors duration-500 text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
