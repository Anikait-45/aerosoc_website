import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const graphData = [
  { label: "Aero Quiz", value: 830 },
  { label: "Air Crash Investigation", value: 800 },
  { label: "Aero Modelling", value: 680 },
  { label: "Challenger Final Flight", value: 880 },
  { label: "Night Sky Observation", value: 1100 },
  { label: "Satellite Tracking", value: 880 },
  { label: "SkyBreach", value: 500 },
  { label: "CanSat Workshop", value: 600 },
  { label: "Astrography", value: 670 },
  { label: "Altitude Adventure", value: 820 },
  { label: "3D Printing Workshop", value: 900 },
  { label: "Python Workshop", value: 1060 },
  { label: "AESI CFD Symposium", value: 1550 },
];

const FootfallGraph = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      
      gsap.set(".graph-dot", { scale: 0, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", 
          // THE FIX: "restart" on entering from top, "reset" on leaving from top
          toggleActions: "restart none none reset" 
        }
      });

      tl.fromTo(".axis-line", 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(".grid-line", 
        { opacity: 0 }, 
        { opacity: 0.15, duration: 0.6, stagger: 0.1 }, 
        "-=0.4"
      )
      .fromTo(".label-text", 
        { opacity: 0, y: 10 }, 
        { opacity: 0.7, y: 0, duration: 0.5, stagger: 0.04 }, 
        "-=0.3"
      )
      .fromTo(planeRef.current, 
        { opacity: 0, scale: 0 }, 
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
      )
      .to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 6,
        ease: "power1.inOut"
      }, "flight")
      .to(planeRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: true 
        },
        duration: 6, 
        ease: "power1.inOut"
      }, "flight")
      .to(".graph-dot", {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        stagger: 6 / graphData.length,
        ease: "back.out(2)"
      }, "flight+=0.1");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const width = 1000;
  const height = 600;
  const paddingLeft = 120;
  const paddingRight = 60;
  const paddingTop = 60;
  const paddingBottom = 160;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (index) => paddingLeft + (index / (graphData.length - 1)) * chartWidth;
  const getY = (val) => {
    const minVal = 0;
    const maxVal = 2000;
    const ratio = (val - minVal) / (maxVal - minVal);
    return paddingTop + chartHeight * (1 - ratio);
  };

  const pathD = graphData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`).join(' ');

  return (
    <section ref={containerRef} className="w-full min-h-screen py-24 bg-transparent relative overflow-hidden border-t border-white/5 flex flex-col items-center justify-center">
      
      <div className="w-full max-w-5xl px-6 relative z-10">
        
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          
          {[500, 1000, 1500, 2000].map((tick) => (
            <g key={tick}>
              <line className="grid-line stroke-white" x1={paddingLeft} y1={getY(tick)} x2={width - paddingRight} y2={getY(tick)} strokeWidth="1" />
              <text className="label-text fill-white/50 text-[11px] font-sans text-right tracking-wider" x={paddingLeft - 20} y={getY(tick) + 4} textAnchor="end">{tick}</text>
            </g>
          ))}

          <line className="axis-line stroke-white/40" x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height - paddingBottom} strokeWidth="2" />
          
          <line className="axis-line stroke-white/40" x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} strokeWidth="2" />

          <text className="label-text fill-white text-[12px] font-display font-black tracking-[0.2em] uppercase origin-center" transform={`translate(${paddingLeft - 80}, ${(paddingTop + chartHeight / 2)}) rotate(-90)`} textAnchor="middle">
            FOOTFALL OF PAST EVENTS
          </text>

          <text className="label-text fill-white text-[24px] font-display font-black tracking-[0.3em] uppercase origin-center" x={paddingLeft + chartWidth / 2} y={height - paddingBottom + 70} textAnchor="middle">
            FOOTFALL OVER THE YEARS
          </text>

          <path ref={pathRef} d={pathD} fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {graphData.map((d, i) => (
            <circle key={i} className="graph-dot fill-white stroke-transparent" cx={getX(i)} cy={getY(d.value)} r="5" strokeWidth="0" />
          ))}

          <g ref={planeRef} className="origin-center opacity-0 pointer-events-none">
            <path 
              d="M-12,-14 L-4,-4 L-16,4 L-14,8 L-2,4 L0,14 L2,4 L14,8 L16,4 L4,-4 L12,-14 L0,-8 Z" 
              fill="white" 
              transform="rotate(90)" 
            />
          </g>

        </svg>
      </div>

    </section>
  );
};

export default FootfallGraph;