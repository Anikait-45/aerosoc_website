import React from 'react';
import Navigation from './components/Navigation';
import GlobalArrow from './components/GlobalArrow';
import Heading from './components/Heading';
import HorizontalSlider from './components/HorizontalSlider';
import Projects from './components/Projects';
import Team from './components/Team';
import AboutUs from './components/AboutUs';
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
  
  const galleryData = [
    { title: "ABCD", description: "Sample ABCD ", img: "" }, 
    { title: "ABCD", description: "Sample ABCD ", img: "" }
  ];

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-accent selection:text-background relative">
      <Navigation />
      <GlobalArrow />
      
      <main>
        <CardStack zIndex={10}><Heading /></CardStack>
        
        <HorizontalSlider id="events" title="Upcoming EVENTS" category="ABCD" data={eventsData} />
        <HorizontalSlider id="workshops" title="Workshops" category="ABCD" data={workshopsData} />
        <div className="relative z-[40] bg-background"><Projects /></div>
        <CardStack zIndex={50}><Team /></CardStack>
        <HorizontalSlider id="gallery" title="The Gallery" category="ABCD" data={galleryData} />

        <div className="relative z-[70] bg-background">
          <AboutUs />
          <Socials />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;