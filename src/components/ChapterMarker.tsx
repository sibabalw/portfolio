'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ChapterMarkerProps {
  number: number;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'right' | 'center';
  theme?: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export default function ChapterMarker({
  number,
  title,
  subtitle = '',
  description = '',
  align = 'left',
  theme = 'primary'
}: ChapterMarkerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Get the appropriate gradient based on the theme
  const getGradient = () => {
    switch (theme) {
      case 'primary':
        return 'from-primary to-secondary';
      case 'secondary':
        return 'from-secondary to-accent';
      case 'accent':
        return 'from-accent to-primary';
      case 'neutral':
        return 'from-gray-400 to-gray-600';
      default:
        return 'from-primary to-secondary';
    }
  };
  
  // Define text alignment classes
  const alignmentClasses = {
    container: {
      left: "items-start text-left",
      center: "items-center text-center",
      right: "items-end text-right"
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto my-8 flex ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`relative ${alignmentClasses.container[align]} max-w-xs sm:max-w-sm`}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Background decorative elements */}
        <div className="absolute -inset-4 -z-10">
          {/* Decorative lines */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-[1px] bg-gradient-to-r ${getGradient()} ${
                align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'
              }`}
              style={{
                top: `${25 + i * 20}%`,
                width: '50%',
                opacity: 0.3 + (i * 0.1),
              }}
              initial={{ width: 0 }}
              animate={isInView ? { width: align === 'center' ? '100%' : '70%' } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.2 + (i * 0.1) }}
            />
          ))}
          
          {/* Background glow */}
          <motion.div
            className={`absolute rounded-full bg-gradient-to-r ${getGradient()} blur-3xl opacity-5`}
            style={{
              width: '120%',
              height: '120%',
              top: '-10%',
              left: align === 'right' ? 'auto' : '-10%',
              right: align === 'right' ? '-10%' : 'auto',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.05 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>
        
        {/* Chapter number */}
        <motion.div
          className="relative mb-4"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <div className="relative">
            {/* Large semi-transparent chapter number */}
            <motion.div
              className={`text-8xl font-bold opacity-10 bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent absolute -top-6 ${
                align === 'center' ? 'left-1/2 -translate-x-1/2' : align === 'right' ? 'right-0' : 'left-0'
              }`}
              initial={{ x: align === 'right' ? 20 : align === 'center' ? 0 : -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 0.1 } : { x: align === 'right' ? 20 : align === 'center' ? 0 : -20, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {number < 10 ? `0${number}` : number}
            </motion.div>
            
            {/* Actual chapter indicator */}
            <motion.div
              className={`inline-flex items-center gap-2 py-1 px-3 bg-gradient-to-r ${getGradient()} rounded-full text-white text-xs font-medium`}
              initial={{ y: -10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -10, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span>CHAPTER</span>
              <span className="font-bold">{number < 10 ? `0${number}` : number}</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Chapter title */}
        <motion.h3
          className={`text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`}
          initial={{ y: 10, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {title}
        </motion.h3>
        
        {/* Chapter subtitle (if provided) */}
        {subtitle && (
          <motion.p
            className="text-foreground/70 text-sm uppercase tracking-widest font-medium mb-3"
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* Chapter description (if provided) */}
        {description && (
          <motion.p
            className="text-foreground/60 text-sm mb-3 max-w-xs"
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {description}
          </motion.p>
        )}
        
        {/* Animated divider */}
        <motion.div
          className={`h-0.5 bg-gradient-to-r ${getGradient()} rounded-full mt-3 ${
            align === 'center' ? 'w-16 mx-auto' : align === 'right' ? 'ml-auto w-24' : 'mr-auto w-24'
          }`}
          initial={{ width: 0 }}
          animate={isInView ? { width: align === 'center' ? 64 : 96 } : { width: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {/* Animated particle on the divider */}
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-white shadow-glow absolute top-1/2 transform -translate-y-1/2"
            animate={{
              left: ['0%', '100%'],
              scale: [1, 1.5, 1],
            }}
            transition={{
              left: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 1 },
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 