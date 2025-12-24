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
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm5-3c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-8-4a1 1 0 0 1 1 1v2h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2V9a1 1 0 0 1 1-1z"/>
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M21.6 7.2s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16.4 4 12 4 12 4s-4.4 0-6.7.3c-.4.1-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 8.7 2 10.2v1.6c0 1.5.2 3 .2 3s.2 1.4.8 2c.8.8 1.8.7 2.2.8C7.6 18 12 18 12 18s4.4 0 6.7-.3c.4-.1 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.5.2-3V10.2c0-1.5-.2-3-.2-3zM10 14.6V7.4l5.4 3.6-5.4 3.6z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M4.98 3.5C3.87 3.5 3 4.37 3 5.5v13c0 1.13.87 2 1.98 2H19c1.13 0 2-.87 2-2V5.5c0-1.13-.87-2-2-2H4.98zM5 5.5h14c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V6.5c0-.55.45-1 1-1zm2.5 2c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-1 5h2v6H6.5v-6zm4 0h2v6h-2v-6z"/>
            </svg>
          </a>

          {/* X / Twitter */}
          <a href="#" className="hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M18.36 2H21l-3.64 4.18L22 22h-7.25l-4.78-6.3L5.19 22H2l4.13-4.82L2 2h7.31l4.26 5.62L18.36 2zM8.08 4H5.02l9.77 13.74L19.92 4h-3.06l-2.92 4.65L8.08 4z"/>
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
