import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WorkShowcase from '../components/WorkShowcase';
import Approach from '../components/Approach';
import Founders from '../components/Founders';
import Team from '../components/Team';
import TechStack from '../components/TechStack';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <WorkShowcase />
      <Approach />
      <Founders />
      <TechStack />
      <Team />
      <Contact />
    </>
  );
};

export default Home;
