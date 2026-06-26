import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const studentMembers = [
  { name: "ABCD", role: "President", img: "" },
  { name: "ABCD", role: "Vice President", img: "" },
  { name: "ABCD", role: "Treasurer", img: "" },
];

const professor = {
  name: "Dr. ABCD",
  role: "Faculty Advisor",
  img: ""
};

const Team = () => {
  const teamRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. The Header Animation
      gsap.fromTo(".team-header", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 75%", // Triggers when the section is entering the screen
            toggleActions: "restart none none reverse"
          }
        }
      );

      // 2. The Custom Sequence Timeline (Circles first, then text immediately after)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".team-grid-container",
          start: "top 65%", // Triggers right as the grid reaches the middle/upper part of the screen
          toggleActions: "restart none none reverse"
        }
      });

      // Part A: Pop the circles in
      tl.fromTo('.member-circle', 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.15 }
      )
      // Part B: Fade the text in (-=0.4 overlaps it so it happens almost instantly after)
      .fromTo('.member-info', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, 
        "-=0.4" 
      );

    }, teamRef);

    return () => ctx.revert();
  }, []);

  return (
<section id="team" ref={teamRef} className="min-h-screen py-32 px-8 md:px-24 bg-transparent relative border-t border-white/5 pointer-events-none">      
      <div className="team-header mb-20 text-center pointer-events-auto">
        {/* Changed from <h2> to <div> to hide it from App.jsx global engine */}
        <div className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          The <span className="text-accent">Squad</span>
        </div>
      </div>

      <div className="team-grid-container pointer-events-auto">
        
        {/* Core 4 Members Grid */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 mb-16 max-w-5xl mx-auto">
          {studentMembers.map((member, index) => (
            <div key={index} className="team-profile flex flex-col items-center group cursor-pointer">
              
              {/* ADDED 'member-circle' class for the pop animation */}
              <div className="member-circle w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 mb-6 relative bg-surface/50 grayscale group-hover:grayscale-0 group-hover:border-accent transition-all duration-500">
                {member.img && (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                )}
              </div>
              
              {/* ADDED 'member-info' class and changed tags to <div> to hide from global engine */}
              <div className="member-info flex flex-col items-center">
                <div className="text-xl font-display font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </div>
                <div className="text-gray-400 font-sans text-xs tracking-widest uppercase mt-2">
                  {member.role}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Professor - Centered Bottom */}
        <div className="team-profile flex flex-col items-center group cursor-pointer mb-20 mx-auto">
          
          <div className="member-circle w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent mb-6 relative bg-surface/50 grayscale group-hover:grayscale-0 transition-all duration-500">
            {professor.img && (
              <img src={professor.img} alt={professor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            )}
          </div>
          
          <div className="member-info flex flex-col items-center">
            <div className="text-2xl font-display font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
              {professor.name}
            </div>
            <div className="text-accent font-sans text-xs tracking-widest uppercase mt-2">
              {professor.role}
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-center mt-8 pointer-events-auto">
        <button className="px-6 py-3 border-2 border-white/20 text-white hover:border-accent hover:text-accent hover:bg-accent/10 font-display font-bold text-sm tracking-widest transition-all duration-300">
          VIEW ENTIRE ROSTER
        </button>
      </div>
    </section>
  );
};

export default Team;