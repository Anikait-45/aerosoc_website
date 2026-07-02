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
import FootfallGraph from './components/FootfallGraph';
// import Projects from './components/Projects';
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, 
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

  useLayoutEffect(() => {
    if (!startAnimations) return;

    let ctx = gsap.context(() => {
      
      const headingText = gsap.utils.toArray('#heading h1, #heading p');
      if (headingText.length > 0) {
        gsap.fromTo(headingText,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.8, delay: 3.0, ease: "expo.out", stagger: 0.2 } 
        );
      }

      const sections = gsap.utils.toArray('.premium-section');

      sections.forEach((section) => {
        
        gsap.to(section, {
          opacity: 0,
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top", 
            end: "bottom top", 
            scrub: true, 
          }
        });

        const textElements = section.querySelectorAll('h1, h2, h3, p');
        const isHeading = section.querySelector('#heading');

        if (textElements.length > 0 && !isHeading) {
          gsap.fromTo(textElements,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.5,
              stagger: 0.1, 
              ease: "expo.out", 
              scrollTrigger: {
                trigger: section,
                start: "top 85%", 
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
            
            <div className="relative z-[10] premium-section w-full"><Heading /></div>
            <div className="relative z-[20] premium-section w-full"><AboutUs /></div>
            
<div className="relative z-[30] w-full"><UpcomingEvents /></div>
<div className="relative z-[35] w-full"><FootfallGraph /></div>
            
{/* <div className="relative z-[30] w-full"><Projects /></div> */}
            <div className="relative z-[50] w-full"><Team /></div>
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