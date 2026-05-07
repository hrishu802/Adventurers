import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User as UserIcon, ArrowRight } from 'lucide-react';
import { PageContentService } from '../services/PageContentService';

const contentService = new PageContentService();

const Blog: React.FC = () => {
  const blogPosts = contentService.getBlogPosts();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <section className="relative pt-32 pb-20 overflow-hidden text-center">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-accent/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-poppins text-white mb-6">
              Travel <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Stories, tips, and guides from our global community of explorers. 
              Discover your next destination through our lens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] mb-6 border border-white/10 shadow-2xl">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                    Inspiration
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-xs font-medium text-text-muted">
                    <div className="flex items-center gap-1.5">
                      <UserIcon className="w-3.5 h-3.5 text-primary-accent" />
                      {post.author}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary-accent" />
                      {post.date}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-primary-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 flex items-center gap-2 text-white font-bold text-sm group-hover:text-primary-accent transition-colors">
                    Read Story
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-primary-accent/5 to-secondary-accent/5" />
           <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Never Miss a Story</h3>
           <p className="text-text-muted mb-8 max-w-lg mx-auto">Get the latest travel inspiration and expert tips delivered directly to your inbox every week.</p>
           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
             <input 
              type="email" 
              placeholder="Your email"
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-white focus:outline-none focus:border-primary-accent"
             />
             <button className="px-8 py-3 bg-white text-background font-bold rounded-2xl hover:scale-105 transition-transform">
               Subscribe
             </button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;