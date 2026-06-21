import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CardStack = ({ children, zIndex }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Gently fade in the background container
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", 
          }
        }
      );

      // 2. The Text Reveal Engine (Finds all headings and staggers them up)
      const textElements = containerRef.current.querySelectorAll('h1, h2, h3');
      if (textElements.length > 0) {
        gsap.fromTo(textElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-black flex flex-col justify-center opacity-0" style={{ zIndex }}>
      {children}
    </div>
  );
};

export default CardStack;