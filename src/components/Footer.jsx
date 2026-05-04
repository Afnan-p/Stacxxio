import React from 'react';

const Footer = () => {
  return (
    <footer className="py-20 bg-brand-bg border-t border-white/5">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <div className="text-2xl font-display font-medium tracking-tighter mb-4 text-brand-text">
              STACKXXIO<span className="text-brand-accent">.</span>
            </div>
            <p className="text-brand-text-dim/60 text-[10px] font-bold uppercase tracking-[0.4em] italic">
              Luxury Tech Architectures • Est. 2024
            </p>
          </div>
          
          <div className="flex gap-12 text-[9px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60">
            <a href="#" className="hover:text-brand-accent transition-colors duration-500">Twitter</a>
            <a href="#" className="hover:text-brand-accent transition-colors duration-500">LinkedIn</a>
            <a href="#" className="hover:text-brand-accent transition-colors duration-500">Instagram</a>
          </div>

          <p className="text-[10px] text-brand-text-dim uppercase tracking-[0.1em] font-medium">
            © {new Date().getFullYear()} Stackxxio Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
