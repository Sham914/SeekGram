import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Phone, MapPin, GraduationCap, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../contexts/AuthContext';
import { profileService } from '../lib/supabase';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: (location.state && location.state.fullName) || '',
    phone: '',
    email: user?.email || '',
    profession: '',
    qualification: '',
    city: '',
    pincode: '',
    ugCollege: '',
    ugBranch: '',
    ugYear: '',
    pgCollege: '',
    pgBranch: '',
    pgYear: '',
    consent: false
  });

  const professions = [
    { value: 'student', label: 'Student' },
    { value: 'software_engineer', label: 'Software Engineer' },
    { value: 'data_scientist', label: 'Data Scientist' },
    { value: 'product_manager', label: 'Product Manager' },
    { value: 'designer', label: 'Designer' },
    { value: 'entrepreneur', label: 'Entrepreneur' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'other', label: 'Other' }
  ];

  const qualifications = [
    { value: 'plus_two', label: '+2 / 12th Standard' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'ug', label: 'Undergraduate (UG)' },
    { value: 'pg', label: 'Postgraduate (PG)' },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' }
  ];

  const branches = [
    { value: 'computer_science', label: 'Computer Science Engineering' },
    { value: 'electronics', label: 'Electronics & Communication' },
    { value: 'mechanical', label: 'Mechanical Engineering' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'electrical', label: 'Electrical Engineering' },
    { value: 'chemical', label: 'Chemical Engineering' },
    { value: 'information_technology', label: 'Information Technology' },
    { value: 'other', label: 'Other' }
  ];

  const years = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2019', label: '2019' },
    { value: '2018', label: '2018' },
    { value: '2017', label: '2017' },
    { value: '2016', label: '2016' },
    { value: '2015', label: '2015' },
    { value: 'other', label: 'Other' }
  ];

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to complete your profile.</p>
            <Button asChild className="h-11">
              <Link to="/login">Go to Login</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    setError('');

    try {
      const profileData = {
        user_id: user.id,
        full_name: formData.fullName,
        phone: formData.phone,
        profession: formData.profession,
        qualification: formData.qualification,
        city: formData.city || '',
        pincode: formData.pincode || '',
        ug_college: formData.ugCollege || undefined,
        ug_branch: formData.ugBranch || undefined,
        ug_year: formData.ugYear || undefined,
        pg_college: formData.pgCollege || undefined,
        pg_branch: formData.pgBranch || undefined,
        pg_year: formData.pgYear || undefined,
        consent: formData.consent
      };

      // Check if profile exists first
      const { data: existingProfile } = await profileService.getProfile(user.id);
      
      let result;
      if (existingProfile) {
        // Update existing profile
        result = await profileService.updateProfile(user.id, profileData);
      } else {
        // Create new profile
        result = await profileService.createProfile(profileData);
      }
      
      if (result.error) {
        setError(result.error.message || 'Failed to save profile');
      } else {
        navigate('/', { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving your profile');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      fullName: '',
      phone: '',
      email: user?.email || '',
      profession: '',
      qualification: '',
      city: '',
      pincode: '',
      ugCollege: '',
      ugBranch: '',
      ugYear: '',
      pgCollege: '',
      pgBranch: '',
      pgYear: '',
      consent: false
    });
  };

  const showUGFields = formData.qualification === 'ug' || formData.qualification === 'pg';
  const showPGFields = formData.qualification === 'pg';

  const isFormValid = formData.fullName && formData.phone && formData.email && formData.profession && formData.qualification;
  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Complete Your Profile
          </h1>
          <p className="text-base sm:text-xl text-gray-600">
            Help us personalize your SeekGram experience
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-sm font-medium">
                <Check className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Account Created</span>
            </div>
            <div className="w-16 h-1 bg-[#2563EB] rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Profile Setup</span>
            </div>
            <div className="w-16 h-1 bg-gray-200 rounded"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-600">Complete</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="mb-1">Full Name *</Label>
                  <Input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="h-11 mt-1"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-1">Phone Number *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="pl-10 h-11"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="h-11 mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="mb-1">City *</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="h-11 mt-1"
                    placeholder="Enter your city"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="mb-1">Pincode *</Label>
                  <Input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="h-11 mt-1"
                    placeholder="Enter your pincode"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Professional Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profession" className="mb-1">Profession *</Label>
                  <Select
                    value={formData.profession}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, profession: value }))}
                    disabled={loading}
                    required
                  >
                    <SelectTrigger id="profession" className="w-full h-11 mt-1">
                      <SelectValue placeholder="Select your profession" />
                    </SelectTrigger>
                    <SelectContent>
                      {professions.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="qualification" className="mb-1">Highest Qualification *</Label>
                  <Select
                    value={formData.qualification}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, qualification: value }))}
                    disabled={loading}
                    required
                  >
                    <SelectTrigger id="qualification" className="w-full h-11 mt-1">
                      <SelectValue placeholder="Select your qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualifications.map(q => (
                        <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Educational Information */}
            {showUGFields && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Undergraduate Details
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ugCollege" className="mb-1">College Name</Label>
                    <Input
                      type="text"
                      id="ugCollege"
                      name="ugCollege"
                      value={formData.ugCollege}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="h-11 mt-1"
                      placeholder="Enter your college name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ugBranch" className="mb-1">Branch</Label>
                    <Select
                      value={formData.ugBranch}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, ugBranch: value }))}
                      disabled={loading}
                    >
                      <SelectTrigger id="ugBranch" className="w-full h-11 mt-1">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map(b => (
                          <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="ugYear" className="mb-1">Passing Year</Label>
                    <Select
                      value={formData.ugYear}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, ugYear: value }))}
                      disabled={loading}
                    >
                      <SelectTrigger id="ugYear" className="w-full h-11 mt-1">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(y => (
                          <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Postgraduate Information */}
            {showPGFields && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Postgraduate Details
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pgCollege" className="mb-1">College Name</Label>
                    <Input
                      type="text"
                      id="pgCollege"
                      name="pgCollege"
                      value={formData.pgCollege}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="h-11 mt-1"
                      placeholder="Enter your college name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pgBranch" className="mb-1">Branch</Label>
                    <Select
                      value={formData.pgBranch}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, pgBranch: value }))}
                      disabled={loading}
                    >
                      <SelectTrigger id="pgBranch" className="w-full h-11 mt-1">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map(b => (
                          <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pgYear" className="mb-1">Passing Year</Label>
                    <Select
                      value={formData.pgYear}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, pgYear: value }))}
                      disabled={loading}
                    >
                      <SelectTrigger id="pgYear" className="w-full h-11 mt-1">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(y => (
                          <SelectItem key={y.value} value={y.value}>{y.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Consent */}
            <div className="mb-8">
              <div className="flex items-center">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB] border-gray-300 rounded"
                />
                <Label htmlFor="consent" className="ml-2 text-gray-700 cursor-pointer">
                  I consent to SeekGram using my information to provide personalized recommendations and updates about relevant tech events, colleges, and opportunities. *
                </Label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                type="submit"
                disabled={loading || !isFormValid}
                className="flex-1 h-11 font-semibold shadow-lg hover:shadow-xl"
              >
                {loading ? 'Creating Profile...' : 'Complete Profile'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
                disabled={loading}
                className="flex-1 sm:flex-initial h-11 font-semibold"
              >
                Clear Form
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;