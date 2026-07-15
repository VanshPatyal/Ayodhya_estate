import React from 'react';
import './Highlights.css';

const Highlights = () => {
  // HARDCODED connectivity times - CRUCIAL as per requirement
  const connectivityData = [
    { icon: 'fa-plane-departure', name: 'Ayodhya Airport', time: '15 Mins' },
    { icon: 'fa-gopuram', name: 'Ram Janmabhoomi / Ram Mandir', time: '30 Mins' },
    { icon: 'fa-water', name: 'Saryu Ghat', time: '35 Mins' },
    { icon: 'fa-gopuram', name: 'Kanak Bhawan', time: '32 Mins' },
    { icon: 'fa-gopuram', name: 'Hanuman Garhi', time: '30 Mins' }
  ];

  const highlights = [
    { icon: 'fa-star', title: 'Vastu compliant', desc: 'spiritual geometry, positive energy' },
    { icon: 'fa-star', title: 'sacred views', desc: 'subtle Saryu breeze, open spaces' },
    { icon: 'fa-star', title: 'green buffer', desc: '35% afforestation, divine walking trails' },
    { icon: 'fa-star', title: 'temple trust approved', desc: 'clear title, immediate possession' }
  ];

  return (
    <section className="section" id="connectivity">
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

        {/* CONNECTIVITY GRID - Exact times hardcoded */}
        <h3 className="connectivity-title">
          <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
          connectivity to sacred destinations
        </h3>
        <div className="connectivity">
          {connectivityData.map((item, index) => (
            <div key={index} className="conn-item">
              <i className={`fas ${item.icon} conn-icon icon-saffron`} aria-hidden="true"></i>
              <span>{item.name}</span>
              <div className="time">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
