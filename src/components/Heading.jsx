import React from 'react';

const Heading = () => {
  return (
    <section id="heading" className="relative h-screen flex flex-col justify-center items-start px-8 md:px-24 overflow-hidden bg-background">
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] pointer-events-none z-0 flex">
        <div className="animate-marquee whitespace-nowrap flex">
          <h1 className="text-[120px] md:text-[250px] font-display font-black uppercase stroke-text pr-8">
            AEROSOC BIT MESRA
          </h1>
          <h1 className="text-[120px] md:text-[250px] font-display font-black uppercase stroke-text pr-8">
            AEROSOC BIT MESRA
          </h1>
        </div>
      </div>

      <div className="z-10 relative">
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-black leading-[0.85] tracking-tighter uppercase text-white">
          <div className="overflow-hidden">AEROSOC</div>
        </h1>
        
        <p className="mt-6 md:mt-8 text-base md:text-xl text-gray-400 max-w-lg font-sans">
          Welcome to AEROSOC LOL
        </p>

        <button className="mt-8 md:mt-10 px-6 py-3 md:px-8 md:py-4 bg-accent text-background font-display font-bold text-sm md:text-lg tracking-wide hover:bg-white transition-colors duration-300 relative z-50 group">
          EXPLORE OUR FLEET
        </button>
      </div>
    </section>
  );
};

export default Heading;