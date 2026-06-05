import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await API.get(`/api/services/${slug}`);
        setService(data);
      } catch (err) {
        console.error('Error fetching service details:', err);
        setError('Service not found or an error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">Service Not Found</h1>
        <p className="text-gray-500 mb-8">{error}</p>
        <Link to="/" className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  // Fallback images if not set
  const fallbackImages = [
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplas h.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1920&q=80'
  ];
  
  // Create a consistent index for the fallback image based on the title length so it stays the same
  const fallbackIndex = service.title.length % fallbackImages.length;
  
  const displayImage = service.image 
    ? (service.image.startsWith('http') ? service.image : `${import.meta.env.VITE_API_URL}/${service.image}`)
    : fallbackImages[fallbackIndex];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-brand-accent selection:text-white flex flex-col">
      <Helmet>
        <title>{service.seoTitle || `${service.title} - STACKXXIO Services`}</title>
        <meta name="description" content={service.seoDescription || service.description} />
      </Helmet>

      {/* Since we omitted Navbar from App.js for this route, we manually render it here over a dark or light background */}
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-10 max-w-6xl">
          
          {/* Back Navigation */}
          <Link to="/#services" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 font-medium">
            <ArrowLeft size={16} /> Back to Services
          </Link>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 md:mb-24"
          >
            <div className="max-w-4xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent mb-4 block">
                {service.tag || "Premium Service"}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-3xl">
                {service.description}
              </p>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mb-24 bg-gray-100 border border-gray-200"
          >
            <img 
              src={displayImage} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Main Content (Left) */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Service Overview */}
              <section>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Service Overview</h2>
                <div className="prose prose-lg text-gray-600 prose-headings:font-display prose-headings:text-gray-900 prose-a:text-brand-accent max-w-none whitespace-pre-wrap">
                  {service.fullDescription || service.description || "Detailed description for this service is currently being updated."}
                </div>
              </section>

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <section>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Key Capabilities</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-brand-accent flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <section>
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h4>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar (Right) */}
            <div className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                
                {/* Tech Stack Widget */}
                {service.technologies && service.technologies.length > 0 && (
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-display font-bold text-gray-900 mb-6">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className="px-4 py-2 bg-gray-50 border border-gray-100 text-gray-700 rounded-xl text-sm font-medium">
                          {tech.name || tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact CTA Widget */}
                <div className="bg-gray-900 p-8 rounded-3xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-accent/30 transition-colors duration-700" />
                  
                  <div className="relative z-10">
                    <MessageCircle className="w-10 h-10 text-brand-accent mb-6" />
                    <h3 className="text-2xl font-display font-bold mb-4">Start Your Project</h3>
                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                      Ready to elevate your digital presence? Let's discuss how our {service.title} services can help you achieve your goals.
                    </p>
                    <a 
                      href="mailto:contact@stackxxio.com" 
                      className="inline-flex items-center justify-center w-full py-4 bg-brand-accent text-white font-bold rounded-xl hover:bg-opacity-90 transition-colors"
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

   
    </div>
  );
};

export default ServiceDetail;
