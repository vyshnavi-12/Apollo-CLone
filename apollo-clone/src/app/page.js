'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterSection from '@/components/FilterSection';
import DoctorCard from '@/components/DoctorCard';
import Pagination from '@/components/Pagination';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 3,
    total: 0,
    pages: 1
  });

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();
      queryParams.append('page', pagination.page);
      queryParams.append('limit', pagination.limit);

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`/api/doctors/list?${queryParams.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch doctors');
      }

      setDoctors(data.data || []);
      setPagination((prev) => ({
        ...prev,
        total: data.pagination?.total || 0,
        pages: data.pagination?.pages || 1
      }));
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [pagination.page, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto px-4 pt-4 pb-8">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex items-center space-x-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mx-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <Link href="/doctors" className="hover:text-blue-600">
                Doctors
              </Link>
            </li>
            <li className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mx-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              <span>General Physicians</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar Filters */}
          <FilterSection onFilterChange={handleFilterChange} />

          {/* Main Content */}
          <div className="flex-1 ml-0 lg:ml-6">
            <div className="bg-white rounded-md p-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Consult General Physicians Online - Internal Medicine Specialists
                </h1>
                <p className="text-gray-600 mt-1">({pagination.total} doctors)</p>
              </div>

              {/* Render Data */}
              {loading ? (
                <div className="text-center py-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-3 text-gray-600">Loading doctors...</p>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <p className="text-red-500">{error}</p>
                  <button
                    onClick={fetchDoctors}
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Try Again
                  </button>
                </div>
              ) : doctors.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg text-gray-600">No doctors found matching your criteria.</p>
                </div>
              ) : (
                <>
                  <div className="doctor-cards-container space-y-4">
                    {doctors.map((doctor) => (
                      <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.pages > 1 && (
                    <div className="mt-6">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.pages}
                        onPageChange={(newPage) => {
                          setPagination((prev) => ({ ...prev, page: newPage }));
                          window.scrollTo({
                            top: document.querySelector('.doctor-cards-container')?.offsetTop - 100 || 0,
                            behavior: 'smooth'
                          });
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Sidebar - Help Section */}
          <div className="w-64 hidden lg:block ml-6">
            <div className="sticky top-24 bg-blue-900 text-white rounded-lg overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Need help consult the right doctor?</h3>
                <div className="text-sm mb-4">
                  <a href="tel:+918040245807" className="flex items-center font-medium text-white hover:text-blue-200">
                    Call +91-8040245807 to book instantly
                  </a>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-blue-800 to-blue-700 flex items-end justify-center">
                <Image src="/placeholder-doctor.png" alt="Doctors" width={200} height={100} className="w-auto h-28 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}