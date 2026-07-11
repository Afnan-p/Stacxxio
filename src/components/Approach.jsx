import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Target, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Discover',
    icon: Search,
    description: 'We dive deep into your business goals, target audience, and market landscape.',
  },
  {
    step: '02',
    title: 'Strategy',
    icon: Target,
    description: 'Architecting a robust roadmap and defining the technical approach.',
  },
  {
    step: '03',
    title: 'Design',
    icon: PenTool,
    description: 'Crafting intuitive, aesthetic interfaces that elevate your brand identity.',
  },
  {
    step: '04',
    title: 'Develop',
    icon: Code,
    description: 'Writing clean, scalable code to bring the pixel-perfect design to life.',
  },
  {
    step: '05',
    title: 'Launch',
    icon: Rocket,
    description: 'Testing, deploying, and iterating to ensure long-term performance and growth.',
  },
];

const Approach = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section id="approach" className="py-16 md:py-20 bg-brand-surface relative overflow-hidden font-sans border-y border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl relative z-10" ref={containerRef}>
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs mb-4 block">
              WORKFLOW
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
              Our Process
            </h2>
            <div className="w-12 h-1 bg-brand-accent mx-auto rounded-full opacity-50"></div>
          </motion.div>
        </div>

        {/* Grid Container */}
        <div className="relative mb-24">
          
          {/* Grid for Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.15), ease: [0.16, 1, 0.3, 1] }}
                  className="relative group flex flex-col items-center text-center lg:items-start lg:text-left"
                >


                  {/* Card Content */}
                  <div className="w-full bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.06)] hover:border-gray-900 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden h-full flex flex-col items-center lg:items-start">
                    
                    {/* Watermark Number */}
                    <div className="absolute -top-4 -right-4 text-8xl font-display font-black text-gray-50 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {step.step}
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:scale-105 group-hover:text-gray-900 transition-all duration-300 mb-6 relative z-10 border border-gray-100">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                      {step.title}
                    </h4>
                    
                    <p className="text-gray-500 text-[13px] leading-relaxed relative z-10 font-medium">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-lg text-gray-500 font-medium leading-relaxed bg-white py-4 px-8 rounded-2xl border border-gray-100 shadow-sm inline-block">
            From strategy to launch, every project follows a proven process designed for quality, performance and long-term growth.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Approach;
