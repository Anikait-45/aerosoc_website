import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalSlider = ({ id, title, data, category }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const pinDistance = trackRef.current.offsetWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -pinDistance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + pinDistance,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const totalSlides = data.length + 2;

  return (
    <section id={id} ref={sectionRef} className="h-screen overflow-hidden bg-background relative border-t border-white/5">
      <div ref={trackRef} className="flex h-full items-center" style={{ width: `${totalSlides * 100}vw` }}>
        
        <div className="w-screen h-full flex flex-col justify-center px-8 md:px-24 flex-shrink-0">
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
            {title.split(' ')[0]} <br/> <span className="text-accent">{title.split(' ')[1]}</span>
          </h2>
        </div>

        {data.map((item, index) => (
          <div key={index} className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
            <div className="w-full max-w-4xl bg-surface border border-white/10 p-12 relative group hover:border-accent/50 transition-colors duration-500">
              <span className="absolute top-8 right-8 text-6xl font-display font-black text-white/5">{`0${index + 1}`}</span>
              <p className="text-accent font-display tracking-widest text-sm uppercase mb-4">{category}</p>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-6">{item.title}</h3>
              <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl">{item.description}</p>
            </div>
          </div>
        ))}

        <div className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
          <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-8">View The <br/> <span className="text-accent">Full Archive</span></h3>
            <button className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-background font-display font-bold text-lg tracking-widest transition-all duration-300">EXPLORE ALL</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalSlider;