import React from 'react';

const Heading = () => {
  return (
    <section id="heading" className="w-full flex flex-col justify-center items-start text-left pointer-events-none px-8 md:px-24">
      <div className="relative z-10 pointer-events-auto w-full max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-tight mb-4">
          AeroSpace <br /> <span className="text-accent">SOCIETY</span>
        </h1>
        <p className="text-gray-400 font-sans tracking-[0.3em] uppercase text-sm md:text-lg mt-6">
          Aerosoc | BIT MESRA
        </p>
      </div>
    </section>
  );
};

export default Heading;