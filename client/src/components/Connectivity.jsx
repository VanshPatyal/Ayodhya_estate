import React from 'react';
import './Connectivity.css';

// 1. Helper function defined outside the main component for clarity
const getIconClass = (icon) => {
  if (!icon) return 'fa-map-marker-alt';

  // If it's already a FontAwesome class, return it
  if (typeof icon === 'string' && icon.startsWith('fa-')) {
    return icon;
  }

  const iconMap = {
    temple: 'fa-gopuram',
    airport: 'fa-plane-departure',
    plane: 'fa-plane-departure',
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

const Connectivity = ({ connectivityData }) => {
  // Fallback data if the database array is empty
  const fallbackData = [
    { icon: 'airport', destination: 'Ayodhya Airport', time: '15 Mins' },
    { icon: 'temple', destination: 'Ram Janmabhoomi', time: '30 Mins' },
    { icon: 'water', destination: 'Saryu Ghat', time: '35 Mins' },
    { icon: 'sun', destination: 'Kanak Bhawan', time: '32 Mins' },
    { icon: 'praying', destination: 'Hanuman Garhi', time: '30 Mins' }
  ];

  const data = connectivityData && connectivityData.length > 0
    ? connectivityData
    : fallbackData;

  return (
    <section className="section connectivity-section py-16" id="connectivity">
      <div className="container">
        <span className="highlight-tag">
          <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
          sacred connections
          <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
        </span>
        <h2>Connectivity to Sacred Destinations</h2>
        <div className="gold-border"></div>

        <div className="connectivity-grid">
          {data.map((item, index) => (
            <div key={index} className="conn-item">
              <i 
                className={`fas ${getIconClass(item.icon)} conn-icon icon-saffron`} 
                aria-hidden="true"
              ></i>
              <span className="conn-name">{item.destination || item.name}</span>
              <div className="time">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// This must be at the very bottom, outside of all functions
export default Connectivity;
