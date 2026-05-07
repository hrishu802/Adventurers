import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Adventure Enthusiast",
    image: "AJ",
    review: "The trip to Japan was beyond my expectations. Everything was perfectly organized, and the hidden spots we visited were breathtaking.",
    rating: 5
  },
  {
    name: "Sarah Miller",
    role: "Solo Traveler",
    image: "SM",
    review: "As a solo traveler, safety and comfort are my priorities. Adventurers made sure I felt taken care of throughout my entire journey in Italy.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Photography Lover",
    image: "DC",
    review: "Found the most photogenic locations thanks to their expert guides. Highly recommend the Northern Lights tour in Iceland!",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-accent/10 blur-[100px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-poppins text-white mb-6">
            Voices of <span className="text-gradient">Explorers</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Hear from our community of travelers who have explored the world's most incredible destinations with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm relative group"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-primary-accent/10 transition-colors" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`w-4 h-4 ${idx < t.rating ? 'text-secondary-accent fill-secondary-accent' : 'text-white/10'}`} 
                  />
                ))}
              </div>

              <p className="text-lg text-text-primary/90 leading-relaxed mb-8 italic">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-accent to-secondary-accent flex items-center justify-center font-bold text-background">
                  {t.image}
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-text-muted text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
