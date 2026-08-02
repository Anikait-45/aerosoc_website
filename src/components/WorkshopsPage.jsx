import React from 'react';

const WorkshopsPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-32 px-8 md:px-24 flex flex-col justify-between relative overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 gap-6 z-10">
        <div>
          <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase mb-2">AEROSOC</p>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase">
            Our <span className="text-accent">Workshops</span>
          </h1>
        </div>
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="px-6 py-3 border border-white/20 hover:border-accent text-white hover:text-accent font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span>←</span> Return to Main Page
        </button>
      </div>

      {/* Center "Under Construction" HUD */}
      <div className="flex flex-col items-center justify-center my-auto text-center py-24 z-10">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center mb-6 animate-pulse">
          <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26" />
          </svg>
        </div>


        <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-wider text-white mb-6">
          UNDER <span className="text-accent">CONSTRUCTION</span>
        </h2>


        <div className="w-24 h-[1px] bg-white/20 my-8"></div>

      </div>

      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent/5 blur-[100px] pointer-events-none"></div>
    </div>
  );
};

export default WorkshopsPage;