import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Home Buyer",
    review:
      "I found my dream house thanks to RealEstateX. Their service is quick, transparent, and highly professional.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Ananya Verma",
    role: "Property Investor",
    review:
      "Amazing experience! They showed me excellent investment properties and guided me throughout the process.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Apartment Renter",
    review:
      "The platform made renting super easy. Verified listings and great customer support. Highly recommended!",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          What Our Clients Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-xl transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </div>

              <p className="text-gray-700 mt-4">{item.review}</p>

              {/* Star Rating */}
              <div className="flex mt-4 text-yellow-500">
                {Array(item.rating)
                  .fill()
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
