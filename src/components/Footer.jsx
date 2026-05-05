import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import API from '../api/axios';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    logoText: 'STACKXXIO.',
    tagline: 'LUXURY TECH ARCHITECTURES • EST. 2024',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
    whatsapp: '',
    copyright: `© ${new Date().getFullYear()} STACKXXIO STUDIO. ALL RIGHTS RESERVED.`
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
      <motion.footer 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-brand-bg border-t border-white/5 relative overflow-hidden"
      >
        {/* Subtle Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-brand-accent/[0.01] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
              <div className="text-3xl font-display font-medium tracking-tighter mb-4 text-brand-text">
                {footerData.logoText}<span className="text-brand-accent">.</span>
              </div>
              <p className="text-brand-text-dim/60 text-[10px] font-bold uppercase tracking-[0.4em] italic">
                {footerData.tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60">
              <a href={footerData.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-500">Twitter</a>
              <a href={footerData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-500">LinkedIn</a>
              <a href={footerData.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-500">Instagram</a>
            </div>

            <p className="text-[10px] text-brand-text-dim/40 uppercase tracking-[0.2em] font-medium max-w-[200px] md:max-w-none">
              {footerData.copyright}
            </p>
          </div>
        </div>
      </motion.footer>

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
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.6)] transition-all duration-300 group"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MessageCircle size={28} fill="currentColor" className="text-white" />
          </motion.div>
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
            Secure Channel
          </span>
        </motion.a>
      )}
    </>
  );
};

export default Footer;
