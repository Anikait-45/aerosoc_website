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

import RosterPage from './components/RosterPage';
import ArchivePage from './components/ArchivePage';
import SplashTransition from './components/SplashTransition';

import ProjectsPage from './components/ProjectsPage';
import WorkshopsPage from './components/WorkshopsPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const morphEngineRef = useRef(null);

  const headingWrapRef = useRef(null);
  const aboutWrapRef = useRef(null);

  const lenisRef = useRef(null);

  // Remembers if you left from '#team', '#gallery', or '#heading'
  const lastSectionRef = useRef('#heading');

  const [mountWebsite, setMountWebsite] = useState(false);
  const [startAnimations, setStartAnimations] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currentView, setCurrentView] = useState('home'); 
  const [transitionTarget, setTransitionTarget] = useState(null);

  const handleNavigate = (targetPage) => {
    if (targetPage === currentView) return;

    // Record the exact component section we are leaving from
    if (targetPage === 'roster') {
      lastSectionRef.current = '#team';
    } else if (targetPage === 'archive') {
      lastSectionRef.current = '#gallery';
    } else if (targetPage === 'projects' || targetPage === 'workshops') {
      lastSectionRef.current = '#heading';
    }

    setTransitionTarget(targetPage);
  };

  // =========================================================================
  // TWO-STEP RESTORATION BEHIND THE CYAN CURTAIN (WITH 3D CANVAS WAKE-UP)
  // =========================================================================
  useEffect(() => {
    if (currentView === 'home') {
      // Step 1 (50ms): Rebuild GSAP spacers & wake up the 3D WebGL Canvas
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
        window.dispatchEvent(new Event('resize')); // Wakes up Three.js canvas after display:block
        if (lenisRef.current) lenisRef.current.resize();
      }, 50);

      // Step 2 (200ms): Restore scroll position & force 3D satellite morph state
      const scrollTimer = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize();
        
        const targetEl = document.querySelector(lastSectionRef.current);
        if (targetEl && lenisRef.current) {
          lenisRef.current.scrollTo(targetEl, { immediate: true, force: true });
        } else if (targetEl) {
          targetEl.scrollIntoView();
        }

        // Guaranteed fix: If returning to Heading, force satellite state (1.0) immediately
        if (lastSectionRef.current === '#heading' && morphEngineRef.current) {
          morphEngineRef.current.setMorphState(1.0);
        }

        // Force a scroll tick so GSAP & Three.js render frame zero without waiting for user input
        ScrollTrigger.update();
      }, 200);

      return () => {
        clearTimeout(refreshTimer);
        clearTimeout(scrollTimer);
      };
    } else {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [currentView]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

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
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.8, delay: 0.5, ease: "expo.out", stagger: 0.2 }
        );
      }

      const proxy = { morphState: 0.0 };

      gsap.to(proxy, {
        morphState: 1.0, 
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (morphEngineRef.current) morphEngineRef.current.setMorphState(proxy.morphState);
        }
      });

      if (aboutWrapRef.current) {
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

      {transitionTarget && (
        <SplashTransition
          targetView={transitionTarget}
          onMidpoint={(newView) => setCurrentView(newView)}
          onComplete={() => setTransitionTarget(null)}
        />
      )}

      {mountWebsite && (
        <>
          {currentView === 'roster' && (
            <RosterPage onNavigate={handleNavigate} />
          )}

          {currentView === 'archive' && (
            <ArchivePage onNavigate={handleNavigate} />
          )}

          {currentView === 'projects' && (
            <ProjectsPage onNavigate={handleNavigate} />
          )}

          {currentView === 'workshops' && (
            <WorkshopsPage onNavigate={handleNavigate} />
          )}

          <div style={{ display: currentView === 'home' ? 'block' : 'none' }}>
            <SpaceMorphBackground ref={morphEngineRef} active={startAnimations && currentView === 'home'} />

            <div className="relative z-[200]">
              <Navigation />
            </div>

            <main
              ref={mainRef}
              style={{ opacity: startAnimations ? 1 : 0 }}
              className="transition-opacity duration-500 relative z-10 bg-transparent pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_p]:pointer-events-auto [&_img]:pointer-events-auto [&_div.group]:pointer-events-auto"
            >
              {/* Passed onNavigate={handleNavigate} to Heading */}
              <div ref={headingWrapRef} className="relative z-[10] premium-section w-full min-h-screen flex items-center">
                <Heading onNavigate={handleNavigate} />
              </div>

              <div ref={aboutWrapRef} className="relative z-[20] premium-section w-full min-h-screen flex items-center"><AboutUs /></div>

              <div className="relative z-[30] w-full"><UpcomingEvents /></div>
              <div className="relative z-[35] w-full"><FootfallGraph /></div>
              <div className="relative z-[50] w-full"><Team onNavigate={handleNavigate} /></div>
              <div className="relative z-[30] w-full"><Gallery onNavigate={handleNavigate} /></div>

              <div className="relative z-[70] w-full">
                <Socials />
                <Footer />
              </div>

            </main>
          </div>
        </>
      )}

    </div>
  );
}

export default App;