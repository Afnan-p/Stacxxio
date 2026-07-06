import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, Plus, Trash2, Globe, ChevronRight, ChevronLeft, Check, Video, Image, Link as LinkIcon, FileText, Layout } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../api/axios';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, title: 'Basic Info', icon: <Layout size={14} /> },
  { id: 2, title: 'Media', icon: <Video size={14} /> },
  { id: 3, title: 'Details', icon: <FileText size={14} /> },
  { id: 4, title: 'Links', icon: <Globe size={14} /> },
];

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
  
  const [dragActiveMedia, setDragActiveMedia] = useState(false);
  const [dragActiveThumb, setDragActiveThumb] = useState(false);

  const mediaRef = useRef(null);
  const thumbRef = useRef(null);
  const galleryRef = useRef(null);

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
        category: editProject.category ? (typeof editProject.category === 'object' ? editProject.category._id : editProject.category) : '',
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
    const file = e.target.files?.[0];
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
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
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
      toast.success('Category created');
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.title.trim()) { toast.error('Project Title is required'); return false; }
      if (!formData.category) { toast.error('Please select a category'); return false; }
    } else if (step === 2) {
      if (formData.type === 'image' && !mediaPreview && uploadMode === 'file') {
        toast.error('Please upload a primary image'); return false;
      }
      if (formData.type === 'video') {
        if (uploadMode === 'url' && !formData.videoUrl.trim()) {
          toast.error('Video URL is required'); return false;
        }
        if (uploadMode === 'file' && !mediaFile && !editProject) {
          toast.error('Please upload a video file'); return false;
        }
        if (!thumbnailPreview && !formData.thumbnail.trim()) {
          toast.error('Thumbnail is required for videos'); return false;
        }
      }
    } else if (step === 3) {
      if (!formData.techStack.trim()) { toast.error('Tech stack is required'); return false; }
      if (!formData.description.trim()) { toast.error('Description is required'); return false; }
    }
    return true;
  };

  const nextStep = () => { if (validateStep()) setStep(prev => prev + 1); };
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

    // Send existing gallery image URLs that were not deleted
    const existingImages = previewImages.filter(img => typeof img === 'string' && img.startsWith('http'));
    data.append('existingImages', JSON.stringify(existingImages));

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };

      if (editProject) {
        await API.put(`/api/projects/${editProject._id}`, data, config);
        toast.success('Project updated successfully');
      } else {
        await API.post('/api/projects', data, config);
        toast.success('Project created successfully');
      }
      
      onRefresh();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  // --- Reusable UI ---
  const InputLabel = ({ children, required }) => (
    <label className="block text-[#111111] font-semibold text-[13px] tracking-[0.04em] mb-2">
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const inputClass = "w-full h-[56px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] px-[18px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none";
  const textareaClass = "w-full min-h-[140px] bg-[#FFFFFF] border-[1.5px] border-[#D1D5DB] text-[#111111] placeholder-[#9CA3AF] rounded-[14px] px-[18px] py-[16px] font-medium transition-all duration-250 ease-in-out focus:border-[#111111] focus:ring-4 focus:ring-black/5 focus:outline-none resize-y";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/35 backdrop-blur-[10px] overflow-y-auto">
      <motion.div 
        initial={{ scale: 0.96, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 20, opacity: 0 }}
        className="bg-[#FFFFFF] w-full max-w-[700px] rounded-[24px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] relative flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-6 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              {editProject ? 'Edit Project' : 'Create Project'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100 shrink-0">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200 z-0" />
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-gray-900 z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            
            {STEPS.map((s) => {
              const isCompleted = step > s.id;
              const isCurrent = step === s.id;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 bg-white ${
                      isCompleted ? 'border-gray-900 text-gray-900' : 
                      isCurrent ? 'border-gray-900 text-gray-900' : 
                      'border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : s.icon}
                  </div>
                  <span className={`text-xs font-semibold tracking-wide ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 overflow-y-auto flex-grow">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <InputLabel required>Project Title</InputLabel>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Modern E-commerce Dashboard"
                  />
                </div>

                <div>
                  <InputLabel required>Category Segment</InputLabel>
                  {!isAddingCategory ? (
                    <div className="flex gap-3">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="" disabled>Select a category</option>
                        {categories.map(cat => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                      <button 
                        type="button"
                        onClick={() => setIsAddingCategory(true)}
                        className="w-[56px] h-[56px] shrink-0 bg-gray-50 border-[1.5px] border-gray-200 text-gray-700 flex items-center justify-center rounded-[14px] hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className={inputClass}
                        placeholder="New category name..."
                        autoFocus
                      />
                      <button 
                        type="button"
                        onClick={handleAddCategory}
                        className="h-[56px] px-6 shrink-0 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black transition-colors"
                      >
                        Add
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsAddingCategory(false)}
                        className="w-[56px] h-[56px] shrink-0 bg-red-50 text-red-500 flex items-center justify-center rounded-[14px] hover:bg-red-100 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                
                <div className="flex bg-gray-100 p-1 rounded-[14px] w-fit">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, type: 'image'})}
                    className={`px-6 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${formData.type === 'image' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Image Asset
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, type: 'video'})}
                    className={`px-6 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${formData.type === 'video' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Video Asset
                  </button>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-[14px] w-fit mt-4">
                  <button 
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`px-6 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${uploadMode === 'file' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Upload File
                  </button>
                  <button 
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`px-6 py-2.5 rounded-[10px] text-[13px] font-bold transition-all ${uploadMode === 'url' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    Remote URL
                  </button>
                </div>

                {uploadMode === 'file' ? (
                  <div>
                    <InputLabel required>Primary Media</InputLabel>
                    <div 
                      className={`mt-2 border-2 border-dashed rounded-[14px] transition-all duration-300 ${dragActiveMedia ? 'border-gray-900 bg-gray-50' : 'border-[#D1D5DB] bg-[#FFFFFF] hover:border-gray-400'} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
                      onDragEnter={(e) => { e.preventDefault(); setDragActiveMedia(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDragActiveMedia(false); }}
                      onDragOver={(e) => { e.preventDefault(); setDragActiveMedia(true); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActiveMedia(false);
                        if (e.dataTransfer.files?.[0]) {
                          mediaRef.current.files = e.dataTransfer.files;
                          handleMediaChange({ target: { files: e.dataTransfer.files } });
                        }
                      }}
                    >
                      <input ref={mediaRef} type="file" onChange={handleMediaChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept={formData.type === 'video' ? "video/*" : "image/*"} />
                      
                      {mediaPreview ? (
                        <div className="relative w-full z-20">
                          {formData.type === 'video' ? (
                            <video src={mediaPreview} className="w-full h-[240px] object-cover rounded-xl shadow-sm bg-black" autoPlay muted loop />
                          ) : (
                            <img src={mediaPreview} className="w-full h-[240px] object-cover rounded-xl shadow-sm bg-gray-100" />
                          )}
                          <div className="mt-4 flex justify-center">
                            <button type="button" onClick={() => mediaRef.current?.click()} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50">
                              Replace Media
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center pointer-events-none">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                            <UploadCloud className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-900 font-semibold mb-1">Upload {formData.type}</p>
                          <p className="text-gray-500 text-sm">Drag and drop or click to browse</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <InputLabel required>Remote URL</InputLabel>
                    <input
                      name={formData.type === 'video' ? "videoUrl" : "mediaUrl"}
                      value={formData.type === 'video' ? formData.videoUrl : formData.mediaUrl}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder={formData.type === 'video' ? "https://youtube.com/watch?v=..." : "https://example.com/image.jpg"}
                    />
                  </div>
                )}

                {formData.type === 'video' && (
                  <div>
                    <InputLabel required>Video Thumbnail</InputLabel>
                    <div 
                      className={`mt-2 border-2 border-dashed rounded-[14px] transition-all duration-300 ${dragActiveThumb ? 'border-gray-900 bg-gray-50' : 'border-[#D1D5DB] bg-[#FFFFFF] hover:border-gray-400'} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
                      onDragEnter={(e) => { e.preventDefault(); setDragActiveThumb(true); }}
                      onDragLeave={(e) => { e.preventDefault(); setDragActiveThumb(false); }}
                      onDragOver={(e) => { e.preventDefault(); setDragActiveThumb(true); }}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActiveThumb(false);
                        if (e.dataTransfer.files?.[0]) {
                          thumbRef.current.files = e.dataTransfer.files;
                          handleThumbnailChange({ target: { files: e.dataTransfer.files } });
                        }
                      }}
                    >
                      <input ref={thumbRef} type="file" onChange={handleThumbnailChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                      {thumbnailPreview ? (
                        <div className="relative w-full z-20">
                          <img src={thumbnailPreview} className="w-full h-[180px] object-cover rounded-xl shadow-sm" />
                          <div className="mt-4 flex justify-center">
                            <button type="button" onClick={() => thumbRef.current?.click()} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50">
                              Replace Thumbnail
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center pointer-events-none">
                          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border border-gray-100">
                            <Image className="w-6 h-6 text-gray-400" />
                          </div>
                          <p className="text-gray-900 font-semibold text-sm">Upload Thumbnail Image</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <input
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Or provide remote thumbnail URL..."
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <InputLabel required>Tech Stack (Comma Separated)</InputLabel>
                  <input
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="React, Tailwind, Node.js"
                  />
                </div>

                <div>
                  <InputLabel required>Description</InputLabel>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={textareaClass}
                    placeholder="Describe the project..."
                  />
                </div>

                <div>
                  <InputLabel>Additional Gallery Images</InputLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-200">
                        <img src={src} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Trash2 className="text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square rounded-[14px] border-2 border-dashed border-[#D1D5DB] flex flex-col items-center justify-center cursor-pointer hover:border-gray-900 hover:bg-gray-50 transition-all bg-white">
                      <input type="file" multiple onChange={handleImageChange} className="hidden" accept="image/*" />
                      <Plus className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-xs font-semibold text-gray-500">Add Images</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <InputLabel>Live Deployment URL</InputLabel>
                  <input
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://yourproject.com"
                  />
                </div>
                <div>
                  <InputLabel>Source Repository (GitHub)</InputLabel>
                  <input
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="https://github.com/..."
                  />
                </div>
                
                <div className="p-6 rounded-[20px] bg-gray-50 border border-gray-200 mt-6 flex items-center gap-6">
                  <div className="w-24 h-24 shrink-0 rounded-[14px] overflow-hidden bg-gray-200 border border-gray-300">
                    {mediaPreview ? (
                      formData.type === 'video' ? (
                        <video src={mediaPreview} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={mediaPreview} className="w-full h-full object-cover" />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold uppercase">No Image</div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{formData.title || 'Untitled Project'}</h3>
                    <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-2">
                      {categories.find(c => c._id === formData.category)?.name || 'Uncategorized'}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2">{formData.description || 'No description provided'}</p>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gray-100 flex items-center justify-between shrink-0 bg-gray-50/30 rounded-b-[24px]">
          {step > 1 ? (
            <button 
              onClick={prevStep}
              className="h-[56px] px-6 bg-white border-2 border-gray-200 text-gray-900 font-semibold rounded-[14px] hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <ChevronLeft size={18} /> Back
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length ? (
            <button 
              onClick={nextStep}
              className="h-[56px] px-8 bg-gray-900 text-white font-semibold rounded-[14px] hover:bg-black hover:shadow-lg transition-all flex items-center gap-2 shadow-md"
            >
              Next Step <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="h-[56px] px-8 bg-[#111111] text-white font-semibold rounded-[14px] hover:shadow-brand-glow transition-all flex items-center gap-2 disabled:opacity-50 shadow-md"
            >
              {loading ? 'Saving...' : (editProject ? 'Save Changes' : 'Create Project')} 
              {!loading && <Check size={18} />}
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default ProjectForm;
