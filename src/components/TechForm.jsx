import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Box } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const TechForm = ({ editTech, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    order: 0
  });

  useEffect(() => {
    if (editTech) setFormData(editTech);
  }, [editTech]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editTech) {
        await API.put(`/api/tech/${editTech._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Stack element recalibrated');
      } else {
        await API.post('/api/tech', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('New stack element integrated');
      }
      onRefresh();
      onClose();
    } catch (err) {
      toast.error('System synchronization failed');
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
        className="bg-brand-surface border border-white/5 w-full max-w-xl rounded-[3rem] p-12 relative overflow-hidden"
      >
        <button onClick={onClose} className="absolute top-10 right-10 text-brand-text-dim hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="mb-12">
          <h2 className="text-3xl font-display font-medium mb-2">
            {editTech ? 'Recalibrate Stack' : 'Integrate Technology'}
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Architectural Protocol</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Entity Name</label>
            <input 
              type="text"
              required
              placeholder="e.g. React"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Icon Identifier (React-Icons)</label>
            <input 
              type="text"
              required
              placeholder="e.g. SiReact, FaNodeJs"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
            />
            <p className="text-[8px] text-brand-text-dim italic">Use Si[Name] or Fa[Name] from SimpleIcons or FontAwesome.</p>
          </div>

          <div className="space-y-4">
            <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-text-dim">Deployment Order</label>
            <input 
              type="number"
              value={formData.order === 0 ? '' : formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              placeholder="e.g. 1"
              className="w-full bg-white/[0.02] border border-white/10 rounded-2xl py-5 px-8 outline-none focus:border-brand-accent transition-all"
            />
          </div>

          <button type="submit" className="w-full py-6 btn-premium flex items-center justify-center gap-4">
            <Save size={18} /> {editTech ? 'Update Protocol' : 'Finalize Integration'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TechForm;
