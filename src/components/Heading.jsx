import React from 'react';

const Heading = ({ onNavigate }) => {
  return (
    <section 
      id="heading" 
      className="w-full min-h-screen flex flex-col justify-between items-start text-left pointer-events-none px-8 md:px-24 pt-6 pb-6 relative overflow-hidden"
    >
      <div className="w-full flex justify-end items-center gap-3 z-30 pointer-events-auto">
        <div className="heading-anim-btn">
          <button 
            onClick={() => onNavigate && onNavigate('projects')}
            className="px-6 py-2.5 rounded-full bg-transparent bg-opacity-0 border border-white text-white hover:bg-accent hover:border-accent hover:text-black font-sans font-medium text-sm tracking-wide transition-all duration-300 shadow-none hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] cursor-pointer"
          >
            Projects
          </button>
        </div>
        <div className="heading-anim-btn">
          <button 
            onClick={() => onNavigate && onNavigate('workshops')}
            className="px-6 py-2.5 rounded-full bg-transparent bg-opacity-0 border border-white text-white hover:bg-accent hover:border-accent hover:text-black font-sans font-medium text-sm tracking-wide transition-all duration-300 shadow-none hover:shadow-[0_0_25px_rgba(0,210,255,0.6)] cursor-pointer"
          >
            Workshops
          </button>
        </div>
      </div>

      <div className="relative z-10 pointer-events-auto w-full max-w-7xl mx-auto my-auto text-left">
        <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-4 ml-0 pl-0 block w-full">
          AeroSpace <br />{" "}
          <span className="text-accent">
            SOCIETY
          </span>
        </h1>
        
        <p className="text-gray-400 font-sans tracking-[0.4em] uppercase text-sm md:text-lg mt-6 ml-2 pl-0 block w-full">
          Aerosoc | BIT MESRA
        </p>
      </div>

      <div className="relative z-10 pointer-events-auto w-full max-w-7xl mx-auto flex justify-start">
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