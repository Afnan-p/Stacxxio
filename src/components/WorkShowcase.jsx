import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import axios from 'axios';
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
        const res = await axios.get('http://localhost:5000/api/projects');
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
    <section id="work" className="py-40 bg-brand-bg relative luxury-noise overflow-hidden">
      <div className="container mx-auto px-10 relative z-10">
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-accent mb-4">
              Curated Creations
            </span>
            <h2 className="text-6xl md:text-8xl font-display font-medium text-brand-text mb-12">
              Digital <span className="text-brand-accent/20 italic">Portfolios.</span>
            </h2>
          </motion.div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 mb-20 border-b border-white/5 pb-8">
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group glass-card rounded-[2.5rem] overflow-hidden flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-1.5 bg-brand-accent/90 backdrop-blur-md text-brand-bg text-[8px] font-black uppercase tracking-widest rounded-full shadow-emerald-glow">
                      {project.category}
                    </span>
                  </div>
                  
                  <img 
                    src={project.images && project.images.length > 0 ? project.images[0] : ''} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-display font-medium text-brand-text mb-4 group-hover:text-brand-accent transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-brand-text-dim text-sm font-light italic mb-8 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-[8px] font-bold uppercase tracking-widest text-brand-accent/60 bg-brand-accent/5 px-3 py-1 rounded-md border border-brand-accent/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link 
                      to={`/project/${project._id}`}
                      className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-brand-accent group/link"
                    >
                      View Project
                      <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform duration-500" />
                    </Link>
                    
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-brand-text-dim hover:text-brand-accent transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
