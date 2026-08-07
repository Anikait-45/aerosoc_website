import React from 'react';

const Heading = ({ onNavigate }) => {
  return (
    <section 
      id="heading" 
      className="w-full min-h-screen flex flex-col justify-start md:justify-between items-center md:items-start text-center md:text-left pointer-events-none px-6 sm:px-8 md:px-24 2xl:px-32 pt-6 pb-6 relative overflow-hidden"
    >
      {/* MOBILE ONLY: Sponsor Us button positioned at Top-Left of screen */}
      <div className="absolute top-6 left-6 sm:left-8 z-30 md:hidden pointer-events-auto">
        <button className="group relative overflow-hidden px-5 py-2.5 bg-white hover:bg-accent text-black font-sans font-semibold text-xs normal-case tracking-normal rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer min-w-[110px] h-[38px] flex items-center justify-center">
          <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-y-10 group-hover:opacity-0">
            Sponsor Us
          </span>
          <span className="absolute inline-block transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            Thanks!
          </span>
        </button>
      </div>

      {/* Top Right Links - Hidden on phone (hidden md:flex), visible on desktop & monitor */}
      <div className="hidden md:flex w-full justify-end items-center gap-4 z-30 pointer-events-auto">
        <div className="heading-anim-btn">
          <button 
            onClick={() => onNavigate && onNavigate('projects')}
            className="px-3 py-2 bg-transparent border-none text-white/90 hover:text-accent font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]"
          >
            Projects
          </button>
        </div>
        <div className="heading-anim-btn">
          <button 
            onClick={() => onNavigate && onNavigate('workshops')}
            className="px-3 py-2 bg-transparent border-none text-white/90 hover:text-accent font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(0,210,255,0.8)]"
          >
            Workshops
          </button>
        </div>
      </div>

      {/* Main Typography Block - Scaled up text & added gap between words on mobile */}
      <div className="relative z-10 pointer-events-auto w-full max-w-7xl 2xl:max-w-[1600px] mx-auto mt-64 sm:mt-40 md:my-auto text-center md:text-left">
        <h1 className="text-6xl sm:text-7xl md:text-8xl 2xl:text-9xl font-display font-black text-white uppercase tracking-tighter leading-none sm:leading-tight mb-4 mx-auto md:ml-0 md:pl-0 block w-full">
          AeroSpace <br />
          <span className="text-accent inline-block mt-3 md:mt-0">
            SOCIETY
          </span>
        </h1>
        
        <p className="text-gray-400 font-sans tracking-[0.3em] sm:tracking-[0.4em] uppercase text-base sm:text-lg md:text-lg 2xl:text-xl mt-10 sm:mt-6 mx-auto md:ml-2 pl-0 block w-full">
          Aerosoc | BIT MESRA
        </p>
      </div>

      {/* MOBILE ONLY: Projects & Workshops buttons — Set to bottom-12, text-xs, and text-white/60 */}
      <div className="absolute bottom-36 left-0 right-0 z-30 flex md:hidden justify-center items-center gap-10 pointer-events-auto">
        <button 
          onClick={() => onNavigate && onNavigate('projects')}
          className="px-3 py-2 bg-transparent border-none text-white/60 hover:text-accent font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-95"
        >
          Projects
        </button>
        <button 
          onClick={() => onNavigate && onNavigate('workshops')}
          className="px-3 py-2 bg-transparent border-none text-white/60 hover:text-accent font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer active:scale-95"
        >
          Workshops
        </button>
      </div>

      {/* DESKTOP & MONITOR ONLY: Sponsor Us button at bottom-left */}
      <div className="hidden md:flex relative z-10 pointer-events-auto w-full max-w-7xl 2xl:max-w-[1600px] mx-auto justify-start">
        <div className="heading-anim-btn">
          <button className="group relative overflow-hidden px-6 py-3 bg-white hover:bg-accent text-black font-sans font-semibold text-base normal-case tracking-normal rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95 cursor-pointer min-w-[140px] h-[46px] flex items-center justify-center">
            <span className="inline-block transition-all duration-500 ease-out group-hover:-translate-y-10 group-hover:opacity-0">
              Sponsor Us
            </span>
            <span className="absolute inline-block transition-all duration-500 ease-out translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
              Thanks!
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Heading;