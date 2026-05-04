import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Layers, Cpu } from 'lucide-react';

const services = [
  {
    title: 'Bespoke Engineering',
    description: 'Precision-crafted digital infrastructure for high-performance enterprises.',
    icon: <Code className="w-10 h-10 text-brand-accent/60" />,
  },
  {
    title: 'Interface Curations',
    description: 'Exquisite UI/UX tapestries woven with intuition and premium aesthetics.',
    icon: <Layout className="w-10 h-10 text-brand-accent/60" />,
  },
  {
    title: 'Cloud Architectures',
    description: 'Sophisticated backend protocols designed for absolute reliability and scale.',
    icon: <Layers className="w-10 h-10 text-brand-accent/60" />,
  },
  {
    title: 'Digital Sovereignty',
    description: 'Strategic brand definition that commands authority in the digital space.',
    icon: <Cpu className="w-10 h-10 text-brand-accent/60" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-40 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-end mb-32">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent mb-6">Expertise</h2>
            <h3 className="text-6xl md:text-8xl font-display font-medium text-brand-text leading-tight">
              Curating <span className="text-brand-accent/20 italic">Modern</span> Digital Standards.
            </h3>
          </div>
          <p className="text-xl text-brand-text-dim font-light leading-relaxed mb-4 italic">
            "Every project is a study in precision, blending the raw power of code with the elegance of luxury design."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="p-12 glass-green rounded-[3rem] group cursor-default border-white/5"
            >
              <div className="w-20 h-20 bg-brand-bg rounded-2xl flex items-center justify-center mb-10 group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-700 shadow-2xl">
                {service.icon}
              </div>
              <h4 className="text-3xl font-display font-medium mb-6 text-brand-text">{service.title}</h4>
              <p className="text-brand-text-dim text-lg leading-relaxed font-light italic">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
