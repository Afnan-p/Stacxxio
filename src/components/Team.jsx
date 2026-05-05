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
    <section id="team" className="py-24 bg-brand-bg relative luxury-noise overflow-hidden">
      <div className="max-w-6xl mx-auto px-10 relative z-10">
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

        {/* Cinematic Horizontal Scroll */}
        <div className="relative -mx-10 overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-brand-bg via-brand-bg/80 to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-20 py-10"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }
            }}
          >
            {/* Double the team array for seamless looping */}
            {[...team, ...team].map((member, index) => (
              <div
                key={`${member._id}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="relative w-[280px] h-[420px] rounded-[3rem] overflow-hidden mb-10 border border-white/5 shadow-2xl transition-all duration-700 group-hover:border-brand-accent/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale brightness-75 
                               group-hover:grayscale-0 group-hover:brightness-100 
                               group-hover:scale-110 transition-all duration-1000 ease-out"
                  />

                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-brand-bg/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                    {member.socialLinks?.instagram && (
                      <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all transform hover:-translate-y-1">
                        <FaInstagram size={20} />
                      </a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all transform hover:-translate-y-1">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all transform hover:-translate-y-1">
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
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;
