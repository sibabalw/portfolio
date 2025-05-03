'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer } from 'react-icons/fa';

type Technology = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

type ProjectCardProps = {
  title: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  technologies: Technology[];
  featured?: boolean;
  index: number;
  reverse?: boolean;
};

export default function ProjectCard({
  title,
  description,
  image,
  demoLink,
  githubLink,
  technologies,
  featured = false,
  index,
  reverse = false
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse movement
  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [0, 300], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 300], [-5, 5]), springConfig);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  // Reset on mouse leave
  const handleMouseLeave = () => {
    mouseX.set(150);
    mouseY.set(150);
    setHovered(false);
  };
  
  // Animation variants
  const cardVariants = {
    initial: { 
      y: 50, 
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        delay: index * 0.2
      }
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`w-full ${featured ? 'col-span-1 md:col-span-2' : 'col-span-1'} relative`}
      variants={cardVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div 
        className={`group bg-card/30 backdrop-blur-md rounded-2xl overflow-hidden border border-border/40 shadow-xl hover:shadow-2xl transition-shadow ${reverse ? 'flex-row-reverse' : ''} ${featured ? 'sm:flex' : ''}`}
        style={{ 
          perspective: 1000,
          rotateX: rotateX,
          rotateY: rotateY
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1 bg-primary/90 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              <span className="animate-pulse relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Featured Project</span>
            </div>
          </div>
        )}
        
        {/* Image container */}
        <div className={`overflow-hidden ${featured ? 'sm:w-1/2' : 'w-full'} relative aspect-video`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-60 z-10 group-hover:opacity-80 transition-opacity"></div>
          
          <motion.div 
            className="relative w-full h-full"
            animate={{ 
              scale: hovered ? 1.05 : 1,
              filter: hovered ? "brightness(1.1)" : "brightness(1)"
            }}
            transition={{ duration: 0.4 }}
          >
            <Image 
              src={image} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          
          {/* Moving shine effect */}
          <motion.div 
            className="absolute inset-0 z-20"
            style={{ 
              background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
              backgroundSize: '200% 200%',
              backgroundPosition: hovered ? '100% 100%' : '0% 0%'
            }}
            animate={{ 
              backgroundPosition: hovered ? ['0% 0%', '100% 100%'] : '0% 0%'
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
        
        {/* Content */}
        <div className={`p-6 ${featured ? 'sm:w-1/2' : 'w-full'}`}>
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-4">
            {description}
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, i) => (
              <div 
                key={i} 
                className={`px-2 py-1 rounded-md text-xs flex items-center gap-1 bg-background/80 border border-border/60 shadow-sm`}
                style={{ color: tech.color }}
              >
                {tech.icon}
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex gap-3">
            <motion.a 
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-primary text-white shadow-lg shadow-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt size={12} />
              <span>Live Demo</span>
            </motion.a>
            
            <motion.a 
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm px-4 py-2 rounded-md bg-card border border-border"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={14} />
              <span>Source</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 