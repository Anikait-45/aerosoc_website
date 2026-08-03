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
    let ctx;
    
    const frameId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
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
    });

    return () => {
      cancelAnimationFrame(frameId);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    // FIX 1: Swapped standard inset for explicitly fixed top/left with dynamic viewport height (100dvh)
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-[100dvh] z-[9999] pointer-events-none overflow-hidden">
      <div 
        ref={darkBgRef} 
        className="absolute inset-0 w-full h-full z-20 pointer-events-auto bg-[#111114]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 68% 42%, #2a2a30 0%, #18181d 38%, #0e0e11 80%),
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: 'cover, 100px 100px, 100px 100px'
        }}
      >
        <svg 
          className="w-full h-full object-cover opacity-45" 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{
            maskImage: 'radial-gradient(circle at 68% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 85%)',
            WebkitMaskImage: 'radial-gradient(circle at 68% 42%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0) 85%)'
          }}
        >
          <g stroke="white" strokeWidth="0.6" strokeOpacity="0.22" fill="none">
            <path d="M-150,150 C100,80 350,220 600,180 C850,140 1100,50 1500,120" />
            <path d="M-150,210 C120,140 370,280 620,240 C870,200 1120,110 1500,180" />
            <path d="M-150,270 C140,200 390,340 640,300 C890,260 1140,170 1500,240" />
            <path d="M-150,330 C160,260 410,400 660,360 C910,320 1160,230 1500,300" />
            <path d="M-150,390 C180,320 430,460 680,420 C930,380 1180,290 1500,360" />
            <path d="M-150,450 C200,380 450,520 700,480 C950,440 1200,350 1500,420" />
            <path d="M-150,510 C220,440 470,580 720,540 C970,500 1220,410 1500,480" />
            <path d="M-150,570 C240,500 490,640 740,600 C990,560 1240,470 1500,540" />
            <path d="M-150,630 C260,560 510,700 760,660 C1010,620 1260,530 1500,600" />
            <path d="M-150,690 C280,620 530,760 780,720 C1030,680 1280,590 1500,660" />
            <path d="M-150,750 C300,680 550,820 800,780 C1050,740 1300,650 1500,720" />
            <path d="M-150,810 C320,740 570,880 820,840 C1070,800 1320,710 1500,780" />
            <path d="M-150,870 C340,800 590,940 840,900 C1090,860 1340,770 1500,840" />

            <path d="M350,-100 C500,150 750,250 900,500 C1050,750 950,950 1200,1050" />
            <path d="M410,-100 C560,150 810,250 960,500 C1110,750 1010,950 1260,1050" />
            <path d="M470,-100 C620,150 870,250 1020,500 C1170,750 1070,950 1320,1050" />
            <path d="M530,-100 C680,150 930,250 1080,500 C1230,750 1130,950 1380,1050" />
            <path d="M590,-100 C740,150 990,250 1140,500 C1290,750 1190,950 1440,1050" />
            <path d="M650,-100 C800,150 1050,250 1200,500 C1350,750 1250,950 1500,1050" />

            <path d="M800,320 C870,300 950,340 970,410 C990,480 930,550 860,560 C790,570 730,510 740,440 C750,370 800,320 800,320 Z" />
            <path d="M800,280 C890,250 990,300 1020,390 C1050,480 970,580 880,600 C790,620 700,540 690,450 C680,360 750,290 800,280 Z" />
            <path d="M800,240 C920,200 1040,260 1080,370 C1120,480 1020,620 900,640 C780,660 660,560 640,450 C620,340 710,250 800,240 Z" />
            <path d="M800,200 C950,150 1090,220 1140,350 C1190,480 1070,660 920,680 C770,700 620,580 590,450 C560,320 670,210 800,200 Z" />
          </g>
        </svg>
      </div>

      {/* FIX 2: Increased the bottom coordinate offset (bottom-16/24) to create a safe zone clear of the taskbar */}
      <div ref={contentRef} className="absolute top-0 left-0 right-0 bottom-16 sm:bottom-20 md:bottom-24 flex flex-col justify-between p-6 pl-16 sm:p-8 sm:pl-20 md:p-12 md:pl-28 z-30 pointer-events-auto">
        <div className="flex-1 flex flex-col items-end justify-center md:justify-start md:pt-44 pr-4 sm:pr-8 md:pr-32 w-full">
          <div className="flex flex-col items-start w-full max-w-xs md:max-w-sm">
            <div className="h-[79px] sm:h-24 md:h-36 lg:h-40 mb-8 sm:mb-12 md:mb-52 overflow-hidden flex items-center justify-start">
              <img src="/aerocon26-logo.png" alt="Flagship Event" className="w-full h-full object-contain opacity-100" />
            </div>

            <div className="w-full flex flex-col items-start gap-2">
              <div className="flex items-center gap-2.5">
                <svg className="w-3.5 h-3.5 text-[#ffe600] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.83L19.13 19H4.87L12 5.83zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
                </svg>
                <div className="grid grid-cols-6 gap-0.5">
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                  <div className="w-1 h-1 bg-white/40"></div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/20 my-1"></div>

              <p className="text-white/90 font-sans font-semibold text-[10px] sm:text-xs md:text-sm tracking-[0.25em] uppercase">
                COMING SOON
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-end pb-4 sm:pb-6 md:pb-8">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-[#00d2ff]"></div>
            <span ref={counterRef} className="text-[#00d2ff] text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tighter leading-none">
              0%
            </span>
          </div>
          <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.25em] uppercase opacity-60 font-mono mt-4">
            Initializing Environment...
          </span>
        </div>
      </div>

      <div ref={actionBoxRef} className="absolute bottom-0 left-0 w-12 md:w-16 bg-[#00d2ff] z-40" style={{ height: "0%" }}></div>
    </div>
  );
};

export default Loader;