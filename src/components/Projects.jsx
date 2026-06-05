import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/api/projects');
        const responseData = Array.isArray(res.data) ? res.data.slice(0, 3) : (res.data.projects || []);
        setProjects(responseData);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="work" className="py-24 md:py-32 bg-brand-surface relative overflow-hidden border-y border-[#E5E7EB]">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-accent font-medium uppercase tracking-wider text-sm mb-4 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-6">
              Our Featured Projects
            </h2>
            <p className="text-brand-text-dim text-lg max-w-2xl mx-auto">
              A showcase of our recent software development and digital design work for industry-leading clients.
            </p>
          </motion.div>
        </div>

        <div className="space-y-20 md:space-y-32 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 md:gap-16 items-center`}
            >
              {/* Image Reveal Area */}
              <div className="w-full lg:w-3/5 group relative overflow-hidden rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-premium transition-all duration-300">
                <div className="aspect-[16/10] overflow-hidden p-2">
                  <img
                    src={project.images?.[0] || 'https://via.placeholder.com/1200x800'}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-[1.5s] group-hover:scale-105 ease-out"
                  />
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="p-4 bg-brand-accent text-white rounded-full hover:scale-110 active:scale-95 transition-transform shadow-lg hover:bg-[#222222]">
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-brand-text border border-[#E5E7EB] rounded-full hover:bg-brand-surface hover:scale-110 active:scale-95 transition-transform shadow-lg">
                        <FaGithub size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <span className="text-brand-text-dim text-xs font-medium uppercase tracking-wider mb-4 block">
                  {project.category || 'Case Study'}
                </span>
                
                <h4 className="text-3xl md:text-4xl font-display font-bold text-brand-text mb-4">
                  {project.title}
                </h4>
                
                <p className="text-base text-brand-text-dim mb-8 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies?.map(t => (
                    <span key={t} className="px-3 py-1 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-brand-text-dim">
                      {t}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.liveLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-accent font-medium hover:text-brand-text-dim transition-colors w-fit group"
                >
                  View Case Study
                  <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-20 flex justify-center">
          <Link 
            to="/portfolio" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent text-white font-sans font-semibold rounded-full hover:bg-[#222222] transition-colors shadow-sm group"
          >
            View All Projects
            <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
