import React from 'react';
import Connectivity from '../components/Connectivity';
import Footer from '../components/Footer';

const ConnectivityPage = () => {
  return (
    <div>
      <section style={{ paddingTop: '6rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid #FFD700',
              color: '#b45f1a',
              padding: '0.5rem 1.2rem',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              <i className="fas fa-plane-departure icon-saffron" aria-hidden="true"></i>
              <span>Sacred Destinations</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.8rem',
              color: '#2e241f',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Connectivity to Divine Destinations
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#8b7e6e',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Experience seamless access to sacred places and essential destinations from Panchi Vihar
            </p>
          </div>
        </div>
      </section>

      <Connectivity />
      
      <Footer />
    </div>
  );
};

export default ConnectivityPage;
