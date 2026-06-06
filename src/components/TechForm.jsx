import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const TechForm = ({ editTech, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    category: 'frontend',
    order: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTech) setFormData(editTech);
  }, [editTech]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (editTech) {
        await API.put(`/api/tech/${editTech._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Stack element updated');
      } else {
        await API.post('/api/tech', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('New stack element added');
      }
      onRefresh();
      onClose();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // --- Reusable UI ---
  const InputLabel = ({ children, required }) => (
    <label className="block text-[#111111] font-semibold text-[13px] tracking-[0.04em] mb-2 flex items-center gap-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const inputClass = "w-full h-[56px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] px-[18px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-[10px] overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        className="bg-[#FFFFFF] w-full max-w-[500px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              {editTech ? 'Edit Technology' : 'Add Technology'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto flex-grow">
          <form id="tech-form" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <InputLabel required>Technology Name</InputLabel>
              <input 
                type="text"
                required
                placeholder="e.g. React"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={inputClass}
              />
            </div>

            <div>
              <InputLabel required>Icon Component Name</InputLabel>
              <input 
                type="text"
                required
                placeholder="e.g. SiReact, FaNodeJs"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className={inputClass}
              />
              <p className="text-xs text-gray-500 mt-2 font-medium">Use Si[Name] or Fa[Name] from react-icons.</p>
            </div>

            <div>
              <InputLabel required>Category</InputLabel>
              <select 
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={inputClass}
              >
                <option value="frontend">Frontend Development</option>
                <option value="backend">Backend Development</option>
                <option value="database">Database</option>
                <option value="design">UI/UX Design</option>
                <option value="cloud">Deployment & Cloud</option>
              </select>
            </div>

            <div>
              <InputLabel>Display Order</InputLabel>
              <input 
                type="number"
                value={formData.order === 0 ? '' : formData.order}
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                placeholder="e.g. 1"
                className={inputClass}
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex items-center justify-end shrink-0 bg-gray-50/30 rounded-b-[24px]">
          <button 
            type="submit"
            form="tech-form"
            disabled={loading}
            className="h-[56px] px-8 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-md w-full sm:w-auto justify-center"
          >
            {loading ? 'Saving...' : (editTech ? 'Update Technology' : 'Add Technology')} 
            {!loading && <Check size={18} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TechForm;
