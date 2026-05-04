import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Understand',
    description: 'We dive deep into your business goals, target audience, and market challenges.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Our design team creates intuitive and aesthetic interfaces that align with your brand.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Clean, scalable code meets pixel-perfect design to bring the product to life.',
  },
  {
    step: '04',
    title: 'Deliver',
    description: 'We launch, test, and iterate to ensure the product performs and grows.',
  },
];

const Approach = () => {
  return (
    <section id="approach" className="py-32 bg-brand-bg relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 mb-4">Our Method</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold">The Studio Process</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-8xl font-display font-black text-white/5 absolute -top-12 -left-4 z-0">
                {step.step}
              </div>
              <div className="relative z-10 pt-8">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-4">
                  <span className="w-8 h-px bg-white/20" />
                  {step.title}
                </h4>
                <p className="text-white/40 leading-relaxed text-lg font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
