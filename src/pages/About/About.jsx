import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Heart, ShieldCheck, Smile, Sparkles, HeartPulse, ChevronLeft, ChevronRight } from 'lucide-react';
import './About.css';
import doctorImg from '../../assets/doctor_new.jpg';

export const About = () => {
  const [pillarIndex, setPillarIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPillarDragging, setIsPillarDragging] = useState(false);
  
  const dragStartX = React.useRef(0);

  const highlights = [
    {
      title: "12+ Years Experience",
      description: "Over a decade of clinical excellence in cosmetic restorations, prosthodontics, and microscopic endodontics.",
      icon: <Award className="highlight-icon" size={24} />
    },
    {
      title: "Premium Materials",
      description: "We use only 100% bio-compatible, FDA-approved restorative composites and Swiss dental implants.",
      icon: <ShieldCheck className="highlight-icon" size={24} />
    },
    {
      title: "Unmatched Trust",
      description: "Thousands of happy families trust Dr. Kriti Ghagre for their cosmetic and routine family dental health.",
      icon: <Heart className="highlight-icon" size={24} />
    },
    {
      title: "Silent Acoustics",
      description: "Our clinic lounge and operatory utilize acoustic dampening to eliminate stress-inducing dental tool hums.",
      icon: <Sparkles className="highlight-icon" size={24} />
    }
  ];

  const nextPillar = () => {
    if (slideOffset !== 0) return;
    setIsTransitioning(true);
    setSlideOffset(1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setPillarIndex((prev) => (prev + 1) % highlights.length);
      setSlideOffset(0);
    }, 500);
  };

  const prevPillar = () => {
    if (slideOffset !== 0) return;
    setIsTransitioning(true);
    setSlideOffset(-1);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setPillarIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
      setSlideOffset(0);
    }, 500);
  };

  const handleDragStart = (clientX) => {
    dragStartX.current = clientX;
    setIsPillarDragging(true);
  };

  const handleDragEnd = (clientX) => {
    if (!isPillarDragging) return;
    setIsPillarDragging(false);
    const diffX = clientX - dragStartX.current;
    const threshold = 50; // scroll threshold in px
    if (diffX > threshold) {
      prevPillar();
    } else if (diffX < -threshold) {
      nextPillar();
    }
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return; // only left click
    handleDragStart(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!isPillarDragging) return;
  };

  const onMouseUp = (e) => {
    handleDragEnd(e.clientX);
  };

  const onMouseLeave = () => {
    setIsPillarDragging(false);
  };

  const onTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      handleDragEnd(e.changedTouches[0].clientX);
    } else {
      setIsPillarDragging(false);
    }
  };

  return (
    <div className="about-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>About Dr. Kriti Ghagre</h1>
          <p>Founder & Principal Dentist at The Golden Tooth Clinic</p>
        </div>
      </header>

      <section className="section bio-section">
        <div className="container grid-cols-2">
          <div className="bio-visual">
            <div className="doctor-frame">
              <img src={doctorImg} alt="Dr. Kriti Ghagre" className="doctor-profile-img" />
              <div className="credentials-overlay">
                <h3>Dr. Kriti Ghagre</h3>
                <p>BDS, MDS — Aesthetic Specialist</p>
              </div>
            </div>
          </div>

          <div className="bio-content">
            <span className="section-subtitle">Biography</span>
            <h2>Crafting Smiles with Passion and Precision</h2>
            <p className="bio-paragraph">
              Dr. Kriti Ghagre is a distinguished cosmetic dentist and restorative specialist. With a Master of Dental Surgery (MDS) in Prosthodontics, she has dedicated her career to integrating advanced dental surgery techniques with the aesthetics of facial symmetry.
            </p>
            <p className="bio-paragraph">
              Before founding **The Golden Tooth**, Dr. Kriti practiced as a consultant endodontist at leading multi-specialty hospitals. She realized that clinical success is only half the battle; the actual patient experience matters just as much. She designed this clinic to replace dental anxiety with luxury, comfort, and state-of-the-art diagnostic clarity.
            </p>
            
            <div className="accreditations">
              <div className="acc-item">
                <strong>Member:</strong> Indian Academy of Aesthetic & Cosmetic Dentistry (IAACD)
              </div>
              <div className="acc-item">
                <strong>Certified:</strong> Advanced Micro-Endodontics & Implants (Zimmer Biomet, Switzerland)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section mission-vision-section">
        <div className="container grid-cols-2">
          <div className="mv-card mission-card">
            <div className="mv-icon-wrapper">
              <Sparkles size={28} className="text-gold" />
            </div>
            <h2>Our Clinic Mission</h2>
            <p>
              To deliver world-class dental care that restores optimal oral health, enhances self-esteem through customized smile designs, and respects patient comfort by providing a completely relaxed, stress-free operatory environment.
            </p>
          </div>

          <div className="mv-card vision-card">
            <div className="mv-icon-wrapper">
              <Compass size={28} />
            </div>
            <h2>Our Clinic Vision</h2>
            <p>
              To set the benchmark for modern dental care. We aim to stay at the leading edge of medical technology, incorporating digital scanning, artificial-intelligence-driven treatment modeling, and pain-free dentistry into every therapy.
            </p>
          </div>
        </div>
      </section>

      <section className="section highlights-section">
        <div className="container">
          <span className="section-subtitle">Our Philosophy</span>
          <h2 className="section-title">Core Pillars of Our Practice</h2>
          <p className="section-desc">Every treatment we perform is anchored in these four foundational values.</p>

          <div className="pillar-slider-outer">
            <button className="slider-control prev" onClick={prevPillar} aria-label="Previous pillar">
              <ChevronLeft size={20} />
            </button>

            <div 
              className="pillar-slider-container"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              style={{ cursor: isPillarDragging ? 'grabbing' : 'grab' }}
            >
              <div 
                className="pillar-slider-track"
                style={{ 
                  transform: `translateX(calc(-1 * var(--pillar-card-width) / 2 - ${2 + slideOffset} * (var(--pillar-card-width) + var(--pillar-card-gap))))`,
                  transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                }}
              >
                {(() => {
                  const len = highlights.length;
                  const visibleCards = [
                    highlights[(pillarIndex - 2 + len) % len],
                    highlights[(pillarIndex - 1 + len) % len],
                    highlights[pillarIndex],
                    highlights[(pillarIndex + 1) % len],
                    highlights[(pillarIndex + 2) % len]
                  ];
                  return visibleCards.map((hl, trackIndex) => {
                    const isActive = trackIndex === 2 + slideOffset;
                    const realIndex = (pillarIndex - 2 + trackIndex + len) % len;
                    return (
                      <div 
                        className={`pillar-card-wrapper ${isActive ? 'active' : 'blurred'}`} 
                        key={`${realIndex}-${trackIndex}`}
                        onClick={slideOffset !== 0 || isActive ? null : () => {
                          setIsTransitioning(true);
                          setSlideOffset(trackIndex - 2);
                          setTimeout(() => {
                            setIsTransitioning(false);
                            setPillarIndex(realIndex);
                            setSlideOffset(0);
                          }, 500);
                        }}
                        style={{ cursor: isActive ? 'default' : 'pointer' }}
                      >
                        <div className="highlight-card">
                          <div className="hl-icon-box">{hl.icon}</div>
                          <h3>{hl.title}</h3>
                          <p>{hl.description}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <button className="slider-control next" onClick={nextPillar} aria-label="Next pillar">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="pillar-slider-dots">
            {highlights.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${pillarIndex === i ? 'active' : ''}`}
                onClick={slideOffset !== 0 ? null : () => {
                  if (i === pillarIndex) return;
                  setIsTransitioning(false);
                  setPillarIndex(i);
                  setSlideOffset(0);
                }}
                aria-label={`Go to pillar ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section philosophy-deep-section">
        <div className="container">
          <div className="philosophy-box">
            <div className="philosophy-content">
              <h2>Modern Technology Meets Gentle Care</h2>
              <p>
                We believe that a clinic should operate with absolute transparency. We use intraoral cameras to show you exactly what we see inside your mouth, and we walk you through a step-by-step treatment plan with no hidden costs. Our sterilization autoclave parameters are monitored digitally and logged daily. You can rest assured that your family's health is protected by the highest medical standards.
              </p>
              <div className="philosophy-ctas">
                <Link to="/book" className="btn btn-primary">Book Consultation</Link>
                <Link to="/services" className="btn btn-secondary">View Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
