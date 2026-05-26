import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import API from '../api/axios';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await API.get('/api/team');
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % team.length);
  }, [team.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + team.length) % team.length);
  }, [team.length]);

  useEffect(() => {
    if (isPaused || team.length === 0) return;
    const interval = setInterval(nextSlide, 1500);
    return () => clearInterval(interval);
  }, [isPaused, team.length, nextSlide]);

  if (team.length === 0) return null;

  return (
    <section id="team" className="py-24 md:py-40 bg-brand-bg relative luxury-noise overflow-hidden mb-20">
      {/* Architectural Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-50" />

      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[200px]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-20 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-accent mb-6">Collective Intelligence</span>
            <h2 className="text-6xl md:text-9xl font-display font-medium text-brand-text mb-8 tracking-tighter">
              The <span className="text-brand-accent/20 italic">Architects.</span>
            </h2>
            <p className="max-w-2xl text-brand-text-dim text-base md:text-lg font-light italic leading-relaxed">
              A specialized unit of digital artisans, unified by a singular mission: to redefine the architecture of the web.
            </p>
          </motion.div>
        </div>

        {/* Cinematic Carousel Container */}
        <div 
          className="relative h-[500px] md:h-[700px] flex items-center justify-center mt-10 md:mt-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
            {team.map((member, index) => {
              // Calculate relative position with circular logic
              let position = index - activeIndex;
              if (position > team.length / 2) position -= team.length;
              if (position < -team.length / 2) position += team.length;

              const isActive = position === 0;
              const isVisible = Math.abs(position) <= 2; // Show 5 cards max

              if (!isVisible && team.length > 5) return null;

              return (
                <motion.div
                  key={member._id}
                  initial={false}
                  animate={{
                    x: `${position * 120}%`, // Adjust spacing
                    scale: isActive ? 1.1 : 0.85 - Math.abs(position) * 0.1,
                    opacity: 1 - Math.abs(position) * 0.3,
                    zIndex: 10 - Math.abs(position),
                    filter: isActive ? 'blur(0px) brightness(1)' : `blur(${Math.abs(position) * 4}px) brightness(0.5)`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 25,
                    mass: 0.8
                  }}
                  onClick={() => setActiveIndex(index)}
                  className={`absolute w-[240px] md:w-[320px] aspect-[3/4] cursor-pointer group`}
                >
                  {/* Dynamic Glow for Active Card */}
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-accent/20 blur-[60px] -z-10 rounded-[4rem] pointer-events-none"
                    />
                  )}

                  <div className={`relative w-full h-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 ${isActive ? 'border-brand-accent/40 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]' : 'border-white/10 group-hover:border-brand-accent/30'}`}>
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-all duration-1000 ${isActive ? 'grayscale-0 scale-100' : 'grayscale scale-105'}`}
                    />
                    
                    {/* Social Overlay for Active Card */}
                    {isActive && (
                      <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                        {member.socialLinks?.instagram && (
                          <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-5 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all transform hover:-translate-y-2 border border-white/10">
                            <FaInstagram size={22} />
                          </a>
                        )}
                        {member.socialLinks?.linkedin && (
                          <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-5 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all transform hover:-translate-y-2 border border-white/10">
                            <FaLinkedin size={22} />
                          </a>
                        )}
                        {member.socialLinks?.github && (
                          <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-5 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all transform hover:-translate-y-2 border border-white/10">
                            <FaGithub size={22} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Identity Label for Active Card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute -bottom-24 left-0 right-0 text-center"
                      >
                        <h3 className="text-3xl md:text-4xl font-display font-medium text-brand-text mb-2 capitalize drop-shadow-lg">{member.name}</h3>
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent/80 drop-shadow-md">{member.role}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-10 md:hidden">
            <button onClick={prevSlide} className="p-4 rounded-full bg-white/5 border border-white/10 active:scale-90 transition-all">
              <FaChevronLeft size={14} />
            </button>
            <button onClick={nextSlide} className="p-4 rounded-full bg-white/5 border border-white/10 active:scale-90 transition-all">
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
