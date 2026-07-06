import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Image as ImageIcon, Plus, Trash2, ChevronRight, ChevronLeft, Check, UploadCloud } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, title: 'Basic Info' },
  { id: 2, title: 'Media' },
  { id: 3, title: 'Details' },
  { id: 4, title: 'SEO' }
];

const ServiceForm = ({ editService, onClose, onRefresh }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    fullDescription: '',
    icon: 'FaCode',
    tag: '',
    order: 0,
    seoTitle: '',
    seoDescription: ''
  });
  
  const [features, setFeatures] = useState(['']);
  const [technologies, setTechnologies] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editService) {
      setFormData({
        title: editService.title || '',
        slug: editService.slug || '',
        description: editService.description || '',
        fullDescription: editService.fullDescription || '',
        icon: editService.icon || 'FaCode',
        tag: editService.tag || '',
        order: editService.order || 0,
        seoTitle: editService.seoTitle || '',
        seoDescription: editService.seoDescription || ''
      });
      setFeatures(editService.features?.length > 0 ? editService.features : ['']);
      setTechnologies(editService.technologies || []);
      setFaqs(editService.faqs || []);
      if (editService.image) {
        setImagePreview(editService.image.startsWith('http') ? editService.image : `${import.meta.env.VITE_API_URL}/${editService.image}`);
      }
    }
  }, [editService]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      
      submitData.append('features', JSON.stringify(features.filter(f => f.trim() !== '')));
      submitData.append('technologies', JSON.stringify(technologies));
      submitData.append('faqs', JSON.stringify(faqs));
      
      if (imageFile) {
        submitData.append('image', imageFile);
      }

      if (editService) {
        await API.put(`/api/services/${editService._id}`, submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Service updated successfully');
      } else {
        await API.post('/api/services', submitData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Service created successfully');
      }
      onRefresh();
      onClose();
    } catch (err) {
      toast.error('Failed to save service');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // --- Reusable UI Components ---
  
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
              {editService ? 'Edit Service' : 'Create Service'}
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${
                      isCompleted ? 'bg-gray-900 border-gray-900 text-white' : 
                      isCurrent ? 'bg-white border-gray-900 text-gray-900' : 
                      'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <Check size={14} /> : s.id}
                  </div>
                  <span className={`text-xs font-semibold tracking-wide ${isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-8 overflow-y-auto flex-grow">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputLabel required>Service Title</InputLabel>
                    <input 
                      type="text"
                      placeholder="e.g. App Development"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <InputLabel>Custom Slug</InputLabel>
                    <input 
                      type="text"
                      placeholder="e.g. app-development"
                      value={formData.slug}
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <InputLabel>Tag</InputLabel>
                    <input 
                      type="text"
                      placeholder="e.g. Popular"
                      value={formData.tag}
                      onChange={(e) => setFormData({...formData, tag: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <InputLabel>Display Order</InputLabel>
                    <input 
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <InputLabel required>Short Description</InputLabel>
                  <textarea 
                    placeholder="Brief 1-2 lines for the main grid card..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className={textareaClass}
                    style={{ minHeight: '100px' }}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <InputLabel>Cover Image</InputLabel>
                  <div 
                    className={`mt-2 border-2 border-dashed rounded-[14px] transition-all duration-300 ${dragActive ? 'border-gray-900 bg-gray-50' : 'border-[#D1D5DB] bg-[#FFFFFF] hover:border-gray-400'} flex flex-col items-center justify-center p-8 relative`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    
                    {imagePreview ? (
                      <div className="relative w-full z-20">
                        <img src={imagePreview} alt="Preview" className="w-full h-[240px] object-cover rounded-xl shadow-sm" />
                        <div className="mt-4 flex gap-3 justify-center">
                          <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm rounded-lg hover:bg-gray-50">
                            Replace Image
                          </button>
                          <button type="button" onClick={removeImage} className="px-4 py-2 bg-red-50 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-100">
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center pointer-events-none">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                          <UploadCloud className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-900 font-semibold mb-1">Click or drag image to upload</p>
                        <p className="text-gray-500 text-sm">PNG, JPG or WEBP up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <InputLabel>Detailed Overview</InputLabel>
                  <textarea 
                    placeholder="Full description for the dedicated service page..."
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                    className={textareaClass}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <InputLabel>Key Capabilities</InputLabel>
                    <button 
                      type="button" 
                      onClick={() => setFeatures([...features, ''])}
                      className="text-gray-900 font-semibold text-xs flex items-center gap-1 hover:text-brand-accent transition-colors"
                    >
                      <Plus size={14} /> Add Feature
                    </button>
                  </div>
                  <div className="space-y-3">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3">
                        <input 
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newF = [...features];
                            newF[idx] = e.target.value;
                            setFeatures(newF);
                          }}
                          placeholder="e.g. Cloud Architecture"
                          className={inputClass}
                        />
                        <button 
                          type="button"
                          onClick={() => setFeatures(features.filter((_, i) => i !== idx))}
                          className="w-[56px] h-[56px] flex items-center justify-center shrink-0 bg-red-50 text-red-500 rounded-[14px] hover:bg-red-500 hover:text-white transition-all border border-red-100 hover:border-red-500"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <InputLabel>Meta Title</InputLabel>
                  <input 
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({...formData, seoTitle: e.target.value})}
                    className={inputClass}
                    placeholder="SEO Title"
                  />
                </div>
                <div>
                  <InputLabel>Meta Description</InputLabel>
                  <textarea 
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({...formData, seoDescription: e.target.value})}
                    className={textareaClass}
                    style={{ minHeight: '100px' }}
                    placeholder="SEO Description"
                  />
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
            <div /> // Placeholder for spacing
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
              disabled={isSubmitting}
              className="h-[56px] px-8 bg-[#111111] text-white font-semibold rounded-[14px] hover:shadow-brand-glow transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {isSubmitting ? 'Saving...' : (editService ? 'Save Changes' : 'Create Service')} 
              {!isSubmitting && <Save size={18} />}
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default ServiceForm;
