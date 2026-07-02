import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const studentMembers = [
  { name: "Adarsh", role: "President", img: "/President.jpeg" },
  { name: "Prakriti", role: "Vice President", img: "/VicePresident.jpeg" },
  { name: "Aniket", role: "Vice President", img: "/VicePresident2.jpeg" },
  { name: "Ananya", role: "General Secretary", img: "/GeneralSecretary.jpeg" },
  { name: "Abhyuday", role: "Joint Secretary", img: "/JointSecretary.jpeg" },
  { name: "Rajdeep", role: "Joint Secretary", img: "" },
];

const professor = {
  name: "Dr. Priyank Kumar",
  role: "Faculty Advisor",
  img: "/Professor.jpeg"
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
            start: "top 75%",
            // THE FIX: Locked to "play none none none" to stop internal fade-outs
            toggleActions: "play none none none"
          }
        }
      );

      // 2. The Custom Sequence Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".team-grid-container",
          start: "top 65%",
          // THE FIX: Locked to "play none none none" to stop internal fade-outs
          toggleActions: "play none none none"
        }
      });

      // Part A: Pop the circles in
      tl.fromTo('.member-circle', 
        { opacity: 0, scale: 0.5 }, 
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.15, clearProps: "opacity" }
      )
      // Part B: Fade the text in
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
        <div className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
          The <span className="text-accent">Squad</span>
        </div>
      </div>

      <div className="team-grid-container pointer-events-auto">
        
        {/* Core 4 Members Grid */}
        <div className="flex flex-wrap justify-center gap-16 md:gap-24 mb-16 max-w-5xl mx-auto">
          {studentMembers.map((member, index) => (
            <div key={index} className="team-profile flex flex-col items-center cursor-pointer">
              
              {/* THE FIX: Added 'peer group' directly to the circle to restrict hover bounds */}
              <div className="member-circle peer group w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 mb-6 relative z-10 bg-black hover:border-accent transition-colors duration-500 transform-gpu">
                {member.img && (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover relative z-20 group-hover:scale-110 transition-transform duration-700" />
                )}
              </div>
              
              <div className="member-info flex flex-col items-center">
                {/* THE FIX: Changed to peer-hover so hovering the circle above triggers this text color */}
                <div className="text-xl font-display font-bold text-white uppercase tracking-wide peer-hover:text-accent transition-colors duration-300">
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
        {/* THE FIX: Removed 'group' from outer container */}
        <div className="team-profile flex flex-col items-center cursor-pointer mb-20 mx-auto">
          
          {/* THE FIX: Changed border-accent to border-white/10 hover:border-accent, and fixed w-46 to w-48 */}
          <div className="member-circle peer group w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/10 mb-6 relative z-10 bg-black hover:border-accent transition-colors duration-500 transform-gpu">
            {professor.img && (
              <img src={professor.img} alt={professor.name} className="w-full h-full object-cover relative z-20 group-hover:scale-110 transition-transform duration-700" />
            )}
          </div>
          
          <div className="member-info flex flex-col items-center">
            {/* THE FIX: Changed to peer-hover */}
            <div className="text-2xl font-display font-bold text-white uppercase tracking-wide peer-hover:text-accent transition-colors duration-300">
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