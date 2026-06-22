import React from 'react';

// Replace the 'link' with the URL to the specific post, and 'img' with your actual image path
const socialPosts = [
  { 
    id: 1, 
    platform: 'Instagram', 
    img: "", 
    link: "https://www.instagram.com/p/DV6PVrAk7A6/?igsh=Ynl2cnhmOWhnOG14", 
    rotation: "-rotate-12", y: "translate-y-12 md:translate-y-20", x: "-translate-x-24 md:-translate-x-64", z: "z-10" 
  },
  { 
    id: 2, 
    platform: 'YouTube', 
    img: "", 
    link: "https://youtube.com/watch?v=YOUR_VIDEO_ID", 
    rotation: "-rotate-6", y: "translate-y-4 md:translate-y-8", x: "-translate-x-12 md:-translate-x-32", z: "z-20" 
  },
  { 
    id: 3, 
    platform: 'LinkedIn', 
    img: "", 
    link: "https://linkedin.com/posts/YOUR_POST_ID", 
    rotation: "rotate-0", y: "translate-y-0", x: "translate-x-0", z: "z-30", scale: "scale-105 md:scale-110" 
  },
  { 
    id: 4, 
    platform: 'Instagram', 
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop", 
    link: "https://instagram.com/p/YOUR_POST_ID", 
    rotation: "rotate-6", y: "translate-y-4 md:translate-y-8", x: "translate-x-12 md:translate-x-32", z: "z-20" 
  },
  { 
    id: 5, 
    platform: 'Facebook', 
    img: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?q=80&w=800&auto=format&fit=crop", 
    link: "https://facebook.com/YOUR_POST_ID", 
    rotation: "rotate-12", y: "translate-y-12 md:translate-y-20", x: "translate-x-24 md:translate-x-64", z: "z-10" 
  },
];

const socialLinks = [
  { name: 'Instagram', url: 'https://instagram.com/aerosoc_bitmesra' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/aerosocbitmesra' },
  { name: 'Facebook', url: 'https://facebook.com/aerosocbitmesra' }
];

const Socials = () => {
  return (
    <section id="socials" className="py-32 bg-transparent relative overflow-hidden border-t border-white/5 flex flex-col items-center">
      

      {/* Heading */}
      <div className="relative z-10 text-center mb-16 md:mb-24 px-4">
        <h2 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter">
          What's Up <br/> <span className="text-accent">On Socials</span>
        </h2>
      </div>

      {/* Fanned Cards Container */}
      <div className="relative w-full max-w-5xl h-[300px] md:h-[450px] flex items-center justify-center mb-24 z-10">
        {socialPosts.map((post) => (
          <a 
            key={post.id} 
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute w-32 h-48 md:w-64 md:h-96 rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out group 
              ${post.rotation} ${post.y} ${post.x} ${post.z} ${post.scale || ''} 
              hover:-translate-y-10 hover:z-50 hover:rotate-0 hover:scale-110 md:hover:scale-125 hover:border-accent/50 cursor-pointer bg-surface`}
          >
            {/* Image Layer */}
            {post.img ? (
              <img src={post.img} alt={`${post.platform} Post ${post.id}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface/50 text-white/20 font-display font-black text-4xl">
                {post.id}
              </div>
            )}
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm">
              <span className="text-accent font-display font-bold uppercase tracking-widest text-xs mb-2">{post.platform}</span>
              <span className="text-white font-sans text-sm tracking-widest uppercase border-b border-white/30 pb-1">View Post</span>
            </div>
          </a>
        ))}
      </div>

      {/* Text Links Section */}
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