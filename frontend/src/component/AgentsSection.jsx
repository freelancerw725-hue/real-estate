import React, { useState, useEffect } from "react";
import { api } from "../api/api";

const AgentsSection = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await api.getAgents();
        if (data?.agents) {
          setAgents(data.agents);
        } else {
          setAgents([]);
          setError("No agents found in the database");
        }
      } catch (err) {
        console.error('Error fetching agents:', err);
        setAgents([]);
        setError('Failed to load agents from backend');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white" id="agents">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Meet Our Professional Agents
          </h2>
          <div className="text-center">Loading agents...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white" id="agents">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Meet Our Professional Agents
          </h2>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-white" id="agents">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Meet Our Professional Agents
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-xl transition"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />

              <h3 className="text-xl font-semibold mt-4">{agent.name}</h3>
              <p className="text-gray-600">Real Estate Agent</p>
              <p className="text-sm text-gray-500">{agent.experience} years experience</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 text-sm mt-4">
                <span className="hover:text-blue-600 cursor-pointer">Facebook</span>
                <span className="hover:text-pink-500 cursor-pointer">Instagram</span>
                <span className="hover:text-blue-400 cursor-pointer">Twitter</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AgentsSection;
