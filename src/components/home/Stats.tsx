import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Calendar } from 'lucide-react';

const stats = [
  {
    icon: Globe,
    value: "50+",
    label: "Destinations",
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    icon: Users,
    value: "12k+",
    label: "Happy Travelers",
    color: "text-primary-accent",
    bg: "bg-primary-accent/10"
  },
  {
    icon: Award,
    value: "15+",
    label: "Travel Awards",
    color: "text-secondary-accent",
    bg: "bg-secondary-accent/10"
  },
  {
    icon: Calendar,
    value: "10+",
    label: "Years Experience",
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  }
];

const Stats: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.07]"
            >
              <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-text-muted font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
