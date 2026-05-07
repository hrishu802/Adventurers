import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1433086566280-608bd0491115?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=2940",
  "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?auto=format&fit=crop&q=80&w=2940"
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary-accent/10 border border-primary-accent/20 rounded-full text-primary-accent text-sm font-bold uppercase tracking-widest mb-4"
          >
            Visual Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold font-poppins text-white"
          >
            Memories From <span className="text-gradient">Around The Globe</span>
          </motion.h2>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedImage(src)}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Gallery ${i}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-primary-accent flex items-center justify-center text-background scale-50 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-primary-accent/30">
                  <Maximize2 className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 bg-background/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.img
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-[2rem] shadow-2xl border border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
