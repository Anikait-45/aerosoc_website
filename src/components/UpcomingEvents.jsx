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
      gsap.fromTo('.aero-element', 
        { opacity: 0, y: 40 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1,
          stagger: 0.3,
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
          val: 250,
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
            {/* Bumped mobile logo height to h-56 sm:h-64 (desktop md:h-32 lg:h-100 untouched) */}
            <div className="aero-element h-56 sm:h-64 md:h-32 lg:h-100 w-full flex items-center justify-center overflow-hidden z-10 relative opacity-0">
              <img 
                src="/aerocon26-logo.png" 
                alt="Aerocon 26" 
                className="h-full w-full object-contain" 
              />
            </div>

            <div className="aero-element relative z-0 text-accent font-sans tracking-[0.3em] uppercase text-sm sm:text-base md:text-sm mt-3 sm:mt-4 md:mt-4 opacity-0">
              Flagship Event • Coming Soon
            </div>
          </div>
          
        </div>

        {/* PANEL 2: SKY BREACH */}
        <div className="sky-panel w-screen h-full flex flex-col items-center justify-center pt-24 pb-24 md:pt-32 md:pb-40 px-8 md:px-24 flex-shrink-0">
          
          <div className="sky-header text-center mb-12 pointer-events-auto opacity-0">
            <h2 className="text-5xl md:text-[100px] text-white tracking-wider leading-none">
              <span 
                className="font-light text-[72px] sm:text-[85px] md:text-[115px]" 
                style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 400 }}
              >
                SKY
              </span>{" "}
              <span 
                className="text-accent" 
                style={{ fontFamily: "'Adelia', cursive", fontWeight: 400 }}
              >
                Breach
              </span>
            </h2>

            <p className="text-accent font-sans tracking-[0.3em] uppercase text-xs md:text-sm mt-1 translate-x-12 md:translate-x-48">
              ROCKETRY COMPETITION • Winter
            </p>
          </div>

          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-auto">
            <div className="w-full aspect-video bg-black/50 backdrop-blur-md border border-white/10 p-2 group overflow-hidden">
              {/* Removed grayscale classes so the image displays in full color by default */}
              <img 
                src="/skybreach2.jpeg" 
                alt="Sky Breach" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="text-gray-400 font-sans text-lg leading-relaxed mb-6">
                Skybreach is an exciting model rocketry competition designed for enthusiasts and engineers to showcase their technical expertise. Participants will have the opportunity to demonstrate their mastery of aerospace principles, including advanced propulsion systems, flight dynamics, and the complexities of atmospheric re-entry and component recovery . This event invites teams to push the limits of their innovation and engineering capabilities in a challenging, hands-on environment.
              </div>
              
              <div className="flex flex-row gap-6 flex-wrap mt-2">
                <div className="sky-stats bg-white/5 border-l-4 border-accent p-4 md:p-6 flex flex-col min-w-[160px]">
                  <span className="text-gray-500 font-sans tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">Footfall</span>
                  <span 
                    className="sky-counter text-4xl md:text-5xl font-light text-accent" 
                    style={{ fontFamily: "'Square Dot Matrix'", fontWeight: 500 }}
                  >
                    0+
                  </span>
                </div>
                
                <div className="sky-stats bg-white/5 border-l-4 border-accent p-4 md:p-6 flex flex-col min-w-[160px]">
                  <span className="text-gray-500 font-sans tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2">Teams</span>
                  <span 
                    className="teams-counter text-4xl md:text-5xl font-light text-accent" 
                    style={{ fontFamily: "'Square Dot Matrix'", fontWeight: 500 }}
                  >
                    0+
                  </span>
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