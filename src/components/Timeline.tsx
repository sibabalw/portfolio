'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import TimelineItem from './TimelineItem';
import { FaGraduationCap, FaBriefcase, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

// Define timeline data
const timelineData = [
  {
    year: '2016',
    title: 'Started CS Degree',
    description: 'Began my journey into computer science, discovering my passion for software development and algorithmic thinking.',
    icon: <FaGraduationCap className="text-primary" />
  },
  {
    year: '2018',
    title: 'First Internship',
    description: 'Landed my first internship at a tech startup, working on full-stack development and learning industry practices.',
    icon: <FaBriefcase className="text-secondary" />
  },
  {
    year: '2020',
    title: 'Graduated with Honors',
    description: 'Completed my degree with distinction, specializing in web technologies and distributed systems.',
    icon: <FaGraduationCap className="text-accent" />
  },
  {
    year: '2020',
    title: 'First Developer Role',
    description: 'Joined a mid-sized tech company as a junior developer, working on enterprise applications and client projects.',
    icon: <FaCode className="text-primary" />
  },
  {
    year: '2022',
    title: 'Started Freelancing',
    description: 'Began taking on freelance projects, expanding my skill set and working directly with clients to deliver solutions.',
    icon: <FaLightbulb className="text-secondary" />
  },
  {
    year: '2023',
    title: 'Launched Personal Brand',
    description: 'Created my personal brand and portfolio, showcasing my work and establishing my presence in the tech community.',
    icon: <FaRocket className="text-accent" />
  }
];

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.1 });
  
  return (
    <div ref={timelineRef} className="py-12 relative">
      {/* Section heading */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block">
          My Journey
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A timeline of key moments in my professional development path.
        </p>
      </motion.div>
      
      {/* Timeline container */}
      <div className="max-w-4xl mx-auto relative">
        {/* Timeline items */}
        {timelineData.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            icon={item.icon}
            index={index}
          />
        ))}
        
        {/* Gradient fade at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
} 