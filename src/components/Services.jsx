import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as LuIcons from "react-icons/lu";
import API from '../api/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback services in case API fails
  const fallbackServices = [
    {
      title: 'App Engineering',
      description: 'Precision-crafted digital infrastructure for high-performance mobile ecosystems.',
      icon: 'FaMobileAlt',
      tag: 'Bespoke'
    },
    {
      title: 'Web Architecture',
      description: 'Scalable, modern web tapestries woven with raw power and elegant code.',
      icon: 'FaCode',
      tag: 'Scale'
    },
    {
      title: 'Interface Design',
      description: 'Exquisite UI/UX curations that blend intuition with high-end luxury aesthetics.',
      icon: 'FaBezierCurve',
      tag: 'Visual'
    },
    {
      title: 'Strategic Branding',
      description: 'Digital sovereignty defined through identity that commands absolute authority.',
      icon: 'FaGem',
      tag: 'Identity'
    },
    {
      title: 'Cloud Protocols',
      description: 'Sophisticated backend architectures designed for absolute reliability and scale.',
      icon: 'FaCloud',
      tag: 'Reliable'
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await API.get('/api/services');
        if (res.data.length > 0) {
          setServices(res.data);
        } else {
          setServices(fallbackServices);
        }
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getIcon = (iconName) => {
    const IconComponent = FaIcons[iconName] || SiIcons[iconName] || LuIcons[iconName] || FaIcons.FaCode;
    return <IconComponent size={24} />;
  };

  if (loading) return null;

  return (
    <section id="services" className="py-24 md:py-40 bg-brand-bg relative overflow-hidden luxury-noise border-t border-white/5">
      {/* Cinematic Environmental Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-accent/[0.03] rounded-full blur-[250px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 md:mb-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-brand-accent mb-6 block">Expertise</span>
              <h2 className="text-5xl md:text-8xl font-display font-medium text-brand-text mb-8 tracking-tighter leading-none">
                Services We <span className="text-brand-accent/20 italic">Provide.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-brand-text-dim text-base md:text-lg font-light italic leading-relaxed opacity-60">
                "Precision engineering meet high-end digital luxury."
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                {/* Compact 3D Tilt Card */}
                <motion.div 
                  whileHover={{ 
                    y: -10,
                    rotateX: 4,
                    rotateY: -4,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="relative p-8 md:p-10 bg-white/[0.015] backdrop-blur-2xl rounded-[2rem] border border-white/[0.05] cursor-default h-full flex flex-col items-center text-center transition-all duration-700 hover:border-brand-accent/30 hover:bg-white/[0.03] shadow-xl"
                >
                  {/* Localized Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[2rem]" />
                  
                  {/* Smaller Floating Icon */}
                  <div className="relative mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-brand-bg border border-white/5 flex items-center justify-center text-brand-accent relative z-10 shadow-2xl group-hover:shadow-brand-accent/5 transition-all duration-700"
                    >
                      {getIcon(service.icon)}
                    </motion.div>
                    
                    {service.tag && (
                      <div className="absolute -top-1 -right-4">
                        <span className="px-2 py-0.5 bg-brand-accent/10 border border-brand-accent/20 rounded-md text-[7px] font-bold uppercase tracking-widest text-brand-accent backdrop-blur-md">
                          {service.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-xl md:text-2xl font-display font-medium mb-4 text-brand-text group-hover:text-brand-accent transition-colors duration-500 tracking-tight leading-tight">
                      {service.title}
                    </h4>
                    <p className="text-brand-text-dim text-xs md:text-sm leading-relaxed font-light italic opacity-50 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Minimal Decorative Line */}
                  <div className="mt-8 w-12 h-px bg-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-brand-accent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </motion.div>

                {/* Subtle Glow Backdrop */}
                <div className="absolute -inset-1 bg-brand-accent/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
