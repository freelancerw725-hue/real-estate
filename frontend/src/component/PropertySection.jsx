import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const PropertySection = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await api.getProperties();
        if (data?.properties) {
          // Take first 3 properties as featured
          setProperties(data.properties.slice(0, 3));
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error("API Error:", err);
        setProperties([]);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);



  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Featured Properties
        </h2>

        <div className="mb-8 text-center">
          <a href="#properties" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 inline-block">
            View All Properties
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading featured properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No properties available</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {properties.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow hover:shadow-xl transition p-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-lg w-full h-48 object-cover"
                />

                <h3 className="text-xl font-semibold mt-4">{item.title}</h3>

                <p className="text-blue-600 font-bold text-lg mt-2">
                  ${item.price.toLocaleString()}
                </p>

                <p className="text-gray-600 text-sm mt-1">{item.location}</p>

                <div className="flex items-center justify-between mt-3 text-gray-700 text-sm">
                  <span>🛏 {item.bedrooms} Bedrooms</span>
                  <span>🛁 {item.bathrooms} Bathrooms</span>
                </div>

                <div className="mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'available' ? 'bg-green-100 text-green-800' :
                    item.status === 'sold' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/property/${item._id}`)}
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertySection;
