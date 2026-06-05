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
    <section id="approach" className="py-24 md:py-32 bg-brand-surface relative overflow-hidden border-y border-[#E5E7EB]">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-brand-accent font-medium uppercase tracking-wider text-sm mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-6">How We Work</h2>
          <p className="text-brand-text-dim text-lg">A structured, proven approach to delivering high-quality software solutions on time.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 bg-white border border-[#E5E7EB] rounded-2xl hover:shadow-premium transition-shadow duration-300"
            >
              <div className="text-6xl font-display font-bold text-brand-surface absolute top-4 right-6 z-0 pointer-events-none select-none">
                {step.step}
              </div>
              <div className="relative z-10 pt-4">
                <h4 className="text-xl font-bold mb-4 text-brand-text">
                  {step.title}
                </h4>
                <p className="text-brand-text-dim leading-relaxed text-sm">
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
