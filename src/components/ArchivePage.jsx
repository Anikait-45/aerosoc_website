import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const ArchivePage = ({ onNavigate }) => {
  const containerRef = useRef(null);
  const [filter, setFilter] = useState('ALL');
  const [selectedItem, setSelectedItem] = useState(null);

  const archiveItems = [
    { id: 1, title: "EXHIBITION 2025", category: "EVENTS", img: "/gimg1.jpeg", desc: "Annual technical showcase featuring autonomous hexacopters and fixed-wing prototypes." },
    { id: 2, title: "SKYBREACH 2025", category: "MISSIONS", img: "/gimg2.jpeg", desc: "High-altitude deployment and payload drop accuracy competition." },
    { id: 3, title: "PROJECT EVALUATION", category: "RESEARCH", img: "/gimg3.jpeg", desc: "Internal airframe structural load testing and CFD telemetry verification." },
    { id: 4, title: "ALTITUDE ADVENTURE", category: "MISSIONS", img: "/gimg4.jpeg", desc: "Long-range endurance flight testing across varying wind gradients." },
    { id: 5, title: "AVIONICS BAY V3", category: "RESEARCH", img: "/gimg1.jpeg", desc: "Custom PCB integration with redundant STM32 flight controllers and GPS." },
    { id: 6, title: "AEROSOC FRESHERS", category: "EVENTS", img: "/gimg2.jpeg", desc: "Introductory aero-modelling workshop and RC glider fly-off." },
  ];

  const filteredItems = filter === 'ALL' ? archiveItems : archiveItems.filter(item => item.category === filter);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.archive-card',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-28 pb-32 px-8 md:px-24 relative">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-12 gap-6">
        <div>
          <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase mb-2">Aerosoc • BIT MESRA</p>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase">
            Gallery <span className="text-accent">Archives</span>
          </h1>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 border border-white/20 hover:border-accent text-white hover:text-accent font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
        >
          <span>←</span> Return to Main Page
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-12">
        {['ALL', 'MISSIONS', 'RESEARCH', 'EVENTS'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-xs font-sans tracking-widest uppercase transition-all duration-300 ${
              filter === tab
                ? 'bg-accent text-black font-bold shadow-[0_0_15px_rgba(0,210,255,0.4)]'
                : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="archive-card group bg-white/[0.03] border border-white/10 hover:border-accent/60 rounded-2xl overflow-hidden flex flex-col transition-all duration-500 cursor-pointer"
          >
            <div className="w-full aspect-video overflow-hidden bg-black/60 relative">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-sans tracking-widest text-accent uppercase">
                {item.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-display font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-sans uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                <span>View Archive</span>
                <span className="text-accent">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Image */}
            <div className="w-full aspect-video md:aspect-auto md:h-full bg-black/60 relative overflow-hidden min-h-[250px]">
              <img
                src={selectedItem.img}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded bg-accent/10 border border-accent/20 text-[10px] font-sans tracking-widest text-accent uppercase">
                    {selectedItem.category}
                  </span>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-400 hover:text-white text-xl font-mono leading-none"
                    aria-label="Close dialogue"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide text-white mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed">
                  {selectedItem.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;