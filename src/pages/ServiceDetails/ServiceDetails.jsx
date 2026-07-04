import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Coins, ShieldCheck, CheckSquare, 
  Sparkles, ClipboardList, CalendarCheck 
} from 'lucide-react';
import { ServiceController } from '../../controllers/ServiceController';
import './ServiceDetails.css';

export const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = useMemo(() => {
    return ServiceController.getServiceById(id);
  }, [id]);

  if (!service) {
    return (
      <div className="container service-not-found section flex-center">
        <div className="not-found-box">
          <ShieldCheck size={64} className="text-gold" />
          <h2>Treatment Not Found</h2>
          <p>We couldn't locate the dental service you are looking for. It may have been renamed or relocated.</p>
          <Link to="/services" className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to All Treatments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-details-page animate-fade-in">
      <div className="details-nav-bar">
        <div className="container">
          <button onClick={() => navigate('/services')} className="back-btn-link">
            <ArrowLeft size={16} />
            Back to Services List
          </button>
        </div>
      </div>

      <header className="details-header">
        <div className="container">
          <span className="details-tag">{service.category} Treatment</span>
          <h1>{service.title}</h1>
          <p className="details-summary">{service.summary}</p>
        </div>
      </header>

      <section className="section specs-section">
        <div className="container grid-cols-2">
          <div className="specs-details-content">
            <div className="details-block">
              <span className="block-subtitle">Treatment Overview</span>
              <h2>About the Procedure</h2>
              <p className="block-desc">{service.details.overview}</p>
            </div>

            <div className="specs-meta-cards">
              <div className="meta-card">
                <Clock className="meta-icon" size={20} />
                <div>
                  <h4>Average Duration</h4>
                  <p>{service.details.duration}</p>
                </div>
              </div>
              <div className="meta-card">
                <Coins className="meta-icon text-gold" size={20} />
                <div>
                  <h4>Estimated Investment</h4>
                  <p>{service.details.priceRange}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="specs-illustration-box">
            <div className="visual-graphic-container">
              <Sparkles size={80} className="visual-glow-icon" />
              <h3>The Golden Tooth Care</h3>
              <p>Premium Grade Dental Care with Dr. Kriti Ghagre</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="container">
          <span className="section-subtitle">Methodology</span>
          <h2 className="section-title">Step-by-Step Procedure</h2>
          <p className="section-desc">Here is what you can expect during your clinic visit.</p>

          <div className="steps-list-box">
            {service.details.steps.map((step, idx) => (
              <div className="step-list-item" key={idx}>
                <div className="step-num-badge">{idx + 1}</div>
                <div className="step-txt-box">
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section recovery-section">
        <div className="container">
          <div className="recovery-box-container">
            <div className="recovery-header">
              <ClipboardList className="recovery-icon" size={28} />
              <h2>Post-Care & Recovery Guidelines</h2>
            </div>
            <p className="recovery-intro">To ensure optimal healing and lock in standard-setting results, please follow these guidelines:</p>
            <ul className="recovery-list">
              {service.details.recoveryTips.map((tip, idx) => (
                <li key={idx}>
                  <CheckSquare size={16} className="tip-bullet text-gold" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section details-cta-section">
        <div className="container details-cta-container">
          <h2>Ready to Schedule this Treatment?</h2>
          <p>Book a consultation slot with Dr. Kriti Ghagre. We will pre-fill the form with your selected treatment choice.</p>
          <Link 
            to="/book" 
            state={{ selectedTreatment: service.title }}
            className="btn btn-primary btn-lg"
          >
            <CalendarCheck size={18} />
            Book {service.title} Appointment
          </Link>
        </div>
      </section>
    </div>
  );
};
export default ServiceDetails;
