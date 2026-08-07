import React from 'react';

const AboutUs = () => {
  return (
    <section 
      id="about" 
      className="w-full min-h-screen flex items-start md:items-center justify-end px-6 sm:px-8 md:px-24 pt-54 sm:pt-28 md:pt-0 bg-transparent pointer-events-none"
    >
      {/* 
        On mobile (< md:): text sits at the top (items-start + pt-54) above the globe.
        On desktop (md:): strictly right-aligned half-width (md:w-1/2 + md:items-center).
      */}
      <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center items-start pointer-events-auto ml-auto pl-0 md:pl-12">
        
        {/* Centered on mobile (text-center md:text-left), slightly larger text-sm sm:text-base */}
        <h3 className="w-full text-center md:text-left text-accent font-sans text-sm sm:text-base md:text-base tracking-[0.3em] uppercase mb-6 sm:mb-8">
          Know About US:
        </h3>
        
        {/* Centered on mobile (text-center md:text-left), bumped mobile text size to text-lg */}
        <p className="w-full text-center md:text-left text-gray-400 font-sans text-lg sm:text-xl md:text-xl leading-relaxed mb-5 sm:mb-6">
          The Aerospace Society of BIT Mesra is a student-driven technical society dedicated to nurturing curiosity and innovation in the fields of aeronautics, astronautics, and space technology.
        </p>
        
        <p className="w-full text-center md:text-left text-gray-400 font-sans text-lg sm:text-xl md:text-xl leading-relaxed">
          Founded with the vision of inspiring the next generation of aerospace engineers and thinkers, the society acts as a launchpad for students passionate about the skies and beyond.   
        </p>
        
      </div>
    </section>
  );
};

export default AboutUs;