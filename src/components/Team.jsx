import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import ImageLoad from './ImageLoad';

const Team = () => {
  const team = [
    {
      _id: '1',
      name: 'Afnan',
      secondaryRole: 'Full Stack Developer',
      image: '/afnan.png',
      socialLinks: { linkedin: '#', instagram: '#' }
    },
    {
      _id: '2',
      name: 'Shaheed',
      secondaryRole: 'Backend Developer',
      image: '/shaheed.png',
      socialLinks: { linkedin: '#', github: '#' }
    },
    {
      _id: '3',
      name: 'Hashir',
      secondaryRole: 'Business Development',
      image: '/hashir.png',
      socialLinks: { linkedin: '#', instagram: '#' }
    },
    {
      _id: '4',
      name: 'Shijil',
      secondaryRole: 'UI/UX Designer',
      image: '/shijil.png',
      socialLinks: { linkedin: '#', github: '#' }
    },
    {
      _id: '5',
      name: 'Anas',
      secondaryRole: 'Digital Marketing',
      image: '/anas.png',
      socialLinks: { linkedin: '#', github: '#' }
    }
  ];

  const loading = false;

  return (
    <section id="team" className="pt-16 pb-8 md:py-20 bg-brand-bg relative overflow-hidden mb-4 md:mb-16">
      <div className="container mx-auto px-6 md:px-10">
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 font-semibold uppercase tracking-[0.2em] text-xs mb-4">Leadership & Experts</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-6">
              Meet Our Team
            </h2>
            <p className="text-brand-text-dim text-lg leading-relaxed">
              We are a team of dedicated professionals committed to delivering exceptional web solutions and engineering excellence.
            </p>
          </motion.div>
        </div>

        <div className="flex md:flex-wrap overflow-x-auto md:overflow-visible md:justify-center gap-4 lg:gap-6 max-w-[1400px] mx-auto pb-8 -mx-6 px-6 md:mx-auto md:px-4 snap-x snap-mandatory md:snap-none scrollbar-hide">
          {loading ? (
            [...Array(5)].map((_, index) => (
              <div key={`skel-team-${index}`} className="w-[220px] sm:max-w-none shrink-0 snap-center sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.25rem)] bg-white border border-[#E5E7EB] rounded-[1.25rem] overflow-hidden flex flex-col shadow-sm">
                <div className="aspect-[4/5] w-full bg-gray-200 animate-shimmer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 opacity-50 z-0"></div>
                </div>
                <div className="p-4 flex flex-col items-center flex-grow bg-white z-10">
                  <div className="w-2/3 h-4 bg-gray-200 animate-shimmer rounded mb-2"></div>
                  <div className="w-1/2 h-3 bg-gray-200 animate-shimmer rounded"></div>
                </div>
              </div>
            ))
          ) : (
            team.map((member, index) => (
              <div
                key={member._id}
                className="w-[220px] sm:max-w-none shrink-0 snap-center sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.25rem)] bg-brand-surface border border-border rounded-[1.25rem] overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col"
              >
                <div className="aspect-[4/5] w-full relative overflow-hidden bg-brand-accent">
                  <ImageLoad
                    src={member.image ? (member.image.startsWith('http') || member.image.startsWith('/') ? member.image : `${import.meta.env.VITE_API_URL}/${member.image}`) : '/fallback.jpg'}
                    alt={member.name}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  
                  {/* Social Overlay */}
                  <div className="absolute inset-0 z-20 bg-brand-bg/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    {member.socialLinks?.instagram && typeof member.socialLinks.instagram === 'string' && member.socialLinks.instagram.trim() !== '' && member.socialLinks.instagram.trim() !== '#' && (
                      <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-bg text-brand-text rounded-full border border-border hover:bg-brand-accent hover:text-brand-bg transition-colors shadow-sm">
                        <FaInstagram size={16} />
                      </a>
                    )}
                    {member.socialLinks?.linkedin && typeof member.socialLinks.linkedin === 'string' && member.socialLinks.linkedin.trim() !== '' && member.socialLinks.linkedin.trim() !== '#' && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-bg text-brand-text rounded-full border border-border hover:bg-brand-accent hover:text-brand-bg transition-colors shadow-sm">
                        <FaLinkedin size={16} />
                      </a>
                    )}
                    {member.socialLinks?.github && typeof member.socialLinks.github === 'string' && member.socialLinks.github.trim() !== '' && member.socialLinks.github.trim() !== '#' && (
                      <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-brand-bg text-brand-text rounded-full border border-border hover:bg-brand-accent hover:text-brand-bg transition-colors shadow-sm">
                        <FaGithub size={16} />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-5 text-center bg-brand-bg flex-grow flex flex-col justify-center">
                  <h3 className="text-[17px] sm:text-lg font-bold text-brand-text mb-1 tracking-tight">{member.name}</h3>
                  {member.secondaryRole && (
                    <p className="text-[13px] font-semibold text-gray-500">{member.secondaryRole}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
