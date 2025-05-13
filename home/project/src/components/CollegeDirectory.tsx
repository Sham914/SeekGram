import React from 'react';
import { Search, MapPin, Users, Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const colleges = [
  {
    id: 1,
    name: 'College of Engineering Trivandrum',
    location: 'Thiruvananthapuram',
    established: 1939,
    students: '3500+',
    ranking: '#1 in Kerala',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  },
  {
    id: 2,
    name: 'TKM College of Engineering',
    location: 'Kollam',
    established: 1958,
    students: '3000+',
    ranking: '#2 in Kerala',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  },
  {
    id: 3,
    name: 'Government Engineering College Thrissur',
    location: 'Thrissur',
    established: 1957,
    students: '2800+',
    ranking: '#3 in Kerala',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  },
];

const CollegeDirectory = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Engineering Colleges
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Explore top engineering colleges in Kerala
          </p>
        </motion.div>

        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-indigo-600">
                  Est. {college.established}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{college.name}</h3>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{college.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{college.students} Students</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500">
                    <Award className="h-5 w-5 mr-2" />
                    <span>{college.ranking}</span>
                  </div>
                </div>
                
                <button className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
                  Visit College Portal
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeDirectory;