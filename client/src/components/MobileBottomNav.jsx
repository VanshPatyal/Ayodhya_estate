import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Home, Building2, Info, MessageCircle } from 'lucide-react';
import './MobileBottomNav.css';

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home, isLink: true },
    { name: 'Projects', path: '/projects', icon: Building2, isLink: true },
    { name: 'About', path: '/about', icon: Info, isLink: true },
    { name: 'Inquiry', path: '/inquiry', icon: MessageCircle, isLink: true }
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    if (path === '/projects') {
      return location.pathname === '/projects' || location.pathname.startsWith('/projects/');
    }
    return location.pathname === path;
  };

  return (
    <nav className="mobile-bottom-nav-wrapper">
      <div className="mobile-bottom-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveLink(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              title={item.name}
            >
              <div className="nav-item-content">
                <Icon size={24} className="nav-icon" />
                <span className="nav-label">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
