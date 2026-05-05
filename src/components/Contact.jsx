import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../api/axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset status when user starts typing again
    if (status.error || status.success) {
      setStatus({ loading: false, success: false, error: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ ...status, error: 'Please fulfill all fields of the transmission.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      await API.post('/api/inquiries', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => setStatus(s => ({ ...s, success: false })), 5000);
    } catch (err) {
      console.error(err);
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Transmission failed. Please try again.' 
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-40 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-brand-accent/5 rounded-full blur-[250px]" />
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 md:gap-32">
          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent mb-8">Formal Inquiry</h2>
            <h3 className="text-5xl md:text-9xl font-display font-medium text-brand-text mb-12 md:mb-16 tracking-tighter leading-none">
              Let's Compose the <span className="text-brand-accent/20 italic">Future.</span>
            </h3>
            
            <div className="space-y-12 md:space-y-16">
              <div className="flex items-center gap-10 group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-brand-bg border border-white/5 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-brand-bg transition-all duration-700">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-dim/60 mb-2 italic">Electronic mail</p>
                  <p className="text-xl md:text-3xl font-display font-medium break-all">stackxxioweb@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-16 glass-green rounded-[3rem] border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {status.success && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex items-center gap-4 text-brand-accent"
                >
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-medium">Transmission successful. We will respond shortly.</span>
                </motion.div>
              )}

              {status.error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-4 text-red-500"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm font-medium">{status.error}</span>
                </motion.div>
              )}

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Name & Honorific</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-10 py-6 bg-brand-bg/50 border border-white/5 rounded-2xl focus:border-brand-accent/40 outline-none transition-all duration-700 text-brand-text font-light italic" 
                  placeholder="Mr. Jonathan Archer"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Direct Channel</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-10 py-6 bg-brand-bg/50 border border-white/5 rounded-2xl focus:border-brand-accent/40 outline-none transition-all duration-700 text-brand-text font-light italic" 
                  placeholder="archer@enterprise.com"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim/60 ml-2">Project Visionary</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4" 
                  className="w-full px-10 py-6 bg-brand-bg/50 border border-white/5 rounded-2xl focus:border-brand-accent/40 outline-none transition-all duration-700 text-brand-text font-light italic resize-none" 
                  placeholder="Describe your next architectural digital masterpiece..."
                />
              </div>
              <button 
                type="submit"
                disabled={status.loading}
                className={`w-full py-8 btn-luxury rounded-full text-[10px] font-bold uppercase tracking-[0.5em] flex items-center justify-center gap-6 hover:scale-[1.02] active:scale-[0.98] transition-all duration-700 ${status.loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status.loading ? 'Transmitting...' : 'Dispatch Transmission'} <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
