import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';
import './Testimonials.css';

export const Testimonials = () => {
  return (
    <div className="testimonials-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>Reviews & Location</h1>
          <p>Share your experience and find our dental clinic easily</p>
        </div>
      </header>

      <section className="section reviews-display-section">
        <div className="container grid-layout-reviews">
          
          {/* Left Column: Direct Google Reviews Card */}
          <div className="google-invite-column">
            <div className="google-invite-card">
              <span className="section-subtitle text-gold">Patient Feedback</span>
              <h2>Share Your Experience</h2>
              <p className="invite-description">
                Thank you for choosing <strong>The Golden Tooth Clinic</strong>. Your valuable feedback on Google helps us continually elevate our clinical care standards and helps other patients discover world-class dental care.
              </p>
              
              <div className="rating-visual">
                <div className="invite-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={32} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
                <span className="rating-label">5.0 Star Rated Clinic</span>
              </div>

              <a 
                href="https://search.google.com/local/writereview?placeid=ChIJha0lqBa55zsRHhGcg0GtP2k" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary direct-google-btn"
              >
                <span>Write a Review on Google</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Card */}
          <div className="map-column">
            <div className="map-wrapper-card">
              <div className="map-card-header">
                <MapPin className="text-gold" size={20} />
                <h3>Visit Clinic Location</h3>
              </div>
              <div className="map-card-body">
                <iframe
                  title="The Golden Tooth Clinic Location"
                  src="https://maps.google.com/maps?q=Shop%20no5,%20Anandi%20Niwas,%20opp.%20Twinkle%20Towers,%20opp.%20HIGHLAND%20PARK,%20Dhokali,%20Thane%20West&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
export default Testimonials;
