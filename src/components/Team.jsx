import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import API from '../api/axios';
import ImageLoad from './ImageLoad';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await API.get('/api/team');
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-16 md:py-20 bg-white relative overflow-hidden mb-12 md:mb-16">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-accent font-medium uppercase tracking-wider text-sm mb-4">Leadership & Experts</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-brand-text-dim text-lg leading-relaxed">
              We are a team of dedicated professionals committed to delivering exceptional web solutions and engineering excellence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {loading ? (
            [...Array(5)].map((_, index) => (
              <div key={`skel-team-${index}`} className="bg-white border border-[#E5E7EB] rounded-[1.5rem] overflow-hidden flex flex-col h-[320px] shadow-sm">
                <div className="aspect-[4/5] w-full bg-gray-200 animate-shimmer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 opacity-50 z-0"></div>
                </div>
                <div className="p-5 flex flex-col items-center flex-grow bg-white z-10">
                  <div className="w-2/3 h-4 bg-gray-200 animate-shimmer rounded mb-2"></div>
                  <div className="w-1/2 h-3 bg-gray-200 animate-shimmer rounded"></div>
                </div>
              </div>
            ))
          ) : (
            team.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-surface border border-[#E5E7EB] rounded-[1.5rem] overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col"
              >
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-[#111111]">
                  <ImageLoad
                    src={member.image ? (member.image.startsWith('http') ? member.image : `${import.meta.env.VITE_API_URL}/${member.image}`) : '/fallback.jpg'}
                    alt={member.name}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover grayscale opacity-90 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-brand-accent rounded-full border border-[#E5E7EB] hover:bg-brand-accent hover:text-white transition-colors shadow-sm">
                        <FaLinkedin size={16} />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-brand-accent rounded-full border border-[#E5E7EB] hover:bg-brand-accent hover:text-white transition-colors shadow-sm">
                        <FaGithub size={16} />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-5 text-center bg-white flex-grow">
                  <h3 className="text-lg font-bold text-brand-text mb-1 tracking-tight">{member.name}</h3>
                  <p className="text-[13px] font-medium text-brand-text-dim">{member.role}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
