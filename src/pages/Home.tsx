import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HomeContentService } from '../services/HomeContentService';

// Redesigned Components
import Hero from '../components/home/Hero';
import FeaturedAdventures from '../components/home/FeaturedAdventures';
import Stats from '../components/home/Stats';
import Gallery from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import Button from '../components/Button';

const homeService = new HomeContentService();

const Home: React.FC = () => {
  const featuredDestinations = useMemo(() => homeService.getFeaturedDestinations(), []);
  
  return (
    <div className="bg-background min-h-screen">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. STATS SECTION */}
      <Stats />

      {/* 3. FEATURED ADVENTURES */}
      <FeaturedAdventures destinations={featuredDestinations} />

      {/* 4. DESTINATIONS GALLERY */}
      <Gallery />

      {/* 5. TESTIMONIALS */}
      <Testimonials />

      {/* 6. FAQ SECTION */}
      <FAQ />

      {/* 7. CTA / NEWSLETTER SECTION (Integrated into Home for premium feel) */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 border border-white/10 p-12 md:p-20 text-center"
          >
            {/* Animated Background Orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-accent/20 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-accent/20 blur-[100px] translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold font-poppins text-white mb-6">
                Ready to Start Your <br />
                <span className="text-gradient">Next Adventure?</span>
              </h2>
              <p className="text-text-muted text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of explorers who have found their perfect getaway. 
                Get exclusive deals and travel tips delivered to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full sm:w-80 bg-background/50 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary-accent transition-all"
                />
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-2xl">
                  Get Started Free
                </Button>
              </div>
              
              <p className="mt-6 text-sm text-text-muted/60">
                No credit card required. Cancel anytime.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;