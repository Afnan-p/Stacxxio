import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Layers } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const ServiceForm = ({ editService, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'FaCode',
    tag: '',
    order: 0
  });

  useEffect(() => {
    if (editService) setFormData(editService);
  }, [editService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editService) {
        await API.put(`/api/services/${editService._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service architecture updated');
      } else {
        await API.post('/api/services', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('New service offering integrated');
      }
      onRefresh();
      onClose();
    } catch (err) {
      toast.error('Service synchronization failed');
    }
  };

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

        <div className="mb-12">
          <h2 className="text-3xl font-display font-medium mb-2">
            {editService ? 'Modify Service' : 'Add New Offering'}
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Strategic Capabilities</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Service Title</label>
              <input 
                type="text"
                required
                placeholder="e.g. Bespoke Engineering"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Icon (React-Icons Name)</label>
              <input 
                type="text"
                required
                placeholder="e.g. FaCode, SiReact"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Description</label>
            <textarea 
              required
              rows="3"
              placeholder="Describe the value proposition..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all resize-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Visual Tag (Optional)</label>
              <input 
                type="text"
                placeholder="e.g. Popular, New"
                value={formData.tag}
                onChange={(e) => setFormData({...formData, tag: e.target.value})}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Display Order</label>
              <input 
                type="number"
                value={formData.order === 0 ? '' : formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                placeholder="e.g. 1"
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
              />
            </div>
          </div>

          <button type="submit" className="w-full py-6 btn-premium flex items-center justify-center gap-4">
            <Save size={18} /> {editService ? 'Update Service' : 'Finalize Service'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ServiceForm;
