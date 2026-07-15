import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Hero from '../components/Hero';
import Connectivity from '../components/Connectivity';
import Footer from '../components/Footer';
import { optimizeThumbnailImage, optimizeHeroImage } from '../utils/imageOptimizer';
import API_URL from '../config/api';
import './HomePage.css';

const HomePage = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Fetch using the API_URL from config (auto-detects localhost vs production)
        const response = await fetch(`${API_URL}/api/projects/panchi-vihar`);
        
        if (response.ok) {
          const data = await response.json();
          setProject(data.data);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <main>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Ayodhya Estate | Premium Residential Plots & Property in Ayodhya</title>
        <meta 
          name="description" 
          content="Ayodhya Estate offers premium residential plots in Ayodhya, including the exclusive Panchi Vihar project. Buy your dream land in the holy city near Ram Mandir." 
        />
        <meta 
          name="keywords" 
          content="Plots in Ayodhya, Property in Ayodhya, Panchi Vihar Ayodhya, Residential land, Ayodhya Estate" 
        />
        <meta name="author" content="Ayodhya Estate" />
        <link rel="canonical" href="https://ayodhyaestate.com/" />

        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ayodhyaestate.com/" />
        <meta property="og:title" content="Ayodhya Estate | Premium Residential Plots & Property in Ayodhya" />
        <meta 
          property="og:description" 
          content="Ayodhya Estate offers premium residential plots in Ayodhya, including the exclusive Panchi Vihar project. Buy your dream land in the holy city near Ram Mandir." 
        />
        <meta 
          property="og:image" 
          content="https://ayodhyaestate.com/images/panchi-vihar-og.jpg" 
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Ayodhya Estate" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://ayodhyaestate.com/" />
        <meta name="twitter:title" content="Ayodhya Estate | Premium Residential Plots & Property in Ayodhya" />
        <meta 
          name="twitter:description" 
          content="Ayodhya Estate offers premium residential plots in Ayodhya, including the exclusive Panchi Vihar project. Buy your dream land in the holy city near Ram Mandir." 
        />
        <meta 
          name="twitter:image" 
          content="https://ayodhyaestate.com/images/panchi-vihar-og.jpg" 
        />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Ayodhya, Uttar Pradesh" />
        <meta name="geo.position" content="26.7922;82.1998" />
        <meta name="ICBM" content="26.7922, 82.1998" />

        {/* JSON-LD Structured Data for LocalBusiness and RealEstateAgent */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "RealEstateAgent",
                "@id": "https://ayodhyaestate.com/#realestate",
                "name": "Ayodhya Estate",
                "description": "Premium residential plots and property dealer in Ayodhya. Specializing in RERA approved plots near Ram Mandir with modern amenities and excellent connectivity.",
                "url": "https://ayodhyaestate.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://ayodhyaestate.com/images/logo.jpg",
                  "width": 250,
                  "height": 250
                },
                "image": "https://ayodhyaestate.com/images/panchi-vihar-og.jpg",
                "telephone": "+91-9919000021",
                "email": "info@ayodhyaestate.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Panchi Vihar",
                  "addressLocality": "Ayodhya",
                  "addressRegion": "Uttar Pradesh",
                  "postalCode": "224001",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 26.7922,
                  "longitude": 82.1998
                },
                "areaServed": {
                  "@type": "City",
                  "name": "Ayodhya"
                },
                "priceRange": "₹₹-₹₹₹",
                "sameAs": [
                  "https://wa.me/919919000021"
                ],
                "knowsAbout": [
                  "Residential Plots",
                  "Real Estate Development",
                  "Property Investment",
                  "RERA Approved Properties"
                ],
                "makesOffer": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Product",
                      "name": "Residential Plots in Panchi Vihar",
                      "description": "Premium residential plots near Ram Mandir with modern amenities"
                    }
                  }
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9919000021",
                  "contactType": "sales",
                  "areaServed": "IN",
                  "availableLanguage": ["Hindi", "English"]
                }
              },
              {
                "@type": "LocalBusiness",
                "@id": "https://ayodhyaestate.com/#business",
                "name": "Ayodhya Estate",
                "alternateName": "Ayodhya Estates",
                "description": "Leading real estate developer in Ayodhya offering premium residential plots in Panchi Vihar. RERA approved properties with excellent connectivity to Ram Mandir and major landmarks.",
                "url": "https://ayodhyaestate.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://ayodhyaestate.com/images/logo.jpg"
                },
                "image": [
                  "https://ayodhyaestate.com/images/panchi-vihar-og.jpg"
                ],
                "telephone": "+91-9919000021",
                "email": "info@ayodhyaestate.com",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Panchi Vihar",
                  "addressLocality": "Ayodhya",
                  "addressRegion": "Uttar Pradesh",
                  "postalCode": "224001",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 26.7922,
                  "longitude": 82.1998
                },
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Sunday",
                    "opens": "10:00",
                    "closes": "16:00"
                  }
                ],
                "priceRange": "₹₹-₹₹₹",
                "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer",
                "currenciesAccepted": "INR",
                "sameAs": [
                  "https://wa.me/919919000021"
                ],
                "hasMap": "https://maps.google.com/?q=26.7922,82.1998",
                "potentialAction": {
                  "@type": "ReserveAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://ayodhyaestate.com/contact",
                    "actionPlatform": [
                      "http://schema.org/DesktopWebPlatform",
                      "http://schema.org/MobileWebPlatform"
                    ]
                  },
                  "result": {
                    "@type": "Reservation",
                    "name": "Property Inquiry"
                  }
                }
              },
              {
                "@type": "WebSite",
                "@id": "https://ayodhyaestate.com/#website",
                "url": "https://ayodhyaestate.com",
                "name": "Ayodhya Estate",
                "description": "Premium residential plots and properties in Ayodhya",
                "publisher": {
                  "@id": "https://ayodhyaestate.com/#business"
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://ayodhyaestate.com/projects?search={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "BreadcrumbList",
                "@id": "https://ayodhyaestate.com/#breadcrumb",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://ayodhyaestate.com/"
                  }
                ]
              }
            ]
          })}
        </script>
      </Helmet>

      <Hero />
      
      {!loading && project && (
        <section className="flagship-section">
          <div className="flagship-container">
            <h2 className="flagship-title">Our Flagship Project: Panchi Vihar</h2>
            
            <div className="flagship-slider-wrapper">
              <Slider {...sliderSettings} className="flagship-slider">
                {project.gallery && project.gallery.map((image, idx) => (
                  <div 
                    key={`flagship-${idx}`} 
                    className="flagship-slide"
                    onClick={() => setSelectedImage(image)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img 
                      src={optimizeThumbnailImage(image)} 
                      alt={`Premium residential plots at Panchi Vihar Ayodhya - View ${idx + 1} showcasing modern amenities and green landscapes`}
                      className="flagship-image"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="flagship-info">
              <h3>{project.name}</h3>
              <p className="flagship-tagline">{project.tagline}</p>
              <p className="flagship-description">{project.description}</p>
              <Link to="/projects/panchi-vihar" className="btn-explore">
                Explore Panchi Vihar
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </section>
      )}
      
      <Connectivity connectivityData={project?.connectivity} />
      <Footer />

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
              alt="Panchi Vihar Ayodhya - Full resolution view of premium residential plots near Ram Mandir" 
              className="lightbox-image" 
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;
