'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function AddDoctor() {
  const [formData, setFormData] = useState({
    name: '',
    designation: 'General Practitioner',
    experience: '',
    qualifications: '',
    location: 'Hyderabad',
    facility: 'Apollo 24|7 Clinic',
    region: 'Telangana',
    fees: '',
    cashback: '',
    languages: 'English',
    consultMode: 'Online Consult',
    rating: '',
    patientCount: '',
    availableIn: '5',
    profileImage: '/placeholder-doctor.png',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'qualifications' || name === 'languages' || name === 'consultMode') {
      // Handle comma-separated values for arrays
      setFormData({
        ...formData,
        [name]: value, // We'll split this before submission
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setStatus({ loading: true, success: null, error: null });
      
      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        experience: parseInt(formData.experience, 10),
        fees: parseInt(formData.fees, 10),
        cashback: parseInt(formData.cashback, 10) || 0,
        rating: parseInt(formData.rating, 10) || 0,
        patientCount: parseInt(formData.patientCount, 10) || 0,
        availableIn: parseInt(formData.availableIn, 10) || 5,
        qualifications: formData.qualifications.split(',').map(q => q.trim()),
        languages: formData.languages.split(',').map(l => l.trim()),
        consultMode: formData.consultMode.split(',').map(m => m.trim()),
      };

      const response = await fetch('/api/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add doctor');
      }

      setStatus({
        loading: false,
        success: 'Doctor added successfully!',
        error: null,
      });
      
      // Reset form
      setFormData({
        name: '',
        designation: 'General Practitioner',
        experience: '',
        qualifications: '',
        location: 'Hyderabad',
        facility: 'Apollo 24|7 Clinic',
        region: 'Telangana',
        fees: '',
        cashback: '',
        languages: 'English',
        consultMode: 'Online Consult',
        rating: '',
        patientCount: '',
        availableIn: '5',
        profileImage: '/placeholder-doctor.png',
      });
      
    } catch (error) {
      setStatus({
        loading: false,
        success: null,
        error: error.message,
      });
    }
  };

  return (
    <div>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Doctor</h1>
        
        {status.success && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
            <p>{status.success}</p>
          </div>
        )}
        
        {status.error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{status.error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Doctor Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                Designation
              </label>
              <input
                id="designation"
                name="designation"
                type="text"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Experience (Years) *
              </label>
              <input
                id="experience"
                name="experience"
                type="number"
                required
                min="0"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications * (comma separated)
              </label>
              <input
                id="qualifications"
                name="qualifications"
                type="text"
                required
                placeholder="MBBS, MD, etc."
                value={formData.qualifications}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="facility" className="block text-sm font-medium text-gray-700 mb-1">
                Facility
              </label>
              <input
                id="facility"
                name="facility"
                type="text"
                value={formData.facility}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <input
                id="region"
                name="region"
                type="text"
                value={formData.region}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="fees" className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Fees (₹) *
              </label>
              <input
                id="fees"
                name="fees"
                type="number"
                required
                min="0"
                value={formData.fees}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="cashback" className="block text-sm font-medium text-gray-700 mb-1">
                Cashback Amount (₹)
              </label>
              <input
                id="cashback"
                name="cashback"
                type="number"
                min="0"
                value={formData.cashback}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
                Languages (comma separated)
              </label>
              <input
                id="languages"
                name="languages"
                type="text"
                placeholder="English, Hindi, etc."
                value={formData.languages}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="consultMode" className="block text-sm font-medium text-gray-700 mb-1">
                Consultation Mode (comma separated)
              </label>
              <input
                id="consultMode"
                name="consultMode"
                type="text"
                placeholder="Online Consult, Hospital Visit"
                value={formData.consultMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating (0-100)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="100"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="patientCount" className="block text-sm font-medium text-gray-700 mb-1">
                Patient Count
              </label>
              <input
                id="patientCount"
                name="patientCount"
                type="number"
                min="0"
                value={formData.patientCount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="availableIn" className="block text-sm font-medium text-gray-700 mb-1">
                Available In (minutes)
              </label>
              <input
                id="availableIn"
                name="availableIn"
                type="number"
                min="1"
                value={formData.availableIn}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                id="profileImage"
                name="profileImage"
                type="text"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={status.loading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                status.loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status.loading ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}