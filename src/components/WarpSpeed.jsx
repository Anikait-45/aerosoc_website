import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WarpSpeed = ({ isWarping, direction = 'forward', onComplete }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const stars = [];
    const numStars = 400;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * 1000,
        pz: Math.random() * 1000
      });
    }

    let speed = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const currentCenterX = canvas.width / 2;
      const currentCenterY = canvas.height / 2;

      stars.forEach(star => {
        star.pz = star.z;
        
        if (direction === 'forward') {
          star.z -= speed;
          if (star.z < 1) { star.z = 1000; star.pz = 1000; }
        } else {
          star.z += speed;
          if (star.z > 1000) { star.z = 1; star.pz = 1; }
        }

        const factor = 200 / star.z;
        const pFactor = 200 / star.pz;

        const x = currentCenterX + star.x * factor;
        const y = currentCenterY + star.y * factor;
        const px = currentCenterX + star.x * pFactor;
        const py = currentCenterY + star.y * pFactor;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = Math.max(0.5, 3 - (star.z / 300));
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    if (isWarping) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
        .to({ val: 0 }, {
          val: 100,
          duration: 1.5,
          ease: "power3.in",
          onUpdate: function() { speed = this.targets()[0].val; }
        })
        // AT 2.0s: Screen blacks out into the void
        .to(containerRef.current, { backgroundColor: '#000000', duration: 0.2 })
        
        // AT 2.2s: Fade the black screen to transparent to reveal the galaxy loading underneath
        .to(containerRef.current, { backgroundColor: 'transparent', duration: 1.5 }, "slowdown")
        .to({ val: 100 }, {
          val: 0,
          duration: 1.5,
          ease: "power3.out",
          onUpdate: function() { speed = this.targets()[0].val; }
        }, "slowdown")
        
        // Fade warp drive out
        .to(containerRef.current, { opacity: 0, duration: 0.5 });
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWarping, direction]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999] pointer-events-none opacity-0 bg-transparent flex items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default WarpSpeed;