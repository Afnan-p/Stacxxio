import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Check } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import API from '../api/axios';
import toast from 'react-hot-toast';

const TeamForm = ({ onClose, onRefresh, editMember = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    instagram: '',
    linkedin: '',
    github: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editMember) {
      setFormData({
        name: editMember.name || '',
        role: editMember.role || '',
        instagram: editMember.socialLinks?.instagram || '',
        linkedin: editMember.socialLinks?.linkedin || '',
        github: editMember.socialLinks?.github || '',
      });
      if (editMember.image) {
        setPreview(editMember.image.startsWith('http') ? editMember.image : `${import.meta.env.VITE_API_URL}/${editMember.image}`);
      }
    }
  }, [editMember]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      toast.error("Name and Role are required");
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('role', formData.role);
    data.append('socialLinks', JSON.stringify({
      instagram: formData.instagram,
      linkedin: formData.linkedin,
      github: formData.github,
    }));
    if (image) data.append('image', image);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      };

      if (editMember) {
        await API.put(`/api/team/${editMember._id}`, data, config);
        toast.success('Agent profile updated');
      } else {
        await API.post('/api/team', data, config);
        toast.success('New agent recruited');
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
        className="bg-[#FFFFFF] w-full max-w-[600px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              {editMember ? 'Edit Personnel' : 'Add Personnel'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto flex-grow space-y-6">
          <form id="team-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="flex justify-center mb-2">
              <div 
                className={`relative w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-dashed transition-all duration-300 ${dragActive ? 'border-gray-900 bg-gray-50' : 'border-[#D1D5DB] bg-[#FFFFFF] hover:border-gray-400'} cursor-pointer group`}
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files?.[0]) {
                    fileInputRef.current.files = e.dataTransfer.files;
                    handleImageChange({ target: { files: e.dataTransfer.files } });
                  }
                }}
              >
                <input ref={fileInputRef} type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 group-hover:text-gray-900">
                    <UploadCloud size={24} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Avatar</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <InputLabel required>Full Name</InputLabel>
                <input 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  className={inputClass} 
                  placeholder="e.g. John Doe" 
                />
              </div>
              <div>
                <InputLabel required>Designation</InputLabel>
                <input 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                  className={inputClass} 
                  placeholder="e.g. Lead Engineer" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <InputLabel>Social Profiles</InputLabel>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaInstagram size={20} /></div>
                  <input 
                    type="url"
                    name="instagram" 
                    value={formData.instagram} 
                    onChange={handleChange} 
                    className={`${inputClass} pl-12`} 
                    placeholder="Instagram URL" 
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaLinkedin size={20} /></div>
                  <input 
                    type="url"
                    name="linkedin" 
                    value={formData.linkedin} 
                    onChange={handleChange} 
                    className={`${inputClass} pl-12`} 
                    placeholder="LinkedIn URL" 
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaGithub size={20} /></div>
                  <input 
                    type="url"
                    name="github" 
                    value={formData.github} 
                    onChange={handleChange} 
                    className={`${inputClass} pl-12`} 
                    placeholder="GitHub URL" 
                  />
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex items-center justify-end shrink-0 bg-gray-50/30 rounded-b-[24px]">
          <button 
            type="submit"
            form="team-form"
            disabled={loading}
            className="h-[56px] px-8 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 shadow-md w-full sm:w-auto justify-center"
          >
            {loading ? 'Processing...' : (editMember ? 'Save Changes' : 'Confirm Recruitment')} 
            {!loading && <Check size={18} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamForm;
