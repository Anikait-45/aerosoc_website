import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const GlobalArrow = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    // Hide the arrow if we reach the very bottom of the page (the Team section)
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setIsAtBottom(isBottom);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    // The exact IDs of our main sections
    const sections = ['heading', 'projects', 'team'];
    
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        // If the top of the section is below our current view (with a 50px buffer), 
        // it means this is the NEXT section coming up.
        if (rect.top > 50) {
          el.scrollIntoView({ behavior: 'smooth' });
          return; // Stop the loop once we find the immediate next section
        }
      }
    }
  };

  // Don't render the arrow if there is nowhere left to scroll
  if (isAtBottom) return null; 

  return (
    <button 
      onClick={scrollToNext}
      className="fixed bottom-10 right-10 z-[100] w-14 h-14 rounded-full border border-white/10 bg-surface/50 backdrop-blur-md flex items-center justify-center text-gray-400 hover:border-accent hover:text-accent transition-all duration-300 group"
      aria-label="Skip to next section"
    >
      {/* The arrow gently bounces inside the circle on hover */}
      <ChevronDown className="w-8 h-8 group-hover:translate-y-1 transition-transform duration-300" />
    </button>
  );
};

export default GlobalArrow;