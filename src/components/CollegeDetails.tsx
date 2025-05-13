import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Building2, MapPin, Calendar, Award, Globe, Users, BookOpen, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample college images - in production, these would come from the database
  const collegeImages = [
    'https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg',
    'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg',
    'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
  ];

  useEffect(() => {
    fetchCollege();
  }, [id]);

  const fetchCollege = async () => {
    try {
      const { data, error } = await supabase
        .from('colleges')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCollege(data);
    } catch (error) {
      console.error('Error fetching college:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % collegeImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + collegeImages.length) % collegeImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">College not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Image Slideshow */}
          <div className="relative h-96">
            <img
              src={collegeImages[currentImageIndex]}
              alt={`${college.name} - View ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {collegeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">{college.name}</h1>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {college.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>{college.location}, {college.district}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>Established in {college.established}</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Award className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>Rank #{college.ranking?.kerala} in Kerala</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Users className="h-5 w-5 text-indigo-600 mr-3" />
                  <span>{college.intake?.total}+ Students</span>
                </div>

                <div className="flex items-center text-gray-700">
                  <Globe className="h-5 w-5 text-indigo-600 mr-3" />
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Visit College Website
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {college.accreditation && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Accreditation</h3>
                    <div className="space-y-2">
                      {college.accreditation.naac && (
                        <p>NAAC Grade: {college.accreditation.naac.grade} ({college.accreditation.naac.score})</p>
                      )}
                      {college.accreditation.nba && <p>NBA Accredited</p>}
                    </div>
                  </div>
                )}

                {college.placement && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Placement Statistics</h3>
                    <div className="space-y-2">
                      <p>Average Package: ₹{college.placement.averagePackage}L</p>
                      <p>Highest Package: ₹{college.placement.highestPackage}L</p>
                      <p>Placement Rate: {college.placement.placementPercentage}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 text-indigo-600 mr-2" />
                  Courses Offered
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {college.courses?.map((course, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-gray-700">
                      {course}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Home className="h-6 w-6 text-indigo-600 mr-2" />
                  Facilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {college.facilities?.map((facility, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg text-gray-700">
                      {facility}
                    </div>
                  ))}
                </div>
              </div>

              {college.intake?.branches && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 text-indigo-600 mr-2" />
                    Branch-wise Intake
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(college.intake.branches).map(([branch, seats]) => (
                      <div key={branch} className="bg-gray-50 p-3 rounded-lg">
                        <p className="font-medium text-gray-900">{branch}</p>
                        <p className="text-gray-600">{seats} seats</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollegeDetails;