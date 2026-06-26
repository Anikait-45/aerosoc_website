import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; 

import NativeGalaxy from './components/NativeGalaxy'; 
import Navigation from './components/Navigation';
import Heading from './components/Heading';
import AboutUs from './components/AboutUs';
import UpcomingEvents from './components/UpcomingEvents';
import Projects from './components/Projects';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Socials from './components/Socials';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    // 1. CLEAN SMOOTH SCROLL INIT
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    const ticker = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0, 0);

    // 2. MAGNETIC ENGINE
    let scrollTimeout;
    lenis.on('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('.snap-section');
        let closestSection = null;
        let minDistance = Infinity;

        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const distanceToTop = Math.abs(rect.top);

          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            closestSection = section;
          }
        });

        if (closestSection && minDistance > 10 && minDistance < window.innerHeight * 0.70) {
          lenis.scrollTo(closestSection, {
            duration: 1.2,
            ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }, 250);
    });

    // 3. THE TEXT REVEAL ENGINE
    const headingText = gsap.utils.toArray('#heading h1, #heading p');
    if (headingText.length > 0) {
      gsap.fromTo(headingText,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 3, ease: "power3.out" }
      );
    }

    const otherText = gsap.utils.toArray('h1, h2, h3, p').filter(el => !el.closest('#heading'));
    otherText.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 60%", 
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 4. *** THE LAYOUT RECALCULATION ENGINE (FIXES THE OVERLAP) ***
    // This forces GSAP to fix its math after the images load and horizontal pins are set up.
    const refreshLayout = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    // Run once after React finishes its initial rendering
    const layoutTimeout = setTimeout(refreshLayout, 500);
    
    // Run again when all heavy images finally load from the network
    window.addEventListener('load', refreshLayout);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      clearTimeout(scrollTimeout);
      clearTimeout(layoutTimeout);
      window.removeEventListener('load', refreshLayout);
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-accent selection:text-black relative">
      
      <NativeGalaxy />
      
      <div className="relative z-[200]">
        <Navigation />
      </div>
      
      <main ref={mainRef} className="relative z-10 bg-transparent pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_p]:pointer-events-auto [&_img]:pointer-events-auto [&_div.group]:pointer-events-auto">
        
        {/* Ensured Z-Index consistency across all blocks to prevent weird layering */}
        <div className="relative z-[10] snap-section w-full"><Heading /></div>
        <div className="relative z-[20] snap-section w-full"><AboutUs /></div>
        
        <div className="relative z-[30] bg-transparent snap-section w-full">
          <UpcomingEvents />
        </div>

        <div className="relative z-[40] bg-transparent snap-section w-full">
          <Projects />
        </div>
        
        {/* Ensured Team has a rigid z-index boundary */}
        <div className="relative z-[50] bg-transparent snap-section w-full">
          <Team />
        </div>
        
        <div className="relative z-[60] bg-transparent snap-section w-full">
          <Gallery />
        </div>

        <div className="relative z-[70] bg-transparent snap-section w-full">
          <Socials />
          <Footer />
        </div>
        
      </main>
    </div>
  );
}

export default App;