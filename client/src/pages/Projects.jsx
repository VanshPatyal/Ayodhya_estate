import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { optimizeThumbnailImage } from '../utils/imageOptimizer';
import { fetchProjects } from '../utils/fetchWithTimeout';
import API_URL from '../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchProjects(API_URL);
      setProjects(data || []);
      setFilteredProjects(data || []);
    } catch (err) {
      console.error("Projects Fetch Error:", err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleFilter = (status) => {
    setActiveFilter(status);
    
    if (status === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.status === status));
    }
  };

  const handleRetry = () => {
    loadProjects();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF9F3' }}>
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-4 rounded-full animate-spin" style={{ borderTopColor: '#FF9933' }}></div>
          </div>
          <p className="mt-6 text-xl" style={{ color: '#6F4E37' }}>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFF9F3' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#6F4E37' }}>Error</h1>
          <p className="text-xl mb-6" style={{ color: '#8B6F47' }}>{error}</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleRetry}
              className="px-6 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
              style={{ backgroundColor: '#FF9933' }}
            >
              <i className="fas fa-redo" style={{ marginRight: '0.5rem' }}></i>
              Retry
            </button>
            <Link to="/" className="px-6 py-3 text-white font-semibold rounded-lg transition hover:shadow-lg" style={{ backgroundColor: '#6F4E37' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF9F3', minHeight: 'calc(100vh - 60px)' }} className="pt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 
            className="text-6xl font-bold mb-4"
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: '#6F4E37'
            }}
          >
            Our Projects
          </h1>
          <p 
            className="text-xl"
            style={{ 
              color: '#8B6F47',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Discover our curated collection of premium real estate developments
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['All', 'Upcoming', 'Ongoing', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => handleFilter(status)}
              className={`px-8 py-3 rounded-full font-semibold transition`}
              style={{
                backgroundColor: activeFilter === status ? '#FF9933' : '#F5E6D3',
                color: activeFilter === status ? 'white' : '#6F4E37',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              {status}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl" style={{ color: '#8B6F47' }}>
              No projects found for this filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
                style={{ backgroundColor: 'white' }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={optimizeThumbnailImage(project.heroImage)}
                    alt={`${project.name} - ${project.status} residential project in Ayodhya with premium plots and modern amenities`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span
                    className="absolute top-4 right-4 px-4 py-2 rounded-full text-white font-semibold text-sm"
                    style={{ backgroundColor: '#FF9933' }}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="p-6">
                  <h3
                    className="text-2xl font-bold mb-2 line-clamp-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: '#6F4E37'
                    }}
                  >
                    {project.name}
                  </h3>

                  <p
                    className="text-sm mb-4 line-clamp-2"
                    style={{
                      color: '#8B6F47',
                      fontFamily: "'Poppins', sans-serif"
                    }}
                  >
                    {project.tagline}
                  </p>

                  <div className="flex gap-3 text-sm mb-6" style={{ color: '#FF9933' }}>
                    {project.amenities && project.amenities.slice(0, 2).map((amenity, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        ✓ {amenity}
                      </span>
                    ))}
                    {project.amenities && project.amenities.length > 2 && (
                      <span>+{project.amenities.length - 2} more</span>
                    )}
                  </div>

                  <Link
                    to={`/projects/${project.slug}`}
                    className="block w-full text-center py-3 text-white font-semibold rounded-lg transition hover:shadow-lg"
                    style={{ backgroundColor: '#FF9933' }}
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
