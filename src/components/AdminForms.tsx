import React, { useState, useEffect, useRef } from 'react';
import { Save, Search, X, Upload, Image as ImageIcon } from 'lucide-react';
import { College, Event, KEAMRankData, supabase } from '../lib/supabase';
import { useColleges } from '../contexts/CollegesContext';

// Match every word the user typed anywhere in the college name (case-insensitive)
const matchesCollegeSearch = (college: College, query: string): boolean => {
  if (!query.trim()) return true;
  const words = query.trim().toLowerCase().split(/\s+/);
  const name = college.name.toLowerCase();
  const code = college.college_code.toLowerCase();
  return words.every(word => name.includes(word) || code.includes(word));
};
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
  const { colleges } = useColleges();

  const emptyForm = {
    title: '',
    description: '',
    category: 'academic',
    date: '',
    time: '',
    location: '',
    address: '',
    venue: '',
    organizer: '',
    contact_info: { phone: '', email: '' },
    registration_required: false,
    max_participants: 0,
    image_url: ''
  };

  const [formData, setFormData] = useState(emptyForm);
  const [collegeSearch, setCollegeSearch] = useState('');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const collegeSearchRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close college dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (collegeSearchRef.current && !collegeSearchRef.current.contains(e.target as Node)) {
        setShowCollegeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        category: event.category || 'academic',
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        time: event.time || '',
        location: event.location || '',
        address: event.address || '',
        venue: event.venue || event.location || '',
        organizer: event.organizer || '',
        contact_info: event.contact_info || { phone: '', email: '' },
        registration_required: event.registration_required || false,
        max_participants: event.max_participants || 0,
        image_url: event.image_url || ''
      });
      setCollegeSearch('');
      setSelectedCollege(null);
      setImagePreview(event.image_url || null);
      setImageFile(null);
    } else {
      setFormData(emptyForm);
      setCollegeSearch('');
      setSelectedCollege(null);
      setImagePreview(null);
      setImageFile(null);
    }
  }, [event, isOpen]);

  const filteredEventColleges = colleges
    .filter(c => matchesCollegeSearch(c, collegeSearch))
    .slice(0, 8);

  const handleCollegeSelect = (college: College) => {
    setSelectedCollege(college);
    setCollegeSearch(college.name);
    setShowCollegeDropdown(false);
    setFormData(prev => ({
      ...prev,
      location: college.name,
      address: college.name,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadError(null);
  };

  const uploadImage = async (): Promise<string> => {
    // No new file selected — keep whatever URL is already stored
    if (!imageFile) return formData.image_url;
    setImageUploading(true);
    setUploadError(null);
    try {
      const ext = (imageFile.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `events/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from('event-images')
        .upload(path, imageFile, { contentType: imageFile.type, upsert: false });
      if (uploadErr) throw uploadErr;
      const { data: urlData } = supabase.storage
        .from('event-images')
        .getPublicUrl(path);
      return urlData.publicUrl;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      console.error('Image upload failed:', err);
      setUploadError(msg);
      return formData.image_url; // fall back gracefully — form still submits
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrl = await uploadImage();
      await onSubmit({ ...formData, image_url: imageUrl || undefined });
      onClose();
    } catch (error) {
      // uploadImage already set uploadError; other errors surface in console
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

          {/* ── College picker (searchable) ─────────────────────────── */}
          <div ref={collegeSearchRef} className="relative">
            <Label className="mb-1">College</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search college name or code…"
                value={collegeSearch}
                className="pl-9 pr-8"
                onFocus={() => setShowCollegeDropdown(true)}
                onChange={(e) => {
                  setCollegeSearch(e.target.value);
                  setShowCollegeDropdown(true);
                  if (!e.target.value) {
                    setSelectedCollege(null);
                    setFormData(prev => ({ ...prev, location: '', address: '' }));
                  }
                }}
                autoComplete="off"
              />
              {collegeSearch && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setCollegeSearch('');
                    setSelectedCollege(null);
                    setFormData(prev => ({ ...prev, location: '', address: '' }));
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {selectedCollege && (
              <p className="mt-1 text-xs text-blue-600">
                {selectedCollege.college_code} · {selectedCollege.location}
              </p>
            )}
            {showCollegeDropdown && filteredEventColleges.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-52 overflow-y-auto">
                {filteredEventColleges.map(c => (
                  <li
                    key={c.id}
                    onMouseDown={(e) => { e.preventDefault(); handleCollegeSelect(c); }}
                    className="px-3 py-2 cursor-pointer hover:bg-blue-50 text-sm"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="ml-2 text-xs text-gray-400">{c.college_code}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ── Basic info row ──────────────────────────────────────── */}
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
              <Label className="mb-1">Venue <span className="text-gray-400 font-normal text-xs">(specific location within college)</span></Label>
              <Input
                placeholder="e.g., Main Auditorium, AB Block"
                value={formData.venue}
                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
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

          {/* ── Description ─────────────────────────────────────────── */}
          <div>
            <Label className="mb-1">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* ── Image upload ─────────────────────────────────────────── */}
          <div>
            <Label className="mb-1">Event Image</Label>
            <div className="flex items-start gap-3">
              {imagePreview ? (
                <div className="relative w-24 h-16 rounded overflow-hidden border border-gray-200 flex-shrink-0">
                  <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-0.5 right-0.5 bg-black/50 rounded-full p-0.5 text-white hover:bg-black/70"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                      setFormData(prev => ({ ...prev, image_url: '' }));
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-16 rounded border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-6 h-6 text-gray-300" />
                </div>
              )}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </Button>
                <p className="mt-1 text-xs text-gray-400">PNG, JPG or WebP · </p>
                {uploadError && (
                  <p className="mt-1 text-xs text-red-500">Upload failed: {uploadError}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Contact ──────────────────────────────────────────────── */}
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

          {/* ── Registration ─────────────────────────────────────────── */}
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
            <Button type="submit" disabled={loading || imageUploading} className="flex items-center">
              {loading || imageUploading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {imageUploading ? 'Uploading…' : event ? 'Update Event' : 'Add Event'}
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
  const { colleges } = useColleges();
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    college_code: '',
    college_name: '',
    course_name: '',
    category: 'general',
    rank_cutoff: 0,
    total_seats: 0,
    fees: 0,
    duration: ''
  });

  const [collegeSearch, setCollegeSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (keamData) {
      setFormData({
        year: keamData.year || new Date().getFullYear(),
        college_code: keamData.college_code || '',
        college_name: keamData.college_name || '',
        course_name: keamData.course_name || '',
        category: keamData.category || 'general',
        rank_cutoff: keamData.rank_cutoff || 0,
        total_seats: keamData.total_seats || 0,
        fees: keamData.fees || 0,
        duration: keamData.duration || ''
      });
      setCollegeSearch(keamData.college_name || '');
    } else {
      setFormData({
        year: new Date().getFullYear(),
        college_code: '',
        college_name: '',
        course_name: '',
        category: 'general',
        rank_cutoff: 0,
        total_seats: 0,
        fees: 0,
        duration: ''
      });
      setCollegeSearch('');
    }
  }, [keamData]);

  const filteredColleges = colleges.filter(c => matchesCollegeSearch(c, collegeSearch)).slice(0, 8);

  const handleCollegeSelect = (college: College) => {
    setFormData(prev => ({ ...prev, college_code: college.college_code, college_name: college.name }));
    setCollegeSearch(college.name);
    setShowDropdown(false);
  };

  const handleCollegeSearchChange = (value: string) => {
    setCollegeSearch(value);
    setShowDropdown(true);
    // Clear selection if user edits manually
    if (formData.college_name && value !== formData.college_name) {
      setFormData(prev => ({ ...prev, college_code: '', college_name: '' }));
    }
  };

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

            {/* College search — spans both columns */}
            <div className="col-span-1 md:col-span-2" ref={searchRef}>
              <Label className="mb-1">College</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <Input
                  className="pl-9 pr-9"
                  placeholder="Search by college name or code…"
                  value={collegeSearch}
                  onChange={(e) => handleCollegeSearchChange(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  required
                />
                {collegeSearch && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setCollegeSearch('');
                      setFormData(prev => ({ ...prev, college_code: '', college_name: '' }));
                      setShowDropdown(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                {showDropdown && collegeSearch.length > 0 && filteredColleges.length > 0 && (
                  <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-y-auto">
                    {filteredColleges.map(college => (
                      <li
                        key={college.college_code}
                        className="flex items-center justify-between px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm"
                        onMouseDown={(e) => { e.preventDefault(); handleCollegeSelect(college); }}
                      >
                        <span className="text-gray-800 truncate">{college.name}</span>
                        <span className="ml-2 shrink-0 text-xs font-mono bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{college.college_code}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Auto-filled code badge */}
              {formData.college_code && (
                <p className="mt-1 text-xs text-gray-500">
                  College code: <span className="font-mono font-semibold text-blue-600">{formData.college_code}</span>
                </p>
              )}
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