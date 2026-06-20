import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
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
    <section id="gallery" ref={sectionRef} className="py-32 px-8 md:px-24 bg-surface min-h-screen border-t border-white/5 flex flex-col justify-center">
      <div className="overflow-hidden">
        <h2 className="fade-text text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
          The <span className="text-accent">Gallery</span>
        </h2>
      </div>
      <div className="overflow-hidden mt-6">
        <p className="fade-text text-gray-400 font-sans text-xl max-w-2xl">
          Visual logs .
        </p>
      </div>
    </section>
  );
};

export default Gallery;