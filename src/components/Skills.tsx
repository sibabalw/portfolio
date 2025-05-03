'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaServer, FaTools } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

// Define a type for our skill
type Skill = {
  name: string;
  icon: string;
  level: number;
  color: string;
};

// Group our skills by category
type SkillCategory = {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax scrolling
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);

  // Define our skill categories with skills
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend Development",
      icon: <FaCode className="text-white text-xl" />,
      skills: [
        { name: "React", icon: "⚛️", level: 90, color: "from-[#61DAFB] to-[#2D79C7]" },
        { name: "TypeScript", icon: "TS", level: 85, color: "from-[#3178C6] to-[#235A97]" },
        { name: "Next.js", icon: "⚡", level: 88, color: "from-[#000000] to-[#333333]" },
        { name: "HTML/CSS", icon: "🌐", level: 95, color: "from-[#E34F26] to-[#264DE4]" },
        { name: "Tailwind CSS", icon: "🌊", level: 90, color: "from-[#38B2AC] to-[#2C7A7B]" },
      ]
    },
    {
      name: "Backend Development",
      icon: <FaServer className="text-white text-xl" />,
      skills: [
        { name: "Node.js", icon: "🟢", level: 85, color: "from-[#339933] to-[#1F6B1F]" },
        { name: "Express", icon: "🚀", level: 82, color: "from-[#000000] to-[#333333]" },
        { name: "MongoDB", icon: "🍃", level: 80, color: "from-[#47A248] to-[#2E671F]" },
        { name: "PostgreSQL", icon: "🐘", level: 75, color: "from-[#336791] to-[#1D3F59]" },
        { name: "Firebase", icon: "🔥", level: 85, color: "from-[#FFCA28] to-[#F57C00]" },
      ]
    },
    {
      name: "Other Skills",
      icon: <FaTools className="text-white text-xl" />,
      skills: [
        { name: "Git", icon: "🐙", level: 88, color: "from-[#F05032] to-[#BD3C24]" },
        { name: "UI/UX Design", icon: "🎨", level: 80, color: "from-[#FF61F6] to-[#C549D8]" },
        { name: "Docker", icon: "🐳", level: 70, color: "from-[#2496ED] to-[#0E62A8]" },
        { name: "Testing", icon: "🧪", level: 75, color: "from-[#EF4444] to-[#B91C1C]" },
        { name: "CI/CD", icon: "🔄", level: 72, color: "from-[#4F46E5] to-[#3730A3]" },
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  // Add a useState for active skill
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Add a useEffect for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      skillRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Only apply effect when mouse is within a certain distance
        const maxDistance = 300;
        const distance = Math.sqrt(
          Math.pow(rect.left + rect.width / 2 - e.clientX, 2) +
          Math.pow(rect.top + rect.height / 2 - e.clientY, 2)
        );
        
        if (distance < maxDistance) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * 4; // Limit rotation to 4 degrees
          const rotateY = ((centerX - x) / centerX) * 4;
          
          ref.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        } else {
          ref.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        }
      });
    };
    
    const handleMouseLeave = () => {
      skillRefs.current.forEach((ref) => {
        if (!ref) return;
        ref.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        ref.style.transition = 'transform 0.5s ease-out';
      });
    };
    
    const sectionElement = document.getElementById('skills');
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      sectionElement.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        sectionElement.removeEventListener('mousemove', handleMouseMove);
        sectionElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <section 
      id="skills" 
      className="py-24 relative overflow-hidden backdrop-blur-sm" 
      ref={sectionRef}
    >
      {/* Background canvas for particle effect */}
      <div className="absolute inset-0 z-0">
        <canvas id="skills-particles" className="absolute top-0 left-0 w-full h-full opacity-30"></canvas>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-40 left-20 -z-10 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ y: backgroundY }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-40 right-20 -z-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      ></motion.div>
      
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          style={{ opacity: contentOpacity }}
        >
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            My Skills
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.5 }}
          ></motion.div>
          
          <motion.p 
            className="mt-6 text-foreground/80 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            These are the technologies and tools I work with to build amazing digital experiences.
            I'm constantly learning and expanding my skill set.
          </motion.p>
        </motion.div>

        <motion.div 
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.name} 
              className="glass backdrop-blur-md bg-background/20 border border-white/10 rounded-2xl p-8 shadow-xl"
              variants={categoryVariants}
              custom={categoryIndex}
            >
              <motion.div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
                <motion.div 
                  className="flex-grow h-px bg-border"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + categoryIndex * 0.2 }}
                ></motion.div>
              </motion.div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    className={`bg-background/40 backdrop-blur-sm p-6 rounded-xl border ${activeSkill === skill.name ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/5'} shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                    variants={skillVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
                    ref={el => { 
                      skillRefs.current[categoryIndex * 5 + skillIndex] = el;
                    }}
                    style={{ transition: 'transform 0.2s ease-out' }}
                  >
                    {/* Shimmer effect */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
                        transform: 'translateX(-100%)'
                      }}
                      animate={{ 
                        transform: ['translateX(-100%)', 'translateX(100%)'] 
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 7 + skillIndex
                      }}
                    />

                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className={`w-10 h-10 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-white font-bold shadow-md`}
                          whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          {skill.icon}
                        </motion.div>
                        <h4 className="text-xl font-bold">{skill.name}</h4>
                      </div>
                      <motion.span 
                        className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + skillIndex * 0.1 }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    
                    <div className="w-full h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm p-[2px]">
                      <motion.div 
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                        style={{ width: 0 }}
                        variants={progressVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={skill.level}
                      ></motion.div>
                    </div>
                    
                    {/* Enhanced skill info */}
                    <AnimatePresence>
                      {activeSkill === skill.name && (
                        <motion.div 
                          className="mt-4 pt-4 border-t border-white/10"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-sm text-foreground/70">
                            I've been working with {skill.name} for {Math.floor(skill.level / 10)} years, building various projects and solving real-world problems.
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-primary/70">Click to {activeSkill === skill.name ? 'collapse' : 'expand'}</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <motion.div 
                                  key={star}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: star <= Math.ceil(skill.level / 20) ? 1 : 0.5 }}
                                  transition={{ delay: 0.1 * star }}
                                  className={`w-3 h-3 rounded-full ${star <= Math.ceil(skill.level / 20) ? 'bg-primary' : 'bg-muted'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add a skills timeline visualization after the main skills grid */}
        <motion.div 
          className="mt-16 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">My Learning Journey</h3>
          
          <div className="relative">
            {/* Timeline bar */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent opacity-30"></div>
            
            {/* Timeline nodes */}
            <div className="space-y-16 relative">
              {[
                { year: "2018", title: "Started Web Development", skills: ["HTML", "CSS", "JavaScript"], description: "Began my journey with the fundamentals of web development" },
                { year: "2019", title: "Frontend Frameworks", skills: ["React", "TypeScript", "Tailwind CSS"], description: "Focused on modern frontend frameworks and tools" },
                { year: "2020", title: "Backend Development", skills: ["Node.js", "Express", "MongoDB"], description: "Expanded into backend development to build full-stack applications" },
                { year: "2021", title: "Advanced Concepts", skills: ["Next.js", "Firebase", "Testing"], description: "Mastered advanced frameworks and development practices" },
                { year: "2022+", title: "Continuous Learning", skills: ["Docker", "CI/CD", "UI/UX Design"], description: "Expanding my expertise with DevOps and design skills" }
              ].map((milestone, index) => (
                <motion.div 
                  key={milestone.year}
                  className={`flex items-start gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  {/* Timeline node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center z-10"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </motion.div>
                    <motion.div 
                      className="text-lg font-bold py-1 px-4 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 shadow-lg"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {milestone.year}
                    </motion.div>
                  </div>
                  
                  {/* Timeline content */}
                  <motion.div 
                    className={`w-5/12 glass backdrop-blur-sm bg-background/20 rounded-xl p-6 border border-white/10 shadow-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <h4 className="text-xl font-bold mb-2">{milestone.title}</h4>
                    <p className="text-foreground/70 mb-4">{milestone.description}</p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {milestone.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Initialize particles */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('skills-particles');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const particles = [];
            const particleCount = 40;
            
            // Create particles with different shapes
            for (let i = 0; i < particleCount; i++) {
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: Math.random() > 0.5 
                  ? 'rgba(37, 99, 235, ' + (Math.random() * 0.15 + 0.05) + ')'
                  : 'rgba(109, 40, 217, ' + (Math.random() * 0.15 + 0.05) + ')',
                shape: Math.floor(Math.random() * 3) // 0: circle, 1: square, 2: triangle
              });
            }
            
            function animate() {
              requestAnimationFrame(animate);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.fillStyle = p.color;
                
                if (p.shape === 0) {
                  // Circle
                  ctx.beginPath();
                  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                  ctx.fill();
                } else if (p.shape === 1) {
                  // Square
                  ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
                } else {
                  // Triangle
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y - p.size);
                  ctx.lineTo(p.x - p.size, p.y + p.size);
                  ctx.lineTo(p.x + p.size, p.y + p.size);
                  ctx.closePath();
                  ctx.fill();
                }
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x > canvas.width) p.x = 0;
                if (p.x < 0) p.x = canvas.width;
                if (p.y > canvas.height) p.y = 0;
                if (p.y < 0) p.y = canvas.height;
              }
            }
            
            animate();
            
            window.addEventListener('resize', function() {
              canvas.width = canvas.offsetWidth;
              canvas.height = canvas.offsetHeight;
            });
          });
        `
      }} />
    </section>
  );
} 