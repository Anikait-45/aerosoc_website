import React, { useState } from 'react';
import { Target, Calendar, Cpu, Rocket, Users, Aperture, Terminal } from 'lucide-react';

const navLinks = [
  { name: 'Home', id: 'heading', icon: Target },
  { name: 'Events', id: 'events', icon: Calendar },
  { name: 'Workshops', id: 'workshops', icon: Cpu },
  { name: 'Projects', id: 'projects', icon: Rocket },
  { name: 'Team', id: 'team', icon: Users },
  { name: 'Gallery', id: 'gallery', icon: Aperture },
  { name: 'About Us', id: 'about', icon: Terminal }
];

const Navigation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToSection = (id) => {
    setIsHovered(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="fixed top-0 right-0 h-screen z-[200] flex flex-col justify-center bg-surface/80 backdrop-blur-xl border-l border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: isHovered ? '16rem' : '4rem' }}
    >
      <nav className="flex flex-col gap-10 w-full px-5">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="flex flex-row-reverse items-center justify-start gap-4 group w-full text-gray-400 hover:text-accent transition-colors duration-300"
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              <span 
                className={`whitespace-nowrap text-right font-sans text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isHovered ? 'w-32 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                {link.name}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;