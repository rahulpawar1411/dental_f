import React, { useState, useEffect } from 'react';
import './Preloader.css';

export const Preloader = ({ onComplete }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show loading image for 2.5 seconds, then transition
    const timer = setTimeout(() => {
      handleComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsFadingOut(true);
    // Wait for the CSS fade-out animation to complete (800ms) before unmounting
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <img
          src="/loading_Img.png"
          alt="Loading Clinic..."
          className="preloader-image"
        />
      </div>
    </div>
  );
};
export default Preloader;
