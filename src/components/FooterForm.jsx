import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Plus, Trash2 } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const FooterForm = ({ onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    email: 'zynextaweb@gmail.com',
    phones: [],
    logoText: '',
    tagline: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    whatsapp: '',
    copyright: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
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
    } finally {
      setSaving(false);
    }
  };

  // --- Reusable UI ---
  const InputLabel = ({ children, required }) => (
    <label className="block text-[#111111] font-semibold text-[13px] tracking-[0.04em] mb-2 flex items-center gap-1.5">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const inputClass = "w-full h-[56px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] px-[18px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none";

  if (loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-[10px] overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        className="bg-[#FFFFFF] w-full max-w-[700px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Global Identity Settings
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto flex-grow">
          <form id="footer-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <InputLabel required>Contact Email</InputLabel>
                <input 
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={inputClass}
                />
              </div>
              <div></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <InputLabel>Contact Phone Numbers</InputLabel>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, phones: [...(formData.phones || []), '']})}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md"
                >
                  <Plus size={14} /> Add Number
                </button>
              </div>
              <div className="space-y-3">
                {(!formData.phones || formData.phones.length === 0) ? (
                  <p className="text-sm text-gray-400 italic">No contact numbers added yet.</p>
                ) : (
                  formData.phones.map((phone, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="e.g. +1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => {
                          const newPhones = [...formData.phones];
                          newPhones[index] = e.target.value;
                          setFormData({...formData, phones: newPhones});
                        }}
                        className={inputClass}
                      />
                      <button 
                        type="button"
                        onClick={() => {
                          const newPhones = formData.phones.filter((_, i) => i !== index);
                          setFormData({...formData, phones: newPhones});
                        }}
                        className="w-[56px] h-[56px] shrink-0 bg-red-50 text-red-500 rounded-[14px] flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <InputLabel required>Logo Text</InputLabel>
                <input 
                  type="text"
                  required
                  value={formData.logoText}
                  onChange={(e) => setFormData({...formData, logoText: e.target.value})}
                  className={inputClass}
                />
              </div>
              <div>
                <InputLabel>WhatsApp Channel</InputLabel>
                <input 
                  type="text"
                  placeholder="e.g. 919876543210"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <InputLabel required>Global Tagline</InputLabel>
              <input 
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({...formData, tagline: e.target.value})}
                className={inputClass}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <InputLabel>Twitter (X)</InputLabel>
                <input 
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({...formData, twitter: e.target.value})}
                  className={inputClass}
                />
              </div>
              <div>
                <InputLabel>LinkedIn</InputLabel>
                <input 
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className={inputClass}
                />
              </div>
              <div>
                <InputLabel>Instagram</InputLabel>
                <input 
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <InputLabel required>Legal Notice (Copyright)</InputLabel>
              <input 
                type="text"
                required
                value={formData.copyright}
                onChange={(e) => setFormData({...formData, copyright: e.target.value})}
                className={inputClass}
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex items-center justify-end shrink-0 bg-gray-50/30 rounded-b-[24px]">
          <button 
            type="submit"
            form="footer-form"
            disabled={saving}
            className="h-[56px] px-8 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-md w-full sm:w-auto justify-center"
          >
            {saving ? 'Saving...' : 'Save Settings'} 
            {!saving && <Check size={18} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default FooterForm;
