import React, { useState } from 'react';
import { Target, Calendar, Cpu, Rocket, Users, Aperture, Terminal, Share2 } from 'lucide-react';

const navLinks = [
  { name: 'Home', id: 'heading', icon: Target },
  { name: 'About Us', id: 'about', icon: Terminal },
  { name: 'Events', id: 'events', icon: Calendar },
  { name: 'Workshops', id: 'workshops', icon: Cpu },
  { name: 'Projects', id: 'projects', icon: Rocket },
  { name: 'Team', id: 'team', icon: Users },
  { name: 'Gallery', id: 'gallery', icon: Aperture },
  { name: 'Socials', id: 'socials', icon: Share2 }
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
      // Changed bg-black/80 to bg-black/20 and kept backdrop-blur-xl for the glass effect
      className="fixed top-0 right-0 h-screen z-[200] flex flex-col py-8 bg-black/20 backdrop-blur-xl border-l border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: isHovered ? '11.5rem' : '4rem' }}
    >
      <div className="w-full flex justify-end px-3 mb-16">
        <div className="flex items-center gap-4 cursor-pointer">
          <span className={`text-white font-display font-bold tracking-[0.2em] text-xs uppercase overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-right whitespace-nowrap ${isHovered ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}>
            AEROSOC
          </span>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-surface flex-shrink-0 flex items-center justify-center">
            <img src="/aerosoc logo.png" alt="AeroSoc Logo" className="w-full h-full object-cover opacity-100" />
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-8 w-full px-5 mb-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="flex flex-row-reverse items-center justify-start gap-4 group w-full text-gray-400 hover:text-accent transition-colors duration-300">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className={`whitespace-nowrap text-right font-sans text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'w-28 opacity-100' : 'w-0 opacity-0'}`}>
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