import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Gallery.css';
import { optimizeThumbnailImage, optimizeHeroImage } from '../utils/imageOptimizer';
import API_URL from '../config/api';

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // FIX: Added a guard to prevent toLowerCase() on undefined status
  const getStatusIcon = (status = '') => {
    if (!status) return 'fa-star';
    return status.toLowerCase().includes('sold') ? 'fa-lock' : 'fa-star';
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const fetchGalleryData = async () => {
    try {
      // FIX: Added API_URL to fetch requests to prevent 404 errors
      const [galleryResponse, projectResponse] = await Promise.all([
        axios.get(`${API_URL}/api/gallery`),
        axios.get(`${API_URL}/api/projects/panchi-vihar`)
      ]);
      
      setGalleryImages(galleryResponse.data || []);
      
      if (projectResponse.data.data && projectResponse.data.data.gallery) {
        const images = projectResponse.data.data.gallery.map((imageUrl, idx) => ({
          _id: `panchi-vihar-${idx}`,
          imageUrl: imageUrl,
          description: 'Panchi Vihar Project',
          status: 'Available'
        }));
        setProjectImages(images);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container">
          <h2>
            <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
            Panchi Vihar Glimpses
          </h2>
          <div className="gold-border"></div>
          <p style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: '#8b6f4c' }}>
            <i className="fas fa-om icon-saffron" aria-hidden="true" style={{ marginRight: '10px' }}></i>
            Loading divine gallery...
          </p>
        </div>
      </section>
    );
  }

  const allImages = [...projectImages, ...galleryImages];

  return (
    <>
      <section className="section">
        <div className="container">
          <h2>
            <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
            Panchi Vihar Glimpses
          </h2>
          <div className="gold-border"></div>
          
          {allImages.length > 0 ? (
            <>
              <div className="masonry-grid">
                {allImages.map((item) => (
                  <div 
                    key={item._id} 
                    className="mason-item"
                    onClick={() => setSelectedImage(item.imageUrl)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={optimizeThumbnailImage(item.imageUrl)} 
                      alt={`${item.description || 'Panchi Vihar residential plot in Ayodhya'} - Premium property near Ram Mandir with modern amenities`} 
                      loading="lazy"
                    />
                    {/* FIX: Safe check for status before calling toLowerCase */}
                    <span className={`badge ${(item.status || '').toLowerCase().includes('sold') ? 'sold' : ''}`}>
                      <i
                        className={`fas ${getStatusIcon(item.status)} icon-saffron`}
                        aria-hidden="true"
                        style={{ marginRight: '8px' }}
                      ></i>
                      {item.status || 'Available'}
                    </span>
                  </div>
                ))}
              </div>
              <p style={{ textAlign: 'center', marginTop: '1rem', fontStyle: 'italic', color: '#8b6f4c' }}>
                more plots opening soon – register below
              </p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <i className="fas fa-om icon-saffron" aria-hidden="true" style={{ marginRight: '10px' }}></i>
              <p style={{ fontSize: '1.2rem', color: '#8b6f4c' }}>
                Gallery is being prepared. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={optimizeHeroImage(selectedImage)} 
              alt="Panchi Vihar Ayodhya property - Detailed view of premium residential plots and green landscapes" 
              className="lightbox-image" 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
