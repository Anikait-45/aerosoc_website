import React from 'react';

const AboutUs = () => {
  return (
    <section id="about" className="w-full flex items-center justify-end px-8 md:px-24 bg-transparent pointer-events-none">
      
      {/* 
        By pushing this to md:w-1/2 and adding ml-auto, it ensures the text stays strictly 
        on the right half of the screen, leaving the left half empty for your 3D figure.
      */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start pointer-events-auto ml-auto pl-0 md:pl-12">
        
        <h3 className="text-accent font-sans text-sm md:text-base tracking-[0.3em] uppercase mb-8">
          Know About US:
        </h3>
        
        <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed mb-6">
          The Aerospace Society of BIT Mesra is a student-driven technical society dedicated to nurturing curiosity and innovation in the fields of aeronautics, astronautics, and space technology.
        </p>
        
        <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed">
          Founded with the vision of inspiring the next generation of aerospace engineers and thinkers, the society acts as a launchpad for students passionate about the skies and beyond.   
        </p>
        
      </div>
    </section>
  );
};

export default AboutUs;