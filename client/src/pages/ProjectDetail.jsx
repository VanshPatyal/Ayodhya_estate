import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import './ProjectDetail.css';
import { optimizeHeroImage, optimizeThumbnailImage } from '../utils/imageOptimizer';
import { fetchProjectBySlug } from '../utils/fetchWithTimeout';
import API_URL from '../config/api';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const API_BASE = API_URL;

  const loadProject = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Requesting project:", slug);
      const data = await fetchProjectBySlug(API_BASE, slug);
      setProject(data);
    } catch (err) {
      console.error("Fetch failure:", err);
      setError(err.message || 'Failed to load project');
    } finally {
      setLoading(false);
    }
  }, [slug, API_BASE]);

  useEffect(() => {
    if (slug) {
      loadProject();
    }
  }, [slug, loadProject]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const getIconClass = (icon) => {
    if (!icon) return 'fa-map-marker-alt';
    const iconMap = {
      temple: 'fa-gopuram',
      plane: 'fa-plane-departure',
      airport: 'fa-plane-departure',
      water: 'fa-water',
      sun: 'fa-sun',
      praying: 'fa-praying-hands',
      train: 'fa-train',
      bus: 'fa-bus',
      hospital: 'fa-hospital',
      school: 'fa-school',
      mall: 'fa-shopping-bag',
      restaurant: 'fa-utensils'
    };
    return iconMap[icon.toLowerCase()] || 'fa-map-marker-alt';
  };

  const handleRetry = () => {
    loadProject();
  };

  if (loading) {
    return (
      <div className="project-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading divine details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-error">
        <h1 className="error-title">Oops!</h1>
        <p className="error-message">{error || 'Project not found'}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          {error && (
            <button onClick={handleRetry} className="error-button" style={{ cursor: 'pointer' }}>
              <i className="fas fa-redo" style={{ marginRight: '0.5rem' }}></i>
              Retry
            </button>
          )}
          <a href="/" className="error-button">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail">
      <div 
        className="project-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${optimizeHeroImage(project.heroImage)})`
        }}
      >
        <div className="project-hero-content">
          <h1 className="project-hero-title">{project.name}</h1>
          <p className="project-hero-tagline">{project.tagline}</p>
          <span className="project-badge">{project.status}</span>
        </div>
      </div>

      <section className="project-about">
        <div className="project-container">
          <div className="about-content">
            <h2 className="section-title">About The Project</h2>
            <p className="about-description">{project.description}</p>
          </div>
        </div>
      </section>

      {project.connectivity && project.connectivity.length > 0 && (
        <section className="project-connectivity">
          <div className="project-container">
            <span className="connectivity-highlight-tag">
              <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
              sacred connections
              <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
            </span>
            <h2 className="connectivity-section-title">Connectivity to Sacred Destinations</h2>
            <div className="gold-border-connectivity"></div>
            
            <div className="connectivity-grid-home">
              {project.connectivity.map((point, idx) => (
                <div key={`connectivity-${idx}`} className="conn-item">
                  <i className={`fas ${getIconClass(point.icon)} conn-icon icon-saffron`} aria-hidden="true"></i>
                  <span className="conn-name">{point.destination}</span>
                  <div className="conn-time">{point.time}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.amenities && project.amenities.length > 0 && (
        <section className="project-amenities">
          <div className="project-container">
            <h2 className="section-title">Divine Features & Amenities</h2>
            <div className="amenities-grid">
              {project.amenities.map((amenity, idx) => (
                <div key={`amenity-${idx}`} className="amenity-item">
                  <span className="amenity-check">✓</span>
                  <span className="amenity-text">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="project-gallery">
          <div className="project-container">
            <h2 className="section-title section-title-light">Project Gallery</h2>
            <div className="masonry-gallery">
              {project.gallery.map((image, idx) => (
                <div 
                  key={`gallery-${idx}`} 
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                  style={{ cursor: 'pointer' }}
                >
                  <img 
                    src={optimizeThumbnailImage(image)} 
                    alt={`${project.name} - Gallery view ${idx + 1} showing residential plots, amenities and project features in Ayodhya`} 
                    className="gallery-image" 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="project-cta">
        <div className="project-container">
          <div className="interest-split-container">
            <div className="interest-map-col">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.5829124!2d82.0173!3d26.7322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399a071e5e5e5e5d%3A0x0!2zMjbCsDQzJzU1LjgiTiA4MsKwMDEnMDQuNCJF!5e0!3m2!1sen!2sin!4v1708600000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px', borderRadius: '8px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Panchi Vihar Location Map"
              ></iframe>
            </div>
            <div className="interest-form-col">
              <h2 className="cta-title">Interested in This Project?</h2>
              <p className="cta-description">Get in touch with our team to learn more about this exclusive property</p>
              <a href="/inquiry" className="cta-button">Schedule Inquiry</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={optimizeHeroImage(selectedImage)} 
              alt={`${project.name} Ayodhya - High resolution view of residential property and development features`} 
              className="lightbox-image" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
