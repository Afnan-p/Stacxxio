import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import API from '../api/axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/api/projects/${id}`);
        console.log("PROJECT:", res.data);
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

  const nextImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    if (!project?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

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
      <h1 className="text-4xl font-display font-bold mb-6">Masterpiece Not Found</h1>
      <Link to="/" className="btn-premium">Return to Gallery</Link>
    </div>
  );

  return (
    <div className="pt-20 pb-20 bg-brand-bg min-h-screen luxury-noise">
      <div className="container mx-auto px-6 md:px-10">
        <Link to="/" className="inline-flex items-center gap-3 text-brand-text-dim hover:text-brand-accent transition-colors mb-10 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Back to Gallery</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          {/* Media Section: Video or Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 space-y-6"
          >
            {project.type === 'video' ? (
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-premium bg-[#0b0f19] aspect-video flex items-center justify-center">
                {(() => {
                  const vUrl = project.videoUrl || project.mediaUrl;
                  if (!vUrl) return <div className="text-brand-text-dim italic">Motion Asset Missing</div>;

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

                  // Direct video file (Cloudinary or local)
                  const finalSrc = vUrl.startsWith('http') ? vUrl : `${import.meta.env.VITE_API_URL}/${vUrl}`;
                  const finalPoster = project.thumbnail ? (project.thumbnail.startsWith('http') ? project.thumbnail : `${import.meta.env.VITE_API_URL}/${project.thumbnail}`) : '';

                  return (
                    <video 
                      src={finalSrc} 
                      controls 
                      className="w-full h-full object-contain"
                      poster={finalPoster}
                    />
                  );
                })()}
              </div>
            ) : (
              <>
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 shadow-premium group bg-[#0b0f19] flex items-center justify-center p-4 md:p-6 min-h-[350px]">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentImageIndex}
                      src={
                        project.mediaUrl 
                          ? (project.mediaUrl.startsWith('http') ? project.mediaUrl : `${import.meta.env.VITE_API_URL}/${project.mediaUrl}`)
                          : (project.images[currentImageIndex]?.startsWith('http') ? project.images[currentImageIndex] : `${import.meta.env.VITE_API_URL}/${project.images[currentImageIndex]}`)
                      }
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                    />
                  </AnimatePresence>
                  
                  {project.images.length > 1 && (
                    <>
                      <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-brand-bg z-30">
                        <ChevronLeft size={20} />
                      </button>
                      <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-brand-accent hover:text-brand-bg z-30">
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 z-30">
                        {project.images.map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => setCurrentImageIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-brand-accent w-5' : 'bg-white/20'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {project.images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`aspect-video rounded-xl overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-brand-accent shadow-emerald-glow' : 'border-transparent opacity-40 hover:opacity-100'}`}
                    >
                      <img 
                        src={img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL}/${img}`} 
                        className="w-full h-full object-cover" 
                        alt={`Preview ${i}`}
                      />
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
            className="lg:col-span-5"
          >
            <div className="sticky top-20">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-brand-accent mb-4 block">Project Insight</span>
              <h1 className="text-4xl md:text-6xl font-display font-medium text-brand-text mb-6 leading-tight tracking-tighter">
                {project.title}
              </h1>
              
              <div className="flex gap-4 mb-8">
                <span className="px-4 py-1.5 glass-pill text-[8px] font-black uppercase tracking-widest text-brand-accent">
                  {project.category?.name || 'Uncategorized Masterpiece'}
                </span>
              </div>

              <div className="space-y-6 text-base md:text-lg text-brand-text-dim font-light leading-relaxed italic mb-10">
                {project.description.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mb-10">
                <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-accent mb-6">Architectural Stack</h4>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-5 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-medium text-brand-text/60">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-5">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-premium flex items-center gap-2.5 px-8 py-3.5 text-[10px]">
                    Launch Project <ExternalLink size={14} />
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-luxury-outline flex items-center gap-2.5 px-8 py-3.5 text-[10px]">
                    View Source <FaGithub size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
