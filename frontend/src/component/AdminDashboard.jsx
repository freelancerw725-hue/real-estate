  import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { api } from '../api/api';
import { StarIcon, HomeIcon, UsersIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

// Admin Dashboard Main Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [agents, setAgents] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalAgents: 0,
    totalContacts: 0,
    totalTestimonials: 0
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [otpStep, setOtpStep] = useState('email'); // 'email' or 'otp'
  const [loginData, setLoginData] = useState({ email: '', otp: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    images: [''],
    videos: [''],
    type: 'house',
    status: 'available'
  });
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: '',
    message: '',
    approved: false
  });
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [agentFormData, setAgentFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    image: '',
    facebook: '',
    instagram: '',
    twitter: ''
  });
  

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);

    if (token) {
      if (activeTab === 'overview') {
        fetchStats();
        fetchContacts();
        fetchProperties();
      } else if (activeTab === 'properties') {
        fetchProperties();
      } else if (activeTab === 'agents') {
        fetchAgents();
      } else if (activeTab === 'messages') {
        fetchContacts();
      } else if (activeTab === 'reviews') {
        fetchTestimonials();
      }
    }
  }, [activeTab]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const data = await api.getProperties();
      setProperties(data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const statsData = await api.getDashboardStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Keep default stats on error
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      const data = await api.getContacts();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    }
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await api.getTestimonials();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = await api.getAgents();
      setAgents(data.agents || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Filter out empty images and videos
      const filteredImages = formData.images.filter(img => img.trim() !== '');
      const filteredVideos = formData.videos.filter(vid => vid.trim() !== '');

      // Ensure at least one image is provided
      if (filteredImages.length === 0) {
        alert('Please provide at least one image URL.');
        setLoading(false);
        return;
      }

      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        image: filteredImages[0], // Set main image to first image
        images: filteredImages,
        videos: filteredVideos
      };

      if (editingProperty) {
        await api.updateProperty(editingProperty._id, propertyData);
      } else {
        await api.createProperty(propertyData);
      }

      setShowForm(false);
      setEditingProperty(null);
      resetForm();
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Error saving property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price.toString(),
      location: property.location,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      images: property.images || [property.image || ''],
      videos: property.videos || [''],
      type: property.type,
      status: property.status
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.deleteProperty(id);
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Error deleting property. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      images: [''],
      videos: [''],
      type: 'house',
      status: 'available'
    });
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImageField = (index, value) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addVideoField = () => {
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, '']
    }));
  };

  const removeVideoField = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const updateVideoField = (index, value) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.map((vid, i) => i === index ? value : vid)
    }));
  };

  const cancelEdit = () => {
    setShowForm(false);
    setEditingProperty(null);
    resetForm();
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingTestimonial) {
        await api.updateTestimonial(editingTestimonial._id, testimonialFormData);
      } else {
        await api.createTestimonial(testimonialFormData);
      }

      setShowTestimonialForm(false);
      setEditingTestimonial(null);
      resetTestimonialForm();
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestimonialEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialFormData({
      name: testimonial.name,
      message: testimonial.message,
      approved: testimonial.approved
    });
    setShowTestimonialForm(true);
  };

  const handleTestimonialDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.deleteTestimonial(id);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Error deleting testimonial. Please try again.');
      }
    }
  };

  const cancelTestimonialEdit = () => {
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
    resetTestimonialForm();
  };

  const resetTestimonialForm = () => {
    setTestimonialFormData({
      name: '',
      message: '',
      approved: false
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await api.sendOTP({ email: loginData.email });

      if (data.message === 'OTP sent successfully') {
        setOtpStep('otp');
        alert('OTP sent to your email');
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await api.verifyOTP({ email: loginData.email, otp: loginData.otp });

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        setLoginData({ email: '', otp: '' });
        setOtpStep('email');
      } else {
        alert(data.message || 'OTP verification failed');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      alert('OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setOtpStep('email');
    setLoginData({ ...loginData, otp: '' });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setProperties([]);
  };

  const handleAgentSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const agentData = {
        ...agentFormData,
        experience: parseInt(agentFormData.experience)
      };

      if (editingAgent) {
        await api.updateAgent(editingAgent._id, agentData);
      } else {
        await api.createAgent(agentData);
      }

      setShowAgentForm(false);
      setEditingAgent(null);
      resetAgentForm();
      fetchAgents();
    } catch (error) {
      console.error('Error saving agent:', error);
      alert('Error saving agent. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAgentEdit = (agent) => {
    setEditingAgent(agent);
    setAgentFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      experience: agent.experience.toString(),
      image: agent.image,
      facebook: agent.facebook || '',
      instagram: agent.instagram || '',
      twitter: agent.twitter || ''
    });
    setShowAgentForm(true);
  };

  const handleAgentDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      try {
        await api.deleteAgent(id);
        fetchAgents();
      } catch (error) {
        console.error('Error deleting agent:', error);
        alert('Error deleting agent. Please try again.');
      }
    }
  };

  const cancelAgentEdit = () => {
    setShowAgentForm(false);
    setEditingAgent(null);
    resetAgentForm();
  };

  const resetAgentForm = () => {
    setAgentFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      image: '',
      facebook: '',
      instagram: '',
      twitter: ''
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md rounded-2xl shadow-md border border-gray-200">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
            {otpStep === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">OTP</label>
                  <input
                    type="text"
                    value={loginData.otp}
                    onChange={(e) => setLoginData({...loginData, otp: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter 6-digit OTP"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                  Back to Email
                </button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-4 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`flex items-center gap-2 py-2 px-4 ${activeTab === 'properties' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <HomeIcon className="h-4 w-4" />
          Properties
        </button>
        <button
          onClick={() => setActiveTab('agents')}
          className={`flex items-center gap-2 py-2 px-4 ${activeTab === 'agents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <UsersIcon className="h-4 w-4" />
          Agents
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex items-center gap-2 py-2 px-4 ${activeTab === 'messages' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <EnvelopeIcon className="h-4 w-4" />
          Messages
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
        >
          <StarIcon className="h-4 w-4" />
          Reviews
        </button>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DashboardCard icon={<HomeIcon className="h-6 w-6" />} title="Total Properties" value={stats.totalProperties.toString()} />
            <DashboardCard icon={<UsersIcon className="h-6 w-6" />} title="Total Agents" value={stats.totalAgents.toString()} />
            <DashboardCard
              icon={<EnvelopeIcon className="h-6 w-6" />}
              title="New Messages"
              value={stats.totalContacts.toString()}
              onClick={() => setActiveTab('messages')}
              clickable
            />
            <DashboardCard
              icon={<StarIcon className="h-6 w-6" />}
              title="Reviews"
              value={stats.totalTestimonials.toString()}
              onClick={() => setActiveTab('reviews')}
              clickable
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentProperties properties={properties.slice(0, 3)} />
            <RecentMessages contacts={contacts} />
          </div>
        </>
      )}

      {activeTab === 'properties' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Property Management</h2>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Property
            </button>
          </div>

          {showForm && (
            <Card className="rounded-2xl shadow-md border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Price</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bedrooms</label>
                      <input
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Bathrooms</label>
                      <input
                        type="number"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Area (sq ft)</label>
                      <input
                        type="number"
                        value={formData.area}
                        onChange={(e) => setFormData({...formData, area: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Images</label>
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => updateImageField(index, e.target.value)}
                            className="flex-1 p-2 border rounded-lg"
                            placeholder="Image URL"
                          />
                          <button
                            type="button"
                            onClick={() => removeImageField(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addImageField}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Add Image
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Videos</label>
                      {formData.videos.map((video, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="url"
                            value={video}
                            onChange={(e) => updateVideoField(index, e.target.value)}
                            className="flex-1 p-2 border rounded-lg"
                            placeholder="Video URL"
                          />
                          <button
                            type="button"
                            onClick={() => removeVideoField(index)}
                            className="px-3 py-2 bg-red-500 text-white rounded-lg"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addVideoField}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Add Video
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : (editingProperty ? 'Update Property' : 'Add Property')}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Properties List */}
          <div className="grid gap-4">
            {loading ? (
              <p>Loading properties...</p>
            ) : properties.length === 0 ? (
              <p>No properties found. Add your first property!</p>
            ) : (
              properties.map((property) => (
                <Card key={property._id} className="rounded-2xl shadow-md border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{property.title}</h3>
                          <p className="text-gray-600">{property.location}</p>
                          <p className="text-blue-600 font-bold">${property.price.toLocaleString()}</p>
                          <div className="flex gap-4 text-sm text-gray-500 mt-1">
                            <span>{property.bedrooms} beds</span>
                            <span>{property.bathrooms} baths</span>
                            <span>{property.area} sq ft</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(property._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Message Management</h2>
          <div className="grid gap-4">
            {loading ? (
              <p>Loading messages...</p>
            ) : contacts.length === 0 ? (
              <p>No messages found.</p>
            ) : (
              contacts.map((contact) => (
                <Card key={contact._id} className="rounded-2xl shadow-md border border-gray-200">
                  <CardContent className="p-4">
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-gray-600">{contact.email}</p>
                      <p className="text-gray-600 text-sm mt-2">{contact.message}</p>
                      <p className="text-gray-400 text-xs mt-1">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Testimonials Management</h2>
            <button
              onClick={() => setShowTestimonialForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Testimonial
            </button>
          </div>

          {showTestimonialForm && (
            <Card className="rounded-2xl shadow-md border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                </h3>
                <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={testimonialFormData.name}
                        onChange={(e) => setTestimonialFormData({...testimonialFormData, name: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Approved</label>
                      <select
                        value={testimonialFormData.approved}
                        onChange={(e) => setTestimonialFormData({...testimonialFormData, approved: e.target.value === 'true'})}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      value={testimonialFormData.message}
                      onChange={(e) => setTestimonialFormData({...testimonialFormData, message: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : (editingTestimonial ? 'Update Testimonial' : 'Add Testimonial')}
                    </button>
                    <button
                      type="button"
                      onClick={cancelTestimonialEdit}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Testimonials List */}
          <div className="grid gap-4">
            {loading ? (
              <p>Loading testimonials...</p>
            ) : testimonials.length === 0 ? (
              <p>No testimonials found. Add your first testimonial!</p>
            ) : (
              testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="rounded-2xl shadow-md border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-gray-600 text-sm mt-2">{testimonial.message}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(testimonial.createdAt).toLocaleDateString()}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${testimonial.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {testimonial.approved ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTestimonialEdit(testimonial)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleTestimonialDelete(testimonial._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'agents' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Agents Management</h2>
            <button
              onClick={() => setShowAgentForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Agent
            </button>
          </div>

          {showAgentForm && (
            <Card className="rounded-2xl shadow-md border border-gray-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingAgent ? 'Edit Agent' : 'Add New Agent'}
                </h3>
                <form onSubmit={handleAgentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        value={agentFormData.name}
                        onChange={(e) => setAgentFormData({...agentFormData, name: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={agentFormData.email}
                        onChange={(e) => setAgentFormData({...agentFormData, email: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        value={agentFormData.phone}
                        onChange={(e) => setAgentFormData({...agentFormData, phone: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Experience (years)</label>
                      <input
                        type="number"
                        value={agentFormData.experience}
                        onChange={(e) => setAgentFormData({...agentFormData, experience: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                      type="url"
                      value={agentFormData.image}
                      onChange={(e) => setAgentFormData({...agentFormData, image: e.target.value})}
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Facebook</label>
                      <input
                        type="url"
                        value={agentFormData.facebook}
                        onChange={(e) => setAgentFormData({...agentFormData, facebook: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Instagram</label>
                      <input
                        type="url"
                        value={agentFormData.instagram}
                        onChange={(e) => setAgentFormData({...agentFormData, instagram: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Twitter</label>
                      <input
                        type="url"
                        value={agentFormData.twitter}
                        onChange={(e) => setAgentFormData({...agentFormData, twitter: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : (editingAgent ? 'Update Agent' : 'Add Agent')}
                    </button>
                    <button
                      type="button"
                      onClick={cancelAgentEdit}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Agents List */}
          <div className="grid gap-4">
            {loading ? (
              <p>Loading agents...</p>
            ) : agents.length === 0 ? (
              <p>No agents found. Add your first agent!</p>
            ) : (
              agents.map((agent) => (
                <Card key={agent._id} className="rounded-2xl shadow-md border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{agent.name}</h3>
                          <p className="text-gray-600">{agent.experience} years of experience</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAgentEdit(agent)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAgentDelete(agent._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard Card Component
function DashboardCard({ icon, title, value, onClick, clickable }) {
  return (
    <Card
      className={`shadow-md rounded-2xl p-4 bg-white border border-gray-200 ${clickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">{icon}</div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <h2 className="text-2xl font-semibold">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}

// Recent Properties Component
function RecentProperties({ properties = [] }) {
  const demoProperties = [
    { id: 1, name: "Luxury Villa", price: "$420,000" },
    { id: 2, name: "2BHK Apartment", price: "$220,000" },
    { id: 3, name: "Modern Studio", price: "$120,000" },
  ];

  const displayProperties = properties.length > 0 ? properties : demoProperties;

  return (
    <Card className="rounded-2xl shadow-md border border-gray-200">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Recent Properties</h2>
        <ul className="space-y-3">
          {displayProperties.map((p) => (
            <li key={p._id || p.id} className="p-3 border rounded-xl hover:bg-gray-50 flex justify-between">
              <span>{p.title || p.name}</span>
              <span className="font-semibold text-blue-600">${p.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

// Recent Messages Component
function RecentMessages({ contacts = [] }) {
  const demoMessages = [
    { id: 1, name: "Rohit Kumar", message: "Interested in the villa" },
    { id: 2, name: "Aisha Khan", message: "Want a 2BHK quick" },
    { id: 3, name: "John David", message: "Requesting pricing details" },
  ];

  const displayMessages = contacts.length > 0 ? contacts.slice(0, 3).map((contact, index) => ({
    id: contact._id || index,
    name: contact.name,
    message: contact.message
  })) : demoMessages;

  return (
    <Card className="rounded-2xl shadow-md border border-gray-200">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
        <ul className="space-y-3">
          {displayMessages.map((m) => (
            <li key={m.id} className="p-3 border rounded-xl hover:bg-gray-50">
              <p className="font-semibold">{m.name}</p>
              <p className="text-gray-600 text-sm">{m.message}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
