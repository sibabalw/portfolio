'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCircle, FaStar, FaCode, FaLaptopCode, FaEnvelope, FaUserAlt } from 'react-icons/fa';

interface NarrativePathProps {
  sections: string[];
  pathLabels?: string[];
  activeSection?: string;
}

export default function NarrativePath({ 
  sections, 
  pathLabels = [], 
  activeSection = '' 
}: NarrativePathProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(activeSection || sections[0]);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  const { scrollYProgress } = useScroll();
  
  // When activeSection prop changes, update the internal state
  useEffect(() => {
    if (activeSection) {
      setActive(activeSection);
    }
  }, [activeSection]);
  
  // Update the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Get document height minus window height
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Calculate scroll percentage
      const currentScrollPercentage = (window.scrollY / scrollHeight) * 100;
      setScrollPercentage(currentScrollPercentage);
      
      // Determine active section based on scroll position
      sections.forEach((section, index) => {
        const el = document.getElementById(section);
        if (!el) return;
        
        const rect = el.getBoundingClientRect();
        // If section is in viewport (with buffer)
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          setActive(section);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);
  
  // Divide the path into segments
  const pathSegments = sections.length - 1;
  const segmentLength = 100 / pathSegments;
  
  // Find the active segment
  const activeIndex = sections.findIndex(s => s === active);
  const activeSegment = activeIndex === sections.length - 1 ? pathSegments - 1 : activeIndex;
  
  // Calculate the progress for the active segment
  const activeSegmentProgress = Math.min(100, Math.max(0, 
    (scrollPercentage - (activeSegment * segmentLength)) / segmentLength * 100
  ));
  
  // Calculate total path progress
  const pathProgress = Math.min(100, (activeSegment * segmentLength) + 
    (activeSegmentProgress * segmentLength / 100)
  );
  
  // Get icon for each section
  const getSectionIcon = (section: string) => {
    switch(section) {
      case 'hero':
        return <FaStar />;
      case 'about':
        return <FaUserAlt />;
      case 'skills':
        return <FaCode />;
      case 'projects':
        return <FaLaptopCode />;
      case 'contact':
        return <FaEnvelope />;
      default:
        return <FaCircle />;
    }
  };
  
  // Animation settings
  const pathVariants = {
    hidden: { pathLength: 0 },
    visible: { 
      pathLength: 1,
      transition: { 
        duration: 2, 
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };
  
  const nodeVariants = {
    inactive: { 
      scale: 0.8, 
      opacity: 0.5,
      transition: { duration: 0.3 }
    },
    active: { 
      scale: 1.2, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    passed: { 
      scale: 1, 
      opacity: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const labelVariants = {
    inactive: {
      opacity: 0.6,
      x: -5,
      scale: 0.95,
      transition: { duration: 0.3 }
    },
    active: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className="fixed left-6 top-1/2 transform -translate-y-1/2 h-[65vh] flex flex-col items-center z-40 pointer-events-none hidden md:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="h-full relative flex flex-col items-center justify-between py-8">
        {/* Pulsing background for active node */}
        {sections.map((section, index) => {
          const isActive = section === active;
          const sectionTop = index * (100 / (sections.length - 1));
          
          return isActive ? (
            <motion.div 
              key={`pulse-${section}`}
              className="absolute w-12 h-12 rounded-full bg-primary/10 z-0"
              style={{ top: `calc(${sectionTop}% - 1.5rem)` }}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ) : null;
        })}
      
        {/* Base path line (background) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/10 rounded-full z-10"></div>
        
        {/* Active path that grows with scroll - now with gradient */}
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 w-1 rounded-full bg-gradient-to-b from-primary via-secondary to-primary z-20"
          style={{ 
            height: `${pathProgress}%`,
            top: 0,
            transformOrigin: 'top',
            boxShadow: '0 0 10px rgba(109, 40, 217, 0.5)'
          }}
          initial={{ height: '0%' }}
          animate={{ height: `${pathProgress}%` }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Animated particles along the path */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white z-30"
          style={{ 
            top: `${pathProgress}%`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            display: pathProgress > 0 && pathProgress < 100 ? 'block' : 'none'
          }}
          animate={{ 
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Section nodes */}
        {sections.map((section, index) => {
          const isActive = section === active;
          const hasPassed = sections.indexOf(active) > index;
          const sectionTop = index * (100 / (sections.length - 1));
          
          return (
            <motion.div 
              key={section} 
              className="absolute z-30 flex items-center" 
              style={{ top: `${sectionTop}%`, left: 0 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30' 
                    : hasPassed 
                      ? 'bg-primary/60' 
                      : 'bg-white/20'
                }`}
                variants={nodeVariants}
                animate={isActive ? 'active' : hasPassed ? 'passed' : 'inactive'}
                whileHover={{ scale: 1.2, opacity: 1 }}
              >
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-40"
                    animate={{ 
                      scale: [1, 1.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                )}
                
                <div className={`text-xs ${
                  isActive 
                    ? 'text-white' 
                    : hasPassed 
                      ? 'text-white/80' 
                      : 'text-white/40'
                }`}>
                  {getSectionIcon(section)}
                </div>
              </motion.div>
              
              {/* Label for each node */}
              <motion.div
                className={`absolute left-10 bg-gradient-to-r ${
                  isActive ? 'from-background/90 to-background/70' : 'from-background/70 to-background/50'
                } backdrop-blur-md px-4 py-2 rounded-lg border ${
                  isActive ? 'border-primary/30' : 'border-white/10'
                } shadow-lg ${
                  isActive ? 'shadow-primary/10' : ''
                } text-sm whitespace-nowrap ${
                  isActive ? 'text-primary font-medium' : 'text-foreground/60'
                }`}
                variants={labelVariants}
                animate={isActive ? 'active' : 'inactive'}
                whileHover={{ scale: 1.05, opacity: 1, x: 0 }}
              >
                {/* Small indicator triangle */}
                <div 
                  className={`absolute left-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 
                  border-t-[6px] border-t-transparent 
                  border-r-[6px] ${isActive ? 'border-r-primary/30' : 'border-r-white/10'} 
                  border-b-[6px] border-b-transparent`}
                />
                
                {pathLabels[index] || section}
                
                {/* Progress indicator for active section */}
                {isActive && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${activeSegmentProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
} 