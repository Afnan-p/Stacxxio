import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import API from '../api/axios';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    logoText: 'STACKXXIO.',
    tagline: 'PREMIUM SOFTWARE AGENCY • EST. 2024',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
    whatsapp: '',
    copyright: `© ${new Date().getFullYear()} STACKXXIO. ALL RIGHTS RESERVED.`
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await API.get('/api/footer');
        if (res.data) {
          setFooterData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch footer data:', err);
      }
    };
    fetchFooter();
  }, []);

  return (
    <>
      <footer className="py-12 bg-white border-t border-[#E5E7EB] relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
              <div className="text-2xl font-display font-bold tracking-tight mb-2 text-brand-text">
                {footerData.logoText}
              </div>
              <p className="text-brand-text-dim text-xs font-medium uppercase tracking-wider">
                {footerData.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-brand-text-dim">
              <a href={footerData.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Twitter</a>
              <a href={footerData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">LinkedIn</a>
              <a href={footerData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">Instagram</a>
            </div>

            <p className="text-sm font-medium text-brand-text-dim">
              {footerData.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {footerData.whatsapp && (
        <motion.a
          href={`https://wa.me/${footerData.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle size={28} fill="currentColor" className="text-white" />
        </motion.a>
      )}
    </>
  );
};

export default Footer;
