      import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import api from '../api/api';
  import { Card, CardContent } from './ui/card';

  const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const getMediaArray = () => {
    const images = property?.images || (property?.image ? [property.image] : []);
    const videos = property?.videos || [];
    return [...images, ...videos];
  };

  const nextMedia = () => {
    const media = getMediaArray();
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevMedia = () => {
    const media = getMediaArray();
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [propertyData, agentsData] = await Promise.all([
            api.getProperty(id),
            api.getAgents()
          ]);

          if (propertyData?.property) {
            setProperty(propertyData.property);
            setCurrentMediaIndex(0); // Reset to first media when property changes
          } else {
            setError('Property not found');
          }

          if (agentsData?.agents) {
            setAgents(agentsData.agents);
          }
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('Failed to load property details');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id]);

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            Loading property details...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Property Details */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
              Property Details
            </h1>

            <Card className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative">
                  <div className="h-96 overflow-hidden rounded-lg">
                    {(() => {
                      const media = getMediaArray();
                      if (media.length === 0) {
                        return (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Media Available</span>
                          </div>
                        );
                      }
                      const currentItem = media[currentMediaIndex];
                      const isVideo = property.videos && property.videos.includes(currentItem);
                      const isYouTube = currentItem && (currentItem.includes('youtube.com') || currentItem.includes('youtu.be'));

                      if (isVideo) {
                        if (isYouTube) {
                          // Extract video ID from YouTube URL
                          const videoId = currentItem.includes('youtu.be/')
                            ? currentItem.split('youtu.be/')[1].split('?')[0]
                            : currentItem.split('v=')[1].split('&')[0];
                          const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                          return (
                            <iframe
                              src={embedUrl}
                              title={`Property Video ${currentMediaIndex + 1}`}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          );
                        } else {
                          return (
                            <video
                              src={currentItem}
                              controls
                              className="w-full h-full object-cover"
                              preload="metadata"
                            >
                              Your browser does not support the video tag.
                            </video>
                          );
                        }
                      } else {
                        return (
                          <img
                            src={currentItem}
                            alt={`${property.title} ${currentMediaIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                        );
                      }
                    })()}
                  </div>
                  {getMediaArray().length > 1 && (
                    <>
                      <button
                        onClick={prevMedia}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 cursor-pointer"
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 cursor-pointer"
                      >
                        ›
                      </button>
                    </>
                  )}
                  {getMediaArray().length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {getMediaArray().map((item, index) => {
                        const isVideo = property.videos && property.videos.includes(item);
                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentMediaIndex(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer ${
                              index === currentMediaIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            } ${isVideo ? 'ring-2 ring-red-500' : ''}`}
                            title={isVideo ? 'Video' : 'Image'}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
                <CardContent className="md:w-1/2 p-8">
                  <h2 className="text-3xl font-semibold mb-4">{property.title}</h2>
                  <p className="text-blue-600 font-bold text-2xl mb-4">
                    ${property.price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 mb-4">{property.location}</p>
                  <p className="text-gray-700 mb-6">{property.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl">🛏</div>
                      <p className="font-semibold">{property.bedrooms} Bedrooms</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">🛁</div>
                      <p className="font-semibold">{property.bathrooms} Bathrooms</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">📐</div>
                      <p className="font-semibold">{property.area} sq ft</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">🏠</div>
                      <p className="font-semibold capitalize">{property.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      property.status === 'available' ? 'bg-green-100 text-green-800' :
                      property.status === 'sold' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </span>
                  </div>
                </CardContent>
            </div>
          </Card>
        </div>

          {/* Agents Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Our Agents
            </h2>

            {agents.length === 0 ? (
              <p className="text-center text-gray-600">No agents available</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {agents.map((agent) => (
                  <Card key={agent._id} className="bg-white rounded-xl shadow hover:shadow-xl transition">
                    <CardContent className="p-6">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-semibold text-center mb-2">{agent.name}</h3>
                      <p className="text-gray-600 text-center mb-2">{agent.email}</p>
                      <p className="text-gray-600 text-center mb-2">{agent.phone}</p>
                      <p className="text-gray-700 text-center mb-4">{agent.bio}</p>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Experience: {agent.experience} years</p>
                        {agent.specialties && agent.specialties.length > 0 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Specialties: {agent.specialties.join(', ')}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center space-x-4 mt-4">
                      {agent.facebook && (
                        <a href={agent.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                          Facebook
                        </a>
                      )}
                      {agent.instagram && (
                        <a href={agent.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                          Instagram
                        </a>
                      )}
                      {agent.twitter && (
                        <a href={agent.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                          Twitter
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
