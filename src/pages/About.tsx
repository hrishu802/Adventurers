import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Globe, Shield, Users } from 'lucide-react';
import { PageContentService } from '../services/PageContentService';

const contentService = new PageContentService();

const About: React.FC = () => {
  const aboutSections = contentService.getAboutSections();
  
  const icons = [Compass, Globe, Shield, Users];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary-accent/10 border border-primary-accent/20 rounded-full text-primary-accent text-sm font-bold uppercase tracking-widest mb-6">
              Our Story
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white mb-6">
              About <span className="text-gradient">Adventurers</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              We are on a mission to redefine exploration and create meaningful connections between people and the world's most incredible places.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {aboutSections.map((section, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-primary-accent/30 transition-all hover:bg-white/[0.07] shadow-2xl backdrop-blur-sm"
                >
                  <div className="w-16 h-16 bg-primary-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-primary-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-primary-accent transition-colors">
                    {section.title}
                  </h2>
                  <p className="text-text-muted text-lg leading-relaxed">
                    {section.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team / Vision Section Placeholder */}
      <section className="py-24 bg-white/5 border-y border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              "Travel is the only thing you buy <br />
              <span className="text-secondary-accent">that makes you richer.</span>"
            </h2>
            <div className="w-20 h-1 bg-primary-accent mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;