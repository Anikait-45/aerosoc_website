import React, { useState, useEffect } from 'react';

const TelemetryHUD = () => {
  const [scrollData, setScrollData] = useState({ alt: 0, vel: 0, mode: 'INITIALIZING' });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollY / maxScroll;

      let currentMode = 'STANDBY';
      if (scrollPercent > 0.2 && scrollPercent < 0.5) currentMode = 'R&D PROTOCOL';
      if (scrollPercent >= 0.5 && scrollPercent < 0.8) currentMode = 'FLEET DEPLOYMENT';
      if (scrollPercent >= 0.8) currentMode = 'MISSION CONTROL';

      setScrollData({
        alt: Math.floor(scrollY * 3.4),
        vel: Math.floor(scrollY * 0.8),
        mode: currentMode
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none p-4 md:p-8 flex flex-col justify-between opacity-50 mix-blend-screen hidden md:flex">
      
      <div className="flex justify-between items-start text-accent font-mono text-xs">
        <div>
          <p>SYS.01 // {scrollData.mode}</p>
          <p className="animate-pulse text-red-500 mt-1">REC •</p>
        </div>
        <div className="text-right">
          <p>ALT: {scrollData.alt} FT</p>
          <p>VEL: {scrollData.vel} KTS</p>
        </div>
      </div>
      
      <div className="flex justify-between items-end text-accent font-mono text-xs">
        <div className="flex gap-2">
          <div className="w-8 h-1 bg-accent/30"><div className="h-full bg-accent w-full animate-pulse" /></div>
          <div className="w-8 h-1 bg-accent/30"><div className="h-full bg-accent w-3/4" /></div>
          <div className="w-8 h-1 bg-accent/30"><div className="h-full bg-accent w-1/2" /></div>
        </div>
        <p>UPLINK: STABLE</p>
      </div>

    </div>
  );
};

export default TelemetryHUD;