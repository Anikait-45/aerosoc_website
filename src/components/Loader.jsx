import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = ({ onFlash, onWipeComplete, onComplete }) => {
  const containerRef = useRef(null);
  const actionBoxRef = useRef(null);
  const contentRef = useRef(null);
  const darkBgRef = useRef(null);
  const counterRef = useRef(null);

  const flashRef = useRef(onFlash);
  const wipeCompleteRef = useRef(onWipeComplete);
  const completeRef = useRef(onComplete);

  useEffect(() => {
    flashRef.current = onFlash;
    wipeCompleteRef.current = onWipeComplete;
    completeRef.current = onComplete;
  }, [onFlash, onWipeComplete, onComplete]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const progress = { val: 0 };
      
      gsap.to(progress, {
        val: 100,
        duration: 4.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) counterRef.current.innerText = Math.floor(progress.val) + "%";
        }
      });

      gsap.to(actionBoxRef.current, {
        height: "100%",
        duration: 4.5,
        ease: "power2.inOut",
        onComplete: () => {
          
          const tl = gsap.timeline();

          tl.to(contentRef.current, { opacity: 0, duration: 0.1 })
            .to(actionBoxRef.current, {
              width: "100%",
              duration: 0.6,
              ease: "expo.inOut",
              onComplete: () => {
                gsap.set(darkBgRef.current, { opacity: 0 });
                if (flashRef.current) flashRef.current(); 
                gsap.set(actionBoxRef.current, { left: "auto", right: 0 });
              }
            })
            .to({}, { duration: 0.3 })
            .to(actionBoxRef.current, {
              width: "4rem", 
              duration: 1.5,
              ease: "power4.inOut",
              onComplete: () => {
                if (wipeCompleteRef.current) wipeCompleteRef.current();
              }
            })
            .to(actionBoxRef.current, {
              backgroundColor: "rgba(0, 0, 0, 0.2)", 
              borderLeft: "1px solid rgba(255, 255, 255, 0.05)", 
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                if (completeRef.current) completeRef.current();
              }
            });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] overflow-hidden flex items-end justify-center pointer-events-none">
      
      {/* ENDFIELD-INSPIRED GRADIENT BACKGROUND */}
      <div 
        ref={darkBgRef} 
        className="absolute inset-0 z-20 pointer-events-auto bg-[#0c0c0e]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 70% 30%, rgba(200, 70, 30, 0.08) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 4px'
        }}
      ></div>

      <div ref={contentRef} className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 pl-20 md:p-12 md:pl-28 relative z-30 pointer-events-auto">
        
        {/* === RESTORED ORIGINAL LOGO SIZE AND ALIGNMENT (OVER THE FRONTIER POSITION) === */}
        <div className="flex-1 flex items-center justify-end pr-12 md:pr-32 w-full">
            <div className="h-32 md:h-48 lg:h-[10.5rem] overflow-hidden flex items-center justify-center">
              <img src="/aerocon26-logo.png" alt="Flagship Event" className="w-full h-full object-contain opacity-100" />
            </div>
        </div>

        {/* LOWER DATA CONTROLS - COMPACTED SIZES PRESERVED */}
        <div className="flex flex-col items-start justify-end pb-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-6 bg-[#00d2ff]"></div>
              
              {/* Reduced percentage size */}
              <span ref={counterRef} className="text-[#00d2ff] text-4xl md:text-5xl font-black font-display tracking-tighter leading-none">
                0%
              </span>
            </div>
            
            {/* Reduced subtext size */}
            <span className="text-white text-[9px] md:text-[10px] tracking-[0.25em] uppercase opacity-60 font-mono mt-4">
              Initializing Environment...
            </span>
        </div>
      </div>

      {/* Action Bar */}
      <div ref={actionBoxRef} className="absolute bottom-0 left-0 w-16 bg-[#00d2ff] z-40" style={{ height: "0%" }}></div>
    </div>
  );
};

export default Loader;