import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/apiService';
import './Contact.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message text is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please type a slightly longer message (min 10 chars)';
    }
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);
    const response = await apiService.post('/contact', formData, null, null);
    setIsSending(false);

    if (response.success) {
      setSendSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTimeout(() => {
        setSendSuccess(false);
      }, 4000);
    } else {
      setErrors(response.errors || { global: 'Failed to deliver message. Check backend connection.' });
    }
  };

  return (
    <div className="contact-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We are here to help you coordinate your dental care.</p>
        </div>
      </header>

      <section className="section contact-cards-section">
        <div className="container grid-cols-3">
          <div className="contact-card">
            <div className="contact-icon-box">
              <Phone size={24} />
            </div>
            <h3>Call Us</h3>
            <p>Speak to our desk coordinator</p>
            <a href="tel:+919876543210" className="contact-link">+91 98765 43210</a>
          </div>

          <div className="contact-card">
            <div className="contact-icon-box">
              <MapPin size={24} />
            </div>
            <h3>Visit Clinic</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.4', margin: '0 10px' }}>
              Shop no5, Anandi Niwas, opp. Twinkle Towers, opp. HIGHLAND PARK, Yashaswi Nagar, Dhokali, Thane West, Thane, Maharashtra 400607
            </p>
            <a 
              href="https://maps.app.goo.gl/v8p2e8jUBKuQ8sxx8?g_st=aw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-link"
              style={{ marginTop: 'auto' }}
            >
              Open in Google Maps
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-icon-box">
              <Mail size={24} />
            </div>
            <h3>Email Us</h3>
            <p>For records, insurance & general inquiries</p>
            <a href="mailto:info@thegoldentooth.com" className="contact-link">info@thegoldentooth.com</a>
          </div>
        </div>
      </section>

      <section className="section form-map-section">
        <div className="container contact-grid">
          
          <div className="contact-form-wrapper">
            <div className="contact-form-box">
              <h2>Send a Quick Query</h2>
              <p className="desc">Have a question? Fill in the form and we will reply to your inbox within 2 hours.</p>

              {errors.global && (
                <div className="global-error-box animate-fade-in">
                  <AlertCircle size={20} />
                  <span>{errors.global}</span>
                </div>
              )}

              {sendSuccess ? (
                <div className="success-overlay-box">
                  <div className="check-success-icon">
                    <Check size={32} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Your message has been delivered to Dr. Kriti's front desk. We will respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'error-border' : ''}`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'error-border' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-subject">Subject (Optional)</label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`form-input ${errors.message ? 'error-border' : ''}`}
                      placeholder="Type details about your query..."
                    ></textarea>
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary contact-submit-btn"
                    disabled={isSending}
                  >
                    {isSending ? 'Sending...' : 'Send Message'}
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
export default Contact;
