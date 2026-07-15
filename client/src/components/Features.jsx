import React from 'react';
import './Features.css';

const Features = () => {
  const highlights = [
    { icon: 'fa-leaf', title: 'Vastu compliant', desc: 'spiritual geometry, positive energy' },
    { icon: 'fa-cloud-sun', title: 'sacred views', desc: 'subtle Saryu breeze, open spaces' },
    { icon: 'fa-seedling', title: 'green buffer', desc: '35% afforestation, divine walking trails' },
    { icon: 'fa-certificate', title: 'temple trust approved', desc: 'clear title, immediate possession' }
  ];

  return (
    <section className="section features-section py-16" id="features">
      <div className="container">
        <span className="highlight-tag">
          <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
          divine moments
          <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
        </span>
        <h2>
          <i className="fas fa-star icon-saffron" aria-hidden="true" style={{ marginRight: '10px' }}></i>
          Divine Connectivity
        </h2>
        <div className="gold-border"></div>

        {/* Project Highlights */}
        <div className="highlights-grid">
          {highlights.map((item, index) => (
            <div key={index} className="highlight-card">
              <i className={`fas ${item.icon} highlight-icon icon-saffron`} aria-hidden="true"></i>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
