import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, SquareMenu, AlertTriangle } from 'lucide-react';

const projectsData = [
  {
    id: '01',
    title: 'UNDER CONSTRUCTION',
    subtitle: 'AEROSOC: PROJECTS',
    description: 'UNDER CONSTRUCTION.',
    modelType: 'drone'
  },
  {
    id: '02',
    title: 'UNDER CONSTRUCTION',
    subtitle: 'AEROSOC: PROJECTS',
    description: 'UNDER CONSTRUCTION',
    modelType: 'glider'
  },
  {
    id: '03',
    title: 'UNDER CONSTRUCTION',
    subtitle: 'AEROSOC: PROJECTS',
    description: 'UNDER CONSTRUCTION'
  }
];

const ProjectsPage = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const mountRef = useRef(null);
  const textContainerRef = useRef(null);
  
  useEffect(() => {
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    let currentPoints = null;

    const createPlaceholderHologram = (type) => {
      if (currentPoints) scene.remove(currentPoints);
      
      let geometry;
      if (type === 'drone') {
        geometry = new THREE.TorusKnotGeometry(2, 0.5, 300, 40);
      } else if (type === 'glider') {
        geometry = new THREE.ConeGeometry(2, 5, 64, 64, false, 0, Math.PI * 2);
        geometry.rotateX(Math.PI / 2);
      } else {
        geometry = new THREE.BoxGeometry(3, 3, 3, 30, 30, 30);
      }

      const edges = new THREE.EdgesGeometry(geometry);
      currentPoints = new THREE.Points(edges, material);
      
      currentPoints.scale.set(0.1, 0.1, 0.1);
      scene.add(currentPoints);

      gsap.to(currentPoints.scale, {
        x: 1, y: 1, z: 1,
        duration: 1.5,
        ease: "expo.out"
      });
    };
    createPlaceholderHologram(projectsData[activeIdx].modelType);

    let animationFrameId;
    const animate = () => {
      if (currentPoints) {
        currentPoints.rotation.y += 0.002;
        currentPoints.rotation.x += 0.001;
      }
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const nw = mountRef.current.clientWidth;
      const nh = mountRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      material.dispose();
    };
  }, [activeIdx]); 
  const changeProject = (direction) => {
    gsap.to(textContainerRef.current, {
      opacity: 0,
      x: direction === 'next' ? -20 : 20,
      duration: 0.3,
      onComplete: () => {
        if (direction === 'next') {
          setActiveIdx((prev) => (prev + 1) % projectsData.length);
        } else {
          setActiveIdx((prev) => (prev === 0 ? projectsData.length - 1 : prev - 1));
        }
        
        gsap.fromTo(textContainerRef.current,
          { opacity: 0, x: direction === 'next' ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    });
  };

  const activeProject = projectsData[activeIdx];

  return (
    <section id="projects-page" className="relative w-full h-screen bg-[#050505] overflow-hidden border-t border-white/5 pointer-events-auto">
      
      <div className="absolute top-0 left-0 right-0 z-50 bg-[#eaff00]/10 border-b border-[#eaff00]/30 py-2.5 px-6 flex items-center justify-center gap-2.5 backdrop-blur-md pointer-events-none">
        <AlertTriangle className="w-4 h-4 text-[#eaff00] animate-pulse" />
        <p className="text-[#eaff00] text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase">
          PAGE UNDER CONSTRUCTION 
        </p>
        <AlertTriangle className="w-4 h-4 text-[#eaff00] animate-pulse" />
      </div>

      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 z-0 pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/10 z-0 pointer-events-none" />

      <div ref={mountRef} className="absolute inset-0 z-10" />

      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-40">
        <svg width="600" height="600" className="animate-[spin_40s_linear_infinite]">
          <circle cx="300" cy="300" r="280" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10 30" />
          <circle cx="300" cy="300" r="260" stroke="white" strokeWidth="4" fill="none" strokeDasharray="100 800" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none opacity-20">
        <svg width="400" height="400" className="animate-[spin_20s_linear_infinite_reverse]">
          <circle cx="200" cy="200" r="180" stroke="#00d2ff" strokeWidth="1" fill="none" strokeDasharray="5 15" />
        </svg>
      </div>

      <div className="absolute top-28 left-6 md:left-12 z-30 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 text-white/50 mb-2">
             <div className="w-2 h-2 bg-white/50" />
             <div className="text-[10px] tracking-[0.3em]">DATABASE</div>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-widest uppercase">PROTOTYPES</h2>
        </div>
        
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative mt-4">
          <SquareMenu className="text-white w-8 h-8 opacity-80" />
          <div className="absolute -left-3 top-2 flex flex-col gap-1">
             <div className="w-1 h-3 bg-[#00d2ff]" />
             <div className="w-1 h-2 bg-[#eaff00]" />
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 lg:right-32 z-30 w-full max-w-sm md:max-w-md">
        
        <div ref={textContainerRef}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1.5 h-1.5 bg-white" />
            <p className="text-[10px] md:text-xs font-sans tracking-[0.3em] text-white/70 uppercase">
              {activeProject.subtitle}
            </p>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-display font-black text-white leading-none uppercase tracking-tighter mb-6">
            {activeProject.title}
          </h3>
          
          <p className="text-sm md:text-base font-sans text-white/60 leading-relaxed tracking-wide mb-12">
            {activeProject.description}
          </p>
        </div>

        <div className="flex items-end justify-between border-b border-white/20 pb-4">
          
          <div className="flex flex-col gap-2 w-32">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-white/20" />
              <div className="w-6 h-2 bg-white/20" />
              <div className="w-12 h-2 bg-white/20" />
            </div>
            <div className="w-full h-[2px] bg-white/20 relative">
               <div 
                 className="absolute top-0 left-0 h-full bg-[#eaff00] transition-all duration-500 ease-out" 
                 style={{ width: `${((activeIdx + 1) / projectsData.length) * 100}%` }}
               />
            </div>
            <p className="text-[10px] text-[#eaff00] font-sans tracking-widest text-right mt-1">
              0{activeIdx + 1} / 0{projectsData.length}
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => changeProject('prev')}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#00d2ff] transition-colors duration-300"
            >
              <ChevronLeft className="w-5 h-5 ml-[-2px]" />
            </button>
            <button 
              onClick={() => changeProject('next')}
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#00d2ff] transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5 mr-[-2px]" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ProjectsPage;