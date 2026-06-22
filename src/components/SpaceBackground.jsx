import React from 'react';

const SpaceBackground = () => {
  return (
    // pointer-events-auto ensures the iframe catches your clicks and drags
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-auto bg-black">
      <iframe
        src="/space-simulation.html"
        title="Global Space Simulation"
        className="w-full h-full border-none opacity-80"
      />
    </div>
  );
};

export default SpaceBackground;