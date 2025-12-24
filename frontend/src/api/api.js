// ✅ AUTO BASE URL (Local + Production)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://real-estate-6f2o.onrender.com/api";

export const api = {
  /* ================================
     🔐 ADMIN OTP AUTH
  ================================= */

  sendOTP: async ({ email }) => {
    const res = await fetch(`${API_BASE_URL}/admin/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to send OTP");
    }

    return res.json();
  },

  verifyOTP: async ({ email, otp }) => {
    const res = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "OTP verification failed");
    }

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("adminToken", data.token);
    }

    return data;
  },

  /* ================================
     🏠 PROPERTIES
  ================================= */

  getProperties: async () => {
    const res = await fetch(`${API_BASE_URL}/properties`);

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    return res.json();
  },

  createProperty: async (propertyData) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create property");
    }

    return res.json();
  },

  updateProperty: async (id, propertyData) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertyData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update property");
    }

    return res.json();
  },

  deleteProperty: async (id) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete property");
    }

    return res.json();
  },

  /* ================================
     👤 AGENTS
  ================================= */

  createAgent: async (agentData) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/agents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...agentData,
        experience: Number(agentData.experience),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error saving agent");
    }

    return res.json();
  },

  getAgents: async () => {
    const res = await fetch(`${API_BASE_URL}/agents`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch agents");
    }

    return res.json();
  },

  updateAgent: async (id, agentData) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...agentData,
        experience: Number(agentData.experience),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update agent");
    }

    return res.json();
  },

  deleteAgent: async (id) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete agent");
    }

    return res.json();
  },

  /* ================================
     📩 CONTACTS
  ================================= */

  createContact: async (contactData) => {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to submit contact");
    }

    return res.json();
  },

  getContacts: async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_BASE_URL}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch contacts");
    }

    return res.json();
  },

  deleteContact: async (id) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete contact");
    }

    return res.json();
  },

  /* ================================
     📊 DASHBOARD
  ================================= */

  getDashboardStats: async () => {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to fetch dashboard stats");
    }

    return res.json();
  },

  /* ================================
     💬 TESTIMONIALS
  ================================= */

  getTestimonials: async () => {
    const res = await fetch(`${API_BASE_URL}/testimonials`);

    if (!res.ok) {
      throw new Error("Failed to fetch testimonials");
    }

    return res.json();
  },

  createTestimonial: async (testimonialData) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(testimonialData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create testimonial");
    }

    return res.json();
  },

  updateTestimonial: async (id, testimonialData) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(testimonialData),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to update testimonial");
    }

    return res.json();
  },

  deleteTestimonial: async (id) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      throw new Error("Admin not authenticated");
    }

    const res = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete testimonial");
    }

    return res.json();
  },
};
