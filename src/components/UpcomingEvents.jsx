import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const UpcomingEvents = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: "+=200%", 
        }
      });

      scrollTl.to(trackRef.current, {
        x: "-50%", 
        ease: "none",
        duration: 2
      })
      .to({}, { duration: 1 });

      // SEQUENCED AEROCON FADE-IN
      // Targets both the logo and the subtitle (.aero-element) and staggers them by 0.3s
      gsap.fromTo('.aero-element', 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.3, // The delay between the logo and the text appearing
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", 
            toggleActions: "restart none none reverse"
          }
      });

      gsap.fromTo('.sky-header', 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, y: 0, duration: 1.2,
          scrollTrigger: {
            trigger: ".sky-panel",
            containerAnimation: scrollTl,
            start: "left 75%", 
            toggleActions: "restart none none reset" 
          }
      });

      const skyCounter = document.querySelector('.sky-counter');
      const teamsCounter = document.querySelector('.teams-counter');

      gsap.fromTo('.sky-stats', 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1, y: 0, duration: 1, stagger: 0.2,
          scrollTrigger: {
            trigger: ".sky-panel",
            containerAnimation: scrollTl,
            start: "left 75%", 
            toggleActions: "restart none none reset" 
          }
      });

      let skyObj = { val: 0 };
      gsap.fromTo(skyObj, 
        { val: 0 }, 
        {
          val: 2500, // Make sure to set this back to 2500!
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sky-panel",
            containerAnimation: scrollTl,
            start: "left 75%",
            toggleActions: "restart none none reset"
          },
          onUpdate: () => { if (skyCounter) skyCounter.innerHTML = Math.floor(skyObj.val).toLocaleString() + "+"; }
      });

      let teamsObj = { val: 0 };
      gsap.fromTo(teamsObj, 
        { val: 0 }, 
        {
          val: 50, 
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".sky-panel",
            containerAnimation: scrollTl,
            start: "left 75%",
            toggleActions: "restart none none reset"
          },
          onUpdate: () => { if (teamsCounter) teamsCounter.innerHTML = Math.floor(teamsObj.val).toLocaleString() + "+"; }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="events" ref={sectionRef} className="h-screen w-full overflow-hidden bg-transparent relative border-t border-white/5 pointer-events-none">
      
      <div ref={trackRef} className="flex h-full w-[200vw] items-center">
        
        {/* PANEL 1: AEROCON */}
        <div className="w-screen h-full flex flex-col items-center justify-center pt-6 pb-24 md:pt-12 md:pb-40 flex-shrink-0">
          
          <div className="text-center mb-12 pointer-events-auto flex flex-col items-center justify-center w-full">
              
              {/* 1. Added 'aero-element' class to the logo wrapper */}
              <div className="aero-element h-24 md:h-32 lg:h-[100px] w-full flex items-center justify-center overflow-hidden z-10 relative opacity-0">
                <img 
                  src="/aerocon26-logo.png" 
                  alt="Aerocon 26" 
                  className="h-full w-full object-contain" 
                />
              </div>

            {/* 2. Changed from <p> to <div> so App.jsx ignores it, and added 'aero-element' */}
            <div className="aero-element relative z-0 text-accent font-sans tracking-[0.3em] uppercase text-xs md:text-sm mt-2 md:mt-4 opacity-0">
              Flagship Event • Coming Soon
            </div>
          </div>
          
        </div>

        {/* PANEL 2: SKY BREACH */}
        <div className="sky-panel w-screen h-full flex flex-col items-center justify-center pt-24 pb-24 md:pt-32 md:pb-40 px-8 md:px-24 flex-shrink-0">
          
          <div className="sky-header text-center mb-12 pointer-events-auto opacity-0">
            <h2 className="text-5xl md:text-[100px] font-black text-white uppercase tracking-wider leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              SKY <span className="text-accent">BREACH</span>
            </h2>
            <p className="text-accent font-sans tracking-[0.3em] uppercase text-sm mt-4">Technical Hackathon • Winter</p>
          </div>

          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-auto">
            <div className="w-full aspect-video bg-black/50 backdrop-blur-md border border-white/10 p-2 group overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200" 
                alt="Sky Breach" 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center">
              {/* Changed <p> to <div> so the global engine ignores it during the horizontal slide */}
              <div className="text-gray-400 font-sans text-lg leading-relaxed mb-6">
                A 48-hour intensive hardware and software hackathon. Teams are tasked with building autonomous target detection algorithms, programming flight controllers from scratch, and pushing embedded systems to the edge of failure.
              </div>
              
              <div className="flex flex-row gap-6 flex-wrap mt-2">
                <div className="sky-stats bg-white/5 border-l-4 border-accent p-4 md:p-6 flex flex-col min-w-[160px]">
                  <span className="text-gray-500 font-sans tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">Footfall</span>
                  <span className="sky-counter text-4xl md:text-5xl font-display font-black text-accent" style={{ fontFamily: "'Orbitron', sans-serif" }}>0+</span>
                </div>
                
                <div className="sky-stats bg-white/5 border-l-4 border-accent p-4 md:p-6 flex flex-col min-w-[160px]">
                  <span className="text-gray-500 font-sans tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">Teams</span>
                  <span className="teams-counter text-4xl md:text-5xl font-display font-black text-accent" style={{ fontFamily: "'Orbitron', sans-serif" }}>0+</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;