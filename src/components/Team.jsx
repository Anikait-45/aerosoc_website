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

      // This target catches both the students and the professor
      gsap.from(".team-profile", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".team-grid-container",
          start: "top 85%",
        }
      });
    }, teamRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={teamRef} className="py-32 px-8 md:px-24 bg-transparent ground relative border-t border-white/5">
      <div className="team-header mb-20 text-center">
        <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          The <span className="text-accent">Squad</span>
        </h2>
      </div>

      <div className="team-grid-container">
        {/* Core 4 Members Grid */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 mb-16 max-w-5xl mx-auto">
          {studentMembers.map((member, index) => (
            <div key={index} className="team-profile flex flex-col items-center group cursor-pointer">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 mb-6 relative bg-surface/50 grayscale group-hover:grayscale-0 group-hover:border-accent transition-all duration-500">
                {member.img && (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                )}
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-gray-400 font-sans text-xs tracking-widest uppercase mt-2">
                {member.role}
              </p>
            </div>
          ))}
        </div>

        {/* Professor - Centered Bottom */}
        <div className="team-profile flex flex-col items-center group cursor-pointer mb-20 mx-auto">
          <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-accent mb-6 relative bg-surface/50 grayscale group-hover:grayscale-0 transition-all duration-500">
            {professor.img && (
              <img src={professor.img} alt={professor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            )}
          </div>
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-wide group-hover:text-accent transition-colors duration-300">
            {professor.name}
          </h3>
          <p className="text-accent font-sans text-xs tracking-widest uppercase mt-2">
            {professor.role}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 border-2 border-white/20 text-white hover:border-accent hover:text-accent hover:bg-accent/10 font-display font-bold text-sm tracking-widest transition-all duration-300">
          VIEW ENTIRE ROSTER
        </button>
      </div>
    </section>
  );
};

export default Team;