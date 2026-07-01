import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; 

import Loader from './components/Loader';
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
  
  const [mountWebsite, setMountWebsite] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ENGINE 1: Pure Lenis Momentum (Magnetic Snap Removed!)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slightly increased for a heavier, more premium "Lando Norris" inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      touchMultiplier: 2,
    });

    if (!isLoaded) lenis.stop(); 
    else lenis.start();

    lenis.on('scroll', ScrollTrigger.update);
    const ticker = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, [isLoaded]);

  // ENGINE 2: Premium GSAP Interactions
  useLayoutEffect(() => {
    if (!startAnimations) return;

    let ctx = gsap.context(() => {
      
      // 1. Initial Heading Reveal (Fires after Loader)
      const headingText = gsap.utils.toArray('#heading h1, #heading p');
      if (headingText.length > 0) {
        gsap.fromTo(headingText,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, delay: 3.5, ease: "expo.out", stagger: 0.2 } 
        );
      }

      // 2. THE GHOST STACK & PERFECT ENTRANCES
      // We grab every section block
      const sections = gsap.utils.toArray('.premium-section');

      sections.forEach((section) => {
        
        // --- A. The Scrubbed Exit (Creates the depth effect) ---
        gsap.to(section, {
          opacity: 0,
          y: -100, // Pushes it slightly up and away as you leave it
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top", // Triggers when the section hits the very top of your screen
            end: "bottom top", 
            scrub: true, // Ties the animation directly to your scroll wheel
          }
        });

        // --- B. The Perfect Entrance Timing ---
        // Find all text elements inside this specific section (ignoring the main heading which is handled above)
        const textElements = section.querySelectorAll('h1, h2, h3, p');
        const isHeading = section.querySelector('#heading');

        if (textElements.length > 0 && !isHeading) {
          gsap.fromTo(textElements,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              stagger: 0.1, // Makes the texts cascade in one after another
              ease: "expo.out", // A very premium, fast-then-slow easing curve
              scrollTrigger: {
                trigger: section,
                start: "top 85%", // Triggers right as it enters the screen to eliminate dead space
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

    }, mainRef);

    const refreshLayout = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    
    const layoutTimeout = setTimeout(refreshLayout, 500);
    window.addEventListener('load', refreshLayout);

    return () => {
      ctx.revert();
      clearTimeout(layoutTimeout);
      window.removeEventListener('load', refreshLayout);
    };
  }, [startAnimations]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-accent selection:text-black relative bg-black">
      
      {/* Scrollbar Killer */}
      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {!isLoaded && (
        <Loader 
          onFlash={() => setMountWebsite(true)} 
          onWipeComplete={() => setStartAnimations(true)} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}
      
      {mountWebsite && (
        <>
          <NativeGalaxy active={startAnimations} />
          
          <div className="relative z-[200]">
            <Navigation />
          </div>
          
          <main 
            ref={mainRef} 
            style={{ opacity: startAnimations ? 1 : 0 }} 
            className="transition-opacity duration-500 relative z-10 bg-transparent pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_p]:pointer-events-auto [&_img]:pointer-events-auto [&_div.group]:pointer-events-auto"
          >
            
            {/* CHANGED: Replaced 'snap-section' with 'premium-section' */}
            <div className="relative z-[10] premium-section w-full"><Heading /></div>
            <div className="relative z-[20] premium-section w-full"><AboutUs /></div>
            
           {/* REMOVED premium-section so the GSAP Ghost Stack doesn't break the horizontal pin math! */}
<div className="relative z-[30] w-full"><UpcomingEvents /></div>
            
           {/* REMOVED premium-section so the GSAP Ghost Stack doesn't break the horizontal pin math! */}
<div className="relative z-[30] w-full"><Projects /></div>
            <div className="relative z-[50] w-full"><Team /></div>
            {/* REMOVED premium-section so the GSAP Ghost Stack doesn't break the horizontal pin math! */}
<div className="relative z-[30] w-full"><Gallery /></div>
            
            <div className="relative z-[70] w-full">
              <Socials />
              <Footer />
            </div>
            
          </main>
        </>
      )}

    </div>
  );
}

export default App;