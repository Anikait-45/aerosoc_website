import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  { 
    name: "ABC", 
    role: "President", 
    img: "" 
  },
  { 
    name: "ABC", 
    role: "Vice President", 
    img: "" 
  },
  { 
    name: "ABC", 
    role: "Treasurer", 
    img: "" 
  },
  { 
    name: "ABC", 
    role: "Technical Lead", 
    img: "" 
  }
];

const Team = () => {
  const teamRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".team-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
        }
      });

      gsap.from(".team-profile", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 85%",
        }
      });
    }, teamRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={teamRef} className="py-32 px-8 md:px-24 bg-background relative border-t border-white/5">
      <div className="team-header mb-24 text-center">
        <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          The <span className="text-accent">Squad</span>
        </h2>
        <p className="mt-4 text-gray-400 font-sans text-xl max-w-xl mx-auto">
          The leadership driving .
        </p>
      </div>

      <div className="team-grid flex flex-wrap justify-center gap-16 md:gap-24 mb-20">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-profile flex flex-col items-center group cursor-pointer">
            
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent mb-6 relative bg-surface/50 grayscale group-hover:grayscale-0 transition-all duration-500">
              {member.img && (
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              )}
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
              {member.name}
            </h3>
            <p className="text-gray-400 font-sans text-sm tracking-widest uppercase mt-2">
              {member.role}
            </p>
            
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="px-8 py-3 border border-white/20 text-white hover:border-accent hover:text-accent font-display font-bold text-sm tracking-widest transition-all duration-300">
          VIEW ENTIRE TEAM
        </button>
      </div>
    </section>
  );
};

export default Team;