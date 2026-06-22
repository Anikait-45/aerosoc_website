import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis'; // The premium smooth scroll engine

import SpaceBackground from './components/SpaceBackground';
import Navigation from './components/Navigation';
import Heading from './components/Heading';
import AboutUs from './components/AboutUs';
import HorizontalSlider from './components/HorizontalSlider';
import Projects from './components/Projects';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Socials from './components/Socials';
import Footer from './components/Footer';

// Register ScrollTrigger so it can sync with Lenis
gsap.registerPlugin(ScrollTrigger);

function App() {
  const eventsData = [
    { title: "ABCD", description: "Sample ABCD", img: "" }, 
    { title: "ABCD", description: "Sample ABCD", img: "" }
  ];
  
  const workshopsData = [
    { title: "ABCD", description: "Sample ABCD ", img: "" }, 
    { title: "ABCD", description: "Sample ABCD ", img: "" }
  ];

  useEffect(() => {
    // 1. The Smooth Scroll Engine
    const lenis = new Lenis({
      duration: 1.2, // Gives it that heavy, premium momentum
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Sync GSAP perfectly with the smooth scroll
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0, 0);

    // 2. The Global Text Reveal Engine (Replaces CardStack!)
    // Automatically finds all text on your website and floats it in on scroll
    const textElements = gsap.utils.toArray('h1, h2, h3, p');
    textElements.forEach((el) => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", // Triggers when the text is 85% down your screen
            toggleActions: "play none none reverse" // Reverses the fade out if you scroll back up!
          }
        }
      );
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-accent selection:text-black relative">
      
      {/* The Live Simulation */}
      <SpaceBackground />
      
      {/* The Navigation */}
      <div className="relative z-[200] pointer-events-auto">
        <Navigation />
      </div>
      
      {/* THE SMART PASSTHROUGH LAYER */}
      <main className="relative z-10 bg-transparent pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_h1]:pointer-events-auto [&_h2]:pointer-events-auto [&_h3]:pointer-events-auto [&_p]:pointer-events-auto [&_img]:pointer-events-auto [&_div.group]:pointer-events-auto">
        
        {/* Notice how clean this is now! No more complex layout wrappers. 
            Just raw, beautiful components flowing naturally. */}
        <Heading />
        <AboutUs />
        
        <div className="relative z-[30] bg-transparent">
          <HorizontalSlider id="events" title="Upcoming EVENTS" category="ABCD" data={eventsData} />
          <HorizontalSlider id="workshops" title="Workshops" category="ABCD" data={workshopsData} />
        </div>

        <div className="relative z-[40] bg-transparent">
          <Projects />
        </div>
        
        <Team />
        
        <div className="relative z-[60] bg-transparent">
          <Gallery />
        </div>

        <div className="relative z-[70] bg-transparent pointer-events-auto">
          <Socials />
          <Footer />
        </div>
        
      </main>
    </div>
  );
}

export default App;