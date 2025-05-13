import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Calendar, Award, Globe, Users, GraduationCap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-[#F8F9FE] pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[300px] bg-gray-900 rounded-2xl overflow-hidden">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white">{college.name}</h1>
            <div className="flex items-center text-gray-300 mt-2">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{college.location}, {college.district}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {college.name} is a prestigious engineering institution established in {college.established}. 
            Located in {college.location}, {college.district}, it has consistently maintained high academic 
            standards and produced numerous successful engineers. The college offers a comprehensive range 
            of engineering programs and is known for its excellent infrastructure, experienced faculty, 
            and strong industry connections.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-[#F8F9FE] rounded-xl">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Established</p>
                <p className="font-semibold">{college.established}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#F8F9FE] rounded-xl">
              <Globe className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-semibold">{college.type}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#F8F9FE] rounded-xl">
              <Award className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Ranking</p>
                <p className="font-semibold">#{college.ranking?.kerala} in Kerala</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-[#F8F9FE] rounded-xl">
              <Users className="h-6 w-6 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Total Intake</p>
                <p className="font-semibold">{college.intake?.total}+ Students</p>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Accreditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-[#F8F9FE] rounded-xl">
              <h3 className="text-lg font-semibold mb-2">NAAC Grade</h3>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-indigo-600">
                  {college.accreditation?.naac?.grade}
                </span>
                <span className="ml-2 text-gray-500">
                  (Score: {college.accreditation?.naac?.score})
                </span>
              </div>
            </div>
            <div className="p-6 bg-[#F8F9FE] rounded-xl">
              <h3 className="text-lg font-semibold mb-2">NBA Accreditation</h3>
              <div className="flex items-center text-indigo-600">
                <CheckCircle2 className="h-6 w-6 mr-2" />
                <span>NBA Accredited</span>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(college.intake?.branches || {}).map(([branch, seats]) => (
              <div key={branch} className="flex items-center p-4 bg-[#F8F9FE] rounded-xl">
                <GraduationCap className="h-6 w-6 text-indigo-600 mr-3" />
                <div>
                  <p className="font-medium">{branch}</p>
                  <p className="text-sm text-gray-500">{seats} seats</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Campus Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {college.facilities?.map((facility, index) => (
              <div key={index} className="flex items-center p-4 bg-[#F8F9FE] rounded-xl">
                <div className="text-indigo-600 mr-3">›</div>
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Statistics */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Placement Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F8F9FE] rounded-xl text-center">
              <p className="text-gray-500 mb-2">Average Package</p>
              <p className="text-3xl font-bold text-indigo-600">
                ₹{college.placement?.averagePackage}L
              </p>
            </div>
            <div className="p-6 bg-[#F8F9FE] rounded-xl text-center">
              <p className="text-gray-500 mb-2">Highest Package</p>
              <p className="text-3xl font-bold text-indigo-600">
                ₹{college.placement?.highestPackage}L
              </p>
            </div>
            <div className="p-6 bg-[#F8F9FE] rounded-xl text-center">
              <p className="text-gray-500 mb-2">Placement Rate</p>
              <p className="text-3xl font-bold text-indigo-600">
                {college.placement?.placementPercentage}%
              </p>
            </div>
          </div>
        </div>

        {/* Visit Website Button */}
        <div className="flex justify-center">
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Globe className="h-5 w-5 mr-2" />
            Visit College Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;