import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const Properties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await api.getProperties();

        if (data?.properties) {
          setProperties(data.properties);
        } else {
          setProperties([]);
          setError("No properties found in the database");
        }

      } catch (err) {
        console.error("API Error:", err);
        setProperties([]);
        setError("Failed to load properties from backend");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">All Properties</h2>
          Loading properties...
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-100" id="properties">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          All Properties
        </h2>

        {error && (
          <p className="text-center text-red-600 mb-6">{error}</p>
        )}

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Available</h3>
            <p className="text-gray-500">Properties will be displayed here once they are added to the system.</p>
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
                  <span>🛏 {item.bedrooms} Beds</span>
                  <span>🛁 {item.bathrooms} Baths</span>
                  <span>📐 {item.area} sq ft</span>
                </div>

                <button onClick={() => navigate(`/property/${item._id}`)} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
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

export default Properties;
