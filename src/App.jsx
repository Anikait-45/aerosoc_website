import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader from './components/Loader';
import SpaceMorphBackground from './components/SpaceMorphBackground';
import Navigation from './components/Navigation';
import Heading from './components/Heading';
import AboutUs from './components/AboutUs';
import UpcomingEvents from './components/UpcomingEvents';
import FootfallGraph from './components/FootfallGraph';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Socials from './components/Socials';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const morphEngineRef = useRef(null);

  const headingWrapRef = useRef(null);
  const aboutWrapRef = useRef(null);

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

      // 1. Initial UI Fade In (Now slides in from the Left to Right)
      const headingText = gsap.utils.toArray('#heading h1, #heading p');
      if (headingText.length > 0) {
        gsap.fromTo(headingText,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: "expo.out", stagger: 0.2 }
        );
      }

      // --- MORPH LOGIC ---
      const proxy = { morphState: 0.0 };

      // PHASE 1: On load, assemble scattered particles into the first shape (right).
      gsap.to(proxy, {
        morphState: 1.0, 
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (morphEngineRef.current) morphEngineRef.current.setMorphState(proxy.morphState);
        }
      });

      if (aboutWrapRef.current) {
        // PHASE 2: Shape 1 (Right) morphs into Shape 2 (Left).
        // Starts when About Us enters the screen, finishes EXACTLY at the center.
        ScrollTrigger.create({
          trigger: aboutWrapRef.current,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          onUpdate: (self) => {
            const state = 1.0 + self.progress; 
            if (morphEngineRef.current) morphEngineRef.current.setMorphState(state);
          }
        });

        // PHASE 3: Shape 2 completely disperses.
        // Starts exactly as you scroll past the center of About Us.
        ScrollTrigger.create({
          trigger: aboutWrapRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const state = 2.0 + self.progress; 
            if (morphEngineRef.current) morphEngineRef.current.setMorphState(state);
          }
        });
      }

      // Existing UI scroll fades for text
      const sections = gsap.utils.toArray('.premium-section');
      sections.forEach((section) => {
        gsap.to(section, {
          opacity: 0, y: -100, ease: "none",
          scrollTrigger: {
            trigger: section, start: "top top", end: "bottom top", scrub: true,
          }
        });

        const textElements = section.querySelectorAll('h1, h2, h3, p');
        const isHeading = section.querySelector('#heading');

        if (textElements.length > 0 && !isHeading) {
          gsap.fromTo(textElements,
            { y: 60, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "expo.out",
              scrollTrigger: {
                trigger: section, start: "top 85%", toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, [startAnimations]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-accent selection:text-black relative bg-black">

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
          <SpaceMorphBackground ref={morphEngineRef} active={startAnimations} />

          <div className="relative z-[200]">
            <Navigation />
          </div>

          <main
            ref={mainRef}
            style={{ opacity: startAnimations ? 1 : 0 }}
            className="transition-opacity duration-500 relative z-10 bg-transparent pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_p]:pointer-events-auto [&_img]:pointer-events-auto [&_div.group]:pointer-events-auto"
          >
            {/* Removed the hard pt-40 / py-32 padding and added flex/items-center to perfectly vertical center the sections */}
            <div ref={headingWrapRef} className="relative z-[10] premium-section w-full min-h-screen flex items-center"><Heading /></div>

            <div ref={aboutWrapRef} className="relative z-[20] premium-section w-full min-h-screen flex items-center"><AboutUs /></div>

            <div className="relative z-[30] w-full"><UpcomingEvents /></div>
            <div className="relative z-[35] w-full"><FootfallGraph /></div>
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