import React from 'react';
import { FaReact, FaNodeJs, FaAws } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiStripe, SiCloudinary, SiVercel } from 'react-icons/si';

const techStack = [
  { name: 'React', icon: <FaReact className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'MongoDB', icon: <SiMongodb className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'AWS', icon: <FaAws className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Stripe', icon: <SiStripe className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Cloudinary', icon: <SiCloudinary className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Vercel', icon: <SiVercel className="w-6 h-6 md:w-8 md:h-8" /> },
];

const TechMarquee = () => {
  return (
    <div className="w-full bg-brand-bg py-6 md:py-10 border-b border-border overflow-hidden flex relative">
      {/* Left/Right Fades for smooth entry/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-brand-bg to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-brand-bg to-transparent z-10 pointer-events-none"></div>
      
      {/* Container for scrolling content */}
      <div className="flex w-fit animate-marquee">
        {/* We map twice to create a seamless infinite scroll loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {techStack.map((tech, index) => (
              <div key={`${tech.name}-${index}`} className="flex items-center gap-2 md:gap-3 mx-8 md:mx-12 text-brand-text opacity-50 hover:opacity-100 transition-opacity duration-300">
                {tech.icon}
                <span className="font-display font-bold text-base md:text-xl tracking-tight">{tech.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
