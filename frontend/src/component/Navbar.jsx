import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🔵 TOP BAR (FIXED) */}
      <div className="w-full bg-[#0A3D91] text-white text-sm py-2 px-6 
        flex justify-between items-center select-none fixed top-0 left-0 z-50">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">📞 +91 78747 55553</span>
          <span className="flex items-center gap-2">✉️ info@ramarealty.in</span>
        </div>

        {/* RIGHT SIDE SOCIAL ICONS */}
        <div className="flex items-center gap-4">
          <span>Follow us:</span>

          {/* Instagram */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757..." />
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22 12a10 10 0..." />
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
            viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M21.6 7.2s-.2..." />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M4.98 3.5C3.87..." />
            </svg>
          </a>

          {/* X / Twitter */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" 
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M18.36 2H21l..." />
            </svg>
          </a>
        </div>
      </div>

      {/* 🔵 MAIN NAVBAR (FIXED BELOW TOPBAR) */}
      <nav className="bg-white shadow-md fixed w-full top-[40px] left-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">

            {/* LOGO */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">
                RealEstate<span className="text-gray-700">X</span>
              </h1>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="/properties" className="text-gray-700 hover:text-blue-600">Properties</a>
              <a href="/agents" className="text-gray-700 hover:text-blue-600">Agents</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>

              <a href="/properties"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                Get Started
              </a>
            </div>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setOpen(!open)} className="text-gray-700">
                {open ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
            <a href="/" className="block text-gray-700 hover:text-blue-600">Home</a>
            <a href="/properties" className="block text-gray-700 hover:text-blue-600">Properties</a>
            <a href="/agents" className="block text-gray-700 hover:text-blue-600">Agents</a>
            <a href="/contact" className="block text-gray-700 hover:text-blue-600">Contact</a>

            <a href="/properties"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 inline-block text-center">
              Get Started
            </a>
          </div>
        )}
      </nav>
    </>
  );
}
