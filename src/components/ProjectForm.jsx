import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Globe, ChevronRight, ChevronLeft, Check, Video, Image, Link as LinkIcon, FileText, Layout } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../api/axios';
import toast from 'react-hot-toast';

const ProjectForm = ({ onClose, onRefresh, editProject = null }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    techStack: '',
    liveLink: '',
    githubLink: '',
    type: 'image',
    videoUrl: '',
    thumbnail: '',
    mediaUrl: '',
  });
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'url'
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/api/categories');
      setCategories(res.data);
      if (!editProject && res.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: res.data[0]._id }));
      }
    } catch (err) {
      toast.error('Failed to load segments');
    }
  };

  useEffect(() => {
    if (editProject) {
      setFormData({
        title: editProject.title,
        description: editProject.description,
        category: typeof editProject.category === 'object' ? editProject.category._id : editProject.category,
        techStack: editProject.techStack.join(', '),
        liveLink: editProject.liveLink || '',
        githubLink: editProject.githubLink || '',
        type: editProject.type || 'image',
        videoUrl: editProject.videoUrl || '',
        thumbnail: editProject.thumbnail || '',
        mediaUrl: editProject.mediaUrl || '',
      });
      setPreviewImages(editProject.images || []);
      
      if (editProject.mediaUrl) {
        const fullUrl = editProject.mediaUrl.startsWith('http') 
          ? editProject.mediaUrl 
          : `${import.meta.env.VITE_API_URL}/${editProject.mediaUrl}`;
        setMediaPreview(fullUrl);
        setUploadMode(editProject.mediaUrl.startsWith('http') ? 'url' : 'file');
      }
      if (editProject.thumbnail) {
        const fullThumb = editProject.thumbnail.startsWith('http') 
          ? editProject.thumbnail 
          : `${import.meta.env.VITE_API_URL}/${editProject.thumbnail}`;
        setThumbnailPreview(fullThumb);
      }
    }
  }, [editProject, categories]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      if (file.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, type: 'video' }));
      } else {
        setFormData(prev => ({ ...prev, type: 'image' }));
      }
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
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

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await API.post('/api/categories', { name: newCategoryName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories([...categories, res.data]);
      setFormData({ ...formData, category: res.data._id });
      setNewCategoryName('');
      setIsAddingCategory(false);
      toast.success('New segment initialized');
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.title.trim()) {
        toast.error('Project Title is required');
        return false;
      }
      if (!formData.category) {
        toast.error('Please select a category');
        return false;
      }
    } else if (step === 2) {
      if (formData.type === 'image' && !mediaPreview && uploadMode === 'file') {
        toast.error('Please upload a primary image');
        return false;
      }
      if (formData.type === 'video') {
        if (uploadMode === 'url' && !formData.videoUrl.trim()) {
          toast.error('Video URL is required');
          return false;
        }
        if (uploadMode === 'file' && !mediaFile && !editProject) {
          toast.error('Please upload a video file');
          return false;
        }
        if (!thumbnailPreview && !formData.thumbnail.trim()) {
          toast.error('Thumbnail is required for cinematic videos');
          return false;
        }
      }
    } else if (step === 3) {
      if (!formData.techStack.trim()) {
        toast.error('Tech stack is required');
        return false;
      }
      if (!formData.description.trim()) {
        toast.error('Description is required');
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep()) return;
    
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('techStack', JSON.stringify(formData.techStack.split(',').map(s => s.trim())));
    data.append('liveLink', formData.liveLink);
    data.append('githubLink', formData.githubLink);
    data.append('type', formData.type);
    data.append('videoUrl', formData.videoUrl);
    data.append('thumbnail', formData.thumbnail);
    data.append('mediaUrl', formData.mediaUrl);
    
    if (mediaFile) data.append('media', mediaFile);
    if (thumbnailFile) data.append('thumbnail', thumbnailFile);
    images.forEach((img) => data.append('images', img));

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

  const steps = [
    { id: 1, title: 'Basic Info', icon: <Layout size={14} /> },
    { id: 2, title: 'Media Selection', icon: <Video size={14} /> },
    { id: 3, title: 'Details', icon: <FileText size={14} /> },
    { id: 4, title: 'Links & Preview', icon: <Globe size={14} /> },
  ];

  return (
    <div className="fixed inset-0 bg-brand-bg/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-brand-surface w-full max-w-4xl rounded-[2.5rem] md:rounded-[3.5rem] border border-white/5 shadow-premium overflow-hidden relative flex flex-col max-h-[90vh]">
        
        <div className="p-8 md:p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              {editProject ? 'Refine Masterpiece' : 'Project Blueprint'}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent mt-2">Evolution Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-3 md:p-4 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white group">
            <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        <div className="px-10 py-6 bg-white/[0.01] border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${step >= s.id ? 'bg-brand-accent text-brand-bg shadow-[0_0_15px_rgba(0,255,157,0.3)]' : 'bg-white/5 text-brand-text-dim border border-white/5'}`}>
                  {step > s.id ? <Check size={16} /> : s.icon}
                </div>
                <span className={`text-[8px] font-bold uppercase tracking-widest transition-colors duration-300 ${step >= s.id ? 'text-brand-accent' : 'text-brand-text-dim'}`}>
                  {s.title}
                </span>
              </div>
            ))}
            <div className="absolute left-[10%] right-[10%] h-[1px] bg-white/5 -z-0 top-[118px] md:top-[138px]"></div>
            <div 
              className="absolute left-[10%] h-[1px] bg-brand-accent shadow-[0_0_10px_rgba(0,255,157,0.5)] -z-0 top-[118px] md:top-[138px] transition-all duration-500 ease-out" 
              style={{ width: `${(step - 1) * 26.66}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto custom-scrollbar p-8 md:p-12">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
            
            {step === 1 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Project Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-8 py-5 rounded-2xl md:rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all placeholder:text-white/10"
                    placeholder="Enter project name..."
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Category Segment</label>
                  {!isAddingCategory ? (
                    <div className="flex gap-4">
                      <div className="relative flex-grow">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-8 py-5 rounded-2xl md:rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white appearance-none transition-all cursor-pointer"
                        >
                          <option value="" disabled>Select a segment</option>
                          {categories.map(cat => (
                            <option key={cat._id} value={cat._id} className="bg-brand-surface">{cat.name}</option>
                          ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-brand-text-dim">
                          <ChevronLeft className="-rotate-90" size={16} />
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsAddingCategory(true)}
                        className="p-5 bg-white/5 hover:bg-white/10 text-brand-accent rounded-2xl md:rounded-[1.5rem] border border-white/5 transition-all group"
                      >
                        <Plus className="group-hover:scale-125 transition-transform" size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4 animate-in fade-in zoom-in-95 duration-300">
                      <input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="flex-grow px-8 py-5 rounded-2xl md:rounded-[1.5rem] bg-white/[0.05] border border-brand-accent/30 focus:border-brand-accent outline-none text-white transition-all"
                        placeholder="New category name..."
                        autoFocus
                      />
                      <button 
                        type="button"
                        onClick={handleAddCategory}
                        className="px-6 bg-brand-accent text-brand-bg rounded-2xl md:rounded-[1.5rem] font-bold text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-accent/20"
                      >
                        Initialize
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsAddingCategory(false)}
                        className="p-5 bg-white/5 hover:bg-red-500/10 text-white/40 hover:text-red-500 rounded-2xl md:rounded-[1.5rem] transition-all"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center px-2">
                  <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, type: 'image'})}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${formData.type === 'image' ? 'bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20' : 'text-brand-text-dim hover:text-white'}`}
                    >
                      <Image size={14} /> Still Image
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, type: 'video'})}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${formData.type === 'video' ? 'bg-brand-accent text-brand-bg shadow-lg shadow-brand-accent/20' : 'text-brand-text-dim hover:text-white'}`}
                    >
                      <Video size={14} /> Motion Piece
                    </button>
                  </div>
                  
                  <div className="flex bg-white/5 p-1 rounded-xl">
                    <button 
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`px-4 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all ${uploadMode === 'file' ? 'bg-white/10 text-white' : 'text-brand-text-dim hover:text-white'}`}
                    >
                      Upload
                    </button>
                    <button 
                      type="button"
                      onClick={() => setUploadMode('url')}
                      className={`px-4 py-1.5 rounded-lg text-[8px] font-bold uppercase tracking-widest transition-all ${uploadMode === 'url' ? 'bg-white/10 text-white' : 'text-brand-text-dim hover:text-white'}`}
                    >
                      Remote
                    </button>
                  </div>
                </div>

                {uploadMode === 'file' ? (
                  <label className="group relative block aspect-video w-full rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-white/10 hover:border-brand-accent/40 bg-white/[0.02] overflow-hidden cursor-pointer transition-all">
                    <input type="file" onChange={handleMediaChange} className="hidden" accept={formData.type === 'video' ? "video/*" : "image/*"} />
                    {mediaPreview ? (
                      <div className="w-full h-full relative">
                        {formData.type === 'video' ? (
                          <video src={mediaPreview} className="w-full h-full object-cover" muted autoPlay loop />
                        ) : (
                          <img src={mediaPreview} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                          <div className="flex flex-col items-center gap-3 scale-90 group-hover:scale-100 transition-transform">
                            <Upload className="text-brand-accent" size={32} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Substitute Asset</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-brand-text-dim group-hover:text-brand-accent transition-all">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-accent/10 transition-all duration-500">
                          <Upload size={28} />
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Select High-Fidelity {formData.type}</p>
                          <p className="text-[8px] font-medium opacity-40 uppercase tracking-widest">Max 50MB • Premium Assets Only</p>
                        </div>
                      </div>
                    )}
                  </label>
                ) : (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Remote {formData.type === 'video' ? 'Video' : 'Asset'} URL</label>
                      <div className="relative">
                        <input
                          name={formData.type === 'video' ? "videoUrl" : "mediaUrl"}
                          value={formData.type === 'video' ? formData.videoUrl : formData.mediaUrl}
                          onChange={handleChange}
                          required={formData.type === 'video'}
                          className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all pr-14"
                          placeholder={formData.type === 'video' ? "https://youtube.com/watch?v=..." : "https://masterpiece.com/asset.jpg"}
                        />
                        <LinkIcon className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10" size={18} />
                      </div>
                    </div>
                  </div>
                )}

                {formData.type === 'video' && (
                  <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Cinematic Cover Thumbnail <span className="text-brand-accent font-black">*</span></label>
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <label className="aspect-video rounded-2xl md:rounded-[1.5rem] border-2 border-dashed border-white/10 hover:border-brand-accent/40 bg-white/[0.02] flex items-center justify-center cursor-pointer transition-all overflow-hidden relative group">
                        <input type="file" onChange={handleThumbnailChange} className="hidden" accept="image/*" />
                        {thumbnailPreview ? (
                          <>
                            <img src={thumbnailPreview} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all backdrop-blur-sm">
                              <Upload className="text-brand-accent" size={24} />
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-brand-text-dim group-hover:text-brand-accent transition-colors">
                            <Plus size={20} />
                            <span className="text-[8px] font-bold uppercase tracking-widest">Select Thumbnail</span>
                          </div>
                        )}
                      </label>
                      <div className="space-y-4">
                        <p className="text-[9px] text-brand-text-dim leading-relaxed font-medium uppercase tracking-wider italic">
                          Required for motion pieces. Choose a high-impact frame that represents the masterpiece in the gallery.
                        </p>
                        <input
                          name="thumbnail"
                          value={formData.thumbnail}
                          onChange={handleChange}
                          className="w-full px-6 py-4 rounded-xl bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white text-[10px] placeholder:text-white/10"
                          placeholder="Or remote thumbnail URL..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Architectural Stack</label>
                  <div className="relative">
                    <input
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleChange}
                      className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all placeholder:text-white/10"
                      placeholder="React, Framer Motion, Tailwind CSS"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[8px] font-bold text-brand-text-dim uppercase tracking-tighter">Comma Separated</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">The Narrative</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-8 py-6 rounded-[2rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white resize-none transition-all placeholder:text-white/10 leading-relaxed"
                    placeholder="Tell the cinematic story of this creation. Focus on the problem solved and the unique execution..."
                  />
                </div>

                <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2">Visual Gallery (Upload multiple)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/5 shadow-lg">
                        <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <button 
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                        >
                          <Trash2 className="text-white scale-75 group-hover:scale-100 transition-transform" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-brand-accent/40 hover:bg-brand-accent/[0.02] transition-all group active:scale-95">
                      <input type="file" multiple onChange={handleImageChange} className="hidden" />
                      <Plus className="w-6 h-6 text-brand-text-dim group-hover:text-brand-accent group-hover:rotate-90 transition-all duration-300" />
                      <span className="text-[8px] font-bold uppercase tracking-widest text-brand-text-dim mt-2 group-hover:text-brand-accent">Add Asset</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-dim ml-2 flex items-center gap-2">
                      <Globe size={12} className="text-brand-accent" /> Live Deployment
                    </label>
                    <input
                      name="liveLink"
                      value={formData.liveLink}
                      onChange={handleChange}
                      className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all placeholder:text-white/10"
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
                      className="w-full px-8 py-5 rounded-[1.5rem] bg-white/[0.03] border border-white/10 focus:border-brand-accent outline-none text-white transition-all placeholder:text-white/10"
                      placeholder="https://github.com/stackxxio/repo"
                    />
                  </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white mb-2">{formData.title || 'Untitled Project'}</h3>
                      <p className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">
                        {categories.find(c => c._id === formData.category)?.name || 'Uncategorized'}
                      </p>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[8px] font-black uppercase tracking-widest">
                      Ready for Production
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-video rounded-xl overflow-hidden border border-white/5">
                      {mediaPreview ? (
                        formData.type === 'video' ? (
                          <video src={mediaPreview} className="w-full h-full object-cover" muted />
                        ) : (
                          <img src={mediaPreview} className="w-full h-full object-cover" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/5 text-[10px] text-brand-text-dim uppercase font-bold italic">No Asset</div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-brand-text-dim uppercase tracking-widest">Core Stack</span>
                        <p className="text-[10px] text-white/80 line-clamp-1">{formData.techStack || 'Not defined'}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-bold text-brand-text-dim uppercase tracking-widest">Narrative</span>
                        <p className="text-[10px] text-white/60 line-clamp-2 leading-relaxed">{formData.description || 'No narrative provided...'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="p-8 md:p-10 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-[10px] uppercase tracking-widest transition-all hover:-translate-x-1 active:scale-95"
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
          </div>
          
          <div className="flex gap-4">
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-brand-accent text-brand-bg font-black text-[10px] uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-accent/20"
              >
                Next Step <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-3 px-12 py-5 rounded-2xl bg-brand-accent text-brand-bg font-black text-[12px] uppercase tracking-widest transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,157,0.4)] active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <>Transmitting <div className="w-4 h-4 border-2 border-brand-bg/30 border-t-brand-bg rounded-full animate-spin" /></>
                ) : (
                  <>Initialize Production <Check size={18} /> </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
