import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageLoad from './ImageLoad';

const Services = () => {
  // Premium Agency Fallback Services
  const services = [
    {
      _id: '1',
      title: 'Business Website Development',
      tag: 'Professional business websites designed to establish credibility, drive growth, and enhance your digital presence',
      description: 'Professional business websites designed to establish credibility, drive growth, and enhance your digital presence.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '2',
      title: 'Custom Web Application Development',
      tag: 'Scalable web applications built to streamline operations, automate processes, and scale with your business',
      description: 'Scalable web applications built to streamline operations, automate processes, and scale with your business.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '3',
      title: 'E-Commerce Development',
      tag: 'High-converting online stores designed to deliver seamless shopping experiences and maximize online sales',
      description: 'High-converting online stores designed to deliver seamless shopping experiences and maximize online sales.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '4',
      title: 'Portfolio & Personal Branding Websites',
      tag: 'Professional portfolio websites crafted to showcase expertise, build personal brand, and attract high-value clients',
      description: 'Professional portfolio websites crafted to showcase expertise, build personal brand, and attract high-value clients.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '5',
      title: 'Website Maintenance & Support',
      tag: 'Ongoing website maintenance, security updates, performance optimization, and dedicated technical support',
      description: 'Ongoing website maintenance, security updates, performance optimization, and dedicated technical support.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      _id: '6',
      title: 'Mobile App Development',
      tag: 'High-performance cross-platform mobile applications built for iOS and Android',
      description: 'High-performance cross-platform mobile applications built for iOS and Android to engage your users on the go.',
      image: 'https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&w=800&q=80',
    }
  ];

  const stats = [
    { value: '5+', label: 'Projects Delivered' },
    { value: '5+', label: 'Happy Clients' },
    { value: '5+', label: 'Core Services' },
    { value: '100%', label: 'Commitment' }
  ];

  const loading = false;

  return (
    <section id="services" className="py-16 md:py-20 bg-brand-surface relative overflow-hidden font-sans border-y border-gray-100">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <div key={`skel-serv-${index}`} className="w-full block h-[240px] relative rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white flex flex-col justify-center items-center p-6">
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
                    className="w-full"
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
