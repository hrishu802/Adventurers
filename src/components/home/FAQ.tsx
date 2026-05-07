import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const faqs = [
  {
    question: "What is included in the travel packages?",
    answer: "Our packages typically include premium accommodation, guided tours by locals, internal transportation, and selected meals. Detailed inclusions are listed on each specific package page."
  },
  {
    question: "How do I book a destination?",
    answer: "Simply choose your desired destination, select a package, and click 'Book Now'. You'll be guided through a simple booking process where you can choose your dates and provide traveler details."
  },
  {
    question: "Can I customize a travel package?",
    answer: "Yes! We offer customization for most of our private tours. Contact our support team after selecting a base package, and we'll help you tailor it to your preferences."
  },
  {
    question: "What is the cancellation policy?",
    answer: "Cancellations made 30 days or more before the trip start date are eligible for a full refund minus a small processing fee. See our Terms of Service for more details."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-secondary-accent/10 rounded-full text-secondary-accent text-sm font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" />
            Support
          </div>
          <h2 className="text-4xl font-bold font-poppins text-white">
            Common <span className="text-gradient">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === i ? "bg-white/5 border-primary-accent/30 shadow-lg shadow-primary-accent/5" : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className={cn(
                  "font-semibold transition-colors",
                  openIndex === i ? "text-primary-accent" : "text-white"
                )}>
                  {faq.question}
                </span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-text-muted transition-transform duration-300",
                  openIndex === i && "rotate-180 text-primary-accent"
                )} />
              </button>
              
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
