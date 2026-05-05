import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Play } from 'lucide-react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const categories = [
  'All',
  'UI Design',
  'App Dev',
  'Web Dev',
  'Branding',
  'Posters',
  'Marketing'
];

const WorkShowcase = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/api/projects');
        setProjects(res.data);
        setFilteredProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:text-brand-accent ${
                  activeCategory === cat ? 'tab-active' : 'text-brand-text-dim'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Horizontal Scroll */}
        <div className="relative group">
          {/* Softer Gradient Masks */}
          <div className="absolute inset-y-0 -left-4 w-20 md:w-32 bg-gradient-to-r from-brand-bg/40 via-brand-bg/10 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 -right-4 w-20 md:w-32 bg-gradient-to-l from-brand-bg/40 via-brand-bg/10 to-transparent z-20 pointer-events-none" />

          <div className="grid grid-rows-2 grid-flow-col gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth py-4 pb-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="group glass-card rounded-[2rem] overflow-hidden flex flex-col h-full snap-center min-w-[calc(100vw-2.5rem)] sm:min-w-[280px] lg:min-w-[320px]"
                >
                  {/* Image Container */}
                  <div className="relative h-56 md:h-64 overflow-hidden">
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-brand-accent/90 backdrop-blur-md text-brand-bg text-[7px] font-black uppercase tracking-widest rounded-full shadow-emerald-glow">
                        {project.category}
                      </span>
                    </div>
                    
                    <img 
                      src={project.type === 'video' && project.thumbnail ? project.thumbnail : (project.images && project.images.length > 0 ? project.images[0] : '')} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />

                    {project.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-500">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-16 h-16 rounded-full bg-brand-accent/90 flex items-center justify-center text-brand-bg shadow-emerald-glow group-hover:scale-125 transition-transform duration-500"
                        >
                          <Play fill="currentColor" className="ml-1" size={24} />
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
                      <Link 
                        to={`/project/${project._id}`}
                        className="inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-brand-accent group/link"
                      >
                        View Project
                        <ArrowRight size={12} className="group-hover/link:translate-x-2 transition-transform duration-500" />
                      </Link>
                      
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-brand-text-dim hover:text-brand-accent transition-colors">
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>




        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Empty State */}
        {!loading && filteredProjects.length === 0 && (
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
