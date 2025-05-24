import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlusCircle, Edit, Calendar, School, MessageSquare, Check, XCircle } from 'lucide-react';
import type { Database } from '../lib/database.types';

type College = Database['public']['Tables']['colleges']['Row'];
type Event = Database['public']['Tables']['college_events']['Row'];
type Prediction = Database['public']['Tables']['keam_predictions']['Row'];
type Review = Database['public']['Tables']['college_reviews']['Row'];

const collegeTypes = ['Government', 'Government Aided', 'Self Financing'] as const;
const districts = ['Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'] as const;
const categories = ['General', 'SC', 'ST', 'OBC', 'OEC'] as const;
const branches = ['Computer Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil'] as const;

export default function AdminPanel() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);

      const [collegesData, eventsData, predictionsData, reviewsData] = await Promise.all([
        supabase.from('colleges').select('*').order('ranking->kerala'),
        supabase.from('college_events').select('*').order('event_date', { ascending: true }),
        supabase.from('keam_predictions').select('*'),
        supabase.from('college_reviews').select(`
          *,
          colleges (name),
          profiles:user_id (full_name, email)
        `).order('created_at', { ascending: false })
      ]);

      if (collegesData.error) throw new Error(collegesData.error.message);
      if (eventsData.error) throw new Error(eventsData.error.message);
      if (predictionsData.error) throw new Error(predictionsData.error.message);
      if (reviewsData.error) throw new Error(reviewsData.error.message);

      setColleges(collegesData.data || []);
      setEvents(eventsData.data || []);
      setPredictions(predictionsData.data || []);
      setReviews(reviewsData.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleReviewAction = async (reviewId: string, action: 'approve' | 'reject') => {
    try {
      const { error } = await supabase
        .from('college_reviews')
        .update({
          status: action === 'approve' ? 'approved' : 'rejected',
          approved_at: action === 'approve' ? new Date().toISOString() : null,
          approved_by: action === 'approve' ? (await supabase.auth.getUser()).data.user?.id : null
        })
        .eq('id', reviewId);

      if (error) throw error;
      await fetchData();
    } catch (err) {
      console.error('Error updating review:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while updating the review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => fetchData()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colleges Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <School className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Colleges</h2>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {colleges.length} Total
              </span>
            </div>
            <div className="space-y-4">
              {colleges.slice(0, 5).map((college) => (
                <div key={college.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{college.name}</p>
                    <p className="text-sm text-gray-500">{college.location}</p>
                  </div>
                  <Edit className="h-4 w-4 text-gray-400 hover:text-indigo-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Events Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Upcoming Events</h2>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {events.length} Events
              </span>
            </div>
            <div className="space-y-4">
              {events.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  </div>
                  <Edit className="h-4 w-4 text-gray-400 hover:text-indigo-600 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Management */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold">Review Management</h2>
              </div>
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {reviews.filter(r => r.status === 'pending').length} Pending
              </span>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {review.profiles?.full_name || review.profiles?.email?.split('@')[0]} - {review.colleges?.name}
                      </h3>
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        review.status === 'approved' ? 'bg-green-100 text-green-800' :
                        review.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.course}</p>
                    <p className="text-gray-600 mt-2">{review.review_text}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Submitted on {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {review.status === 'pending' && (
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => handleReviewAction(review.id, 'approve')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleReviewAction(review.id, 'reject')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No reviews to manage.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}