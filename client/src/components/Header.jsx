import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' }
  ];

  const isActiveLink = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    if (href === '/projects') {
      return location.pathname === '/projects' || location.pathname.startsWith('/projects/');
    }
    return location.pathname === href;
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`header-fixed ${isScrolled ? 'header-scrolled' : ''}`}
      >
        <div className="header-container">
          <Link to="/" className="header-logo">
            <img 
              src={require('../assets/1767128358114.jpg.jpeg')} 
              alt="Ayodhya Estates Logo" 
              className="logo-image"
            />
            <div className="logo-text-group">
              <span className="logo-text">Ayodhya Estates</span>
            </div>
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="header-right">
            <Link to="/inquiry" className="cta-button desktop-only">
              <i className="fas fa-envelope cta-icon" aria-hidden="true"></i>
              <span>Inquiry Now</span>
            </Link>
            <a href="tel:+919919000021" className="mobile-call-button mobile-only">
              <i className="fas fa-phone-alt icon-saffron" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </header>

      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <img 
              src={require('../assets/1767128358114.jpg.jpeg')} 
              alt="Ayodhya Estates Logo" 
              className="mobile-logo-image"
            />
            <div className="mobile-logo-text">
              <span>Ayodhya Estates</span>
              <p>Building the Future of Holy Ayodhya</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="close-button"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={handleNavClick}
              className={`mobile-nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <a href="tel:+919919000021" className="mobile-cta-button">
            <i className="fas fa-phone-alt icon-saffron" aria-hidden="true"></i>
            <span>Call for Inquiry</span>
          </a>
          <p className="mobile-contact">+91 99190 00021</p>
          <p className="mobile-tagline">
            <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
            श्री राम
            <i className="fas fa-om icon-saffron" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;