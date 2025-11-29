import React from "react";

const HelpCenter = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Help Center</h1>
      <p className="text-gray-700 mb-6 leading-7">
        Welcome to the help center! Here you can find answers and assistance.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Support Options</h2>
      <ul className="text-gray-700 space-y-3">
        <li>📞 Phone Support: +91 98765 43210</li>
        <li>📧 Email: support@realestatepro.com</li>
        <li>💬 Live Chat: Available 24/7</li>
        <li>📝 Raise a Ticket: Contact page par form submit karein</li>
      </ul>
    </div>
  );
};

export default HelpCenter;
