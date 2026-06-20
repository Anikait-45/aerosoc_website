import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', id: 'heading' },
  { name: 'Events', id: 'events' },
  { name: 'Workshops', id: 'workshops' },
  { name: 'Projects', id: 'projects' },
  { name: 'Team', id: 'team' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'About Us', id: 'about' }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-[100] w-12 h-12 rounded-full bg-surface/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-accent hover:border-accent transition-all duration-300"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div 
        className={`fixed top-0 right-0 h-screen w-72 bg-surface/80 backdrop-blur-xl border-l border-white/5 z-[200] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end p-8">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-12 mt-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-left text-sm font-sans font-light tracking-[0.2em] uppercase text-gray-400 hover:text-accent transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navigation;