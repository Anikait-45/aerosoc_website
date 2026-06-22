import React from 'react';

const Heading = () => {
  return (
    <section id="heading" className="relative w-full h-screen flex flex-col justify-center overflow-hidden pointer-events-none px-8 md:px-24">
      
      {/* Changed to items-start and text-left */}
      <div className="relative z-10 flex flex-col items-start text-left pointer-events-auto w-full max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-4">
          AeroSoc <br /> <span className="text-accent">BIT Mesra</span>
        </h1>
        <p className="text-gray-400 font-sans tracking-[0.3em] uppercase text-sm md:text-lg mt-6">
          Pioneering the future of flight
        </p>
      </div>

    </section>
  );
};

export default Heading;