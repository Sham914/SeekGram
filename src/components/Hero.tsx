import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SeekGramLogo = () => (
  <svg width="128" height="128" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6">
    <rect width="32" height="32" fill="#FFEB3B"/>
    <path d="M6 8C6 6.89543 6.89543 6 8 6H24C25.1046 6 26 6.89543 26 8V24C26 25.1046 25.1046 26 24 26H8C6.89543 26 6 25.1046 6 24V8Z" fill="#1E40AF"/>
    <path d="M10 12L14 20L18 14L22 20" stroke="#FFEB3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-yellow-300 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative pt-32 pb-16 sm:pt-40 sm:pb-24"
        >
          <div className="text-center">
            <SeekGramLogo />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight"
            >
              <span className="block">Your Gateway to</span>
              <span className="block text-blue-900 mt-2">Kerala's Tech Ecosystem</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
            >
              Discover hackathons, explore engineering colleges, and predict your KEAM rank - all in one place.
              Join Kerala's largest tech community today.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex gap-4 justify-center"
            >
              <Link
                to="/events"
                className="group relative inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full text-yellow-300 bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Explore Events
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/predictor"
                className="inline-flex items-center px-8 py-3 border border-blue-900 text-lg font-medium rounded-full text-blue-900 bg-transparent hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Try KEAM Predictor
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-yellow-200 to-blue-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
    </div>
  );
};

export default Hero;