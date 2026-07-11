import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageLoad from './ImageLoad';

const Team = () => {
  const team = [
    {
      _id: '1',
      name: 'Afnan',
      secondaryRole: 'Full Stack Developer',
      image: '/afnan.webp',
    },
    {
      _id: '2',
      name: 'Shaheed',
      secondaryRole: 'Backend Developer',
      image: '/shaheed.webp',
    },
    {
      _id: '3',
      name: 'Hashir',
      secondaryRole: 'Business Development',
      image: '/hashir.webp',
    },
    {
      _id: '4',
      name: 'Shijil',
      secondaryRole: 'UI/UX Designer',
      image: '/shijil.webp',
    },
    {
      _id: '5',
      name: 'Anas',
      secondaryRole: 'Digital Marketing',
      image: '/anas.webp',
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % team.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [team.length]);

  return (
    <section id="team" className="py-20 md:py-32 bg-brand-bg relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Side: Typography */}
          <div className="text-left z-10 relative">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6rem] leading-[1.1] font-light text-brand-text mb-6 tracking-tight"
            >
              You're Going <br />
              To Love It <br />
              <span className="font-medium">Here!</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-brand-text-dim text-lg md:text-xl max-w-md leading-relaxed"
            >
              Working with this team feels like building something meaningful. we learn, grow, and win together.
            </motion.p>
          </div>

          {/* Right Side: 3D Carousel */}
          <div className="relative h-[500px] md:h-[650px] w-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
              <AnimatePresence initial={false}>
                {team.map((member, idx) => {
                  // Calculate distance from active index (circular array logic)
                  let diff = idx - activeIndex;
                  const total = team.length;
                  if (diff < -Math.floor(total/2)) diff += total;
                  if (diff > Math.floor(total/2)) diff -= total;
                  
                  // Only render the center item and its immediate left/right neighbors
                  if (Math.abs(diff) > 1) return null;

                  const isActive = diff === 0;
                  
                  // Mobile responsive X positioning
                  const xPosBase = typeof window !== 'undefined' && window.innerWidth < 768 ? 110 : 180;
                  const xPos = diff * xPosBase;
                  
                  const scale = isActive ? 1 : 0.65;
                  const opacity = isActive ? 1 : 0.4;
                  const zIndex = isActive ? 30 : 20;
                  // In light mode, dimming non-active items using brightness
                  const filter = isActive ? 'brightness(1) grayscale(0%)' : 'brightness(0.5) grayscale(40%)';

                  return (
                    <motion.div
                      key={member._id}
                      initial={{ 
                        opacity: 0, 
                        x: diff > 0 ? xPosBase + 50 : -(xPosBase + 50), 
                        scale: 0.5 
                      }}
                      animate={{ 
                        opacity, 
                        x: xPos, 
                        scale, 
                        zIndex,
                        filter
                      }}
                      exit={{ 
                        opacity: 0, 
                        x: diff < 0 ? -(xPosBase + 50) : xPosBase + 50, 
                        scale: 0.5 
                      }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute flex flex-col items-center top-1/2 -translate-y-1/2"
                    >
                      {/* Image Container (No Background/Card) */}
                      <div className="w-[220px] h-[330px] md:w-[320px] md:h-[480px] flex items-end justify-center drop-shadow-2xl">
                        <ImageLoad
                          src={member.image ? (member.image.startsWith('http') || member.image.startsWith('/') ? member.image : `${import.meta.env.VITE_API_URL}/${member.image}`) : '/fallback.jpg'}
                          alt={member.secondaryRole}
                          wrapperClassName="w-full h-full flex items-end justify-center"
                          className="w-full h-full object-contain object-bottom select-none"
                        />
                      </div>
                      
                      {/* Role Text */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: isActive ? 0.2 : 0 }}
                        className="absolute -bottom-12 w-[300px] text-center"
                      >
                        <p className="text-[14px] md:text-[16px] font-bold font-sans text-brand-text tracking-[0.2em] uppercase whitespace-nowrap">
                          {member.secondaryRole}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;
