import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            RealEstate<span className="text-blue-500">X</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Helping you find the perfect home with trust & transparency.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-xl">
            <FaFacebook className="hover:text-blue-500 cursor-pointer" />
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-blue-400">Home</a></li>
            <li><a href="#properties" className="hover:text-blue-400">Properties</a></li>
            <li><a href="#agents" className="hover:text-blue-400">Agents</a></li>
            <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </div>

        {/* Support Pages */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-blue-400">Terms & Conditions</Link></li>
            <li><Link to="/faqs" className="hover:text-blue-400">FAQs</Link></li>
            <li><Link to="/help-center" className="hover:text-blue-400">Help Center</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
          <p className="text-gray-400">📍 New Delhi, India</p>
          <p className="text-gray-400 mt-2">📞 +91 98765 43210</p>
          <p className="text-gray-400 mt-2">✉️ support@realestatex.com</p>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} RealEstateX — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
