import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { getOptimizedMedia } from '../utils/cloudinary';
import ImageLoad from '../components/ImageLoad';
import SEO from '../components/SEO';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  // Initial load - Scroll to top and fetch categories
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const catRes = await API.get('/api/categories');
        setCategories(catRes.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Debounce search term to prevent spamming API
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [activeCategory, debouncedSearch]);

  // Fetch paginated and filtered projects from server
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const categoryQuery = activeCategory !== 'All' ? `&category=${activeCategory}` : '';
        const searchQuery = debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : '';
        
        const res = await API.get(`/api/projects?page=${page}&limit=6${categoryQuery}${searchQuery}`);
        
        if (res.data.projects) {
          setProjects(prev => page === 1 ? res.data.projects : [...prev, ...res.data.projects]);
          setTotalPages(res.data.totalPages || 1);
          setTotalProjects(res.data.totalProjects || 0);
        } else {
          setProjects(prev => page === 1 ? (Array.isArray(res.data) ? res.data : []) : prev);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [page, activeCategory, debouncedSearch]);

  return (
    <div className="min-h-screen bg-brand-surface pt-40 md:pt-48 pb-24">
      <SEO 
        title="Portfolio | ZYNEXTA"
        description="View ZYNEXTA's portfolio showcasing premium websites, web applications, eCommerce platforms, mobile apps, and custom software projects."
        canonical="https://zynexta.com/portfolio"
        image="https://zynexta.com/social-banner.png"
      />
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-text-dim font-medium uppercase tracking-wider text-sm mb-6 inline-block bg-white px-4 py-1.5 rounded-full border border-[#E5E7EB] shadow-sm">
              Our Work
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-brand-text mb-6 tracking-tighter">
              Portfolio
            </h1>
            <p className="text-lg text-brand-text-dim max-w-2xl mx-auto leading-relaxed">
              Explore our diverse range of digital products, engineered for performance, scalability, and exceptional user experience.
            </p>
          </motion.div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16">
          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-2 w-full lg:w-auto"
          >
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === 'All' 
                ? 'bg-[#111111] text-white border-[#111111] shadow-md' 
                : 'bg-white text-brand-text-dim border-[#E5E7EB] hover:border-gray-300 hover:text-brand-text'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveCategory(category._id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === category._id 
                  ? 'bg-[#111111] text-white border-[#111111] shadow-md' 
                  : 'bg-white text-brand-text-dim border-[#E5E7EB] hover:border-gray-300 hover:text-brand-text'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-80 relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-full text-sm text-brand-text focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111] transition-all shadow-sm"
            />
          </motion.div>
        </div>

        {/* Projects Grid */}
        {loading && projects.length === 0 ? (
          <div>
            <div className="text-sm font-medium text-gray-400 mb-4 animate-pulse text-center">Loading Projects...</div>
            <div className="flex flex-wrap justify-center gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={`skel-${index}`} className="w-full group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm flex flex-col h-[460px]">
                  <div className="aspect-[16/10] w-full bg-gray-200 animate-shimmer shrink-0"></div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="w-1/4 h-3 bg-gray-200 animate-shimmer rounded mb-4"></div>
                    <div className="w-3/4 h-6 bg-gray-200 animate-shimmer rounded mb-3"></div>
                    <div className="w-full h-4 bg-gray-200 animate-shimmer rounded mb-1"></div>
                    <div className="w-5/6 h-4 bg-gray-200 animate-shimmer rounded mt-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {projects.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#E5E7EB]">
                <h3 className="text-2xl font-display font-bold text-brand-text mb-2">No projects found</h3>
                <p className="text-brand-text-dim">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="mt-6 text-brand-text font-medium hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div id="projects-grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {projects.map((project, index) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6, delay: (index % 6) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        key={project._id || index}
                        className="w-full group bg-white rounded-3xl overflow-hidden border border-[#E5E7EB] hover:shadow-xl transition-all duration-500 flex flex-col h-[460px]"
                      >
                        <div className="aspect-[16/10] overflow-hidden relative shrink-0">
                          <ImageLoad 
                            src={
                              project.type === 'video'
                                ? getOptimizedMedia(project.thumbnail || '/fallback.jpg', 'thumbnail')
                                : getOptimizedMedia(project.mediaUrl || project.images?.[0] || '/fallback.jpg', 'thumbnail')
                            } 
                            alt={project.title}
                            wrapperClassName="w-full h-full"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm gap-4">
                            {project.liveLink && (
                              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-brand-text rounded-full hover:scale-110 transition-transform">
                                <ExternalLink size={18} />
                              </a>
                            )}
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-3 bg-[#111111] text-white rounded-full hover:scale-110 transition-transform">
                                <FaGithub size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        {/* Content container */}
                        <div className="p-6 md:p-8 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                              {project.category?.name || 'Case Study'}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-display font-bold text-brand-text mb-3 tracking-tight">
                            {project.title}
                          </h3>
                          
                          <p className="text-brand-text-dim text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {project.description}
                          </p>
                          
                          <div className="mt-auto">
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.technologies?.slice(0, 3).map(tech => (
                                <span key={tech} className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                                  {tech}
                                </span>
                              ))}
                              {project.technologies?.length > 3 && (
                                <span className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                            
                            <Link 
                              to={`/project/${project._id}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text group-hover:text-gray-600 transition-colors"
                            >
                              Read Case Study
                              <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {page < totalPages && (
                  <div className="flex justify-center items-center mt-16">
                    <button
                      onClick={() => setPage(p => p + 1)}
                      className="px-8 py-3 rounded-full text-sm font-semibold transition-all bg-white border border-[#E5E7EB] text-brand-text hover:border-gray-900 hover:text-gray-900 shadow-sm"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
