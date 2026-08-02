import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socialPosts = [
  { 
    id: 1, 
    platform: 'Instagram', 
    img: "/instapost1.jpeg", 
    link: "https://www.instagram.com/p/DQVo3kQgsF9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    rotate: -12, xPercent: -110, yPercent: 20, z: "z-10" 
  },
  { 
    id: 2, 
    platform: 'Instagram', 
    img: "/instapost2.jpeg", 
    link: "https://www.instagram.com/p/DTsB_MNE0It/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    rotate: -6, xPercent: -55, yPercent: 10, z: "z-20" 
  },
  { 
    id: 3, 
    platform: 'Instagram', 
    img: "/instapost3.jpeg", 
    link: "https://www.instagram.com/p/DV6PVrAk7A6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA== ", 
    rotate: 0, xPercent: 0, yPercent: 0, z: "z-30", scale: 1.1 
  },
  { 
    id: 4, 
    platform: 'Instagram', 
    img: "/instapost4.jpeg", 
    link: "https://www.instagram.com/p/DWMCIOplMWI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    rotate: 6, xPercent: 55, yPercent: 10, z: "z-20" 
  },
  { 
    id: 5, 
    platform: 'Instagram', 
    img: "/instapost5.jpeg", 
    link: "https://www.instagram.com/p/DXCTCI-FAUz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", 
    rotate: 12, xPercent: 110, yPercent: 20, z: "z-10" 
  },
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/aerosoc_bitmesra' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/aerosocbitmesra' },
  { name: 'Facebook', url: 'https://facebook.com/aerosocbitmesra' }
];

const Socials = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardWrappersRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 65%",
          end: "center 35%",
          scrub: 1,
        }
      });

      socialPosts.forEach((post, i) => {
        const wrapper = cardWrappersRef.current[i];
        if (!wrapper) return;

        tl.fromTo(
          wrapper,
          {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            scale: 1,
          },
          {
            xPercent: post.xPercent,
            yPercent: post.yPercent,
            rotation: post.rotate,
            scale: post.scale || 1,
            ease: "power2.out",
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="socials" 
      ref={sectionRef} 
      className="py-32 bg-transparent relative overflow-hidden border-t border-white/5 flex flex-col items-center"
    >
      <div className="relative z-10 text-center mb-16 md:mb-24 px-4">
        <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
          What's Up <br/> <span className="text-accent">On Socials</span>
        </h2>
      </div>

      <div 
        ref={cardsContainerRef}
        className="relative w-full max-w-5xl h-[300px] md:h-[450px] flex items-center justify-center mb-24 z-10"
      >
        {socialPosts.map((post, index) => (
          <div
            key={post.id}
            ref={(el) => (cardWrappersRef.current[index] = el)}
            className={`absolute w-32 h-48 md:w-64 md:h-96 ${post.z}`}
          >
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out group hover:-translate-y-6 md:hover:-translate-y-10 hover:scale-105 hover:border-accent/50 cursor-pointer bg-surface"
            >
              {post.img ? (
                <img 
                  src={post.img} 
                  alt={`${post.platform} Post ${post.id}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-surface/50 text-white/20 font-display font-black text-4xl">
                  {post.id}
                </div>
              )}
            </a>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-8">
          Follow AeroSoc on social media
        </h3>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {socialLinks.map((platform) => (
            <a 
              key={platform.name} 
              href={platform.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-display font-black uppercase tracking-widest text-sm md:text-base hover:text-accent transition-colors duration-300 relative group"
            >
              {platform.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Socials;