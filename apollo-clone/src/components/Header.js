import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/globe.svg"
              alt="Apollo 24/7"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-lg font-semibold">Apollo-Clone</span>
          </Link>
        </div>

        <div className="hidden md:block w-full max-w-lg mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center">
          <button className="py-2 px-5 rounded-md border border-gray-300 font-medium text-blue-700 hover:bg-blue-50 transition-colors">
            Login
          </button>
        </div>
      </div>

      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <ul className="flex justify-center space-x-6 py-3 whitespace-nowrap">
            <li className="font-medium text-gray-700 hover:text-blue-600">
              <Link href="/">Buy Medicines</Link>
            </li>
            <li className="font-medium text-blue-600 border-b-2 border-blue-600">
              <Link href="/">Find Doctors</Link>
            </li>
            <li className="font-medium text-gray-700 hover:text-blue-600">
              <Link href="/">Lab Tests</Link>
            </li>
            <li className="font-medium text-gray-700 hover:text-blue-600">
              <Link href="/">Circle Membership</Link>
            </li>
            <li className="font-medium text-gray-700 hover:text-blue-600">
              <Link href="/">Health Records</Link>
            </li>
            <li className="font-medium text-gray-700 hover:text-blue-600">
              <Link href="/">Diabetes Reversal</Link>
            </li>
            <li className="font-medium text-gray-700 hover:text-blue-600">
              <Link href="/">
                Buy Insurance{" "}
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                  New
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
