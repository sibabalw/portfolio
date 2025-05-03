'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroEnhanced from '../components/HeroEnhanced';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import StoryScroll from '../components/StoryScroll';
import SectionIntro from '../components/SectionIntro';
import SectionConnector from '../components/SectionConnector';
import NarrativePath from '../components/NarrativePath';
import StoryPoint from '../components/StoryPoint';
import ChapterMarker from '../components/ChapterMarker';
import StoryTimeline from '../components/StoryTimeline';
import StoryBookmark from '../components/StoryBookmark';
import { FaBriefcase, FaLaptopCode, FaEnvelope, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  
  // Define narrative flow text for each section
  const narrativeContent = {
    about: {
      subtitle: "The story behind the code",
      title: "My Digital Journey",
      description: "Every line of code I write is shaped by my experiences and challenges. Join me as I share the pivotal moments that transformed me from a curious tech enthusiast into a passionate developer crafting digital solutions."
    },
    skills: {
      subtitle: "My technical repertoire",
      title: "Tools of My Craft",
      description: "These aren't just technologies I've learned—they're instruments I've mastered through countless hours of problem-solving and creation. Each skill represents a chapter in my ongoing quest to build better digital experiences."
    },
    projects: {
      subtitle: "Ideas brought to life",
      title: "Digital Stories I've Crafted",
      description: "Behind each project lies a unique narrative of discovery and innovation. These creations aren't just code—they're solutions to real challenges, each with its own journey from concept to completion."
    },
    contact: {
      subtitle: "Let's create together",
      title: "The Next Chapter Awaits",
      description: "Every great digital story begins with a conversation. I'm ready to bring your vision to life with the perfect blend of creativity and technical expertise. Let's discuss how we can create something extraordinary together."
    }
  };
  
  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        
        const top = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollPosition >= top && scrollPosition <= top + height) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section change from story timeline
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Create a reusable component for section indicators at the top of each section
  const SectionIndicator = ({ id }: { id: string }) => (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse-slow"></div>
      </div>
      <div className="mt-2 text-primary/70 text-xs font-mono tracking-wider text-center opacity-80">
        {id}
      </div>
    </div>
  );

  const { scrollYProgress } = useScroll();

  return (
    <StoryScroll>
      <div className="min-h-screen antialiased">
        <Navbar />
        
        {/* Continuous flowing background element */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute w-full h-[120%] top-0 left-0">
            {/* Floating gradient paths */}
            <div className="absolute top-[10%] -left-20 w-[50vw] h-[130vh] opacity-10 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute top-[45%] -right-20 w-[45vw] h-[100vh] opacity-10 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-full blur-3xl animate-float-slower"></div>
            <div className="absolute top-[80%] left-1/4 w-[40vw] h-[80vh] opacity-10 bg-gradient-radial from-accent/20 via-transparent to-transparent rounded-full blur-3xl animate-float"></div>
            
            {/* Connective flowing line */}
            <svg className="absolute h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M0,50 C150,150 250,0 400,100 C550,200 450,300 600,250 C750,200 850,350 1000,300" 
                fill="none" 
                stroke="url(#flowing-gradient)" 
                strokeWidth="1" 
                strokeDasharray="5,5"
                strokeOpacity="0.2"
                className="animate-draw-path path-animation"
              />
              <defs>
                <linearGradient id="flowing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="50%" stopColor="var(--secondary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Story Timeline */}
        <NarrativePath 
          sections={['hero', 'about', 'skills', 'projects', 'contact']}
          pathLabels={['Welcome', 'About Me', 'Skills', 'Projects', 'Contact']}
          activeSection={activeSection}
        />
        
        {/* Story Bookmark */}
        <StoryBookmark currentSection={activeSection} />
        
        {/* Interactive Story Timeline */}
        <StoryTimeline 
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
        
        {/* Scroll progress indicator */}
        <motion.div 
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="h-48 w-[3px] bg-foreground/10 rounded-full relative">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-secondary to-accent rounded-full"
                style={{ 
                  height: `${scrollYProgress.get() * 100}%`, 
                  backgroundSize: '200% 200%',
                  backgroundPosition: '0% 0%'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
            
            <div className="mt-4 text-xs uppercase tracking-widest text-foreground/60 font-medium">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Hero Section */}
        <section id="hero">
          <HeroEnhanced />
        </section>
        
        {/* Connector from Hero to About */}
        <SectionConnector 
          fromSection="hero" 
          toSection="about" 
          icon={<FaUser />} 
          message="Begin the journey into my story"
        />
        
        {/* About Section with Chapter Marker */}
        <ChapterMarker 
          number={1}
          title="The Origin Story"
          subtitle="Where it all began"
          theme="primary"
          align="center"
        />
        
        <section id="about" className="pt-24 pb-12 relative overflow-hidden">
          <SectionIndicator id="about" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <SectionIntro 
              subtitle={narrativeContent.about.subtitle}
              title={narrativeContent.about.title}
              description={narrativeContent.about.description}
            />
          </div>
          
          {/* Story Points */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <StoryPoint 
              type="discovery"
              title="The Spark of Curiosity"
              description="It all began with dismantling old electronics and endless 'why' questions. This childlike wonder evolved into a structured pursuit of understanding how digital systems work."
              align="left"
            />
            
            <StoryPoint 
              type="idea"
              title="Finding My Digital Voice"
              description="After exploring different paths, I discovered that coding wasn't just about logic—it was a creative medium where I could express solutions and bring ideas to reality."
              align="right"
            />
            
            <StoryPoint 
              type="process"
              title="Growth Through Challenges"
              description="Each project became a learning laboratory, pushing me beyond comfort zones. The obstacles I encountered transformed into stepping stones toward mastery."
              align="left"
            />
            
            <StoryPoint 
              type="achievement"
              title="Building What Matters"
              description="Today, I focus on creating meaningful digital experiences that solve real problems. Every line of code serves a purpose in the larger narrative of making technology more human-centered."
              align="right"
            />
          </div>
          
          <About />
        </section>
        
        {/* Connector from About to Skills */}
        <SectionConnector 
          fromSection="about" 
          toSection="skills" 
          icon={<FaLaptopCode />} 
          message="Discover the tools that shape my craft"
        />
        
        {/* Skills Section with Chapter Marker */}
        <ChapterMarker 
          number={2}
          title="The Arsenal"
          subtitle="Tools and techniques"
          theme="secondary"
          align="right"
        />
        
        <section id="skills" className="pt-24 pb-12 relative overflow-hidden">
          <SectionIndicator id="skills" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <SectionIntro 
              subtitle={narrativeContent.skills.subtitle}
              title={narrativeContent.skills.title}
              description={narrativeContent.skills.description}
              align="right"
            />
          </div>
          <Skills />
        </section>
        
        {/* Connector from Skills to Projects */}
        <SectionConnector 
          fromSection="skills" 
          toSection="projects" 
          icon={<FaBriefcase />} 
          message="See how skills transform into solutions"
        />
        
        {/* Projects Section with Chapter Marker */}
        <ChapterMarker 
          number={3}
          title="The Adventures"
          subtitle="Challenges conquered"
          theme="accent"
          align="left"
        />
        
        <section id="projects" className="pt-24 pb-12 relative overflow-hidden">
          <SectionIndicator id="projects" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <SectionIntro 
              subtitle={narrativeContent.projects.subtitle}
              title={narrativeContent.projects.title}
              description={narrativeContent.projects.description}
              align="left"
            />
          </div>
          <Projects />
        </section>
        
        {/* Connector from Projects to Contact */}
        <SectionConnector 
          fromSection="projects" 
          toSection="contact" 
          icon={<FaEnvelope />} 
          message="Ready to write our story together?"
        />
        
        {/* Contact Section with Chapter Marker */}
        <ChapterMarker 
          number={4}
          title="The Collaboration"
          subtitle="Let's create together"
          theme="primary"
          align="center"
        />
        
        <section id="contact" className="pt-24 pb-12 relative overflow-hidden">
          <SectionIndicator id="contact" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <SectionIntro 
              subtitle={narrativeContent.contact.subtitle}
              title={narrativeContent.contact.title}
              description={narrativeContent.contact.description}
            />
          </div>
          <Contact />
        </section>
        
        <Footer />
        <ScrollToTop />
      </div>
    </StoryScroll>
  );
}
