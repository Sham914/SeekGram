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

@@ -16,6 +17,7 @@ export default function AdminPanel() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
@@ -36,405 +38,47 @@ export default function AdminPanel() {
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
        supabase.from('keam_predictions').select('*')
        supabase.from('keam_predictions').select('*'),
        supabase.from('college_reviews').select(`
          *,
          colleges (name),
          profiles:user_id (full_name, email)
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

  const handleSaveEvent = async () => {
  const handleReviewAction = async (reviewId: string, action: 'approve' | 'reject') => {
    try {
      if (!eventForm.title || !eventForm.event_date || !eventForm.venue) {
        alert('Please fill in all required fields');
        return;
      }

      const { error } = await supabase
        .from('college_events')
        .insert([eventForm]);
      
      if (error) throw error;

      await fetchData();
      setShowEventModal(false);
      setEventForm({});
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };
        .from('college_reviews')
        .update({
          status: action === 'approve' ? 'approved' : 'rejected',
          approved_at: action === 'approve' ? new Date().toISOString() : null,
          approved_by: action === 'approve' ? (await supabase.auth.getUser()).data.user?.id : null
        })
        .eq('id', reviewId);

  const handleSavePrediction = async () => {
    try {
      if (!predictionForm.year || !predictionForm.phase || !predictionForm.college_id || 
          !predictionForm.branch || !predictionForm.category || 
          !predictionForm.opening_rank || !predictionForm.closing_rank) {
        alert('Please fill in all required fields');
        return;
      }

      const { error } = await supabase
        .from('keam_predictions')
        .insert([predictionForm]);
      
      if (error) throw error;

      await fetchData();
      setShowPredictionModal(false);
      setPredictionForm({});
    } catch (error) {
      console.error('Error saving prediction:', error);
    }
  };

  const handleEdit = (college: College) => {
    setSelectedCollege(college);
    setEditForm(college);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setEditForm({});
    setShowAddModal(true);
  };

  const handleSave = async () => {
    try {
      if (showAddModal) {
        const { error } = await supabase
          .from('colleges')
          .insert([editForm]);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('colleges')
          .update(editForm)
          .eq('id', selectedCollege?.id);
        
        if (error) throw error;
      }

      await fetchData();
      setShowEditModal(false);
      setShowAddModal(false);
      setSelectedCollege(null);
      setEditForm({});
    } catch (error) {
      console.error('Error saving college:', error);
      console.error('Error updating review:', error);
    }
  };
 if (loading) {
  const CollegeForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={editForm.name || ''}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={editForm.location || ''}
          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">District</label>
        <select
          value={editForm.district || ''}
          onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={editForm.type || ''}
          onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Type</option>
          {collegeTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Established Year</label>
        <input
          type="number"
          value={editForm.established || ''}
          onChange={(e) => setEditForm({ ...editForm, established: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input
          type="url"
          value={editForm.website || ''}
          onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={editForm.image || ''}
          onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Courses (comma-separated)</label>
        <input
          type="text"
          value={editForm.courses?.join(', ') || ''}
          onChange={(e) => setEditForm({ ...editForm, courses: e.target.value.split(',').map(s => s.trim()) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Facilities (comma-separated)</label>
        <input
          type="text"
          value={editForm.facilities?.join(', ') || ''}
          onChange={(e) => setEditForm({ ...editForm, facilities: e.target.value.split(',').map(s => s.trim()) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Ranking (JSON)</label>
        <textarea
          value={JSON.stringify(editForm.ranking || {}, null, 2)}
          onChange={(e) => {
            try {
              setEditForm({ ...editForm, ranking: JSON.parse(e.target.value) });
            } catch (error) {
              // Invalid JSON, ignore
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Placement (JSON)</label>
        <textarea
          value={JSON.stringify(editForm.placement || {}, null, 2)}
          onChange={(e) => {
            try {
              setEditForm({ ...editForm, placement: JSON.parse(e.target.value) });
            } catch (error) {
              // Invalid JSON, ignore
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>
    </div>
  );
 }
  const EventForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          value={eventForm.title || ''}
          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={eventForm.description || ''}
          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Venue</label>
        <input
          type="text"
          value={eventForm.venue || ''}
          onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Date</label>
        <input
          type="datetime-local"
          value={eventForm.event_date || ''}
          onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Expected Participants</label>
        <input
          type="number"
          value={eventForm.expected_participants || ''}
          onChange={(e) => setEventForm({ ...eventForm, expected_participants: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={eventForm.image || ''}
          onChange={(e) => setEventForm({ ...eventForm, image: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const PredictionForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <input
          type="number"
          value={predictionForm.year || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, year: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phase</label>
        <input
          type="number"
          value={predictionForm.phase || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, phase: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">College</label>
        <select
          value={predictionForm.college_id || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, college_id: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select College</option>
          {colleges.map(college => (
            <option key={college.id} value={college.id}>{college.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Branch</label>
        <select
          value={predictionForm.branch || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, branch: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Branch</option>
          {branches.map(branch => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={predictionForm.category || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, category: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Opening Rank</label>
        <input
          type="number"
          value={predictionForm.opening_rank || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, opening_rank: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Closing Rank</label>
        <input
          type="number"
          value={predictionForm.closing_rank || ''}
          onChange={(e) => setPredictionForm({ ...predictionForm, closing_rank: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );

  const Modal = ({ show, title, onClose, children }: { show: boolean; title: string; onClose: () => void; children: React.ReactNode }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };
  // Previous component definitions (CollegeForm, EventForm, PredictionForm, Modal) remain the same

  if (loading) {
    return (
@@ -449,240 +93,68 @@ export default function AdminPanel() {
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colleges Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Colleges</h2>
              <button 
                onClick={() => {
                  setShowAddModal(true);
                  setEditForm({});
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {colleges.map((college) => (
                <div key={college.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span>{college.name}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedCollege(college);
                        setEditForm(college);
                        setShowEditModal(true);
                      }}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Previous management cards (Colleges, Events, KEAM Predictions) remain the same */}

          {/* Events Management */}
          <div className="bg-white rounded-lg shadow p-6">
          {/* Reviews Management */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Events</h2>
              <button 
                onClick={() => {
                  setShowEventModal(true);
                  setEventForm({});
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <PlusCircle className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-semibold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Review Management
              </h2>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{event.title}</span>
                    <div className="text-sm text-gray-500">
                      {new Date(event.event_date).toLocaleDateString()}
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
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setEventForm(event);
                        setShowEventModal(true);
                      }}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
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
            </div>
          </div>

          {/* KEAM Predictions Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">KEAM Predictions</h2>
              <button 
                onClick={() => {
                  setShowPredictionModal(true);
                  setPredictionForm({});
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                <PlusCircle className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">
                      {colleges.find(c => c.id === prediction.college_id)?.name}
                    </span>
                    <div className="text-sm text-gray-500">
                      {prediction.branch} - {prediction.category}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setPredictionForm(prediction);
                        setShowPredictionModal(true);
                      }}
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
              {reviews.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No reviews to manage.
                </div>
              ))}
              )}
            </div>
          </div>
        </div>

        {/* Event Modal */}
        <Modal 
          show={showEventModal} 
          title={eventForm.id ? "Edit Event" : "Add New Event"}
          onClose={() => {
            setShowEventModal(false);
            setEventForm({});
          }}
        >
          <EventForm />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowEventModal(false);
                setEventForm({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEvent}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {eventForm.id ? "Save Changes" : "Add Event"}
            </button>
          </div>
        </Modal>

        {/* Prediction Modal */}
        <Modal 
          show={showPredictionModal} 
          title={predictionForm.id ? "Edit Prediction" : "Add New Prediction"}
          onClose={() => {
            setShowPredictionModal(false);
            setPredictionForm({});
          }}
        >
          <PredictionForm />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowPredictionModal(false);
                setPredictionForm({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSavePrediction}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {predictionForm.id ? "Save Changes" : "Add Prediction"}
            </button>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal 
          show={showEditModal} 
          title="Edit College"
          onClose={() => {
            setShowEditModal(false);
            setSelectedCollege(null);
            setEditForm({});
          }}
        >
          <CollegeForm />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowEditModal(false);
                setSelectedCollege(null);
                setEditForm({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </Modal>

        {/* Add Modal */}
        <Modal 
          show={showAddModal} 
          title="Add New College"
          onClose={() => {
            setShowAddModal(false);
            setEditForm({});
          }}
        >
          <CollegeForm />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAddModal(false);
                setEditForm({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add College
            </button>
          </div>
        </Modal>
        {/* Previous modals (CollegeForm, EventForm, PredictionForm) remain the same */}
      </div>
    </div>
  );
}
