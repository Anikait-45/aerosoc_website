import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-8 md:px-24 bg-transparent pointer-events-none">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center pointer-events-auto">
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
            About <br /> <span className="text-accent">Us</span>
          </h2>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center pointer-events-auto">
          <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed mb-6">
            Aerosoc was founded to bridge the gap between theoretical knowledge and practical aerospace engineering. We are a collective of driven students dedicated to pushing the boundaries of UAV design, flight dynamics, and embedded systems.
          </p>
          <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed">
            From conceptualization in the lab to successful maiden flights, our mission is to cultivate the next generation of innovators in the aerospace industry.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;