import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './InquiryForm.css';
import API_URL from '../config/api';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Please fill in required fields');
      return;
    }

    setSubmitting(true);

    try {
      // Added a timeout of 15 seconds to allow Render to wake up
      const response = await axios.post(`${API_URL}/api/inquiry`, formData, {
        timeout: 15000 
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Thank you! Our team will call you within 24 hrs. Jai Shri Ram!');
        setFormData({ name: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error.code === 'ECONNABORTED') {
        toast.error('The server is taking too long to respond. It may be waking up—please try again in a moment.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
      }
    } finally {
      // This block runs no matter what, preventing the button from being stuck on "Submitting..."
      setSubmitting(false);
    }
  };

  return (
    <section className="section" id="inquiry-panchi">
      <div className="container">
        <div className="form-container">
          <h2 style={{ borderLeftColor: 'var(--gold)', marginBottom: '1.2rem' }}>
            <i className="fas fa-om icon-saffron" aria-hidden="true" style={{ marginRight: '10px' }}></i>
            Request Inquiry <br />
            <span style={{ fontSize: '1.6rem' }}>for Panchi Vihar</span>
          </h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
            our team will guide you through the divine plots
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number *"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                rows="4"
                name="message"
                placeholder="Message / preferred date & time"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn-gold" disabled={submitting}>
              {submitting ? (
                <>
                  <i className="fas fa-spinner fa-spin icon-saffron" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-envelope icon-saffron" aria-hidden="true" style={{ marginRight: '10px' }}></i>
                  Request Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
