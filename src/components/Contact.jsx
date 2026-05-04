import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-40 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-brand-accent/5 rounded-full blur-[250px]" />
      
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-32">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent mb-8">Formal Inquiry</h2>
            <h3 className="text-6xl md:text-9xl font-display font-medium text-brand-text mb-16 tracking-tighter leading-none">
              Let's Compose the <span className="text-brand-accent/20 italic">Future.</span>
            </h3>
            
            <div className="space-y-16">
              <div className="flex items-center gap-10 group">
                <div className="w-20 h-20 rounded-2xl bg-brand-bg border border-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-700">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-dim/60 mb-2 italic">Electronic mail</p>
                  <p className="text-3xl font-display font-medium">concierge@stackxxio.studio</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-16 glass-green rounded-[3rem] border-white/5"
          >
            <form className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Name & Honorific</label>
                <input 
                  type="text" 
                  className="w-full px-10 py-6 bg-brand-bg/50 border border-white/5 rounded-2xl focus:border-brand-accent/40 outline-none transition-all duration-700 text-brand-text font-light italic" 
                  placeholder="Mr. Jonathan Archer"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Direct Channel</label>
                <input 
                  type="email" 
                  className="w-full px-10 py-6 bg-brand-bg/50 border border-white/5 rounded-2xl focus:border-brand-accent/40 outline-none transition-all duration-700 text-brand-text font-light italic" 
                  placeholder="archer@enterprise.com"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Project Visionary</label>
                <textarea 
                  rows="4" 
                  className="w-full px-10 py-6 bg-brand-bg/50 border border-white/5 rounded-2xl focus:border-brand-accent/40 outline-none transition-all duration-700 text-brand-text font-light italic resize-none" 
                  placeholder="Describe your next architectural digital masterpiece..."
                />
              </div>
              <button className="w-full py-8 btn-luxury rounded-full text-[10px] font-bold uppercase tracking-[0.5em] flex items-center justify-center gap-6 hover:scale-[1.02] active:scale-[0.98] transition-all duration-700">
                Dispatch Transmission <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
