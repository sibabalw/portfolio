'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBookmark, FaTimes, FaCheck, FaChevronRight } from 'react-icons/fa';

interface Bookmark {
  section: string;
  position: number;
  timestamp: number;
  title: string;
}

interface StoryBookmarkProps {
  currentSection: string;
}

export default function StoryBookmark({ currentSection }: StoryBookmarkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Section titles mapping
  const sectionTitles: Record<string, string> = {
    'hero': 'Introduction',
    'about': 'My Journey',
    'skills': 'Tools of My Craft',
    'projects': 'Digital Stories',
    'contact': 'Next Chapter'
  };
  
  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('story-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);
  
  // Save bookmarks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('story-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Handle saving current position as bookmark
  const saveBookmark = () => {
    const scrollPosition = window.scrollY;
    const now = Date.now();
    
    // Check if we already have a bookmark for this section
    const existingIndex = bookmarks.findIndex(bm => bm.section === currentSection);
    
    if (existingIndex !== -1) {
      // Update existing bookmark
      const updatedBookmarks = [...bookmarks];
      updatedBookmarks[existingIndex] = {
        section: currentSection,
        position: scrollPosition,
        timestamp: now,
        title: sectionTitles[currentSection] || currentSection
      };
      setBookmarks(updatedBookmarks);
    } else {
      // Add new bookmark
      setBookmarks([...bookmarks, {
        section: currentSection,
        position: scrollPosition,
        timestamp: now,
        title: sectionTitles[currentSection] || currentSection
      }]);
    }
    
    // Show success message
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };
  
  // Handle loading a bookmark
  const loadBookmark = (bookmark: Bookmark) => {
    const element = document.getElementById(bookmark.section);
    if (!element) return;
    
    window.scrollTo({
      top: bookmark.position,
      behavior: 'smooth'
    });
    
    setIsOpen(false);
  };
  
  // Handle removing a bookmark
  const removeBookmark = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks.splice(index, 1);
    setBookmarks(updatedBookmarks);
  };
  
  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col items-end">
      {/* Bookmark Button */}
      <motion.button
        className="p-3 bg-background/80 backdrop-blur-md rounded-full shadow-lg border border-white/10 text-foreground/80 hover:text-primary transition-colors relative"
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <FaBookmark className={isOpen ? "text-primary" : ""} />
        
        {/* Bookmark count badge */}
        {bookmarks.length > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-white font-bold">
            {bookmarks.length}
          </div>
        )}
      </motion.button>
      
      {/* Success Message */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            className="bg-green-500/90 text-white px-3 py-1 rounded-lg text-sm mt-2 backdrop-blur-md flex items-center gap-2"
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <FaCheck /> 
            <span>Bookmark saved!</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Bookmark Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-2 w-72 bg-background/90 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden"
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Story Bookmarks</h3>
                <button 
                  className="text-primary"
                  onClick={saveBookmark}
                >
                  Save Position
                </button>
              </div>
              <p className="text-xs text-foreground/60">
                Save your place in the story to continue later.
              </p>
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {bookmarks.length === 0 ? (
                <div className="p-4 text-sm text-foreground/60 text-center">
                  No bookmarks saved yet. Use "Save Position" to save your place in the story.
                </div>
              ) : (
                <ul className="divide-y divide-white/5">
                  {bookmarks.map((bookmark, index) => (
                    <motion.li 
                      key={bookmark.section + bookmark.timestamp}
                      className="hover:bg-white/5 cursor-pointer group"
                      onClick={() => loadBookmark(bookmark)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-primary">
                            {bookmark.title}
                          </div>
                          <div className="text-xs text-foreground/60">
                            {formatTime(bookmark.timestamp)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.button
                            className="text-red-400 opacity-0 group-hover:opacity-100"
                            onClick={(e) => removeBookmark(index, e)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTimes size={14} />
                          </motion.button>
                          <FaChevronRight 
                            className="text-foreground/40 group-hover:text-primary" 
                            size={12} 
                          />
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 