import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Play, Compass } from 'lucide-react';
import Button from '../Button';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background z-20" />
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2940"
          alt="Adventure Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-32 h-32 bg-primary-accent/10 blur-3xl rounded-full"
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-secondary-accent/10 blur-3xl rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-primary-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-white/80 tracking-wider uppercase">Explore the Uncharted</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-poppins text-white leading-tight mb-8"
        >
          Adventure Awaits <br />
          <span className="text-gradient">Beyond the Horizon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-text-muted mb-12"
        >
          Discover breathtaking destinations, curated travel experiences, and memories 
          that last a lifetime. Your journey into the extraordinary starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto group">
            Start Planning
            <Compass className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
          </Button>
          <button className="flex items-center gap-4 text-white font-semibold group hover:text-primary-accent transition-colors">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary-accent transition-colors bg-white/5">
              <Play className="w-5 h-5 fill-white group-hover:fill-primary-accent transition-colors" />
            </div>
            Watch Story
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary-accent to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
