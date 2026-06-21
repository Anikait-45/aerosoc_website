import React from 'react';
import Navigation from './components/Navigation';
import Heading from './components/Heading';
import AboutUs from './components/AboutUs';
import HorizontalSlider from './components/HorizontalSlider';
import Projects from './components/Projects';
import Team from './components/Team';
import Gallery from './components/Gallery';
import Socials from './components/Socials';
import Footer from './components/Footer';
import CardStack from './components/CardStack';

function App() {
  const eventsData = [
    { title: "ABCD", description: "Sample ABCD", img: "" }, 
    { title: "ABCD", description: "Sample ABCD", img: "" }
  ];
  
  const workshopsData = [
    { title: "ABCD", description: "Sample ABCD ", img: "" }, 
    { title: "ABCD", description: "Sample ABCD ", img: "" }
  ];

  return (
    // Removed overflow-x-hidden so GSAP pinning works properly again
    <div className="min-h-screen bg-black text-white font-sans selection:bg-accent selection:text-black relative">
      <Navigation />
      
      <main className="bg-black">
        <CardStack zIndex={10}><Heading /></CardStack>
        <CardStack zIndex={20}><AboutUs /></CardStack>
        
        {/* Horizontal tracks pin themselves, no CardStack wrapper needed */}
        <div className="relative z-[30] bg-black">
          <HorizontalSlider id="events" title="Upcoming EVENTS" category="ABCD" data={eventsData} />
          <HorizontalSlider id="workshops" title="Workshops" category="ABCD" data={workshopsData} />
        </div>

        <div className="relative z-[40] bg-black"><Projects /></div>
        
        <CardStack zIndex={50}><Team /></CardStack>
        
        <div className="relative z-[60] bg-black"><Gallery /></div>

        <div className="relative z-[70] bg-black">
          <Socials />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;