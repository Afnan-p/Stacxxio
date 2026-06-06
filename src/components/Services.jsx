import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getIcon } from '../utils/IconMap';
import API from '../api/axios';
import ImageLoad from './ImageLoad';

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
        const [servRes, projRes, statsRes] = await Promise.all([
          API.get('/api/services'),
          API.get('/api/projects?paginate=false'),
          API.get('/api/stats').catch(() => ({ data: [] }))
        ]);
        
        if (servRes.data && servRes.data.length > 0) {
          setServices(servRes.data);
        } else {
          setServices(fallbackServices);
        }

        if (statsRes.data && statsRes.data.length > 0) {
          setStats(statsRes.data.map(stat => ({
            value: stat.number,
            label: stat.label
          })));
        } else {
          // Fallback to dynamic calculation
          const projectsCount = projRes.data ? (Array.isArray(projRes.data) ? projRes.data.length : (projRes.data.projects?.length || 50)) : 50;
          const servicesCount = servRes.data ? servRes.data.length : 5;
          const clientsCount = Math.max(20, Math.floor(projectsCount * 0.85));

          setStats([
            { value: `${projectsCount}+`, label: 'Projects Delivered' },
            { value: `${clientsCount}+`, label: 'Happy Clients' },
            { value: `${servicesCount}+`, label: 'Core Services' },
            { value: '100%', label: 'Commitment' }
          ]);
        }

      } catch (err) {
        console.error('Failed to fetch dynamic services and stats:', err);
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesAndStats();
  }, []);

  return (
    <section id="services" className="py-16 md:py-20 bg-[#FAFAFA] relative overflow-hidden font-sans border-y border-gray-100">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div key={`skel-serv-${index}`} className="block h-[240px] relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white flex flex-col justify-center items-center p-6">
                  <div className="absolute inset-0 bg-gray-100 animate-shimmer opacity-50 z-0"></div>
                  <div className="relative z-10 w-3/4 h-6 bg-gray-200 animate-shimmer rounded mb-4"></div>
                  <div className="relative z-10 w-full h-4 bg-gray-200 animate-shimmer rounded mb-2"></div>
                  <div className="relative z-10 w-5/6 h-4 bg-gray-200 animate-shimmer rounded mt-auto"></div>
                </div>
              ))
            ) : (
              services.map((service, index) => {
                
                // High-quality fallback images based on index/title
                const fallbackImages = [
                  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', // Web Dev
                  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', // E-Commerce
                  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', // Digital Showcase
                  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', // App Dev
                  'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80', // Branding / Poster
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'  // SEO
                ];
                const displayImage = service.image 
                  ? (service.image.startsWith('http') ? service.image : `${import.meta.env.VITE_API_URL}/${service.image}`)
                  : fallbackImages[index % fallbackImages.length];

                // Generate a short 1-line subtitle if tag isn't available
                const subTitle = service.tag || service.description.split('.')[0] || "Premium Digital Solution";

                return (
                  <motion.div
                    key={service._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={`/services/${service.slug || service._id}`}
                      className="block h-[240px] relative rounded-xl overflow-hidden group cursor-pointer border border-gray-200 shadow-sm hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
                    >
                      {/* Atmospheric Background Image */}
                      <div className="absolute inset-0 bg-black z-0">
                        <ImageLoad 
                          src={displayImage} 
                          alt={service.title} 
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                        />
                      </div>

                      {/* Dark Gradient Overlay for maximum text readability & premium feel */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />

                      {/* Centered Typography Content */}
                      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center p-6">
                        
                        <h3 className="text-xl font-display font-bold text-white mb-2 transition-colors duration-300">
                          {service.title}
                        </h3>
                        
                        <p className="text-gray-300 text-[10px] font-semibold tracking-[0.2em] uppercase line-clamp-2 px-2 max-w-[90%]">
                          {subTitle}
                        </p>
                        
                        {/* CTA positioned at bottom */}
                        <div className="absolute bottom-5 flex items-center gap-1.5 text-[10px] font-bold text-white uppercase tracking-widest opacity-90 group-hover:opacity-100">
                          Learn More <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
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
              {loading ? (
                [...Array(4)].map((_, idx) => (
                  <div key={`stat-skel-${idx}`} className={`flex flex-col items-center justify-center text-center ${idx !== 0 ? 'md:pl-8' : ''}`}>
                    <div className="w-16 h-10 bg-gray-200 animate-shimmer rounded mb-2"></div>
                    <div className="w-24 h-3 bg-gray-200 animate-shimmer rounded"></div>
                  </div>
                ))
              ) : (
                stats.map((stat, idx) => (
                  <div key={idx} className={`flex flex-col items-center justify-center text-center ${idx !== 0 ? 'md:pl-8' : ''}`}>
                    <h3 className="text-4xl font-display font-bold text-gray-900 mb-2">{stat.value}</h3>
                    <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">{stat.label}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
