import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const RosterPage = ({ onNavigate }) => {
  const containerRef = useRef(null);

  const facultyAdvisor = {
    name: "Dr. Priyank Kumar", 
    role: "Faculty Advisor",
    img: "/Professor.jpeg" 
  };

  const coreLeads = [
    { name: "Adarsh", role: "President", img: "/President.jpeg" },
    { name: "Prakriti", role: "Vice President", img: "/VicePresident.jpeg" },
    { name: "Aniket", role: "Vice President", img: "/VicePresident2.jpeg" },
    { name: "Ananya Krishnan", role: "General Secretary", img: "/GeneralSecretary.jpeg" },
    { name: "Abhyuday", role: "Joint Secretary", img: "/JointSecretary.jpeg" },
    { name: "Rajdeep Kumar", role: "Joint Secretary", img: "/JointSecretary1.jpeg" },
    { name: "Bhawishy", role: "Head Treasurer", img: "/HeadTreasurer.jpeg" },
    { name: "Rishi Menon", role: "Joint Treasurer", img: "/JointTreasurer.jpeg" },
    { name: "Shreyanshu Ghosh", role: "Joint Treasurer", img: "/JointTreasurer1.jpeg" },
  ];

  const additionalExeBody = [
    { name: "Arnab", role: "Manufacturing Head" },
    { name: "Yash", role: "Avionics Head" },
    { name: "Ashutosh", role: "Aeronautics Head" },
    { name: "Jennifer", role: "Astronomy & Astrophysics Head" },
    { name: "Mitali", role: "Rocketry & Space Head" },
    { name: "Sudhanshu", role: "Design Head" },
    { name: "Ritesh", role: "Creative & Content Lead" },
    { name: "Mahi Sinha", role: "Social Media & Sponsorship Lead" },
    { name: "Piyush", role: "Avionics Lead" },
    { name: "Mini & Farheen", role: "Aeronautics Lead" },
    { name: "Austin", role: "Manufacturing Lead / Documentation Incharge" },
    { name: "Jay", role: "Quadcopter & AI Lead" },
    { name: "Varadh", role: "Astronomy & Astrophysics Lead" },
    { name: "Rishi & Rajdeep", role: "Rocketry Lead" },
    { name: "Aditya & Gungun", role: "Inventory Lead" },
    { name: "Shrishti", role: "Executive Body Member" },
    { name: "Anurag Kumar Verma", role: "Executive Body Member" },
    { name: "Anshal", role: "Executive Body Member" },
    { name: "Abhishek Kumar", role: "Executive Body Member" },
    { name: "Ayush Ashank", role: "Executive Body Member" },
  ];

  const webDesignTeam = [
    { name: "Anikait Sen Gupta", role: "Web Dev Team", img: "" },
    { name: "Renikson Ekka", role: "Web Dev Team", img: "" },
  ];

  const k24Members = [
    "Annika Singh", "Harsh Raj Pandey", "Aditya Prakash", "Sakshi Singh",
    "Shubhangi Kashyap", "Sourabh Kumar", "Anurag Kumar Verma", "Akshay Gautam",
    "Anikait Sen Gupta", "Shekhar Sharma", "Yash Vardhan", "Renikson Yash Ekka",
    "Malhar Narendra Jadhao", "Anshal Kumar", "Payal Soni", "Ayush Ashank",
    "Aryan Shankar", "Abhishek Kumar", "Himanshu Prasad"
  ];

  const k25Members = [
    "Suraj Kumar", "Ankit Kumar", "Jyotishko Ray", "Pritam", "Krish Narayan",
    "Vinayak Gupta", "Nityam Jayaswal", "Roushan Kumar Sinha", "Aayush Raj",
    "Abhishek Kumar Singh", "Aaditya Setu", "Nikhil Kumar Keshri", "Vasu Suneja",
    "Arijit Dolai", "Khushi Pandey", "Raghav Gaur", "Souptik Mondal", "Avnish Raj",
    "Sachin Kumar Sahu", "Arpita", "Ayushman Sharma", "Shourya Shekhar",
    "Pranav Saurabh", "Kanak Ratna", "Kartikeya Narayan", "Rishabh Tiwari", "Treta Singh"
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        '.roster-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-28 pb-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 mb-16 gap-6">
        <div>
          <p className="text-accent font-sans text-xs tracking-[0.3em] uppercase mb-2">AEROSOC • BIT MESRA</p>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase">
            Our <span className="text-accent">Team</span>
          </h1>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 border border-white/20 hover:border-accent text-white hover:text-accent font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
        >
          <span>←</span> Return to Main Page
        </button>
      </div>

      <div className="max-w-7xl mx-auto mb-24 flex flex-col items-center">
        <div className="roster-card p-8 rounded-3xl bg-white/[0.04] border border-accent/40 hover:border-accent transition-all duration-500 flex flex-col items-center text-center max-w-sm w-full group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white/5 border-2 border-accent/50 mb-6 flex items-center justify-center">
            {facultyAdvisor.img ? (
              <img src={facultyAdvisor.img} alt={facultyAdvisor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="text-accent font-display font-bold text-xl">HEAD</div>
            )}
          </div>
          <h3 className="text-2xl font-display font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
            {facultyAdvisor.name}
          </h3>
          <p className="text-accent text-xs font-sans uppercase tracking-widest mt-2">
            {facultyAdvisor.role}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-xl font-display uppercase tracking-wider text-gray-400 mb-8 border-l-2 border-accent pl-4">
          Executive Body
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {coreLeads.map((member, i) => (
            <div
              key={i}
              className="roster-card p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 transition-all duration-500 flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/20 flex-shrink-0 flex items-center justify-center">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 font-display">AERO</div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-display font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-accent text-xs font-sans uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalExeBody.map((member, i) => (
            <div
              key={i}
              className="roster-card p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              <h3 className="text-sm font-display font-bold uppercase tracking-wide text-white">{member.name}</h3>
              <p className="text-gray-400 text-xs font-sans uppercase tracking-widest mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-xl font-display uppercase tracking-wider text-gray-400 mb-6 border-l-2 border-accent pl-4">
          K24 Members
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {k24Members.map((name, i) => (
            <div
              key={i}
              className="roster-card py-3 px-4 rounded-lg bg-white/[0.015] border border-white/5 text-gray-300 font-sans text-xs uppercase tracking-wider hover:text-white hover:border-white/20 transition-all"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-xl font-display uppercase tracking-wider text-gray-400 mb-6 border-l-2 border-accent pl-4">
          K25 Members
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {k25Members.map((name, i) => (
            <div
              key={i}
              className="roster-card py-3 px-4 rounded-lg bg-white/[0.015] border border-white/5 text-gray-300 font-sans text-xs uppercase tracking-wider hover:text-white hover:border-white/20 transition-all"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-display uppercase tracking-wider text-gray-400 mb-8 border-l-2 border-accent pl-4">
          Web Design Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl gap-8">
          {webDesignTeam.map((member, i) => (
            <div
              key={i}
              className="roster-card p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-accent/50 transition-all duration-500 flex items-center gap-6 group"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/5 border border-white/20 flex-shrink-0 flex items-center justify-center">
                {member.img ? (
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 font-display">DEV</div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-display font-bold uppercase tracking-wide group-hover:text-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-accent text-xs font-sans uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RosterPage;