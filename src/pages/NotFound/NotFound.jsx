import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="notfound-page animate-fade-in section flex-center">
      <div className="notfound-box">
        <div className="notfound-icon-wrapper">
          <svg viewBox="0 0 100 100" className="tooth-missing-svg">
            <path 
              d="M30 40 Q40 40 50 50 Q60 40 70 40 Q80 60 70 80 Q50 90 30 80 Z" 
              fill="none" 
              stroke="var(--border-color)" 
              strokeWidth="4" 
              strokeDasharray="4 4"
            />
            <path 
              d="M20 30 C25 10, 45 10, 50 25 C55 10, 75 10, 80 30 C85 50, 82 70, 72 85 M55 88 Q45 88 38 85 C28 70, 25 50, 20 30 Z" 
              fill="none" 
              stroke="var(--primary-color)" 
              strokeWidth="4"
            />
          </svg>
        </div>

        <span className="notfound-code">404 Error</span>
        <h1>This Page is Missing</h1>
        <p className="notfound-desc">
          Just like a missing tooth, we have a gap in our website here. The resource you are looking for might have been extracted or relocated.
        </p>

        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={18} />
            Go to Homepage
          </Link>
          <Link to="/services" className="btn btn-secondary">
            Browse Treatments
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
