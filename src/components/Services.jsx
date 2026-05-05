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
    <section id="services" className="py-24 md:py-40 bg-brand-bg relative overflow-hidden border-t border-white/5">
      {/* Dynamic Lighting Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-brand-accent/[0.01] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-accent/[0.02] rounded-full blur-[250px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 md:mb-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-brand-accent mb-6 block">Capabilities</span>
              <h2 className="text-5xl md:text-8xl font-display font-medium text-brand-text mb-8 tracking-tighter leading-none">
                Services We <span className="text-brand-accent/20 italic">Provide.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-[#9CA3AF] text-base md:text-lg font-light italic leading-relaxed">
                High-performance digital curations designed for the modern era.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
                className="group h-full"
              >
                {/* Sleek Horizontal Rectangle Card */}
                <div className="relative h-[140px] md:h-[160px] p-6 md:p-8 bg-white/[0.02] backdrop-blur-md rounded-[18px] border border-white/[0.08] cursor-default flex items-center gap-5 md:gap-6 transition-all duration-500 hover:scale-[1.03] hover:border-brand-accent/30 hover:bg-white/[0.04] overflow-hidden group">
                  
                  {/* Subtle Glass Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  
                  {/* Left Icon Container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-[50px] h-[50px] md:w-[55px] md:h-[55px] rounded-full bg-brand-accent/[0.06] flex items-center justify-center text-brand-accent transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                      {getIcon(service.icon)}
                    </div>
                    {service.tag && (
                      <div className="absolute -top-1 -right-1">
                        <span className="px-2 py-0.5 bg-brand-accent/10 border border-brand-accent/20 rounded-md text-[6px] font-bold uppercase tracking-widest text-brand-accent">
                          {service.tag}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-grow min-w-0">
                    <h4 className="text-xl md:text-2xl font-display font-bold mb-2 text-brand-text group-hover:text-brand-accent transition-colors duration-500 tracking-tight truncate">
                      {service.title}
                    </h4>
                    <p className="text-[#9CA3AF] text-xs md:text-sm leading-relaxed font-light italic opacity-60 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Premium Bottom Highlight */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent group-hover:w-full transition-all duration-700 ease-in-out" />
                  
                  {/* Internal Glow Backdrop */}
                  <div className="absolute -inset-1 bg-brand-accent/5 rounded-[18px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
