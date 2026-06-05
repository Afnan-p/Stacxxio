import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../utils/IconMap';
import API from '../api/axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Premium Agency Fallback Services
  const fallbackServices = [
    {
      title: 'Website Development',
      description: 'Modern responsive websites designed for growth, conversion, and performance.',
      icon: 'Monitor',
      number: '01',
      hoverBorder: 'group-hover:border-blue-500',
      iconColor: 'text-blue-500',
      bgHover: 'group-hover:bg-blue-50/50'
    },
    {
      title: 'E-Commerce Solutions',
      description: 'Robust online storefronts optimized for maximum sales and seamless checkout.',
      icon: 'ShoppingCart',
      number: '02',
      hoverBorder: 'group-hover:border-emerald-500',
      iconColor: 'text-emerald-500',
      bgHover: 'group-hover:bg-emerald-50/50'
    },
    {
      title: 'Digital Showcase',
      description: 'Stunning portfolio sites and landing pages that capture your unique brand identity.',
      icon: 'Layout',
      number: '03',
      hoverBorder: 'group-hover:border-orange-500',
      iconColor: 'text-orange-500',
      bgHover: 'group-hover:bg-orange-50/50'
    },
    {
      title: 'App Development',
      description: 'High-performance cross-platform mobile applications for iOS and Android.',
      icon: 'Smartphone',
      number: '04',
      hoverBorder: 'group-hover:border-purple-500',
      iconColor: 'text-purple-500',
      bgHover: 'group-hover:bg-purple-50/50'
    },
    {
      title: 'Brand Design',
      description: 'Distinctive visual identities, intuitive UI/UX systems, and design systems.',
      icon: 'PenTool',
      number: '05',
      hoverBorder: 'group-hover:border-pink-500',
      iconColor: 'text-pink-500',
      bgHover: 'group-hover:bg-pink-50/50'
    },
    {
      title: 'SEO & Growth',
      description: 'Data-driven technical SEO and analytics to systematically scale your organic reach.',
      icon: 'TrendingUp',
      number: '06',
      hoverBorder: 'group-hover:border-cyan-500',
      iconColor: 'text-cyan-500',
      bgHover: 'group-hover:bg-cyan-50/50'
    }
  ];

  const [stats, setStats] = useState([
    { value: '50+', label: 'Projects Delivered' },
    { value: '20+', label: 'Happy Clients' },
    { value: '5+', label: 'Core Services' },
    { value: '100%', label: 'Commitment' }
  ]);

  useEffect(() => {
    const fetchServicesAndStats = async () => {
      try {
        const [servRes, projRes] = await Promise.all([
          API.get('/api/services'),
          API.get('/api/projects?paginate=false')
        ]);
        
        if (servRes.data && servRes.data.length > 0) {
          setServices(servRes.data);
        } else {
          setServices(fallbackServices);
        }

        // Dynamically calculate stats based on actual database numbers
        const projectsCount = projRes.data ? (Array.isArray(projRes.data) ? projRes.data.length : (projRes.data.projects?.length || 50)) : 50;
        const servicesCount = servRes.data ? servRes.data.length : 5;
        // Estimate clients as approx 85% of projects, assuming some repeat clients
        const clientsCount = Math.max(20, Math.floor(projectsCount * 0.85));

        setStats([
          { value: `${projectsCount}+`, label: 'Projects Delivered' },
          { value: `${clientsCount}+`, label: 'Happy Clients' },
          { value: `${servicesCount}+`, label: 'Core Services' },
          { value: '100%', label: 'Commitment' }
        ]);

      } catch (err) {
        console.error('Failed to fetch dynamic services and stats:', err);
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndStats();
  }, []);

  if (loading) return null;

  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAFAFA] relative overflow-hidden font-sans border-y border-gray-100">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="mb-16 md:mb-20 flex flex-col items-center text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
                AGENCY EXPERTISE
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 tracking-tight">
                Premium Services We Offer
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                Comprehensive digital solutions designed to elevate your business, enhance user experience, and drive measurable growth.
              </p>
              <div className="w-16 h-1 bg-gray-900 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {services.map((service, index) => {
              const IconComponent = getIcon(service.icon);
              const serviceNumber = service.number || `0${index + 1}`;
              const hoverBorder = service.hoverBorder || 'group-hover:border-brand-accent';
              const iconColor = service.iconColor || 'text-brand-accent';
              const bgHover = service.bgHover || 'group-hover:bg-brand-accent/5';
              
              return (
                <motion.div
                  key={service._id || index}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <div className={`relative h-full p-8 bg-white border border-gray-200 rounded-2xl transition-all duration-500 group overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl ${hoverBorder}`}>
                    
                    {/* Background Number */}
                    <div className="absolute -bottom-4 -right-2 text-[120px] font-black text-gray-50 opacity-60 select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out">
                      {serviceNumber}
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gray-50 border border-gray-100 mb-8 transition-colors duration-500 ${bgHover} group-hover:scale-110`}>
                        {IconComponent && <IconComponent className={`w-6 h-6 text-gray-700 transition-colors duration-500 ${iconColor}`} />}
                      </div>
                      
                      {/* Content */}
                      <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight transition-colors duration-300">
                        {service.title}
                      </h4>
                      
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-grow pr-4">
                        {service.description}
                      </p>
                      
                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-gray-600 transition-colors mt-auto">
                        Learn More 
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Trust Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-gray-100">
              {stats.map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx !== 0 ? 'md:pl-8' : ''}`}>
                  <h3 className="text-4xl font-display font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
