'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBookOpen, FaLightbulb, FaCode, FaRocket, FaCheck } from 'react-icons/fa';

interface StoryPointProps {
  type: 'discovery' | 'idea' | 'process' | 'outcome' | 'achievement';
  title: string;
  description: string;
  align?: 'left' | 'right';
}

export default function StoryPoint({ 
  type, 
  title, 
  description, 
  align = 'left' 
}: StoryPointProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Get the appropriate icon based on the story point type
  const getIcon = () => {
    switch (type) {
      case 'discovery':
        return <FaBookOpen />;
      case 'idea':
        return <FaLightbulb />;
      case 'process':
        return <FaCode />;
      case 'outcome':
        return <FaRocket />;
      case 'achievement':
        return <FaCheck />;
      default:
        return <FaLightbulb />;
    }
  };
  
  // Get the appropriate gradient based on the story point type
  const getGradient = () => {
    switch (type) {
      case 'discovery':
        return 'from-blue-500 to-indigo-600';
      case 'idea':
        return 'from-yellow-400 to-orange-500';
      case 'process':
        return 'from-purple-500 to-indigo-600';
      case 'outcome':
        return 'from-green-400 to-teal-500';
      case 'achievement':
        return 'from-primary to-secondary';
      default:
        return 'from-primary to-secondary';
    }
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className={`my-12 w-full max-w-3xl mx-auto flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`relative flex max-w-lg ${align === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Connection line to narrative path */}
        <motion.div 
          className={`absolute top-1/2 transform -translate-y-1/2 h-[2px] bg-gradient-to-r ${getGradient()} ${
            align === 'right' ? 'right-full' : 'left-full'
          }`}
          initial={{ width: 0 }}
          animate={isInView ? { width: '4rem' } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Icon container */}
        <div className="flex-shrink-0 mr-6 ml-6">
          <motion.div 
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${getGradient()} flex items-center justify-center text-white shadow-lg relative`}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            {/* Pulsing effect */}
            <motion.div 
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${getGradient()} opacity-60`}
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.6, 0.1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <span className="relative text-lg">
              {getIcon()}
            </span>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="flex-grow">
          <motion.div 
            className="glass p-5 rounded-xl backdrop-blur-md bg-background/30 border border-white/10 shadow-lg"
            initial={{ x: align === 'right' ? 20 : -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: align === 'right' ? 20 : -20, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.h3 
              className={`text-xl font-bold mb-2 bg-gradient-to-r ${getGradient()} text-transparent bg-clip-text`}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-foreground/80"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {description}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 