import React from 'react';

const ProjectsPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-32 px-8 md:px-24 flex flex-col justify-between relative overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 gap-6 z-10">
        <div>
          <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase mb-2">AEROSOC </p>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase">
            Our <span className="text-accent">Projects</span>
          </h1>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="px-6 py-3 border border-white/20 hover:border-accent text-white hover:text-accent font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> Return to Main Page
        </button>
      </div>

      {/* Center "Under Construction" HUD */}
      <div className="flex flex-col items-center justify-center my-auto text-center py-24 z-10">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center mb-6 animate-pulse">
          <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>


        <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-wider text-white mb-6">
          UNDER <span className="text-accent">CONSTRUCTION</span>
        </h2>


        <div className="w-24 h-[1px] bg-white/20 my-8"></div>

      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/5 blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default ProjectsPage;