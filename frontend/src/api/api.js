// 🔥 PRODUCTION BACKEND BASE URL (Render)
const API_BASE_URL = 'https://real-estate-6f2o.onrender.com/api';

export const api = {
  // Properties
  getProperties: async () => {
    const response = await fetch(`${API_BASE_URL}/properties`);
    return response.json();
  },

  getProperty: async (id) => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    return response.json();
  },

  createProperty: async (propertyData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(propertyData),
    });
    return response.json();
  },

  updateProperty: async (id, propertyData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(propertyData),
    });
    return response.json();
  },

  deleteProperty: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.json();
  },

  // Agents
  getAgents: async () => {
    const response = await fetch(`${API_BASE_URL}/agents`);
    return response.json();
  },

  getAgent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`);
    return response.json();
  },

  createAgent: async (agentData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(agentData),
    });
    return response.json();
  },

  updateAgent: async (id, agentData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(agentData),
    });
    return response.json();
  },

  deleteAgent: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    return response.json();
  },

  createTestimonial: async (testimonialData) => {
    const response = await fetch(`${API_BASE_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testimonialData),
    });
    return response.json();
  },

  updateTestimonial: async (id, testimonialData) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(testimonialData),
    });
    return response.json();
  },

  deleteTestimonial: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/testimonials/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.json();
  },

  // Contacts
  getContacts: async () => {
    const token = localStorage.getItem('adminToken');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const response = await fetch(`${API_BASE_URL}/contacts`, { headers });
    return response.json();
  },

  createContact: async (contactData) => {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    return response.json();
  },

  updateContactStatus: async (id, status) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/contacts/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  deleteContact: async (id) => {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Admin login
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // Send OTP for admin login
  sendOTP: async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin-auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Verify OTP for admin login
  verifyOTP: async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin-auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    const token = localStorage.getItem('adminToken');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    const [propertiesRes, agentsRes, contactsRes, testimonialsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/properties`, { headers }),
      fetch(`${API_BASE_URL}/agents`, { headers }),
      fetch(`${API_BASE_URL}/contacts`, { headers }),
      fetch(`${API_BASE_URL}/testimonials`, { headers })
    ]);

    const [properties, agents, contacts, testimonials] = await Promise.all([
      propertiesRes.json(),
      agentsRes.json(),
      contactsRes.json(),
      testimonialsRes.json()
    ]);

    return {
      totalProperties: properties.properties?.length || 0,
      totalAgents: agents.agents?.length || 0,
      totalContacts: contacts.contacts?.length || 0,
      totalTestimonials: testimonials.testimonials?.length || 0
    };
  },
};
