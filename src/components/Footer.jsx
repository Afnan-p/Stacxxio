import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    logoText: 'ZYNEXTA',
    tagline: 'PREMIUM SOFTWARE AGENCY • EST. 2024',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
    whatsapp: '',
    copyright: `© ${new Date().getFullYear()} ZYNEXTA. ALL RIGHTS RESERVED.`
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left md:pr-24">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                {/* <img src="/zynexta-logo.png" alt="ZYNEXTA Logo" className="w-12 h-12 md:w-[55px] md:h-[55px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm mix-blend-multiply" /> */}
                
                <div 
                  className="text-2xl md:text-[26px] font-extrabold tracking-wide text-brand-text leading-[0.9] mt-1.5"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  ZYNEXTΛ
                </div>
              </div>
              <p className="text-brand-text-dim text-xs font-medium uppercase tracking-wider">
                {footerData.tagline ? footerData.tagline.replace(/STACKXXIO/ig, 'ZYNEXTA') : 'PREMIUM SOFTWARE AGENCY • EST. 2024'}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-brand-text-dim">
              <a 
                href={footerData.twitter && footerData.twitter !== '#' ? footerData.twitter : '#'} 
                target={footerData.twitter && footerData.twitter !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer" 
                onClick={(e) => {
                  if (!footerData.twitter || footerData.twitter === '#') {
                    e.preventDefault();
                    toast("Twitter profile is currently unavailable.");
                  }
                }}
                className="hover:text-brand-accent transition-colors cursor-pointer"
              >
                Twitter
              </a>
              <a 
                href={footerData.linkedin && footerData.linkedin !== '#' ? footerData.linkedin : '#'} 
                target={footerData.linkedin && footerData.linkedin !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer" 
                onClick={(e) => {
                  if (!footerData.linkedin || footerData.linkedin === '#') {
                    e.preventDefault();
                    toast("LinkedIn profile is currently unavailable.");
                  }
                }}
                className="hover:text-brand-accent transition-colors cursor-pointer"
              >
                LinkedIn
              </a>
              <a 
                href={footerData.instagram && footerData.instagram !== '#' ? footerData.instagram : '#'} 
                target={footerData.instagram && footerData.instagram !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer" 
                onClick={(e) => {
                  if (!footerData.instagram || footerData.instagram === '#') {
                    e.preventDefault();
                    toast("Instagram profile is currently unavailable.");
                  }
                }}
                className="hover:text-brand-accent transition-colors cursor-pointer"
              >
                Instagram
              </a>
            </div>

            <p className="text-sm font-medium text-brand-text-dim">
              {footerData.copyright ? footerData.copyright.replace(/STACKXXIO/ig, 'ZYNEXTA') : `© ${new Date().getFullYear()} ZYNEXTA. ALL RIGHTS RESERVED.`}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Social Dock */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex flex-col gap-3 md:gap-4 items-center">
        
        {/* LinkedIn */}
        {footerData.linkedin && footerData.linkedin !== '#' && (
          <motion.a
            href={footerData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our LinkedIn Profile"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-12 h-12 md:w-[52px] md:h-[52px] bg-white text-brand-text rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-[#111111] hover:border-[#111111] hover:text-white transition-all duration-300 border border-[#E5E7EB]"
          >
            <FaLinkedinIn size={20} className="md:w-[22px] md:h-[22px]" />
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              LinkedIn
            </span>
          </motion.a>
        )}

        {/* Instagram */}
        {footerData.instagram && footerData.instagram !== '#' && (
          <motion.a
            href={footerData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram Profile"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-12 h-12 md:w-[52px] md:h-[52px] bg-white text-brand-text rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:bg-[#111111] hover:border-[#111111] hover:text-white transition-all duration-300 border border-[#E5E7EB]"
          >
            <FaInstagram size={20} className="md:w-[22px] md:h-[22px]" />
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              Instagram
            </span>
          </motion.a>
        )}

        {/* WhatsApp */}
        {footerData.whatsapp && (
          <motion.a
            href={`https://wa.me/${footerData.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-14 h-14 md:w-[60px] md:h-[60px] bg-[#111111] text-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-brand-glow transition-all duration-300 mt-1 md:mt-2"
          >
            <FaWhatsapp size={28} className="md:w-[32px] md:h-[32px]" />
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-[10px] font-semibold tracking-wider px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              WhatsApp
            </span>
          </motion.a>
        )}
      </div>
    </>
  );
};

export default Footer;
