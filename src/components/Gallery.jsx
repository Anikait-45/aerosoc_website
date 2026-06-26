import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  { id: 1, location: "TEST SITE ALPHA, 2025", img: "https://images.unsplash.com/photo-1579820010410-c10411aaaa88?q=80&w=800", size: "w-48 md:w-64", yOffset: "-translate-y-16 md:-translate-y-24" },
  { id: 2, location: "NATIONAL DRONE COMP, 2024", img: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=1200", size: "w-64 md:w-80", yOffset: "translate-y-20 md:translate-y-28" },
  { id: 3, location: "AERODYNAMICS LAB, 2025", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800", size: "w-52 md:w-72", yOffset: "-translate-y-6 md:-translate-y-8" },
  { id: 4, location: "MAIDEN FLIGHT, 2023", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200", size: "w-64 md:w-80", yOffset: "translate-y-12 md:translate-y-16" },
];

const Gallery = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const trackWidth = trackRef.current.scrollWidth;
      const getScrollDistance = () => trackWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + getScrollDistance(),
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="h-screen overflow-hidden bg-transparent relative border-t border-white/5 flex items-center pointer-events-none">
      
      {/* Added pb-24 md:pb-40 to shift the entire track upwards */}
      <div ref={trackRef} className="flex h-full items-center pb-24 md:pb-40 px-16 md:px-48 gap-24 md:gap-56 w-max transform-gpu">
        
        {galleryData.map((item) => (
          <div key={item.id} className={`flex-shrink-0 flex flex-col ${item.size} ${item.yOffset} pointer-events-auto`}>
            <p className="text-[9px] font-sans tracking-[0.25em] text-gray-500 uppercase mb-3 ml-1">{item.location}</p>
            <div className="w-full aspect-[4/5] overflow-hidden bg-black/50 backdrop-blur-sm border border-white/5 relative group cursor-pointer">
              <img src={item.img} alt={item.location} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
            </div>
          </div>
        ))}

        <div className="flex-shrink-0 w-72 md:w-80 -translate-y-6 md:-translate-y-8 pointer-events-auto">
          <h3 className="text-xl md:text-2xl font-display text-white leading-relaxed font-light">
            "One small step for man, <span className="text-accent italic font-normal">one giant leap for mankind."</span>
          </h3>
          <p className="mt-4 text-[10px] text-gray-600 font-sans tracking-[0.2em] uppercase">Neil Armstrong</p>
        </div>

        <div className="flex-shrink-0 w-[40vw] pointer-events-none" />
      </div>
    </section>
  );
};

export default Gallery;