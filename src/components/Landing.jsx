import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Landing = ({ onInitiate }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // 1. Inject the Audiowide font safely
    if (!document.getElementById('audiowide-font')) {
      const link = document.createElement('link');
      link.id = 'audiowide-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap';
      document.head.appendChild(link);
    }

    // 2. Exact 2-second delay for the Text and Button appearance
    gsap.fromTo(textRef.current, 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 2.0 }
    );
    
    gsap.fromTo(buttonRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 2.0 }
    );
  }, []);

  const handleWarpClick = () => {
    buttonRef.current.style.pointerEvents = 'none';

    gsap.to(videoRef.current, {
      scale: 0.001,
      opacity: 0,
      duration: 2.2, 
      ease: "power2.in"
    });
    
    gsap.to([textRef.current, buttonRef.current], { 
      opacity: 0, 
      duration: 1,
      ease: "power2.inOut" 
    });

    onInitiate();
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#020202] flex items-center justify-center">
      
      <div ref={videoRef} className="absolute inset-0 w-full h-full flex items-center justify-center transform-gpu origin-center">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
          <source src="/blackhole.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
      </div>

      {/* TOP LEFT: Audiowide Font, Whole White Text */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20">
        <h1 ref={textRef} style={{ fontFamily: "'Audiowide', sans-serif" }} className="text-white text-2xl md:text-4xl tracking-widest uppercase leading-tight">
          Aerospace<br/>Society
        </h1>
      </div>

      {/* BOTTOM CENTER: Positioned to the very end of the screen */}
      <button 
        ref={buttonRef}
        onClick={handleWarpClick}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 px-10 py-4 border border-white/20 bg-black/40 backdrop-blur-md text-white font-sans text-xs tracking-[0.4em] uppercase hover:border-accent transition-all duration-500 overflow-hidden group"
      >
        <span className="relative z-10 group-hover:text-black transition-colors duration-500">
          Initiate Jump
        </span>
        <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
      </button>

    </section>
  );
};

export default Landing;