import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              RealEstate<span className="text-gray-700">X</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#properties" className="text-gray-700 hover:text-blue-600">Properties</a>
            <a href="#agents" className="text-gray-700 hover:text-blue-600">Agents</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>

            <a href="#properties" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 inline-block">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700"
            >
              {open ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
          <a href="#home" className="block text-gray-700 hover:text-blue-600">Home</a>
          <a href="#properties" className="block text-gray-700 hover:text-blue-600">Properties</a>
          <a href="#agents" className="block text-gray-700 hover:text-blue-600">Agents</a>
          <a href="#contact" className="block text-gray-700 hover:text-blue-600">Contact</a>

          <a href="#properties" className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 inline-block text-center">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
