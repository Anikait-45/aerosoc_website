import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalSlider = ({ id, title, data, category }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const totalSlides = data.length + 2;

  useEffect(() => {
    let ctx = gsap.context(() => {
      const getScrollDistance = () => window.innerWidth * (totalSlides - 1);
      
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
  }, [totalSlides]);

  return (
    <section id={id} ref={sectionRef} className="h-screen overflow-hidden bg-transparent relative border-t border-white/5 pointer-events-none">
      <div ref={trackRef} className="flex h-full items-center" style={{ width: `${totalSlides * 100}vw` }}>
        
        <div className="w-screen h-full flex flex-col justify-center px-8 md:px-24 flex-shrink-0">
          <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
            {title.split(' ')[0]} <br/> <span className="text-accent">{title.split(' ')[1]}</span>
          </h2>
        </div>

        {data.map((item, index) => (
          <div key={index} className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
            {/* The physical card is made clickable with pointer-events-auto */}
            <div className="pointer-events-auto w-full max-w-4xl min-h-[450px] bg-black/50 backdrop-blur-md border border-white/10 relative group transition-colors duration-500 overflow-hidden flex flex-col justify-end p-12">
              <div className="absolute inset-0 bg-transparent z-0">
                {item.img && <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>
              <div className="relative z-10">
                <span className="absolute -top-16 right-0 text-5xl font-display font-black text-white/10 group-hover:text-accent/20 transition-colors duration-500">{`0${index + 1}`}</span>
                <p className="text-accent font-display tracking-widest text-xs uppercase mb-4">{category}</p>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-6">{item.title}</h3>
                <p className="text-gray-400 text-base md:text-lg font-sans max-w-2xl">{item.description}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
          <div className="text-center pointer-events-auto">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">View The <br/> <span className="text-accent">Full Archive</span></h3>
            <button className="px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-black font-display font-bold text-base tracking-widest transition-all duration-300">EXPLORE ALL</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalSlider;