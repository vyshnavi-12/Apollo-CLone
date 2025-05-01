// components/DoctorCard.js
import React from 'react';
import Image from 'next/image';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 flex flex-col lg:flex-row">
      {/* Profile Image */}
      <div className="lg:flex-shrink-0 mb-4 lg:mb-0 lg:mr-6">
        <Image 
          src={doctor.profileImage || "/placeholder-doctor.png"} 
          alt={doctor.name} 
          width={100} 
          height={100}
          className="rounded-md"
        />
      </div>

      <div className="flex-grow">
        {/* Name + Info Icon */}
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900">{doctor.name}</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            
            <p className="text-gray-600">{doctor.designation}</p>
            
            <div className="text-indigo-600 font-medium mt-1">
              {doctor.experience} YEARS • {doctor.qualifications?.join(', ') ?? 'N/A'}
            </div>
          </div>
          
          {/* Fees & Cashback */}
          <div className="mt-4 lg:mt-0 text-right">
            <div className="text-2xl font-semibold">₹{doctor.fees}</div>
            <div className="flex items-center justify-end text-sm text-gray-600">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-orange-100 text-orange-600 rounded-full mr-1">C</span>
              <span>₹{doctor.cashback ?? 0} Cashback</span>
            </div>
          </div>
        </div>

        {/* Location & Rating */}
        <div className="mt-3">
          <p className="text-gray-600">{doctor.location}</p>
          <p className="text-gray-600">{doctor.facility} - {doctor.region}, {doctor.location}</p>

          {/* Rating */}
          {doctor.rating > 0 && (
            <div className="flex items-center mt-2">
              <div className="flex items-center text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                {doctor.rating}%
              </div>
              
              {/* Show exact patient count */}
              <span className="text-gray-500 ml-1">
                ({doctor.patientCount ?? 'N/A'} Patients)
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Consultation Button */}
        <div className="mt-4">
          <button className="w-full py-2.5 px-4 bg-white border border-blue-500 rounded-md text-blue-600 font-medium hover:bg-blue-50">
            {doctor.consultMode}
            <div className="text-xs text-gray-500">
              {doctor.facility === 'Apollo Hospital' ? 'At Apollo Clinic' : `At ${doctor.facility}`}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;