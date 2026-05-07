import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdventureCard from '../AdventureCard';
import Button from '../Button';

interface FeaturedAdventuresProps {
  destinations: any[];
}

const FeaturedAdventures: React.FC<FeaturedAdventuresProps> = ({ destinations }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-primary-accent font-bold uppercase tracking-widest text-sm mb-4"
            >
              <span className="w-8 h-[2px] bg-primary-accent" />
              Popular Destinations
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold font-poppins text-white leading-tight"
            >
              Featured <span className="text-gradient">Adventures</span> You'll Love
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button 
              variant="ghost" 
              onClick={() => navigate('/packages')}
              className="group"
            >
              View All Packages
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.slice(0, 3).map((dest, i) => (
            <AdventureCard
              key={i}
              image={dest.image}
              title={dest.name || dest.title}
              location={dest.location}
              price={dest.price}
              rating={dest.rating}
              onExplore={() => navigate('/buy', { state: dest })}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAdventures;
