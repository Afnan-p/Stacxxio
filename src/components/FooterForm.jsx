import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Share2 } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const FooterForm = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    logoText: '',
    tagline: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    whatsapp: '',
    copyright: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await API.get('/api/footer');
        if (res.data) {
          setFormData(res.data);
        }
      } catch (err) {
        toast.error('Failed to load branding data');
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await API.put('/api/footer', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Global identity synchronized');
      if (onRefresh) onRefresh();
      onClose();
    } catch (err) {
      toast.error('Identity synchronization failed');
    }
  };

  if (loading) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-brand-surface border border-white/5 w-full max-w-2xl rounded-[3rem] p-12 relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-10 right-10 text-brand-text-dim hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-display font-medium mb-2">Global Identity</h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Branding & Protocols</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Logo Identifier</label>
              <input 
                type="text"
                required
                value={formData.logoText}
                onChange={(e) => setFormData({...formData, logoText: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">WhatsApp Channel</label>
              <input 
                type="text"
                placeholder="e.g. 919876543210"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Global Tagline</label>
            <input 
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData({...formData, tagline: e.target.value})}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Twitter (X)</label>
              <input 
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-accent transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">LinkedIn</label>
              <input 
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-accent transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Instagram</label>
              <input 
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Legal Notice (Copyright)</label>
            <input 
              type="text"
              required
              value={formData.copyright}
              onChange={(e) => setFormData({...formData, copyright: e.target.value})}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
            />
          </div>

          <button type="submit" className="w-full py-6 btn-premium flex items-center justify-center gap-4">
            <Save size={18} /> Synchronize Identity
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FooterForm;
