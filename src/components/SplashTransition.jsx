import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SplashTransition = ({ targetView, onMidpoint, onComplete }) => {
  const containerRef = useRef(null);
  const actionBoxRef = useRef(null);
  const labelRef = useRef(null);

  const midpointRef = useRef(onMidpoint);
  const completeRef = useRef(onComplete);

  useLayoutEffect(() => {
    midpointRef.current = onMidpoint;
    completeRef.current = onComplete;
  }, [onMidpoint, onComplete]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const isReturning = targetView === 'home';
      const tl = gsap.timeline({
        onComplete: () => {
          if (completeRef.current) completeRef.current();
        }
      });

      // =========================================================================
      // 1. SET EXPLICIT STARTING EDGE (Guarantees Left->Right or Right->Left)
      // =========================================================================
      if (isReturning) {
        // RETURNING HOME: Start at Left edge (0 width) -> Sweep rightward
        gsap.set(actionBoxRef.current, {
          left: 0,
          right: "auto",
          width: "0%",
          backgroundColor: "#00d2ff",
        });
      } else {
        // LEAVING HOME: Start at Right edge (4rem width) -> Sweep leftward
        gsap.set(actionBoxRef.current, {
          right: 0,
          left: "auto",
          width: "4rem",
          backgroundColor: "#00d2ff",
        });
      }

      // =========================================================================
      // 2. EXPAND TO COVER SCREEN (100% width)
      // =========================================================================
      tl.to(actionBoxRef.current, {
        width: "100%",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          if (midpointRef.current) midpointRef.current(targetView);

          // FLIP ANCHORS FOR EXIT WIPE
          if (isReturning) {
            // Empties Left-to-Right: anchor right edge so left edge pulls rightward
            gsap.set(actionBoxRef.current, { left: "auto", right: 0 });
          } else {
            // Empties Right-to-Left: anchor left edge so right edge pulls leftward
            gsap.set(actionBoxRef.current, { right: "auto", left: 0 });
          }
        },
      })
      // =========================================================================
      // 3. MIDPOINT STATUS FLASH
      // =========================================================================
      .fromTo(
        labelRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
      )
      .to(labelRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
      })
      // =========================================================================
      // 4. COLLAPSE TO REVEAL NEW PAGE (0% width)
      // =========================================================================
      .to(actionBoxRef.current, {
        width: "0%",
        duration: 1.2,
        ease: "expo.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); 

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto"
    >
      <div
        ref={actionBoxRef}
        className="absolute top-0 bottom-0 bg-[#00d2ff] flex items-center justify-center"
      >
        <div
          ref={labelRef}
          className="opacity-0 flex flex-col items-center text-center select-none pointer-events-none"
        >
          <span className="text-black font-display font-black text-2xl md:text-4xl tracking-tighter uppercase">
            AEROSPACE <span className="opacity-60">SOCIETY</span>
          </span>
          <span className="text-black/70 font-mono text-[10px] tracking-[0.3em] uppercase mt-1">
            {targetView === 'roster'
              ? 'DEPLOYING ROSTER'
              : targetView === 'archive'
              ? 'ACCESSING ARCHIVES'
              : 'RETURNING TO MAIN PAGE'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SplashTransition;