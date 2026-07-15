import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Projects.css';
import SkeletonCard from './SkeletonCard';
import { optimizeThumbnailImage } from '../utils/imageOptimizer';
import { fetchProjects } from '../utils/fetchWithTimeout';
import API_URL from '../config/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = await fetchProjects(API_URL);
      setProjects(data || []);
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

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.status === activeFilter);

  const truncateDescription = (text = '', maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleRetry = () => {
    loadProjects();
  };

  if (error) {
    return (
      <div className="projects-message-container">
        <p className="projects-message error">Error: {error}</p>
        <button 
          onClick={handleRetry}
          className="retry-button"
          style={{
            marginTop: '1rem',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'white',
            backgroundColor: 'var(--saffron)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Poppins', sans-serif"
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <i className="fas fa-redo" style={{ marginRight: '0.5rem' }}></i>
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="projects-section">
      <div className="projects-header">
        <h1>Our Divine Portfolio</h1>
        <p>Discover premium residential and commercial landmarks crafted by Ayodhya Estates.</p>
      </div>

      <div className="filter-container">
        <button
          className={activeFilter === 'All' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>
        <button
          className={activeFilter === 'Ongoing' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('Ongoing')}
        >
          Ongoing
        </button>
        <button
          className={activeFilter === 'Upcoming' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('Upcoming')}
        >
          Upcoming
        </button>
        <button
          className={activeFilter === 'Completed' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('Completed')}
        >
          Completed
        </button>
      </div>

      <div className="projects-grid">
        {loading ? (
          // Display 6 skeleton cards while loading
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          filteredProjects.map((project) => (
            <Link 
              key={project._id} 
              to={`/projects/${project.slug}`}
              className="project-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="image-wrapper">
                <img 
                  src={optimizeThumbnailImage(project.heroImage)} 
                  alt={`${project.name} - ${project.status} residential project in Ayodhya offering premium plots and properties`}
                  loading="lazy"
                />
                <span className="status-badge">{project.status}</span>
              </div>

              <div className="card-content">
                <h3>{project.name}</h3>
                <p className="location">
                  <i className="fas fa-map-marker-alt"></i>
                  {project.location || project.tagline || 'Ayodhya'}
                </p>
                <p className="description">
                  {truncateDescription(project.description)}
                </p>
              </div>

              <div className="card-highlights">
                {Array.isArray(project.amenities) && project.amenities.slice(0, 2).map((amenity, index) => (
                  <span key={index}>{amenity}</span>
                ))}
              </div>

              <div className="card-footer">
                <div className="btn-view">
                  View Project
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {!loading && filteredProjects.length === 0 && (
        <div className="projects-message-container">
          <p className="projects-message">No projects found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default Projects;
