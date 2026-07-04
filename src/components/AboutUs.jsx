import React from 'react';

// ACCEPT THE PROP HERE
const AboutUs = ({ onGoBack }) => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-8 md:px-24 bg-transparent pointer-events-none">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-24">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center pointer-events-auto">
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
            About <br /> <span className="text-accent">Us</span>
          </h2>
        </div>

        {/* Added items-start here so the button aligns left with the text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start pointer-events-auto">
          <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed mb-6">
            The Aerospace Society of BIT Mesra is a student-driven technical society dedicated to nurturing curiosity and innovation in the fields of aeronautics, astronautics, and space technology.
          </p>
          <p className="text-gray-400 font-sans text-lg md:text-xl leading-relaxed mb-10">
            Founded with the vision of inspiring the next generation of aerospace engineers and thinkers, the society acts as a launchpad for students passionate about the skies and beyond.   
          </p>
          
          {/* THE HYPERSPEED RETURN BUTTON */}
          <button 
            onClick={onGoBack}
            className="flex items-center gap-3 px-6 py-3 border border-white/20 hover:border-accent text-white/60 hover:text-white font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 group rounded-full backdrop-blur-sm bg-black/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Return to Orbit
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;