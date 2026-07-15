import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Column 1: Brand */}
        <div className="footer-column footer-brand">
          <div className="footer-logo-wrapper">
            <img 
              src={require('../assets/1767128358114.jpg.jpeg')} 
              alt="Ayodhya Estates Logo" 
              className="footer-logo-image"
            />
            <div className="footer-logo-text">
              <h3 className="footer-logo">Ayodhya Estates</h3>
              <p className="footer-brand-tagline">Building the Future of Holy Ayodhya</p>
            </div>
          </div>
          <p className="footer-tagline">Premium residential developments creating lasting value through exceptional design, quality, and community.</p>
          
          <div className="social-links">
            <a href="https://wa.me/919919000021" target="_blank" rel="noopener noreferrer" className="social-icon" title="WhatsApp">
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
            <a href="https://instagram.com/ayodhyaestates" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a href="https://facebook.com/ayodhyaestates" target="_blank" rel="noopener noreferrer" className="social-icon" title="Facebook">
              <i className="fab fa-facebook-f" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-column">
          <h4 className="footer-column-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects/panchi-vihar">Panchi Vihar</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/inquiry">Inquiry</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div className="footer-column">
          <h4 className="footer-column-title">Contact Us</h4>
          <div className="contact-item">
            <i className="fas fa-map-marker-alt icon-saffron" aria-hidden="true"></i>
            <span>Ayodhya, Uttar Pradesh, India</span>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone-alt icon-saffron" aria-hidden="true"></i>
            <a href="tel:+919919000021">+91 9919000021</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-envelope icon-saffron" aria-hidden="true"></i>
            <a href="mailto:estatesayodhya2223@gmail.com">estatesayodhya2223@gmail.com</a>
          </div>
        </div>

        {/* Column 4: Project Highlights */}
        <div className="footer-column">
          <h4 className="footer-column-title">Panchi Vihar</h4>
          <ul className="highlights-list">
            <li><i className="fas fa-star icon-saffron" aria-hidden="true"></i> Flagship Development</li>
            <li><i className="fas fa-home icon-saffron" aria-hidden="true"></i> World-Class Amenities</li>
            <li><i className="fas fa-handshake icon-saffron" aria-hidden="true"></i> Expert Support</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <div className="copyright-section">
            <p>© 2024-2026 Ayodhya Estates. All rights reserved. | Building Tomorrow's Ayodhya Today</p>
            <p className="disclaimer">*Visuals are for representation. No prices mentioned.</p>
          </div>
          <Link to="/admin" className="staff-login" title="Staff Login">
            <i className="fas fa-lock icon-saffron" aria-hidden="true"></i>
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
