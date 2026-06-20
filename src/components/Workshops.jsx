import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Workshops = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".fade-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="workshops" ref={sectionRef} className="py-32 px-8 md:px-24 bg-background min-h-screen border-t border-white/5 flex flex-col justify-center relative overflow-hidden">
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[200vw] pointer-events-none z-0 flex opacity-20">
        <div className="animate-marquee whitespace-nowrap flex">
          <h2 className="text-[150px] font-display font-black uppercase stroke-text pr-8">
            TECHNICAL TRAINING
          </h2>
          <h2 className="text-[150px] font-display font-black uppercase stroke-text pr-8">
            TECHNICAL TRAINING
          </h2>
        </div>
      </div>

      <div className="relative z-10">
        <div className="overflow-hidden">
          <h2 className="fade-text text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
            Technical <span className="text-accent">Workshops</span>
          </h2>
        </div>
        <div className="overflow-hidden mt-6">
          <p className="fade-text text-gray-400 font-sans text-xl max-w-2xl">
            Hands-on training sessions in CAD, embedded C, and flight dynamics.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Workshops;