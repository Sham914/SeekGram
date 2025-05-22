import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Calendar, Award, Globe, Users, GraduationCap, CheckCircle2, Star, Send, User } from 'lucide-react';
import { motion } from 'framer-motion';

const CollegeDetails = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [newReview, setNewReview] = useState({
    course: '',
    review_text: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchCollege();
    fetchReviews();
    checkUser();
  }, [id]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

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

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('college_reviews')
        .select('*, auth_users:user_id (email)')
        .eq('college_id', id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const { error } = await supabase
        .from('college_reviews')
        .insert([
          {
            college_id: id,
            user_id: user.id,
            ...newReview
          }
        ]);

      if (error) throw error;

      setNewReview({ course: '', review_text: '' });
      setSubmitMessage('Your review has been submitted and is pending approval.');
      await fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
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

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <Star className="h-6 w-6 text-yellow-400 mr-2" />
            Student Reviews
          </h2>

          {/* Review Form */}
          {user ? (
            <div className="mb-8 bg-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Your Experience</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Studied
                  </label>
                  <select
                    value={newReview.course}
                    onChange={(e) => setNewReview({ ...newReview, course: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select your course</option>
                    {college?.courses?.map((course) => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.review_text}
                    onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Share your honest experience..."
                    required
                  />
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  <p>Please ensure your review is honest and constructive. False or defamatory statements may be subject to legal action under IPC Section 499.</p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {submitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Submit Review
                </button>

                {submitMessage && (
                  <p className="mt-2 text-sm text-indigo-600">{submitMessage}</p>
                )}
              </form>
            </div>
          ) : (
            <div className="mb-8 bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-gray-600">Please sign in to share your review.</p>
              <a
                href="/auth"
                className="inline-block mt-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Sign In
              </a>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {review.auth_users?.email.split('@')[0] || 'Anonymous'}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-indigo-600 mt-1">{review.course}</p>
                    <p className="mt-2 text-gray-600">{review.review_text}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {reviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to share your experience!
              </div>
            )}
          </div>
        </div>

        {/* Visit Website Button */}
        <div className="flex justify-center">
          <a
            href={college?.website}
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