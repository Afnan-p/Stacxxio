import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import API from '../api/axios';

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await API.get('/api/team');
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-40 bg-brand-bg relative luxury-noise overflow-hidden">
      <div className="container mx-auto px-10 relative z-10">
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-accent mb-6">Collective Intelligence</span>
            <h2 className="text-6xl md:text-8xl font-display font-medium text-brand-text mb-8">
              The <span className="text-brand-accent/20 italic">Architects.</span>
            </h2>
            <p className="max-w-2xl text-brand-text-dim text-lg font-light italic leading-relaxed">
              We are a specialized unit of designers and engineers, unified by a singular mission: to push the boundaries of digital possibility.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          {team.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden mb-10 border border-white/5 shadow-premium">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-brand-bg/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                  {member.socialLinks?.instagram && (
                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all">
                      <FaInstagram size={20} />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all">
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {member.socialLinks?.github && (
                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all">
                      <FaGithub size={20} />
                    </a>
                  )}
                </div>
              </div>

              <div className="text-center px-6">
                <h3 className="text-3xl font-display font-medium text-brand-text mb-3 group-hover:text-brand-accent transition-colors duration-500">
                  {member.name}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-text-dim">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
