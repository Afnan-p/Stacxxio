import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Globe } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../api/axios';
import toast from 'react-hot-toast';
import { PROJECT_CATEGORIES } from '../constants/categories';

const ProjectForm = ({ onClose, onRefresh, editProject = null }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    techStack: '',
    liveLink: '',
    githubLink: '',
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProject) {
      setFormData({
        title: editProject.title,
        description: editProject.description,
        category: editProject.category,
        techStack: editProject.techStack.join(', '),
        liveLink: editProject.liveLink || '',
        githubLink: editProject.githubLink || '',
      });
      setPreviewImages(editProject.images || []);
    }
  }, [editProject]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    setImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('techStack', JSON.stringify(formData.techStack.split(',').map(s => s.trim())));
    data.append('liveLink', formData.liveLink);
    data.append('githubLink', formData.githubLink);
    
    images.forEach((img) => {
      data.append('images', img);
    });

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      };

      if (editProject) {
        await API.put(`/api/projects/${editProject._id}`, data, config);
        toast.success('Masterpiece refined successfully');
      } else {
        await API.post('/api/projects', data, config);
        toast.success('New masterpiece added to gallery');
      }
      
      onRefresh();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Evolution failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-bg/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-brand-surface w-full max-w-4xl rounded-[3rem] border border-white/5 shadow-premium overflow-hidden relative my-auto">
        <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div>
            <h2 className="text-3xl font-display font-bold text-white">
              {editProject ? 'Refine Masterpiece' : 'Project Blueprint'}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mt-2">Studio Asset Management</p>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Identity Section */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Project Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all"
                placeholder="Cyberpunk Dashboard"
                required
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white appearance-none"
              >
                {PROJECT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Architectural Stack (comma separated)</label>
            <input
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all"
              placeholder="React, Framer Motion, Tailwind CSS"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">The Narrative</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white resize-none transition-all"
              placeholder="Tell the story of this creation..."
              required
            />
          </div>

          {/* Links Section */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2 flex items-center gap-2">
                <Globe size={12} className="text-brand-accent" /> Live Deployment
              </label>
              <input
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all"
                placeholder="https://masterpiece.com"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2 flex items-center gap-2">
                <FaGithub size={12} className="text-brand-accent" /> Source Repository
              </label>
              <input
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all"
                placeholder="https://github.com/stackxxio/repo"
              />
            </div>
          </div>

          {/* Gallery Section */}
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Visual Gallery (Upload multiple)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {previewImages.map((src, index) => (
                <div key={index} className="relative aspect-square rounded-[1.5rem] overflow-hidden group border border-white/5">
                  <img src={src} className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="text-white" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-[1.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent/40 hover:bg-white/[0.02] transition-all group">
                <input type="file" multiple onChange={handleImageChange} className="hidden" />
                <Plus className="w-8 h-8 text-brand-text-dim group-hover:text-brand-accent transition-colors" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-brand-text-dim mt-2">Add Asset</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-premium py-6 text-[12px] mt-10 disabled:opacity-50"
          >
            {loading ? 'Transmitting Data...' : editProject ? 'Finalize Evolution' : 'Initialize Production'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
