import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background pt-24 pb-8 px-8 md:px-24 border-t border-white/5 relative z-10">
            {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 text-accent">
              <MapPin className="w-5 h-5" />
              <h4 className="font-sans text-sm tracking-widest uppercase">Find Us !</h4>
            </div>
            <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-xs">
              Birla Institute of Technology, Mesra,<br />
              Ranchi, Jharkhand, 835215
            </p>
          </div>

          <div className="flex flex-col items-start md:items-center">
            <div className="flex items-center gap-4 group cursor-pointer">
              <Phone className="w-5 h-5 text-gray-500 group-hover:text-accent transition-colors duration-300" />
              <div>
                <p className="text-accent font-sans text-xs tracking-widest uppercase mb-1">Call Us</p>
                <p className="text-gray-300 font-sans text-sm">9693052886</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-4 group cursor-pointer">
              <Mail className="w-5 h-5 text-gray-500 group-hover:text-accent transition-colors duration-300" />
              <div className="text-left md:text-right">
                <p className="text-accent font-sans text-xs tracking-widest uppercase mb-1">Mail Us</p>
                <p className="text-gray-300 font-sans text-sm">aerosoc@bitmesra.ac.in</p>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full h-[1px] bg-white/5 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 font-sans text-xs tracking-wider">
            Developed by Anikait | 2026 © Aerospace Society BIT MESRA
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
               <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;