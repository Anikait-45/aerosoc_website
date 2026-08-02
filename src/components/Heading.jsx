import React from 'react';

const Heading = ({ onNavigate }) => {
  return (
    <section 
      id="heading" 
      className="w-full min-h-screen flex flex-col justify-center items-start text-left pointer-events-none px-8 md:px-24 relative overflow-hidden"
    >
      {/* =========================================================
          1. TOP-CENTER CLICKABLE TELEMETRY WIDGETS
         ========================================================= */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto hidden md:flex items-center gap-4">
        
        {/* WIDGET 1: PROJECTS */}
        <div 
          onClick={() => onNavigate && onNavigate('projects')}
          className="relative border border-white/20 rounded-xl p-3.5 w-36 bg-black/40 backdrop-blur-md text-center flex flex-col items-center group hover:border-accent/60 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          {/* UAV / Aircraft Wireframe Icon */}
          <div className="w-8 h-8 my-1 flex items-center justify-center text-white/80 group-hover:text-accent group-hover:scale-110 transition-all duration-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>

          <p className="text-white font-display font-bold text-xs tracking-wider uppercase mt-0.5 group-hover:text-accent transition-colors">
            Projects
          </p>
          
        </div>

        {/* WIDGET 2: WORKSHOPS */}
        <div 
          onClick={() => onNavigate && onNavigate('workshops')}
          className="relative border border-white/20 rounded-xl p-3.5 w-36 bg-black/40 backdrop-blur-md text-center flex flex-col items-center group hover:border-accent/60 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >
          
          <div className="w-8 h-8 my-1 flex items-center justify-center text-white/80 group-hover:text-accent group-hover:scale-110 transition-all duration-300">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
            </svg>
          </div>

          <p className="text-white font-display font-bold text-xs tracking-wider uppercase mt-0.5 group-hover:text-accent transition-colors">
            Workshops
          </p>
          
        </div>

      </div>

      <div className="relative z-10 pointer-events-auto w-full max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-4">
          AeroSpace <br />{" "}
          <span 
            className="text-accent"
            style={{ fontFamily: "Led Dot Matrix", fontWeight: 450, fontSize: 115 }}
          >
            SOCIETY
          </span>
        </h1>
        
        <p className="text-gray-400 font-sans tracking-[0.3em] uppercase text-sm md:text-lg mt-6">
          Aerosoc | BIT MESRA
        </p>

        <button className="mt-14 md:mt-20 px-8 py-4 bg-accent hover:bg-white text-black font-display font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center gap-3 shadow-[0_0_25px_rgba(0,210,255,0.3)] hover:scale-105 active:scale-95 cursor-pointer">
          <svg className="w-5 h-5 stroke-black fill-none" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span>Sponsor Us</span>
        </button>
      </div>
    </section>
  );
};

export default Heading;