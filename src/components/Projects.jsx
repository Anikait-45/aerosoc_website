import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// We keep exactly 3 highlighted projects here
const projectsData = [
  {
    id: "01",
    title: "YOLOv8 Vision System",
    description: "Real-time drone target detection software utilizing YOLOv8 architectures, fully deployed on edge devices via Raspberry Pi.",
    category: "Software & AI"
  },
  {
    id: "02",
    title: "Carbon Fiber Fixed-Wing",
    description: "Custom aerodynamic chassis designed for high-endurance telemetry missions and optimal weight-to-lift ratios.",
    category: "Aeronautics"
  },
  {
    id: "03",
    title: "Autonomous Swarm",
    description: "Coordinated multi-UAV flight algorithms designed for synchronized aerial mapping and automated formation control.",
    category: "Embedded Systems"
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const trackWidth = trackRef.current.offsetWidth;
      const viewportWidth = window.innerWidth;

      gsap.to(trackRef.current, {
        x: -(trackWidth - viewportWidth), 
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (trackWidth - viewportWidth),
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 1 Title Slide + 3 Project Slides + 1 Explore More Slide
  const totalSlides = projectsData.length + 2;

  const skipToTeam = () => {
    document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="projects" ref={sectionRef} className="h-screen overflow-hidden bg-background relative">
      <div 
        ref={trackRef} 
        className="flex h-full items-center"
        style={{ width: `${totalSlides * 100}vw` }} 
      >
        
        {/* Slide 1: The Title */}
        <div className="w-screen h-full flex flex-col justify-center px-8 md:px-24 flex-shrink-0">
          <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
            Active <br/> <span className="text-accent">PROJECTS</span>
          </h2>
          <p className="mt-4 text-gray-400 font-sans text-xl max-w-md">
            Scroll to explore our projects.
          </p>
        </div>

        {/* Slides 2-4: The Projects */}
        {projectsData.map((project) => (
          <div key={project.id} className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
            <div className="w-full max-w-4xl bg-surface border border-white/10 p-12 relative group hover:border-accent/50 transition-colors duration-500">
              <span className="absolute top-8 right-8 text-6xl font-display font-black text-white/5 group-hover:text-accent/20 transition-colors duration-500">
                {project.id}
              </span>
              <p className="text-accent font-display tracking-widest text-sm uppercase mb-4">{project.category}</p>
              <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-6">{project.title}</h3>
              <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl">{project.description}</p>
            </div>
          </div>
        ))}

        {/* Slide 5: Explore More */}
        <div className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
          <div className="text-center">
            <h3 className="text-4xl md:text-6xl font-display font-bold text-white uppercase mb-8">
              View The <br/> <span className="text-accent">Full Fleet</span>
            </h3>
            {/* This will act as a router link to a new page later */}
            <button className="px-8 py-4 border-2 border-accent text-accent hover:bg-accent hover:text-background font-display font-bold text-lg tracking-widest transition-all duration-300">
              EXPLORE ALL PROJECTS
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;