import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from './Button';

export interface AdventureCardProps {
    image: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    onExplore: () => void;
    className?: string;
}

const AdventureCard: React.FC<AdventureCardProps> = ({ 
    image, 
    title, 
    location, 
    price, 
    rating, 
    onExplore,
    className
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            onClick={onExplore}
            className={cn(
                "group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm transition-all duration-500 cursor-pointer hover:border-primary-accent/30",
                className
            )}
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <motion.img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-secondary-accent fill-secondary-accent" />
                    <span className="text-sm font-bold text-white">{rating}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary-accent transition-colors line-clamp-1">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-1.5 text-text-muted mb-6">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{location}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Starting from</p>
                        <p className="text-2xl font-bold text-white">${price}</p>
                    </div>
                    
                    <div className="w-10 h-10 bg-primary-accent rounded-xl flex items-center justify-center text-background shadow-lg shadow-primary-accent/20 group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AdventureCard;
