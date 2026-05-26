import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import API from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const WorkShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    
    const loadProjects = async () => {
      try {
        setLoading(true);
        setProjects([]);
        setPage(1);
        
        const res = await API.get('/api/projects', {
          params: { page: 1, limit: 8, category: activeCategory },
          signal: controller.signal
        });
        
        const responseData = Array.isArray(res.data) ? res.data : (res.data.projects || []);
        const moreData = !Array.isArray(res.data) ? res.data.hasMore : false;
        
        setProjects(responseData);
        setHasMore(moreData);
      } catch (err) {
        if (!API.isCancel(err) && err.name !== 'CanceledError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProjects();

    return () => {
      controller.abort();
    };
  }, [activeCategory]);

  const handleLoadMore = async () => {
    if (!loadingMore && hasMore) {
      try {
        setLoadingMore(true);
        const nextPage = page + 1;
        
        const res = await API.get('/api/projects', {
          params: { page: nextPage, limit: 8, category: activeCategory }
        });
        
        const responseData = Array.isArray(res.data) ? res.data : (res.data.projects || []);
        const moreData = !Array.isArray(res.data) ? res.data.hasMore : false;

        setProjects(prev => [...prev, ...responseData]);
        setHasMore(moreData);
        setPage(nextPage);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  return (
    <section id="work" className="py-24 md:py-40 bg-brand-bg relative luxury-noise overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-3 md:px-5 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-accent mb-4">
              Curated Creations
            </span>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-brand-text mb-12">
              Digital <span className="text-brand-accent/20 italic">Portfolios.</span>
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-16 border-b border-white/5 pb-8">
            <button
              onClick={() => setActiveCategory('All')}
              className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:text-brand-accent ${
                activeCategory === 'All' ? 'tab-active' : 'text-brand-text-dim'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:text-brand-accent ${
                  activeCategory === cat._id ? 'tab-active' : 'text-brand-text-dim'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Horizontal Scroll */}
        <div className="relative">
          {/* Softer Gradient Masks */}
          <div className="absolute inset-y-0 -left-4 w-20 md:w-32 bg-gradient-to-r from-brand-bg/40 via-brand-bg/10 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 -right-4 w-20 md:w-32 bg-gradient-to-l from-brand-bg/40 via-brand-bg/10 to-transparent z-20 pointer-events-none" />

          <div className="grid grid-rows-2 grid-flow-col gap-3 lg:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth py-4 pb-12">
            <AnimatePresence mode="popLayout">
              {projects.map((project, index) => {
                return (
                  <motion.div
                    key={`${project._id}-${index}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.6, delay: (index % 6) * 0.05 }}
                    onClick={() => navigate(`/project/${project._id}`)}
                    className="group glass-card rounded-[2rem] overflow-hidden flex flex-col h-full snap-center w-[calc(100vw-2.5rem)] sm:w-[320px] lg:w-[380px] max-w-[420px] cursor-pointer transition-all active:scale-95"
                  >
                    {/* Image Container */}
                    <div className="relative h-56 md:h-64 overflow-hidden bg-brand-surface/50">
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 bg-brand-accent/90 backdrop-blur-md text-brand-bg text-[7px] font-black uppercase tracking-widest rounded-full shadow-emerald-glow">
                          {project.category?.name || 'Archive'}
                        </span>
                      </div>
                      
                      <img 
                        src={
                          project.type === 'video'
                            ? (project.thumbnail 
                                ? (project.thumbnail.startsWith('http') ? project.thumbnail : `${import.meta.env.VITE_API_URL}/${project.thumbnail}`)
                                : '/fallback.jpg')
                            : (project.mediaUrl 
                                ? (project.mediaUrl.startsWith('http') ? project.mediaUrl : `${import.meta.env.VITE_API_URL}/${project.mediaUrl}`)
                                : (project.images?.[0] 
                                    ? (project.images[0].startsWith('http') ? project.images[0] : `${import.meta.env.VITE_API_URL}/${project.images[0]}`) 
                                    : '/fallback.jpg')
                              )
                        } 
                        alt={project.title} 
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/fallback.jpg";
                        }}
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {project.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-all duration-700 z-10">
                          <motion.div 
                            initial={false}
                            whileHover={{ scale: 1.1 }}
                            className="relative flex items-center justify-center"
                          >
                            <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-pulse-slow" />
                            <div className="w-16 h-16 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white shadow-2xl transition-all duration-700 group-hover:bg-white/10">
                              <Play fill="white" className="ml-1" size={24} />
                            </div>
                          </motion.div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent opacity-40" />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h3 className="text-xl font-display font-medium text-brand-text mb-3 group-hover:text-brand-accent transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-brand-text-dim text-[13px] font-light italic mb-6 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-[7px] font-bold uppercase tracking-widest text-brand-accent/60 bg-brand-accent/5 px-2.5 py-1 rounded-md border border-brand-accent/10">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-brand-accent group/link">
                          View Project
                          <ArrowRight size={12} className="group-hover/link:translate-x-2 transition-transform duration-500" />
                        </div>
                        
                        {project.liveLink && (
                          <a 
                            href={project.liveLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-brand-text-dim hover:text-brand-accent transition-colors p-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
            </AnimatePresence>
          </div>
        </div>

        {hasMore && (
          <div className="flex items-center justify-center mt-12 w-full">
            <button 
              onClick={handleLoadMore} 
              disabled={loadingMore}
              className="flex items-center gap-4 text-brand-text-dim hover:text-brand-accent transition-colors group px-8 py-4 glass-card rounded-full"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-brand-accent/50 flex items-center justify-center bg-white/5 group-hover:bg-brand-accent/10 transition-all">
                {loadingMore ? (
                  <div className="w-4 h-4 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
                ) : (
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                {loadingMore ? 'Loading...' : 'Load More Works'}
              </span>
            </button>
          </div>
        )}

        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40 glass-card rounded-[3rem]"
          >
            <p className="text-brand-text-dim italic text-xl tracking-widest uppercase">No Masterpieces Found</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WorkShowcase;
