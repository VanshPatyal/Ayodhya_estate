import React, { useState, useCallback } from 'react';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    status: 'Upcoming',
    heroImage: '',
    amenities: [],
    connectivity: [],
    gallery: []
  });

  const [amenityInput, setAmenityInput] = useState('');
  const [connectivityInput, setConnectivityInput] = useState({
    destination: '',
    time: '',
    icon: ''
  });
  const [galleryInput, setGalleryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleAddAmenity = useCallback(() => {
    if (amenityInput.trim()) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()]
      }));
      setAmenityInput('');
    }
  }, [amenityInput]);

  const handleRemoveAmenity = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  }, []);

  const handleConnectivityInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setConnectivityInput(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleAddConnectivity = useCallback(() => {
    if (connectivityInput.destination.trim() && connectivityInput.time.trim()) {
      setFormData(prev => ({
        ...prev,
        connectivity: [...prev.connectivity, { ...connectivityInput }]
      }));
      setConnectivityInput({ destination: '', time: '', icon: '' });
    }
  }, [connectivityInput]);

  const handleRemoveConnectivity = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      connectivity: prev.connectivity.filter((_, i) => i !== index)
    }));
  }, []);

  const handleAddGalleryImage = useCallback(() => {
    if (galleryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, galleryInput.trim()]
      }));
      setGalleryInput('');
    }
  }, [galleryInput]);

  const handleRemoveGalleryImage = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.slug.trim()) {
      showToast('Name and slug are required', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      showToast('Project added successfully!', 'success');
      
      setFormData({
        name: '',
        slug: '',
        tagline: '',
        description: '',
        status: 'Upcoming',
        heroImage: '',
        amenities: [],
        connectivity: [],
        gallery: []
      });
    } catch (error) {
      showToast(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFF9F3' }}>
      {toast.show && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-2" style={{ color: '#6F4E37' }}>
            Add New Project
          </h1>
          <p className="text-lg" style={{ color: '#8B6F47' }}>
            Create a comprehensive project listing for your real estate portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-10" style={{ borderLeft: '6px solid #FF9933' }}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#6F4E37' }}>
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Project Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                  placeholder="e.g., project-name-slug"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                  placeholder="Short tagline for the project"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition resize-none"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                  placeholder="Detailed project description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-10" style={{ borderLeft: '6px solid #FF9933' }}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#6F4E37' }}>
              Media
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Hero Image URL
                </label>
                <input
                  type="url"
                  name="heroImage"
                  value={formData.heroImage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.heroImage && (
                  <div className="mt-4 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={formData.heroImage}
                      alt="Main banner preview for property listing"
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                  Gallery Images
                </label>
                <div className="flex gap-3 mb-6">
                  <input
                    type="url"
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                    style={{
                      borderColor: '#E8D5C4',
                      '--tw-ring-color': '#FF9933'
                    }}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={handleAddGalleryImage}
                    className="px-8 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
                    style={{ backgroundColor: '#FF9933' }}
                  >
                    Add Image
                  </button>
                </div>

                {formData.gallery.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.gallery.map((img, idx) => (
                      <div key={idx} className="relative group rounded-lg overflow-hidden shadow-md">
                        <img
                          src={img}
                          alt={`Gallery view ${idx + 1} - Property showcasing amenities and features`}
                          className="w-full h-32 object-cover"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-1 right-1 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-lg font-bold"
                          style={{ backgroundColor: 'rgba(220, 38, 38, 0.8)' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-10" style={{ borderLeft: '6px solid #FF9933' }}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#6F4E37' }}>
              Amenities
            </h2>

            <div className="space-y-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAmenity();
                    }
                  }}
                  className="flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                  style={{
                    borderColor: '#E8D5C4',
                    '--tw-ring-color': '#FF9933'
                  }}
                  placeholder="e.g., Swimming Pool, Gym, Garden, Playground"
                />
                <button
                  type="button"
                  onClick={handleAddAmenity}
                  className="px-8 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
                  style={{ backgroundColor: '#FF9933' }}
                >
                  Add Amenity
                </button>
              </div>

              {formData.amenities.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {formData.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 text-white px-4 py-2 rounded-full text-sm font-semibold transition hover:shadow-lg"
                      style={{ backgroundColor: '#FF9933' }}
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(idx)}
                        className="font-bold hover:text-red-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-10" style={{ borderLeft: '6px solid #FF9933' }}>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#6F4E37' }}>
              Connectivity Points
            </h2>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={connectivityInput.destination}
                    onChange={handleConnectivityInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                    style={{
                      borderColor: '#E8D5C4',
                      '--tw-ring-color': '#FF9933'
                    }}
                    placeholder="e.g., Airport, Station"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                    Distance/Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={connectivityInput.time}
                    onChange={handleConnectivityInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                    style={{
                      borderColor: '#E8D5C4',
                      '--tw-ring-color': '#FF9933'
                    }}
                    placeholder="e.g., 15 mins, 5 km"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: '#6F4E37' }}>
                    Icon/Type
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={connectivityInput.icon}
                    onChange={handleConnectivityInputChange}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition"
                    style={{
                      borderColor: '#E8D5C4',
                      '--tw-ring-color': '#FF9933'
                    }}
                    placeholder="e.g., plane, train, metro"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddConnectivity}
                className="w-full px-6 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
                style={{ backgroundColor: '#FF9933' }}
              >
                Add Connectivity Point
              </button>

              {formData.connectivity.length > 0 && (
                <div className="space-y-3">
                  {formData.connectivity.map((point, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg p-5 flex justify-between items-center border-2 transition hover:shadow-md"
                      style={{
                        backgroundColor: '#FFF9F3',
                        borderColor: '#E8D5C4'
                      }}
                    >
                      <div>
                        <p className="font-semibold" style={{ color: '#6F4E37' }}>
                          {point.destination}
                        </p>
                        <p className="text-sm" style={{ color: '#8B6F47' }}>
                          {point.time} • {point.icon || 'N/A'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveConnectivity(idx)}
                        className="text-red-500 hover:text-red-700 font-bold text-2xl"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 sticky bottom-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 text-white font-bold rounded-lg transition text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: loading ? '#9CA3AF' : '#FF9933' }}
            >
              {loading ? 'Submitting...' : 'Submit Project'}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-4 text-white font-bold rounded-lg transition text-lg hover:shadow-lg"
              style={{ backgroundColor: '#8B6F47' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;