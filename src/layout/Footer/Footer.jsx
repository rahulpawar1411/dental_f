import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Clock, ArrowUp } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './Footer.css';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        {/* Info Column */}
        <div className="footer-col info-col">
          <Link to="/" className="footer-logo" onClick={scrollToTop}>
            <img src={logoImg} alt="The Golden Tooth Logo" className="footer-logo-img" />
            <div className="logo-separator"></div>
            <div className="logo-text-group">
              <span className="logo-main-text">The Golden Tooth</span>
              <span className="logo-sub-text">Multispeciality Dental clinic</span>
            </div>
          </Link>
          <p className="footer-tagline">
            Experience world-class dental care designed with luxury, comfort, and state-of-the-art precision by Dr. Kriti Ghagre.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col quick-links-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>About Doctor</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>Dental Services</Link></li>
            <li><Link to="/faq" onClick={scrollToTop}>Help FAQs</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Featured Services Column */}
        <div className="footer-col featured-treatments-col">
          <h3 className="footer-title">Featured Treatments</h3>
          <ul className="footer-links">
            <li><Link to="/services/smile-designing" onClick={scrollToTop}>Smile Designing</Link></li>
            <li><Link to="/services/invisible-aligners" onClick={scrollToTop}>Invisible Aligners</Link></li>
            <li><Link to="/services/dental-implants" onClick={scrollToTop}>Dental Implants</Link></li>
            <li><Link to="/services/root-canal-treatment" onClick={scrollToTop}>Root Canal Therapy</Link></li>
            <li><Link to="/services/teeth-whitening" onClick={scrollToTop}>Teeth Whitening</Link></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-col contact-col">
          <h3 className="footer-title">Clinic Details</h3>
          <ul className="contact-info-list">
            <li>
              <MapPin size={18} className="contact-icon text-gold" />
              <span>Shop no5, Anandi Niwas, opp. Twinkle Towers, opp. HIGHLAND PARK, Yashaswi Nagar, Dhokali, Thane West, Thane, Maharashtra 400607</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon text-gold" />
              <a href="tel:+919876543210">+91 98765 43210</a>
            </li>
            <li>
              <Mail size={18} className="contact-icon text-gold" />
              <a href="mailto:info@thegoldentooth.com">info@thegoldentooth.com</a>
            </li>
            <li>
              <Clock size={18} className="contact-icon text-gold" />
              <div>
                <strong>Mon - Sat:</strong> 9:30 AM - 8:30 PM <br />
                <strong>Sunday:</strong> By Appointment Only
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} The Golden Tooth. All rights reserved. Designed for Dr. Kriti Ghagre.
          </p>
          <div className="bottom-links">
            <a href="#privacy" className="bottom-link">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="#terms" className="bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
