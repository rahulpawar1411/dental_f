import React, { useState, useMemo } from 'react';
import { X, Eye, Sparkles } from 'lucide-react';
import { galleryData } from '../../data/galleryData';
import './Gallery.css';

const ToothGraphic = ({ type, color }) => {
  const toothPath = "M140 130 C150 90, 180 90, 200 120 C220 90, 250 90, 260 130 C270 170, 265 240, 245 280 C235 300, 220 310, 200 300 C180 310, 165 300, 155 280 C135 240, 130 170, 140 130 Z";
  
  let fill = color || "#e2e8f0";

  if (type === "chipped") {
    const chippedPath = "M140 130 C150 90, 180 90, 200 120 C220 90, 250 90, 260 130 C270 170, 265 240, 245 280 C235 300, 225 305, 215 295 L200 300 C180 310, 165 300, 155 280 C135 240, 130 170, 140 130 Z";
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <path d={chippedPath} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
        <path d="M245 280 L235 300 Q225 305 215 295 Z" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    );
  }

  if (type === "perfect" || type === "makeover") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <defs>
          <filter id="toothGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d={toothPath} fill="#ffffff" stroke="var(--primary-color)" strokeWidth="4" filter="url(#toothGlow)" />
        <path d="M170 145 Q200 160 230 145" fill="none" stroke="var(--accent-gold)" strokeWidth="2" opacity="0.6" />
        <circle cx="215" cy="115" r="3" fill="var(--accent-gold)" />
      </svg>
    );
  }

  if (type === "crowded") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector skewed">
        <path d={toothPath} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" transform="rotate(-15 200 200)" />
      </svg>
    );
  }

  if (type === "aligned") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <path d={toothPath} fill="#ffffff" stroke="var(--primary-color)" strokeWidth="3" />
      </svg>
    );
  }

  if (type === "missing") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <path d={toothPath} fill="transparent" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 5" opacity="0.4" />
        <line x1="120" y1="120" x2="280" y2="280" stroke="#cbd5e1" strokeWidth="2" opacity="0.3" />
      </svg>
    );
  }

  if (type === "implanted") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <line x1="200" y1="260" x2="200" y2="340" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" />
        <line x1="185" y1="290" x2="215" y2="290" stroke="#64748b" strokeWidth="3" />
        <line x1="185" y1="310" x2="215" y2="310" stroke="#64748b" strokeWidth="3" />
        <path d={toothPath} fill="#ffffff" stroke="var(--primary-color)" strokeWidth="3" />
      </svg>
    );
  }

  if (type === "decayed") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <path d={toothPath} fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="3" />
        <circle cx="170" cy="180" r="15" fill="#475569" opacity="0.8" />
        <circle cx="220" cy="200" r="10" fill="#475569" opacity="0.8" />
      </svg>
    );
  }

  if (type === "bonded") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <path d={toothPath} fill="#ffffff" stroke="var(--primary-color)" strokeWidth="3" />
        <path d="M150 160 Q170 170 200 160" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" opacity="0.3" />
      </svg>
    );
  }

  if (type === "uneven") {
    return (
      <svg viewBox="0 0 400 400" className="tooth-vector">
        <path d="M140 160 C150 120, 180 120, 200 140 C220 120, 250 120, 260 160 C270 190, 265 240, 245 270 C235 290, 220 300, 200 290 C180 300, 165 290, 155 270 C135 240, 130 190, 140 160 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 400" className="tooth-vector">
      <path d={toothPath} fill={fill} stroke="#94a3b8" strokeWidth="3" />
    </svg>
  );
};

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Whitening', 'Veneers', 'Alignment', 'Restoration'];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryData;
    return galleryData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="gallery-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>Before & After Gallery</h1>
          <p>Real Patient Smiles. Real Dental Transformations.</p>
        </div>
      </header>

      <section className="section gallery-filter-section">
        <div className="container">
          <div className="gallery-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`gallery-category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery-grid-section">
        <div className="container">
          <div className="gallery-cards-grid">
            {filteredItems.map((item) => (
              <div 
                className="gallery-card" 
                key={item.id}
                onClick={() => setSelectedItem(item)}
              >
                <div className="comparison-preview-box">
                  <div className="preview-side before-side">
                    <span className="side-label">Before</span>
                    <div className="graphic-wrapper">
                      <ToothGraphic 
                        type={item.beforeType} 
                        color={item.beforeColor} 
                      />
                    </div>
                  </div>
                  <div className="preview-side after-side">
                    <span className="side-label success">After</span>
                    <div className="graphic-wrapper">
                      <ToothGraphic 
                        type={item.afterType} 
                        color={item.afterColor} 
                      />
                    </div>
                  </div>
                  
                  <div className="zoom-overlay">
                    <Eye size={24} className="zoom-icon" />
                    <span>Click to Inspect Comparison</span>
                  </div>
                </div>

                <div className="gallery-card-body">
                  <span className="card-category">{item.category} Case</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedItem && (
        <div className="lightbox-modal" onClick={() => setSelectedItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-lightbox" onClick={() => setSelectedItem(null)}>
              <X size={24} />
            </button>
            
            <div className="lightbox-header">
              <span className="lightbox-tag">{selectedItem.category} Case study</span>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.details}</p>
            </div>

            <div className="lightbox-comparison-area">
              <div className="lightbox-column">
                <div className="lightbox-label before-tag">Before Treatment</div>
                <div className="lightbox-graphic-canvas">
                  <ToothGraphic 
                    type={selectedItem.beforeType} 
                    color={selectedItem.beforeColor} 
                  />
                </div>
              </div>

              <div className="lightbox-separator">
                <div className="separator-line"></div>
                <div className="separator-badge">
                  <Sparkles size={20} className="text-gold" />
                </div>
                <div className="separator-line"></div>
              </div>

              <div className="lightbox-column">
                <div className="lightbox-label after-tag">After Restorations</div>
                <div className="lightbox-graphic-canvas success-bg">
                  <ToothGraphic 
                    type={selectedItem.afterType} 
                    color={selectedItem.afterColor} 
                  />
                </div>
              </div>
            </div>

            <div className="lightbox-footer">
              <p>{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Gallery;
