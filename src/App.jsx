import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; 

import NativeGalaxy from './components/NativeGalaxy'; 
import Navigation from './components/Navigation';
import Heading from './components/Heading';
import AboutUs from './components/AboutUs';
import HorizontalSlider from './components/HorizontalSlider';
import Projects from './components/Projects';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Socials from './components/Socials';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  const eventsData = [
    { title: "ABCD", description: "Sample ABCD", img: "" }, 
    { title: "ABCD", description: "Sample ABCD", img: "" }
  ];
  
  const workshopsData = [
    { title: "ABCD", description: "Sample ABCD ", img: "" }, 
    { title: "ABCD", description: "Sample ABCD ", img: "" }
  ];

  useEffect(() => {
    // 1. CLEAN SMOOTH SCROLL INIT (Fixes the sticky/bouncy glitch)
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

    // 2. THE CUSTOM MAGNETIC ENGINE
    let scrollTimeout;
    lenis.on('scroll', () => {
      clearTimeout(scrollTimeout);
      
      // Waits 250ms after you completely stop scrolling your wheel
      scrollTimeout = setTimeout(() => {
        const sections = document.querySelectorAll('.snap-section');
        let closestSection = null;
        let minDistance = Infinity;

        // Finds exactly where you are on the page
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const distanceToTop = Math.abs(rect.top);

          if (distanceToTop < minDistance) {
            minDistance = distanceToTop;
            closestSection = section;
          }
        });

        // If you are stuck in a gap (between 10px and 70% of your screen height away), 
        // it magnetically pulls the section to the top.
        if (closestSection && minDistance > 10 && minDistance < window.innerHeight * 0.70) {
          lenis.scrollTo(closestSection, {
            duration: 1.2,
            ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }, 250);
    });

    // 3. THE TEXT REVEAL ENGINE
    
    // Engine A: Heading (Waits 3 seconds for the Big Bang intro)
    const headingText = gsap.utils.toArray('#heading h1, #heading p');
    if (headingText.length > 0) {
      gsap.fromTo(headingText,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 2.0, ease: "power3.out" }
      );
    }

    // Engine B: All other text (Delays 1 second so it pops out beautifully when centered)
    const otherText = gsap.utils.toArray('h1, h2, h3, p').filter(el => !el.closest('#heading'));
    otherText.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.25, // THE 1 SECOND DELAY YOU REQUESTED
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%", // Triggers right when the text hits the middle of your monitor
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // 4. BULLETPROOF CLEANUP (Prevents double-engines on save)
    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-accent selection:text-black relative">
      
      <NativeGalaxy />
      
      <div className="relative z-[200]">
        <Navigation />
      </div>
      
      <main ref={mainRef} className="relative z-10 bg-transparent pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_p]:pointer-events-auto [&_img]:pointer-events-auto [&_div.group]:pointer-events-auto">
        
        {/* Added w-full to ensure sections have a rigid boundary for the magnet to detect */}
        <div className="snap-section w-full"><Heading /></div>
        <div className="snap-section w-full"><AboutUs /></div>
        
        <div className="relative z-[30] bg-transparent snap-section w-full">
          <HorizontalSlider id="events" title="Upcoming EVENTS" category="ABCD" data={eventsData} />
        </div>
        
        <div className="relative z-[30] bg-transparent snap-section w-full">
          <HorizontalSlider id="workshops" title="Workshops" category="ABCD" data={workshopsData} />
        </div>

        <div className="relative z-[40] bg-transparent snap-section w-full"><Projects /></div>
        
        <div className="snap-section w-full"><Team /></div>
        
        <div className="relative z-[60] bg-transparent snap-section w-full"><Gallery /></div>

        <div className="relative z-[70] bg-transparent snap-section w-full">
          <Socials />
          <Footer />
        </div>
        
      </main>
    </div>
  );
}

export default App;