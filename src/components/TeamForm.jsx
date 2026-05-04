import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import axios from 'axios';
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

  useEffect(() => {
    if (editMember) {
      setFormData({
        name: editMember.name,
        role: editMember.role,
        instagram: editMember.socialLinks?.instagram || '',
        linkedin: editMember.socialLinks?.linkedin || '',
        github: editMember.socialLinks?.github || '',
      });
      setPreview(editMember.image);
    }
  }, [editMember]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        await axios.put(`http://localhost:5000/api/team/${editMember._id}`, data, config);
        toast.success('Agent profiles updated');
      } else {
        await axios.post('http://localhost:5000/api/team', data, config);
        toast.success('New agent recruited');
      }
      
      onRefresh();
      onClose();
    } catch (err) {
      toast.error('Recruitment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-bg/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6">
      <div className="bg-brand-surface w-full max-w-xl rounded-[3rem] border border-white/5 shadow-premium overflow-hidden relative">
        <div className="p-10 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-3xl font-display font-bold text-white">Agent Personnel</h2>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white">
            <X className="w-8 h-8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40 rounded-[2rem] overflow-hidden border-2 border-dashed border-white/10 hover:border-brand-accent/40 transition-all group">
              <input type="file" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              {preview ? (
                <img src={preview} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white/[0.02]">
                  <Upload className="text-white/20" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 mt-2">Avatar</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-dim ml-2">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white" placeholder="Afnan Studio" required />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-dim ml-2">Role / Designation</label>
              <input name="role" value={formData.role} onChange={handleChange} className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white" placeholder="Lead Architect" required />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-brand-text-dim ml-1">
                  <FaInstagram size={10} /> Instagram
                </label>
                <input name="instagram" value={formData.instagram} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white text-xs" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-brand-text-dim ml-1">
                  <FaLinkedin size={10} /> LinkedIn
                </label>
                <input name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white text-xs" />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-brand-text-dim ml-1">
                  <FaGithub size={10} /> GitHub
                </label>
                <input name="github" value={formData.github} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white text-xs" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-premium py-6 text-xs mt-6">
            {loading ? 'Initializing Personnel...' : editMember ? 'Update Profile' : 'Confirm Recruitment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamForm;
