import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft, Maximize2, X } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../api/axios';
import { getOptimizedMedia } from '../utils/cloudinary';
import SEO from '../components/SEO';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // URL Helper to ensure absolute links
  const formatLiveUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/api/projects/${id}`);
        setProject(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProject();
    window.scrollTo(0, 0);
  }, [id]);

  // Consolidate images into a single gallery
  const gallery = React.useMemo(() => {
    if (!project) return [];
    
    const images = [];
    
    // Add primary media if it's an image
    if (project.type === 'image' && project.mediaUrl) {
      images.push(project.mediaUrl);
    }
    
    // Add gallery images, avoiding duplicates
    if (project.images && Array.isArray(project.images)) {
      project.images.forEach(img => {
        if (!images.includes(img)) {
          images.push(img);
        }
      });
    }

    // Fallback to thumbnail if nothing else exists
    if (images.length === 0 && project.thumbnail) {
      images.push(project.thumbnail);
    }
    
    return images;
  }, [project]);

  // Preload images for smooth switching
  useEffect(() => {
    if (gallery.length > 0) {
      gallery.forEach(img => {
        const image = new Image();
        image.src = img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL}/${img}`;
      });
    }
  }, [gallery]);

  const nextImage = useCallback(() => {
    if (gallery.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery]);

  const prevImage = useCallback(() => {
    if (gallery.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextImage, prevImage]);

  if (loading) return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-2 border-brand-accent border-t-transparent rounded-full"
      />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-display font-bold mb-6 text-brand-text">Masterpiece Not Found</h1>
      <Link to="/" className="btn-premium">Return to Gallery</Link>
    </div>
  );

  const getImageUrl = (img, type = 'hero') => {
    return getOptimizedMedia(img, type);
  };

  return (
    <div className="pt-12 md:pt-20 pb-12 md:pb-20 bg-brand-bg min-h-screen luxury-noise">
      <SEO 
        title={`${project.title} | ZYNEXTA`}
        description={project.description ? (project.description.length > 160 ? project.description.slice(0, 157) + "..." : project.description) : "Explore project case study by ZYNEXTA."}
        canonical={`https://zynexta.com/project/${project._id}`}
        image={project.thumbnail || project.mediaUrl || (project.images && project.images[0]) || "https://zynexta.com/social-banner.png"}
      />
      <div className="container mx-auto px-4 md:px-10">
        <Link to="/" className="inline-flex items-center gap-3 text-brand-text-dim hover:text-brand-accent transition-colors mb-8 md:mb-10 group">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-2 transition-transform" />
          <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em]">Back to Gallery</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 xl:gap-16 items-start">
          {/* Media Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-4 md:space-y-6"
          >
            {project.type === 'video' ? (
              <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-premium bg-gray-50 aspect-video flex items-center justify-center">
                {(() => {
                  const vUrl = project.videoUrl || project.mediaUrl;
                  if (!vUrl) return <div className="text-brand-text-dim italic text-xs md:text-base">Motion Asset Missing</div>;

                  const isYoutube = vUrl.includes('youtube.com') || vUrl.includes('youtu.be');
                  const isVimeo = vUrl.includes('vimeo.com');
                  
                  if (isYoutube) {
                    const videoId = vUrl.split('v=')[1]?.split('&')[0] || vUrl.split('/').pop();
                    return (
                      <iframe 
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="w-full h-full"
                        allowFullScreen
                        title={project.title}
                      />
                    );
                  }

                  if (isVimeo) {
                    const videoId = vUrl.split('/').pop();
                    return (
                      <iframe 
                        src={`https://player.vimeo.com/video/${videoId}`}
                        className="w-full h-full"
                        allowFullScreen
                        title={project.title}
                      />
                    );
                  }

                  const finalSrc = vUrl.startsWith('http') ? vUrl : `${import.meta.env.VITE_API_URL}/${vUrl}`;
                  const finalPoster = project.thumbnail ? getImageUrl(project.thumbnail) : '';

                  return (
                    <video 
                      src={finalSrc} 
                      controls 
                      preload="none"
                      className="w-full h-full object-contain"
                      poster={finalPoster}
                    />
                  );
                })()}
              </div>
            ) : (
              <>
                <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-premium group bg-[#0b0f19] flex items-center justify-center p-3 md:p-6 min-h-[250px] md:min-h-[450px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full flex items-center justify-center"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x;
                        if (swipe < -100) nextImage();
                        else if (swipe > 100) prevImage();
                      }}
                    >
                      <img 
                        src={getImageUrl(gallery[currentImageIndex], 'hero')}
                        loading="lazy"
                        className="max-w-full max-h-[60vh] md:max-h-[75vh] w-auto h-auto object-contain rounded-xl md:rounded-2xl shadow-2xl cursor-zoom-in"
                        alt={`${project.title} - ${currentImageIndex + 1}`}
                        onClick={() => setIsFullscreen(true)}
                        onError={(e) => {
                          e.target.src = '/fallback.jpg';
                          e.target.className = "w-40 opacity-20 grayscale";
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-brand-bg z-30"
                  >
                    <Maximize2 size={18} />
                  </button>
                  
                  {gallery.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-brand-bg z-30">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextImage} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-brand-bg z-30">
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 z-30">
                        {gallery.map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentImageIndex ? 'bg-brand-accent w-6' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 md:gap-4">
                  {gallery.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-500 relative group ${i === currentImageIndex ? 'border-brand-accent shadow-emerald-glow scale-[1.02]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
                    >
                      <img 
                        src={getImageUrl(img, 'thumbnail')} 
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt={`Preview ${i}`}
                        onError={(e) => { e.target.src = '/fallback.jpg'; }}
                      />
                      {i === currentImageIndex && (
                        <div className="absolute inset-0 bg-brand-accent/10 pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 mt-6 lg:mt-0"
          >
            <div className="lg:sticky lg:top-20">
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-brand-accent mb-3 md:mb-4 block">Project Insight</span>
              <h1 className="text-4xl md:text-6xl font-display font-medium text-brand-text mb-4 md:mb-6 leading-[1.1] tracking-tighter">
                {project.title}
              </h1>
              
              <div className="flex gap-4 mb-8 md:mb-10">
                <span className="px-4 py-2 glass-pill text-[8px] md:text-[9px] font-black uppercase tracking-widest text-brand-accent">
                  {project.category?.name || 'Archive Piece'}
                </span>
              </div>

              <div className="space-y-4 md:space-y-6 text-base md:text-xl text-brand-text-dim font-light leading-relaxed italic mb-10 md:mb-12">
                {project.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mb-10 md:mb-12">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">Architectural Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] md:text-[11px] font-medium text-brand-text/70 hover:text-brand-accent hover:border-brand-accent/20 transition-all cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                {project.liveLink && (
                  <a 
                    href={formatLiveUrl(project.liveLink)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-premium flex items-center gap-3 px-10 py-4 text-[10px] md:text-[11px] justify-center"
                  >
                    Launch Project <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubLink && (
                  <a 
                    href={formatLiveUrl(project.githubLink)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-luxury-outline flex items-center gap-3 px-10 py-4 text-[10px] md:text-[11px] justify-center"
                  >
                    View Source <FaGithub className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Preview */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-bg/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-12"
          >
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-8 right-8 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[110]"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center group/fs">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={getImageUrl(gallery[currentImageIndex], 'hero')}
                  loading="lazy"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                />
              </AnimatePresence>

              {gallery.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-5 bg-white/5 hover:bg-brand-accent hover:text-brand-bg rounded-full text-white transition-all">
                    <ChevronLeft size={32} />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-5 bg-white/5 hover:bg-brand-accent hover:text-brand-bg rounded-full text-white transition-all">
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            <div className="mt-8 text-center">
              <p className="text-brand-text font-display text-xl md:text-2xl mb-2">{project.title}</p>
              <p className="text-brand-text-dim text-[10px] font-bold uppercase tracking-[0.4em]">Asset {currentImageIndex + 1} of {gallery.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;

