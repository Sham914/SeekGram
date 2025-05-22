import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { PlusCircle, Edit, Trash, Save, X, Calendar, School, MessageSquare, Check, XCircle } from 'lucide-react';
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
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showPredictionModal, setShowPredictionModal] = useState(false);
  
  // Form states
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [editForm, setEditForm] = useState<Partial<College>>({});
  const [eventForm, setEventForm] = useState<Partial<Event>>({});
  const [predictionForm, setPredictionForm] = useState<Partial<Prediction>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [collegesData, eventsData, predictionsData, reviewsData] = await Promise.all([
        supabase.from('colleges').select('*'),
        supabase.from('college_events').select('*'),
        supabase.from('keam_predictions').select('*'),
        supabase.from('college_reviews').select(`
          *,
          colleges (name),
          profiles (full_name, email)
        `).order('created_at', { ascending: false })
      ]);

      setColleges(collegesData.data || []);
      setEvents(eventsData.data || []);
      setPredictions(predictionsData.data || []);
      setReviews(reviewsData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reviews Management */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Review Management
              </h2>
            </div>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {review.profiles?.full_name} - {review.colleges?.name}
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
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleReviewAction(review.id, 'reject')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
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