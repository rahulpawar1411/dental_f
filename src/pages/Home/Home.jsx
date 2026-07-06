import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Calendar, ArrowRight, UserCheck,
  Award, ShieldCheck, Heart, Sparkles, Smile, Star, Clock, MapPin, Mail, Phone,
  ClipboardCheck, Shield, Activity, Crown, Grid, Baby,
  Compass, HeartPulse, AlertTriangle, ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';
import { ServiceController } from '../../controllers/ServiceController';
import { faqData } from '../../data/faqData';
import logoImg from '../../assets/logo.png';
import './Home.css';
import doctorImg from '../../assets/doctor_new.jpg';

const iconMap = {
  ClipboardCheck,
  Sparkles,
  Shield,
  Activity,
  Crown,
  Grid,
  Baby,
  Compass,
  HeartPulse,
  AlertTriangle
};

const whyChooseUsData = [
  {
    title: "Experienced Dentist",
    description: "Dr. Kriti Ghagre brings over 12 years of specialized expertise in aesthetic and general dentistry.",
    icon: <Award className="why-icon" size={24} />
  },
  {
    title: "Latest Equipment",
    description: "We use state-of-the-art intraoral scanners, 3D CT digital imaging, and painless laser technology.",
    icon: <CheckCircle className="why-icon" size={24} />
  },
  {
    title: "Pain-Free Treatment",
    description: "Our advanced micro-dentistry techniques and mild anesthetics ensure a comfortable, stress-free visit.",
    icon: <Heart className="why-icon" size={24} />
  },
  {
    title: "Sterilized Instruments",
    description: "We enforce strict, medical-grade autoclave sterilization and clean-room clinical protocols.",
    icon: <ShieldCheck className="why-icon" size={24} />
  },
  {
    title: "Emergency Care",
    description: "Immediate relief slots reserved daily for severe toothaches, accidents, and broken restorations.",
    icon: <Clock className="why-icon" size={24} />
  },
  {
    title: "Comfortable Environment",
    description: "Relax in our luxurious, calming lounge featuring soft ambient soundscapes and warm beverages.",
    icon: <Smile className="why-icon" size={24} />
  }
];

const extendedChooseUsData = [
  ...whyChooseUsData.slice(-3),
  ...whyChooseUsData,
  ...whyChooseUsData.slice(0, 3)
];

export const Home = () => {
  const featuredServices = ServiceController.filterServices().slice(0, 4);
  const featuredFaqs = faqData.slice(0, 4);

  const [openFaq, setOpenFaq] = useState(null);
  const [currentChooseIndex, setCurrentChooseIndex] = useState(3); // Start at index 3 (first real item)
  const [visibleChooseCards, setVisibleChooseCards] = useState(3);
  const [isTransitionActive, setIsTransitionActive] = useState(true);

  React.useEffect(() => {
    const handleChooseResize = () => {
      if (window.innerWidth < 768) {
        setVisibleChooseCards(1);
      } else if (window.innerWidth < 992) {
        setVisibleChooseCards(2);
      } else {
        setVisibleChooseCards(3);
      }
    };
    handleChooseResize();
    window.addEventListener('resize', handleChooseResize);
    return () => window.removeEventListener('resize', handleChooseResize);
  }, []);

  const nextChooseSlide = () => {
    if (!isTransitionActive) return;
    setCurrentChooseIndex((prev) => prev + 1);
  };

  const prevChooseSlide = () => {
    if (!isTransitionActive) return;
    setCurrentChooseIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    // boundary check: 3 is start of real items, 9 is end (index 3 + 6)
    if (currentChooseIndex >= 3 + whyChooseUsData.length) {
      setIsTransitionActive(false);
      setCurrentChooseIndex(3);
    } else if (currentChooseIndex <= 2) {
      setIsTransitionActive(false);
      setCurrentChooseIndex(3 + whyChooseUsData.length - 1); // index 8
    }
  };

  React.useEffect(() => {
    if (!isTransitionActive) {
      const timer = setTimeout(() => {
        setIsTransitionActive(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [isTransitionActive]);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextChooseSlide();
    } else if (isRightSwipe) {
      prevChooseSlide();
    }
  };

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-badge stagger-up">The Golden Tooth Dental Clinic</span>
            <h1 className="hero-title stagger-up delay-100">
              Healthy Smile <br />
              <span className="text-highlight">Begins Here</span>
            </h1>
            <p className="hero-subtitle stagger-up delay-200">
              Premium Dental Care by <strong>Dr. Kriti Ghagre</strong>
            </p>
            <p className="hero-description stagger-up delay-200">
              Experience the next generation of dentistry. We combine luxury dental acoustics, pain-free therapies, and state-of-the-art oral healthcare designed with absolute precision.
            </p>
            <div className="hero-ctas stagger-up delay-300">
              <Link to="/book" className="btn btn-primary">
                <Calendar size={18} />
                Book Appointment
              </Link>
              <Link to="/services" className="btn btn-secondary">
                Explore Services
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="hero-visual stagger-scale-in delay-200">
            <div className="visual-canvas">
              <img src={logoImg} alt="The Golden Tooth Logo" className="tooth-img" />
            </div>

            <div className="floating-card badge-1">
              <UserCheck size={18} className="badge-icon" />
              <div>
                <h4>Experienced Dentist</h4>
                <p>Dr. Kriti Ghagre</p>
              </div>
            </div>

            <div className="floating-card badge-2">
              <ShieldCheck size={18} className="badge-icon" />
              <div>
                <h4>Modern Equipment</h4>
                <p>100% Digital Scans</p>
              </div>
            </div>

            <div className="floating-card badge-3">
              <Sparkles size={18} className="badge-icon text-gold" />
              <div>
                <h4>Patient Satisfaction</h4>
                <p>99.2% Rated 5-Stars</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Introduction Section */}
      <section className="section home-about-section">
        <div className="container grid-cols-2">
          <div className="about-visual-box">
            <div className="avatar-frame">
              <div className="floating-card profile-badge-overlay">
                <Award size={18} className="badge-icon text-gold" />
                <div>
                  <h4 className="exp-number">12+ Years</h4>
                  <p className="exp-text">Of Excellence</p>
                </div>
              </div>
              <img src={doctorImg} alt="Dr. Kriti Ghagre" className="doctor-profile-img" />
            </div>
          </div>

          <div className="about-intro-content">
            <span className="section-subtitle">Meet Our Founder</span>
            <h2 className="about-intro-title">Dr. Kriti Ghagre</h2>
            <p className="doctor-credentials">B.D.S, M.D.S (Cosmetic & Restorative Dentistry)</p>
            <p className="about-text">
              Dr. Kriti Ghagre is a passionate dental surgeon dedicated to creating gorgeous, healthy smiles. She believes that visiting a dental clinic should not be a cause of anxiety, which is why she designed **The Golden Tooth** with soft, calming acoustics and non-invasive methods.
            </p>
            <div className="philosophy-highlights">
              <div className="ph-item">
                <CheckCircle size={18} className="ph-icon text-gold" />
                <span>Friendly, Pain-Free Patient Care</span>
              </div>
              <div className="ph-item">
                <CheckCircle size={18} className="ph-icon text-gold" />
                <span>Modern, FDA-Approved Technology</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-secondary">
              Read Full Biography
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section why-choose-section">
        <div className="container">
          <span className="section-subtitle">Our Promise</span>
          <h2 className="section-title">Why Patients Choose Us</h2>
          <p className="section-desc">We deliver dental care with absolute precision, top-notch hygiene, and unmatched comfort.</p>

          <div className="why-slider-wrapper">
            <button className="slider-control prev" onClick={prevChooseSlide} aria-label="Previous slide">
              <ChevronLeft size={20} />
            </button>
            
            <div 
              className="why-slider-container"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div 
                className={`why-slider-track ${isTransitionActive ? '' : 'no-transition'}`}
                style={{ 
                  transform: `translateX(-${currentChooseIndex * (100 / visibleChooseCards)}%)`
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedChooseUsData.map((item, index) => (
                  <div 
                    className="why-card-wrapper" 
                    key={index}
                    style={{
                      flex: `0 0 ${100 / visibleChooseCards}%`
                    }}
                  >
                    <div className="why-card">
                      <div className="why-icon-box">{item.icon}</div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="slider-control next" onClick={nextChooseSlide} aria-label="Next slide">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="why-slider-dots">
            {whyChooseUsData.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${((currentChooseIndex - 3) % 6 + 6) % 6 === i ? 'active' : ''}`}
                onClick={() => {
                  setIsTransitionActive(true);
                  setCurrentChooseIndex(3 + i);
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="section services-preview-section">
        <div className="container">
          <span className="section-subtitle">What We Do</span>
          <h2 className="section-title">Featured Dental Services</h2>
          <p className="section-desc">From diagnostic routine scans to full aesthetic restorations, discover our premier dental services.</p>

          <div className="services-grid grid-cols-4">
            {featuredServices.map((service) => {
              const IconComponent = iconMap[service.icon] || Sparkles;
              return (
                <div className="service-card" key={service.id}>
                  <div className="service-icon-wrapper">
                    <IconComponent size={24} className="service-icon" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <Link to={`/services/${service.id}`} className="service-link">
                    Learn Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="center-cta">
            <Link to="/services" className="btn btn-primary">
              View All 15 Services
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Process Timeline */}
      <section className="section process-section">
        <div className="container">
          <span className="section-subtitle">Your Journey</span>
          <h2 className="section-title">Our Treatment Process</h2>
          <p className="section-desc">We keep our treatment pathway transparent, organized, and straightforward.</p>

          <div className="timeline-horizontal">
            <div className="timeline-step">
              <div className="step-num">1</div>
              <h3>Consultation</h3>
              <p>Meet Dr. Kriti to discuss oral health and aesthetic goals.</p>
            </div>
            <div className="timeline-step">
              <div className="step-num">2</div>
              <h3>Diagnosis</h3>
              <p>We use 3D intraoral digital scans to assess structure.</p>
            </div>
            <div className="timeline-step">
              <div className="step-num">3</div>
              <h3>Treatment Plan</h3>
              <p>Receive a clear roadmap of milestones and price ranges.</p>
            </div>
            <div className="timeline-step">
              <div className="step-num">4</div>
              <h3>Procedure</h3>
              <p>Relax in the chair while we execute pain-free care.</p>
            </div>
            <div className="timeline-step">
              <div className="step-num">5</div>
              <h3>Follow Up</h3>
              <p>We check healing progress and provide recovery care packs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section className="section home-faq-section">
        <div className="container">
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">Common Questions</h2>

          <div className="faq-accordion-list">
            {featuredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div className={`faq-item-box ${isOpen ? 'active' : ''}`} key={faq.id}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(faq.id)}>
                    <span>{faq.question}</span>
                    <span className="faq-arrow-wrapper">
                      <ChevronDown className={`faq-chevron-icon ${isOpen ? 'rotated' : ''}`} size={20} />
                    </span>
                  </button>
                  <div className="faq-answer-pane">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="center-cta">
            <Link to="/faq" className="btn btn-secondary">
              Browse Full FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Home Contact Details Block */}
      <section className="section home-contact-details-block">
        <div className="container">
          <div className="grid-cols-2">
            
            {/* Column 1: Contact Information */}
            <div className="home-contact-info-card">
              <span className="section-subtitle">Find Us</span>
              <h2>Clinic Information</h2>
              <p className="contact-intro-desc">Feel free to drop by or reach out to us via call or email for any treatment records or consultations.</p>
              
              <div className="home-contact-details-list">
                <div className="detail-item">
                  <div className="detail-icon-box">
                    <MapPin className="text-gold" size={20} />
                  </div>
                  <div className="detail-text-box">
                    <h4>Clinic Address</h4>
                    <p>Shop no5, Anandi Niwas, opp. Twinkle Towers, opp. HIGHLAND PARK, Yashaswi Nagar, Dhokali, Thane West, Thane, Maharashtra 400607</p>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon-box">
                    <Phone className="text-gold" size={20} />
                  </div>
                  <div className="detail-text-box">
                    <h4>Phone Number</h4>
                    <a href="tel:+919876543210">+91 98765 43210</a>
                  </div>
                </div>

                <div className="detail-item">
                  <div className="detail-icon-box">
                    <Mail className="text-gold" size={20} />
                  </div>
                  <div className="detail-text-box">
                    <h4>Email Address</h4>
                    <a href="mailto:info@thegoldentooth.com">info@thegoldentooth.com</a>
                  </div>
                </div>
              </div>

              <div className="contact-action-btn-box">
                <Link to="/book" className="btn btn-primary">
                  Book Appointment Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Column 2: Google Map Feature */}
            <div className="home-contact-map-card">
              <div className="map-card-header">
                <h3>Location Map</h3>
                <p>Located in Dhokali, Thane West for easy accessibility.</p>
              </div>
              
              <div className="google-map-iframe-container">
                <iframe 
                  src="https://maps.google.com/maps?q=Shop%20no5%2C%20Anandi%20Niwas%2C%20opp.%20Twinkle%20Towers%2C%20opp.%20HIGHLAND%20PARK%2C%20Yashaswi%20Nagar%2C%20Dhokali%2C%20Thane%20West%2C%20Thane%2C%20Maharashtra%20400607&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="220" 
                  style={{ border: 0, borderRadius: 'var(--radius-md)' }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="The Golden Tooth Clinic Location Map"
                ></iframe>
              </div>

              <a 
                href="https://maps.app.goo.gl/v8p2e8jUBKuQ8sxx8?g_st=aw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary map-external-link-btn"
              >
                Open in Google Maps
              </a>
              <p className="review-invite-line" style={{ marginTop: '12px', fontSize: '13px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Loved our clinical care? <a href="https://search.google.com/local/writereview?placeid=ChIJha0lqBa55zsRHhGcg0GtP2k" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', fontWeight: '600', textDecoration: 'underline' }}>Write a review on Google</a>!
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
