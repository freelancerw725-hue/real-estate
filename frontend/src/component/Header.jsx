import React, { useState } from "react";
import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    window.location.href = `/properties?search=${query}`;
  };

  return (
    <header
      id="home"
      className="relative h-[85vh] w-full bg-cover bg-center pt-[110px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F3B]/70 to-[#0B1A33]/80"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto h-full flex flex-col justify-center px-6 text-center">
        <h1 className="text-white text-4xl sm:text-6xl font-bold leading-tight">
          Find Your Dream <span className="text-blue-400">Property</span>
        </h1>

        <p className="text-gray-200 text-lg sm:text-xl mt-4 max-w-2xl mx-auto">
          Search in the best localities and find your perfect home in seconds.
        </p>

        {/* PREMIUM SEARCH BOX */}
        <div className="mt-10 bg-white rounded-3xl shadow-2xl p-4 flex flex-col sm:flex-row items-center gap-4 mx-auto max-w-3xl">

          {/* Search Input */}
          <div className="flex items-center w-full border rounded-2xl px-4 py-3 gap-3">
            <MapPinIcon className="w-6 h-6 text-blue-500" />

            <input
              type="text"
              placeholder="Search by location, area, or pincode..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700 text-lg"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-blue-500 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 15l6 6m-6-6a6 6 0 10-8.485-8.485A6 6 0 0015 15z"
              />
            </svg>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl text-lg font-medium flex items-center gap-2 shadow-lg"
          >
            <MagnifyingGlassIcon className="w-6 h-6" />
            Search
          </button>
        </div>

        {/* Popular Areas */}
        <div className="mt-6 text-gray-200 text-lg">
          Popular Areas:
          <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
            {["Ahmedabad", "Ambawadi", "Bopal", "SBR Extension"].map((area) => (
              <span
                key={area}
                onClick={() => setQuery(area)}
                className="bg-white/20 text-white px-4 py-1 rounded-full cursor-pointer hover:bg-white/30 transition"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
