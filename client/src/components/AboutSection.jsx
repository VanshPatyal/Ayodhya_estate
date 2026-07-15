import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  const features = [
    {
      icon: 'fa-building',
      title: 'Premium Development',
      description: 'Crafting exceptional residential communities with attention to every detail.'
    },
    {
      icon: 'fa-handshake',
      title: 'Customer Commitment',
      description: 'Dedicated support from conception to completion and beyond.'
    },
    {
      icon: 'fa-gem',
      title: 'Quality Excellence',
      description: 'World-class amenities, materials, and construction standards.'
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Strategic Locations',
      description: 'Prime positions near major landmarks with excellent connectivity.'
    }
  ];

  return (
    <section className="about-section py-16">
      <div className="container">
        <div className="about-header">
          <div className="about-tag">
            <i className="fas fa-landmark icon-saffron" aria-hidden="true"></i>
            <span>About Ayodhya Estates</span>
          </div>
          <h2 className="about-title">
            Building the Future of Holy Ayodhya
          </h2>
        </div>

        <div className="about-content">
          <div className="about-text-left">
            <div className="about-description">
              <p className="about-para-highlight">
                Ayodhya Estates is a visionary real estate development company dedicated to creating exceptional residential communities in Ayodhya. We believe in combining spiritual heritage with modern living, creating spaces that honor the region's divine significance while providing contemporary comfort and convenience.
              </p>
              <p>
                Our flagship project, <strong>Panchi Vihar</strong>, represents our commitment to excellence—a premier residential township designed for families seeking quality of life in one of India's most spiritually significant locations.
              </p>
              <div className="about-mission">
                <h3>Our Mission</h3>
                <p>To develop sustainable, community-focused residential spaces that enhance quality of life while honoring Ayodhya's cultural and spiritual heritage. We are committed to transparency, quality, and customer satisfaction in every project we undertake.</p>
              </div>
            </div>
          </div>
          
          <div className="about-highlights">
            <h3>The Ayodhya Estates Advantage</h3>
            
            <div className="highlight-box">
              <i className="fas fa-om highlight-icon"></i>
              <h4>Spiritually Enriched Locations</h4>
              <p>Prime land located in the divine embrace of Ayodhya.</p>
            </div>

            <div className="highlight-box">
              <i className="fas fa-shield-alt highlight-icon"></i>
              <h4>Secure & Clear Titles</h4>
              <p>100% legally verified documents for complete peace of mind.</p>
            </div>

            <div className="highlight-box">
              <i className="fas fa-road highlight-icon"></i>
              <h4>Premium Infrastructure</h4>
              <p>Wide roads, modern amenities, and secure gated living.</p>
            </div>
          </div>
        </div>
        <br></br>
        <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={`fas ${feature.icon} icon-saffron`} aria-hidden="true"></i>
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="about-map-section">
          <h2>Our Divine Location: Ayodhya</h2>
          <iframe 
    src="https://maps.google.com/maps?q=Ayodhya%2C%20Uttar%20Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed" 
    width="100%" 
    height="450" 
    style={{ border: 0 }} 
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    title="Ayodhya Location Map"
></iframe>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
