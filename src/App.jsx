import React from 'react';
import Navigation from './components/Navigation';
import GlobalArrow from './components/GlobalArrow';
import Heading from './components/Heading';
import HorizontalSlider from './components/HorizontalSlider';
import Projects from './components/Projects';
import Team from './components/Team';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import CardStack from './components/CardStack';
import TelemetryHUD from './components/TelemetryHUD';

function App() {
  const eventsData = [{ title: "Hackathon 2026", description: "Annual coding sprint." }, { title: "Aerospace Gala", description: "Networking event." }];
  const workshopsData = [{ title: "CAD Basics", description: "Design training." }, { title: "C++ Embedded", description: "Programming drones." }];
  const galleryData = [{ title: "Launch Day", description: "Photos of our latest test flight." }, { title: "Workshops", description: "Team working in labs." }];

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-accent selection:text-background relative">
      <TelemetryHUD />
      <Navigation />
      <GlobalArrow />
      
      <main>
        <CardStack zIndex={10}><Heading /></CardStack>
        
        <HorizontalSlider id="events" title="Upcoming Events" category="Schedule" data={eventsData} />
        <HorizontalSlider id="workshops" title="Technical Workshops" category="Training" data={workshopsData} />
        <div className="relative z-[40] bg-background"><Projects /></div>
        <CardStack zIndex={50}><Team /></CardStack>
        <HorizontalSlider id="gallery" title="The Gallery" category="Media" data={galleryData} />

        <div className="relative z-[70] bg-background">
          <AboutUs />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;