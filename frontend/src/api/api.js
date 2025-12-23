const API_BASE_URL = 'https://real-estate-6f2o.onrender.com/api';

export const api = {

  // 🔐 ADMIN OTP LOGIN
  sendOTP: async (data) => {
    const res = await fetch(`${API_BASE_URL}/admin/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  verifyOTP: async (data) => {
    const res = await fetch(`${API_BASE_URL}/admin/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // 🏠 PROPERTIES
  getProperties: async () => {
    const res = await fetch(`${API_BASE_URL}/properties`);
    return res.json();
  },

  createProperty: async (data) => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
