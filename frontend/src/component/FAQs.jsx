import React from "react";

const FAQs = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Frequently Asked Questions</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. How can I contact support?</h2>
        <p className="text-gray-700">You can contact us using the form on the Contact page.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How do I book a property visit?</h2>
        <p className="text-gray-700">Visit the Properties page and choose the schedule option.</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">3. Are the agents verified?</h2>
        <p className="text-gray-700">Yes, all our agents are verified and trusted.</p>
      </div>
    </div>
  );
};

export default FAQs;
