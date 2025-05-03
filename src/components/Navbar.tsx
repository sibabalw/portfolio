'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-display font-bold text-xl">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Sibabalwe
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="#about" className="text-foreground/80 hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#skills" className="text-foreground/80 hover:text-primary transition-colors">
                Skills
              </Link>
              <Link href="#projects" className="text-foreground/80 hover:text-primary transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-foreground/80 hover:text-primary transition-colors">
                Contact
              </Link>
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="px-4 py-2 rounded-full text-white bg-primary hover:bg-primary-light transition-colors"
              >
                Resume
              </a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card shadow-lg">
          <Link 
            href="#about" 
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="#skills" 
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Skills
          </Link>
          <Link 
            href="#projects" 
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="#contact" 
            className="block px-3 py-2 rounded-md text-foreground hover:bg-muted hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="block px-3 py-2 rounded-md text-white bg-primary hover:bg-primary-light"
            onClick={() => setMobileMenuOpen(false)}
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
} 