import React from "react";

const Header = () => {
  return (
    <header id="home" className="relative h-[85vh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center px-6">
        <h1 className="text-white text-4xl sm:text-6xl font-bold leading-tight">
          Find Your Dream <span className="text-blue-400">Property</span>
        </h1>

        <p className="text-gray-200 text-lg sm:text-xl mt-4 max-w-2xl">
          Explore the best houses, apartments, and lands in your preferred city.
          Trusted by thousands of real estate buyers.
        </p>

        {/* Search Box */}
        <div className="mt-8 bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search location..."
            className="flex-1 px-4 py-3 border rounded-lg outline-none"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
