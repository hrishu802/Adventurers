import React from 'react';
import { motion } from 'framer-motion';
import { PageContentService } from '../services/PageContentService';

const contentService = new PageContentService();

const Services: React.FC = () => {
  const services = contentService.getServices();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary-accent/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              We provide end-to-end travel solutions to ensure your journey is seamless, 
              safe, and truly unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-primary-accent font-bold text-sm uppercase tracking-widest cursor-pointer group/link">
                    Learn More
                    <div className="w-8 h-[2px] bg-primary-accent group-hover/link:w-12 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-accent/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
           <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need a Custom Solution?</h3>
           <p className="text-text-muted mb-8">Our travel experts are ready to help you plan your bespoke adventure.</p>
           <button className="px-8 py-4 bg-primary-accent text-background font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-primary-accent/20">
             Contact Support
           </button>
        </div>
      </section>
    </div>
  );
};

export default Services;