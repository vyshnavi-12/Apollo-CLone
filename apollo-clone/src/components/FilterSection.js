'use client';
import React, { useState } from 'react';

export default function FilterSection({ onFilterChange }) {
  const [filters, setFilters] = useState({
    consultMode: {
      hospital: false,
      online: false
    },
    experience: {
      '0-5': false,
      '6-10': false,
      '11-16': false,
      '16-20': false,
      '20+': false
    },
    fees: {
      '100-500': false,
      '500-1000': false,
      '1000+': false
    },
    language: {
      english: false,
      hindi: false,
      telugu: false,
      tamil: false,
      kannada: false,
      malayalam: false,
      bengali: false,
      marathi: false,
      gujarati: false,
      punjabi: false,
      urdu: false,
      odia: false,
      assamese: false
    },
    facility: {
      apollo: false,
      others: false
    }
  });

  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleFilterChange = (category, value) => {
    // Create a copy of the filters with the new value toggled
    const newFilters = {
      ...filters,
      [category]: {
        ...filters[category],
        [value]: !filters[category][value]
      }
    };

    // For facility category, ensure mutual exclusivity (only one can be selected)
    if (category === 'facility' && newFilters.facility[value]) {
      const otherValue = value === 'apollo' ? 'others' : 'apollo';
      newFilters.facility[otherValue] = false;
    }

    setFilters(newFilters);
    updateActiveFilters(newFilters);

    // Prepare query params for API
    const apiFilters = {};

    // Consult Mode
    if (newFilters.consultMode.hospital) apiFilters.consultMode = 'Hospital Visit';
    if (newFilters.consultMode.online) apiFilters.consultMode = 'Online Consult';

    // Experience Range
    if (newFilters.experience['0-5']) {
      apiFilters.minExp = 0;
      apiFilters.maxExp = 5;
    } else if (newFilters.experience['6-10']) {
      apiFilters.minExp = 6;
      apiFilters.maxExp = 10;
    } else if (newFilters.experience['11-16']) {
      apiFilters.minExp = 11;
      apiFilters.maxExp = 16;
    } else if (newFilters.experience['16-20']) {
      apiFilters.minExp = 16;
      apiFilters.maxExp = 20;
    } else if (newFilters.experience['20+']) {
      apiFilters.minExp = 20;
    }

    // Fees Range
    if (newFilters.fees['100-500']) {
      apiFilters.minFees = 100;
      apiFilters.maxFees = 500;
    } else if (newFilters.fees['500-1000']) {
      apiFilters.minFees = 500;
      apiFilters.maxFees = 1000;
    } else if (newFilters.fees['1000+']) {
      apiFilters.minFees = 1000;
    }

    // Language 
    const selectedLanguages = [];
    if (newFilters.language.english) selectedLanguages.push('English');
    if (newFilters.language.hindi) selectedLanguages.push('Hindi');
    if (newFilters.language.telugu) selectedLanguages.push('Telugu');
    if (newFilters.language.tamil) selectedLanguages.push('Tamil');
    if (newFilters.language.kannada) selectedLanguages.push('Kannada');
    if (newFilters.language.malayalam) selectedLanguages.push('Malayalam');
    
    // Only add languages filter if at least one language is selected
    if (selectedLanguages.length > 0) {
      // The backend already handles this as an array with $in operator
      apiFilters.language = selectedLanguages.join(',');
    }

    // Facility - Fixed to correctly handle Apollo vs Other Clinics 
    if (newFilters.facility.apollo) {
      apiFilters.facility = 'Apollo Hospital';
    } else if (newFilters.facility.others) {
      // This is the key fix - use the proper parameter name the API expects
      apiFilters.facilityType = 'otherClinics';
    }

    onFilterChange(apiFilters);
  };

  const updateActiveFilters = (newFilters) => {
    const active = [];

    // Experience filters
    Object.entries(newFilters.experience).forEach(([key, value]) => {
      if (value) active.push({ type: 'experience', value: key });
    });

    // Consult mode filters
    if (newFilters.consultMode.hospital) active.push({ type: 'consultMode', value: 'PHYSICAL' });
    if (newFilters.consultMode.online) active.push({ type: 'consultMode', value: 'ONLINE' });

    // Language filters - UPDATED to show active language filters
    Object.entries(newFilters.language).forEach(([key, value]) => {
      if (value) {
        // Capitalize first letter for display
        const displayName = key.charAt(0).toUpperCase() + key.slice(1);
        active.push({ type: 'language', value: displayName });
      }
    });

    // Facility filters
    if (newFilters.facility.apollo) active.push({ type: 'facility', value: 'Apollo Hospital' });
    if (newFilters.facility.others) active.push({ type: 'facility', value: 'Other Clinics' });

    setActiveFilters(active);
  };

  const removeFilter = (type, value) => {
    if (type === 'experience') {
      handleFilterChange('experience', value);
    } else if (type === 'consultMode') {
      if (value === 'PHYSICAL') handleFilterChange('consultMode', 'hospital');
      if (value === 'ONLINE') handleFilterChange('consultMode', 'online');
    } else if (type === 'language') {
      // Convert display name back to lowercase for the state key
      const key = value.toLowerCase();
      handleFilterChange('language', key);
    } else if (type === 'facility') {
      if (value === 'Apollo Hospital') handleFilterChange('facility', 'apollo');
      if (value === 'Other Clinics') handleFilterChange('facility', 'others');
    }
  };

  const clearAllFilters = () => {
    setFilters({
      consultMode: {
        hospital: false,
        online: false
      },
      experience: {
        '0-5': false,
        '6-10': false,
        '11-16': false,
        '16-20': false,
        '20+': false
      },
      fees: {
        '100-500': false,
        '500-1000': false,
        '1000+': false
      },
      language: {
        english: false,
        hindi: false,
        telugu: false,
        tamil: false,
        kannada: false,
        malayalam: false
      },
      facility: {
        apollo: false,
        others: false
      }
    });

    setActiveFilters([]);
    onFilterChange({});
  };

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        <button onClick={clearAllFilters} className="text-blue-600 text-sm hover:text-blue-800 font-medium">
          Clear All
        </button>
      </div>

      {/* Active Filters Badges */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <div key={index} className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-sm text-gray-800">{filter.value}</span>
              <button
                onClick={() => removeFilter(filter.type, filter.value)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show Doctors Near Me Button */}
      <div className="mb-6">
        <button className="w-full py-2.5 px-4 bg-white border border-blue-500 rounded-md text-blue-600 font-medium hover:bg-blue-50">
          Show Doctors Near Me
        </button>
      </div>

      {/* Mode of Consult */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Mode of Consult</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hospital"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.consultMode.hospital}
              onChange={() => handleFilterChange('consultMode', 'hospital')}
            />
            <label htmlFor="hospital" className="ml-2 text-sm font-medium text-gray-700">Hospital Visit</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="online"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.consultMode.online}
              onChange={() => handleFilterChange('consultMode', 'online')}
            />
            <label htmlFor="online" className="ml-2 text-sm font-medium text-gray-700">Online Consult</label>
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Experience (In Years)</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exp-0-5"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.experience['0-5']}
              onChange={() => handleFilterChange('experience', '0-5')}
            />
            <label htmlFor="exp-0-5" className="ml-2 text-sm font-medium text-gray-700">0-5</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exp-6-10"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.experience['6-10']}
              onChange={() => handleFilterChange('experience', '6-10')}
            />
            <label htmlFor="exp-6-10" className="ml-2 text-sm font-medium text-gray-700">6-10</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="exp-11-16"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.experience['11-16']}
              onChange={() => handleFilterChange('experience', '11-16')}
            />
            <label htmlFor="exp-11-16" className="ml-2 text-sm font-medium text-gray-700">11-16</label>
          </div>
          {showMoreExperience && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="exp-16-20"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filters.experience['16-20']}
                  onChange={() => handleFilterChange('experience', '16-20')}
                />
                <label htmlFor="exp-16-20" className="ml-2 text-sm font-medium text-gray-700">16-20</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="exp-20plus"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filters.experience['20+']}
                  onChange={() => handleFilterChange('experience', '20+')}
                />
                <label htmlFor="exp-20plus" className="ml-2 text-sm font-medium text-gray-700">20+</label>
              </div>
            </>
          )}
        </div>
        <button
          className="text-blue-600 text-sm mt-2 hover:text-blue-800 font-medium"
          onClick={() => setShowMoreExperience(!showMoreExperience)}
        >
          {showMoreExperience ? 'Show Less' : '+1 More'}
        </button>
      </div>

      {/* Fees */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Fees (In Rupees)</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fees-100-500"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.fees['100-500']}
              onChange={() => handleFilterChange('fees', '100-500')}
            />
            <label htmlFor="fees-100-500" className="ml-2 text-sm font-medium text-gray-700">100-500</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fees-500-1000"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.fees['500-1000']}
              onChange={() => handleFilterChange('fees', '500-1000')}
            />
            <label htmlFor="fees-500-1000" className="ml-2 text-sm font-medium text-gray-700">500-1000</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fees-1000plus"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.fees['1000+']}
              onChange={() => handleFilterChange('fees', '1000+')}
            />
            <label htmlFor="fees-1000plus" className="ml-2 text-sm font-medium text-gray-700">1000+</label>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Language</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lang-english"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.language.english}
              onChange={() => handleFilterChange('language', 'english')}
            />
            <label htmlFor="lang-english" className="ml-2 text-sm font-medium text-gray-700">English</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lang-hindi"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.language.hindi}
              onChange={() => handleFilterChange('language', 'hindi')}
            />
            <label htmlFor="lang-hindi" className="ml-2 text-sm font-medium text-gray-700">Hindi</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lang-telugu"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.language.telugu}
              onChange={() => handleFilterChange('language', 'telugu')}
            />
            <label htmlFor="lang-telugu" className="ml-2 text-sm font-medium text-gray-700">Telugu</label>
          </div>
          {showMoreLanguages && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lang-tamil"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filters.language.tamil}
                  onChange={() => handleFilterChange('language', 'tamil')}
                />
                <label htmlFor="lang-tamil" className="ml-2 text-sm font-medium text-gray-700">Tamil</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lang-kannada"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filters.language.kannada}
                  onChange={() => handleFilterChange('language', 'kannada')}
                />
                <label htmlFor="lang-kannada" className="ml-2 text-sm font-medium text-gray-700">Kannada</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lang-malayalam"
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  checked={filters.language.malayalam}
                  onChange={() => handleFilterChange('language', 'malayalam')}
                />
                <label htmlFor="lang-malayalam" className="ml-2 text-sm font-medium text-gray-700">Malayalam</label>
              </div>
            </>
          )}
        </div>
        <button
          className="text-blue-600 text-sm mt-2 hover:text-blue-800 font-medium"
          onClick={() => setShowMoreLanguages(!showMoreLanguages)}
        >
          {showMoreLanguages ? 'Show Less' : '+3 More'}
        </button>
      </div>

      {/* Facility */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Facility</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="facility-apollo"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.facility.apollo}
              onChange={() => handleFilterChange('facility', 'apollo')}
            />
            <label htmlFor="facility-apollo" className="ml-2 text-sm font-medium text-gray-700">Apollo Hospital</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="facility-others"
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              checked={filters.facility.others}
              onChange={() => handleFilterChange('facility', 'others')}
            />
            <label htmlFor="facility-others" className="ml-2 text-sm font-medium text-gray-700">Other Clinics</label>
          </div>
        </div>
      </div>
    </div>
  );
}