import React from 'react';
import { Calendar, GraduationCap, Trophy, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Event Hub',
    description: 'Stay updated with the latest hackathons, tech fests, and innovation challenges.',
    icon: Calendar,
    link: '/events',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'College Directory',
    description: 'Comprehensive database of engineering colleges in Kerala with direct portal links.',
    icon: GraduationCap,
    link: '/colleges',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Achievement Showcase',
    description: 'Discover and celebrate success stories from colleges across Kerala.',
    icon: Trophy,
    link: '/achievements',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'KEAM Predictor',
    description: 'AI-powered tool to help predict your college admission chances.',
    icon: Users,
    link: '/predictor',
    color: 'from-emerald-500 to-teal-500',
  },
];

const Features = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Empowering students and colleges with comprehensive tools and resources.
          </p>
        </motion.div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={feature.link}
                  className="block group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-gray-500">{feature.description}</p>
                    <div className="mt-4 flex items-center text-indigo-600">
                      <span className="text-sm font-medium">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;