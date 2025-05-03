'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type TimelineItemProps = {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
};

export default function TimelineItem({ year, title, description, icon, index }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });
  
  // Determine if this is an even or odd index for alternating layout
  const isEven = index % 2 === 0;
  
  return (
    <div 
      ref={itemRef}
      className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} w-full mb-8 relative`}
    >
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1">
        <div className="h-full w-full bg-gradient-to-b from-primary/80 via-secondary/70 to-accent/60 rounded-full"></div>
      </div>
      
      {/* Year badge with animated circle at center */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 z-10">
        <motion.div 
          className="relative flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="w-14 h-14 rounded-full bg-background border-2 border-primary/80 flex items-center justify-center text-sm font-bold z-20">
            {year}
          </div>
          <motion.div 
            className="absolute inset-0 rounded-full bg-primary/20"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: [0, 1.5, 1] } : { scale: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          />
        </motion.div>
      </div>
      
      {/* Content */}
      <motion.div 
        className={`w-5/12 px-4 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <div className="bg-card/50 backdrop-blur-sm p-5 rounded-xl border border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-primary/70">
            {icon && <span>{icon}</span>}
            <span className="text-foreground/50">#{index + 1}</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
          
          <p className="text-muted-foreground text-sm">{description}</p>
          
          {/* Decoration */}
          <div className="absolute top-1/2 transform -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent to-primary/50 right-4 opacity-70"></div>
        </div>
      </motion.div>
      
      {/* Empty space for alternating layout */}
      <div className="w-5/12"></div>
    </div>
  );
} 