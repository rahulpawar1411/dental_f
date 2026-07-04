import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ClipboardCheck, Sparkles, Shield, Activity, Scissors, Layers, 
  Smile, Sun, Crown, Grid, Compass, Baby, HeartPulse, AlertTriangle, ArrowRight 
} from 'lucide-react';
import { ServiceController } from '../../controllers/ServiceController';
import './Services.css';

const iconMap = {
  ClipboardCheck,
  Sparkles,
  Shield,
  Activity,
  Scissors,
  Layers,
  Smile,
  Sun,
  Crown,
  Grid,
  Compass,
  Baby,
  HeartPulse,
  AlertTriangle
};

export const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return ServiceController.getCategories();
  }, []);

  const filteredServices = useMemo(() => {
    return ServiceController.filterServices(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="services-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>Our Dental Services</h1>
          <p>World-Class Dental Care & Advanced Restorations</p>
        </div>
      </header>

      <section className="section search-filter-section">
        <div className="container">
          <div className="search-filter-wrapper">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="search-box">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search treatments (e.g. root canal, veneers)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section grid-section">
        <div className="container">
          {filteredServices.length > 0 ? (
            <div className="services-cards-grid">
              {filteredServices.map((service) => {
                const IconComponent = iconMap[service.icon] || Sparkles;
                return (
                  <div className="service-card-item" key={service.id}>
                    <div className="card-top">
                      <span className="service-tag">{service.category}</span>
                      <div className="service-icon-box">
                        <IconComponent size={24} />
                      </div>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                    <Link to={`/services/${service.id}`} className="learn-more-link">
                      <span>Learn Treatment Details</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-results">
              <h3>No Treatments Found</h3>
              <p>We couldn't find any services matching "{searchQuery}". Try selecting a different category or refining your keywords.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section quick-book-cta">
        <div className="container quick-book-container">
          <div className="quick-book-text">
            <h2>Need a Custom Dental Consultation?</h2>
            <p>Dr. Kriti Ghagre will perform a thorough 3D scan and outline a personalized treatment roadmap.</p>
          </div>
          <Link to="/book" className="btn btn-accent">
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};
export default Services;
