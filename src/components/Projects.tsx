'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaStar, FaTimes, FaReact, FaNodeJs, FaCode } from 'react-icons/fa';
import ProjectCard from './ProjectCard';

// Define technology type
type Technology = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

// Define our project type
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  technologies: Technology[];
  demo: string;
  github: string;
  featured: boolean;
};

// Technology icons mapping
const techIcons: Record<string, { icon: React.ReactNode, color: string }> = {
  "React": { icon: <FaReact size={12} />, color: "#61DAFB" },
  "React Native": { icon: <FaReact size={12} />, color: "#61DAFB" },
  "Next.js": { icon: <FaCode size={12} />, color: "#000000" },
  "Node.js": { icon: <FaNodeJs size={12} />, color: "#339933" },
  "TypeScript": { icon: <FaCode size={12} />, color: "#3178C6" },
  "JavaScript": { icon: <FaCode size={12} />, color: "#F7DF1E" },
  "Firebase": { icon: <FaCode size={12} />, color: "#FFCA28" },
  "MongoDB": { icon: <FaCode size={12} />, color: "#47A248" },
  "PostgreSQL": { icon: <FaCode size={12} />, color: "#336791" },
  "Express": { icon: <FaNodeJs size={12} />, color: "#000000" },
  "Vue.js": { icon: <FaCode size={12} />, color: "#4FC08D" },
  "Tailwind CSS": { icon: <FaCode size={12} />, color: "#38B2AC" },
  "D3.js": { icon: <FaCode size={12} />, color: "#F9A03C" },
  "Redux": { icon: <FaCode size={12} />, color: "#764ABC" },
  "WebSockets": { icon: <FaCode size={12} />, color: "#4353FF" },
  "Chart.js": { icon: <FaCode size={12} />, color: "#FF6384" },
  "Stripe": { icon: <FaCode size={12} />, color: "#635BFF" },
  "Geolocation": { icon: <FaCode size={12} />, color: "#3B82F6" },
  "OpenWeatherAPI": { icon: <FaCode size={12} />, color: "#E03C32" },
  "HealthKit": { icon: <FaCode size={12} />, color: "#30D158" },
};

// Helper function to create technology array from tags
const createTechnologies = (tags: string[]): Technology[] => {
  return tags.map(tag => ({
    name: tag,
    icon: techIcons[tag]?.icon || <FaCode size={12} />,
    color: techIcons[tag]?.color || "#6366F1"
  }));
};

// Define our projects
const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "What started as a simple shopping cart evolved into a comprehensive digital marketplace. I built this platform to solve real-world challenges in online retail, focusing on seamless user experience from browsing to checkout. The integration with Stripe transformed payment processing from a technical hurdle into a smooth customer journey.",
    image: "https://placehold.co/600x400/2563eb/FFFFFF?text=E-Commerce+Platform",
    tags: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    technologies: createTechnologies(["Next.js", "TypeScript", "Stripe", "MongoDB"]),
    demo: "https://example.com/demo1",
    github: "https://github.com/sibabalwe/ecommerce",
    featured: true
  },
  {
    id: 2,
    title: "Portfolio Dashboard",
    description: "Born from my own need to visualize financial growth, this dashboard transforms complex investment data into intuitive insights. Every chart and metric was carefully crafted to tell the story behind the numbers, helping users make informed decisions. The real-time data visualization brings financial narratives to life, making abstract concepts tangible.",
    image: "https://placehold.co/600x400/6d28d9/FFFFFF?text=Portfolio+Dashboard",
    tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
    technologies: createTechnologies(["React", "D3.js", "Firebase", "Tailwind CSS"]),
    demo: "https://example.com/demo2",
    github: "https://github.com/sibabalwe/portfolio-dashboard",
    featured: true
  },
  {
    id: 3,
    title: "Social Media App",
    description: "This platform was built on the belief that technology should bring people closer together. I designed each feature around authentic human connection, from the way messages flow naturally between users to how content sharing feels like passing notes to friends. The real-time elements create a digital space that feels alive with conversation.",
    image: "https://placehold.co/600x400/f97316/FFFFFF?text=Social+Media+App",
    tags: ["React Native", "Firebase", "Redux", "Node.js"],
    technologies: createTechnologies(["React Native", "Firebase", "Redux", "Node.js"]),
    demo: "https://example.com/demo3",
    github: "https://github.com/sibabalwe/social-app",
    featured: false
  },
  {
    id: 4,
    title: "Task Management System",
    description: "This project emerged from observing how teams struggled with coordination and visibility. Every feature—from the intuitive task assignments to the real-time updates—was designed to eliminate the friction in collaboration. The notification system acts as a digital teammate, keeping everyone aligned and focused on shared goals.",
    image: "https://placehold.co/600x400/4f46e5/FFFFFF?text=Task+Management",
    tags: ["Vue.js", "Express", "PostgreSQL", "WebSockets"],
    technologies: createTechnologies(["Vue.js", "Express", "PostgreSQL", "WebSockets"]),
    demo: "https://example.com/demo4",
    github: "https://github.com/sibabalwe/task-manager",
    featured: false
  },
  {
    id: 5,
    title: "Weather Application",
    description: "More than just temperature readings, this app turns weather data into a visual story of atmospheric conditions. The challenge was transforming scientific measurements into meaningful insights anyone could understand. Through thoughtful design and visualization, users can now see the weather narrative unfolding in their location and plan accordingly.",
    image: "https://placehold.co/600x400/3b82f6/FFFFFF?text=Weather+App",
    tags: ["React", "OpenWeatherAPI", "Chart.js", "Geolocation"],
    technologies: createTechnologies(["React", "OpenWeatherAPI", "Chart.js", "Geolocation"]),
    demo: "https://example.com/demo5",
    github: "https://github.com/sibabalwe/weather-app",
    featured: false
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "This app began as a personal challenge to improve my own fitness journey through better data insights. Each feature was crafted from the perspective of someone on a health transformation, focusing on progress visualization that motivates rather than overwhelms. The app turns exercise data into a visual narrative of personal growth.",
    image: "https://placehold.co/600x400/8b5cf6/FFFFFF?text=Fitness+Tracker",
    tags: ["React Native", "Firebase", "Chart.js", "HealthKit"],
    technologies: createTechnologies(["React Native", "Firebase", "Chart.js", "HealthKit"]),
    demo: "https://example.com/demo6",
    github: "https://github.com/sibabalwe/fitness-tracker",
    featured: false
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Transform values for parallax scrolling
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);
    
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2 + (index * 0.1)
      }
    })
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Apply tilt effect to each project card
      projectRefs.current.forEach((ref) => {
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
          
          const rotateX = ((y - centerY) / centerY) * 5; // Limit rotation to 5 degrees
          const rotateY = ((centerX - x) / centerX) * 5;
          
          ref.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        } else {
          ref.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        }
      });
    };
    
    const handleMouseLeave = () => {
      // Reset all transforms when mouse leaves the projects section
      projectRefs.current.forEach((ref) => {
        if (!ref) return;
        ref.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        ref.style.transition = 'transform 0.5s ease-out';
      });
    };
    
    const sectionElement = document.getElementById('projects');
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
    <section id="projects" className="pt-24 pb-12 relative overflow-hidden" ref={sectionRef}>
      {/* Background canvas for particle effect */}
      <div className="absolute inset-0 z-0">
        <canvas id="projects-particles" className="absolute top-0 left-0 w-full h-full opacity-30"></canvas>
      </div>
      
      {/* Animated background elements */}
      <motion.div 
        className="absolute -top-20 left-40 -z-10 w-[30rem] h-[30rem] rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{ y: backgroundY1 }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-20 -right-20 -z-10 w-[25rem] h-[25rem] rounded-full bg-secondary/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        style={{ y: backgroundY2 }}
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
            My Projects
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
            Each project in my portfolio represents a unique chapter in my development journey. These aren't just code repositories—they're digital solutions crafted to solve real problems and create meaningful experiences.
          </motion.p>
        </motion.div>
        
        {/* Filter buttons */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="p-1 glass rounded-full inline-flex backdrop-blur-sm shadow-lg border border-white/10">
            <motion.button 
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${filter === 'all' 
                ? 'bg-gradient-to-r from-primary/80 to-secondary/80 text-white shadow-md'
                : 'hover:bg-white/10'}`}
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            <motion.button 
              className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${filter === 'featured' 
                ? 'bg-gradient-to-r from-primary/80 to-secondary/80 text-white shadow-md' 
                : 'hover:bg-white/10'}`}
              onClick={() => setFilter('featured')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Featured
            </motion.button>
          </div>
        </motion.div>

        {/* Projects grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              demoLink={project.demo}
              githubLink={project.github}
              technologies={project.technologies}
              featured={project.featured}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </motion.div>
        
        {/* View more button */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.a 
            href="https://github.com/sibabalwe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-foreground border border-white/10 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View More on GitHub</span>
            <FaGithub className="ml-2" />
          </motion.a>
        </motion.div>
        
        {/* Project details modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div 
              className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            >
              <motion.div 
                className="bg-background/90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="relative">
                  <div className="relative h-72 md:h-96">
                    <motion.div
                      initial={{ scale: 1.1, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-full h-full"
                    >
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Animated grid pattern */}
                    <motion.div 
                      className="absolute inset-0 opacity-0"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.15, 0],
                        backgroundPosition: ["0px 0px", "30px 30px"] 
                      }}
                      transition={{ 
                        opacity: { duration: 3, repeat: Infinity, repeatType: "reverse" },
                        backgroundPosition: { 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "linear"
                        }
                      }}
                      style={{ 
                        backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .07) 25%, rgba(255, 255, 255, .07) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .07) 75%, rgba(255, 255, 255, .07) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .07) 25%, rgba(255, 255, 255, .07) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .07) 75%, rgba(255, 255, 255, .07) 76%, transparent 77%, transparent)",
                        backgroundSize: "30px 30px"
                      }}
                    />
                    
                    {/* Light sweep effect */}
                    <motion.div 
                      className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5 }}
                      style={{ mixBlendMode: "overlay" }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    
                    <motion.button
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/10"
                      onClick={() => setActiveProject(null)}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes />
                    </motion.button>
                    
                    {activeProject.featured && (
                      <motion.div 
                        className="absolute top-4 left-4 bg-gradient-to-r from-accent to-accent/80 text-white text-sm px-3 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-2"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <FaStar className="text-yellow-200" />
                        </motion.div>
                        <span>Featured Project</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">{activeProject.title}</h3>
                  <p className="text-foreground/70 mb-6 leading-relaxed">{activeProject.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-foreground">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tags.map((tag, i) => (
                        <span key={i} className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>Live Demo</span>
                      <FaExternalLinkAlt size={14} />
                    </motion.a>
                    <motion.a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-foreground/10 text-foreground rounded-full shadow-md border border-white/10"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Code</span>
                      <FaGithub size={14} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Initialize particles */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('projects-particles');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            const particles = [];
            const particleCount = 30;
            
            // Create floating dots
            for (let i = 0; i < particleCount; i++) {
              particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 0.5,
                color: Math.random() > 0.5 
                  ? 'rgba(37, 99, 235, ' + (Math.random() * 0.1 + 0.05) + ')'
                  : 'rgba(109, 40, 217, ' + (Math.random() * 0.1 + 0.05) + ')',
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                connectionRadius: 100
              });
            }
            
            function animate() {
              requestAnimationFrame(animate);
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              
              // Draw particles and connections
              for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) {
                  particle.speedX = -particle.speedX;
                }
                if (particle.y < 0 || particle.y > canvas.height) {
                  particle.speedY = -particle.speedY;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();
                
                // Draw connections to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                  const particle2 = particles[j];
                  const dx = particle.x - particle2.x;
                  const dy = particle.y - particle2.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance < particle.connectionRadius) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particle2.x, particle2.y);
                    ctx.strokeStyle = 'rgba(100, 100, 255, ' + (0.05 - distance/particle.connectionRadius * 0.05) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                  }
                }
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