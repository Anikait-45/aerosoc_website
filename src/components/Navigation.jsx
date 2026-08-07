import React, { useState } from 'react';
import { Target, Calendar, Cpu, Rocket, Users, Aperture, Terminal, Share2, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', id: 'heading', icon: Target },
  { name: 'About Us', id: 'about', icon: Terminal },
  { name: 'Events', id: 'events', icon: Calendar },
  { name: 'Workshops', id: 'workshops', icon: Cpu, isPage: true, targetView: 'workshops' },
  { name: 'Projects', id: 'projects', icon: Rocket, isPage: true, targetView: 'projects' },
  { name: 'Team', id: 'team', icon: Users, isPage: true, targetView: 'roster' },
  { name: 'Gallery', id: 'gallery', icon: Aperture, isPage: true, targetView: 'archive' },
  { name: 'Socials', id: 'socials', icon: Share2 }
];

const Navigation = ({ onGoHome, onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (link) => {
    setIsHovered(false);
    setMobileMenuOpen(false);

    if (link.isPage) {
      if (onNavigate) {
        onNavigate(link.targetView);
      }
      return;
    }

    if (link.id === 'heading') {
      if (onGoHome) onGoHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(link.id);
    if (!element) return;

    if (link.id === 'about') {
      const getExactCenter = () => {
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        return elementTop + (element.offsetHeight - window.innerHeight) / 2;
      };

      window.scrollTo({ top: getExactCenter(), behavior: 'smooth' });

      setTimeout(() => {
        window.scrollTo({ top: getExactCenter(), behavior: 'smooth' });
      }, 750);

      setTimeout(() => {
        window.scrollTo({ top: getExactCenter(), behavior: 'smooth' });
      }, 1500);

      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* MOBILE TOP BAR WITH MINIMALIST 3-LINE ICON */}
      <div className="fixed top-6 right-6 z-[201] flex md:hidden items-center pointer-events-auto">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="w-11 h-11 rounded-full bg-black/80 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:text-accent transition-colors duration-300"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="flex flex-col gap-1 w-4">
              <span className="w-full h-[1.5px] bg-current transition-all"></span>
              <span className="w-full h-[1.5px] bg-current transition-all"></span>
              <span className="w-full h-[1.5px] bg-current transition-all"></span>
            </div>
          )}
        </button>
      </div>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[200] flex md:hidden flex-col items-center justify-center px-6 transition-all duration-500 pointer-events-auto ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 flex items-center justify-center">
            <img src="/aerosoc logo.png" alt="AeroSoc Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-display font-bold tracking-[0.2em] text-sm uppercase">
            AEROSOC
          </span>
        </div>

        <nav className="flex flex-col items-center gap-6 w-full">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="flex items-center gap-4 text-white/80 hover:text-accent transition-colors duration-300 py-1"
              >
                <Icon className="w-5 h-5 text-accent" />
                <span className="font-sans text-sm tracking-[0.2em] uppercase">
                  {link.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* DESKTOP SIDEBAR NAVIGATION (UNTOUCHED) */}
      <div 
        className="hidden md:flex fixed top-0 right-0 h-screen z-[200] flex-col py-8 bg-transparent backdrop-blur-sm border-l border-white/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: isHovered ? '11rem' : '4rem' }}
      >
        <div className="w-full flex justify-end px-3 mb-30">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => handleNavClick({ id: 'heading' })}>
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
              <button key={link.id} onClick={() => handleNavClick(link)} className="flex flex-row-reverse items-center justify-start gap-4 group w-full text-gray-400 hover:text-accent transition-colors duration-300">
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
    </>
  );
};

export default Navigation;