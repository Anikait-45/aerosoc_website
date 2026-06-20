import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CardStack = ({ children, zIndex }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scale: 0.85,
        opacity: 0.25,
        borderRadius: "24px",
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => {
            const isTall = containerRef.current.offsetHeight > window.innerHeight;
            return isTall ? "bottom bottom" : "top top";
          },
          end: () => "+=" + window.innerHeight,
          scrub: true,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true, 
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative transform-gpu bg-background origin-top shadow-[0_-25px_50px_rgba(0,0,0,0.8)]"
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};

export default CardStack;