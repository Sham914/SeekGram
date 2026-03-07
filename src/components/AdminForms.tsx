import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { College, Event, KEAMRankData } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CollegeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<College>) => Promise<void>;
  college?: College | null;
}

export const CollegeForm: React.FC<CollegeFormProps> = ({ isOpen, onClose, onSubmit, college }) => {
  const [formData, setFormData] = useState({
    name: '',
    college_code: '',
    type: 'engineering',
    location: '',
    description: '',
    courses_offered: [] as string[],
    facilities: [] as string[],
    contact_info: {
      phone: '',
      email: '',
      website: ''
    },
    admission_info: {
      requirements: '',
      process: '',
      fees: ''
    },
    rating: 0,
    image_url: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (college) {
      setFormData({
        name: college.name || '',
        college_code: college.college_code || '',
        type: college.type || 'engineering',
        location: college.location || '',
        description: college.description || '',
        courses_offered: college.courses_offered || [],
        facilities: college.facilities || [],
        contact_info: college.contact_info || { phone: '', email: '', website: '' },
        admission_info: college.admission_info || { requirements: '', process: '', fees: '' },
        rating: college.rating || 0,
        image_url: college.image_url || ''
      });
    } else {
      setFormData({
        name: '',
        college_code: '',
        type: 'engineering',
        location: '',
        description: '',
        courses_offered: [],
        facilities: [],
        contact_info: {
          phone: '',
          email: '',
          website: ''
        },
        admission_info: {
          requirements: '',
          process: '',
          fees: ''
        },
        rating: 0,
        image_url: ''
      });
    }
  }, [college]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting college:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{college ? 'Edit College' : 'Add New College'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">College Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">College Code</Label>
              <Input
                value={formData.college_code}
                onChange={(e) => setFormData({ ...formData, college_code: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                  <SelectItem value="commerce">Commerce</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Rating</Label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <Label className="mb-1">Image URL</Label>
              <Input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div>
            <Label className="mb-1">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Contact Phone</Label>
              <Input
                type="tel"
                value={formData.contact_info.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: { ...formData.contact_info, phone: e.target.value }
                })}
              />
            </div>

            <div>
              <Label className="mb-1">Contact Email</Label>
              <Input
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: { ...formData.contact_info, email: e.target.value }
                })}
              />
            </div>
          </div>

          <div>
            <Label className="mb-1">Website</Label>
            <Input
              type="url"
              value={formData.contact_info.website}
              onChange={(e) => setFormData({
                ...formData,
                contact_info: { ...formData.contact_info, website: e.target.value }
              })}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex items-center">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {college ? 'Update College' : 'Add College'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Event>) => Promise<void>;
  event?: Event | null;
}

export const EventForm: React.FC<EventFormProps> = ({ isOpen, onClose, onSubmit, event }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'academic',
    date: '',
    time: '',
    location: '',
    organizer: '',
    contact_info: {
      phone: '',
      email: ''
    },
    registration_required: false,
    max_participants: 0,
    image_url: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        category: event.category || 'academic',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        location: event.location || '',
        organizer: event.organizer || '',
        contact_info: event.contact_info || { phone: '', email: '' },
        registration_required: event.registration_required || false,
        max_participants: event.max_participants || 0,
        image_url: event.image_url || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'academic',
        date: '',
        time: '',
        location: '',
        organizer: '',
        contact_info: {
          phone: '',
          email: ''
        },
        registration_required: false,
        max_participants: 0,
        image_url: ''
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Event Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="workshop">Workshop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1">Date</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Time</Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>

            <div>
              <Label className="mb-1">Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Organizer</Label>
              <Input
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label className="mb-1">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Contact Phone</Label>
              <Input
                type="tel"
                value={formData.contact_info.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: { ...formData.contact_info, phone: e.target.value }
                })}
              />
            </div>

            <div>
              <Label className="mb-1">Contact Email</Label>
              <Input
                type="email"
                value={formData.contact_info.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact_info: { ...formData.contact_info, email: e.target.value }
                })}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.registration_required}
                onChange={(e) => setFormData({ ...formData, registration_required: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Registration Required</span>
            </label>

            {formData.registration_required && (
              <div>
                <Label className="mb-1">Max Participants</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.max_participants}
                  onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                  className="w-32"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex items-center">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {event ? 'Update Event' : 'Add Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface KEAMFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<KEAMRankData>) => Promise<void>;
  keamData?: KEAMRankData | null;
}

export const KEAMForm: React.FC<KEAMFormProps> = ({ isOpen, onClose, onSubmit, keamData }) => {
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    college_name: '',
    course_name: '',
    category: 'general',
    rank_cutoff: 0,
    total_seats: 0,
    fees: 0,
    duration: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (keamData) {
      setFormData({
        year: keamData.year || new Date().getFullYear(),
        college_name: keamData.college_name || '',
        course_name: keamData.course_name || '',
        category: keamData.category || 'general',
        rank_cutoff: keamData.rank_cutoff || 0,
        total_seats: keamData.total_seats || 0,
        fees: keamData.fees || 0,
        duration: keamData.duration || ''
      });
    } else {
      setFormData({
        year: new Date().getFullYear(),
        college_name: '',
        course_name: '',
        category: 'general',
        rank_cutoff: 0,
        total_seats: 0,
        fees: 0,
        duration: ''
      });
    }
  }, [keamData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting KEAM data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{keamData ? 'Edit KEAM Data' : 'Add New KEAM Data'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-1">Year</Label>
              <Input
                type="number"
                min="2020"
                max="2030"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="ews">EWS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1">College Name</Label>
              <Input
                value={formData.college_name}
                onChange={(e) => setFormData({ ...formData, college_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Course Name</Label>
              <Input
                value={formData.course_name}
                onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Rank Cutoff</Label>
              <Input
                type="number"
                min="0"
                value={formData.rank_cutoff}
                onChange={(e) => setFormData({ ...formData, rank_cutoff: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Total Seats</Label>
              <Input
                type="number"
                min="1"
                value={formData.total_seats}
                onChange={(e) => setFormData({ ...formData, total_seats: parseInt(e.target.value) })}
                required
              />
            </div>

            <div>
              <Label className="mb-1">Fees (₹)</Label>
              <Input
                type="number"
                min="0"
                value={formData.fees}
                onChange={(e) => setFormData({ ...formData, fees: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <Label className="mb-1">Duration</Label>
              <Input
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 4 years"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex items-center">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {keamData ? 'Update KEAM Data' : 'Add KEAM Data'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};