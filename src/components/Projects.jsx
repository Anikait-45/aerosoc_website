import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  { id: "01", title: "ABCD", description: "Sample ABCD .", category: "ABCD", img: "" },
  { id: "02", title: "ABCD", description: "Sample ABCD ", category: "ABCD", img: "" },
  { id: "03", title: "ABCD", description: "Sample ABCD ", category: "ABCD", img: "" }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // 1 Title Slide + 3 Project Slides + 1 View More Slide
  const totalSlides = projectsData.length + 2;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Strict viewport math prevents the blank over-scroll
      const getScrollDistance = () => window.innerWidth * (totalSlides - 1);

      gsap.to(trackRef.current, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + getScrollDistance(),
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [totalSlides]);

  return (
    <section id="projects" ref={sectionRef} className="h-screen overflow-hidden bg-transparent ground relative border-t border-white/5">
      <div ref={trackRef} className="flex h-full items-center" style={{ width: `${totalSlides * 100}vw` }}>
        
        {/* Title Slide */}
        <div className="w-screen h-full flex flex-col justify-center px-8 md:px-24 flex-shrink-0">
          <h2 className="text-4xl md:text-7xl font-display font-black text-white uppercase tracking-tighter">
            Active <br/> <span className="text-accent">Operations</span>
          </h2>
        </div>

        {/* Project Slides */}
        {projectsData.map((project, index) => (
          <div key={project.id} className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
            <div className="w-full max-w-4xl min-h-[450px] bg-surface border border-white/10 relative group hover:border-accent/50 transition-colors duration-500 overflow-hidden flex flex-col justify-end p-12">
              
              {/* Image Layer */}
              <div className="absolute inset-0 bg-surface z-0">
                {project.img && (
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/90 to-transparent" />
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <span className="absolute -top-16 right-0 text-5xl font-display font-black text-white/10 group-hover:text-accent/20 transition-colors duration-500">{project.id}</span>
                <p className="text-accent font-display tracking-widest text-xs uppercase mb-4">{project.category}</p>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-6">{project.title}</h3>
                <p className="text-gray-400 text-base md:text-lg font-sans max-w-2xl">{project.description}</p>
              </div>

            </div>
          </div>
        ))}

        {/* Explore More Slide */}
        <div className="w-screen h-full flex items-center justify-center px-8 md:px-24 flex-shrink-0">
          <div className="text-center">
            <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-8">
              View The <br/> <span className="text-accent">Full Fleet</span>
            </h3>
            <button className="px-6 py-3 border-2 border-accent text-accent hover:bg-accent hover:text-background font-display font-bold text-base tracking-widest transition-all duration-300">
              EXPLORE ALL PROJECTS
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;