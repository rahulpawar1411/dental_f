import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { Navbar } from './Navbar/Navbar';
import { Footer } from './Footer/Footer';

export const AppLayout = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app-layout">
      <div className="scroll-progress-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <Navbar />

      <main className={pathname === '/' ? 'home-main' : 'page-main'} style={{ minHeight: '80vh' }}>
        <div key={pathname} className="page-transition">
          <Outlet />
        </div>
      </main>

      <Footer />

      <div className="floating-actions">
        <a
          href="tel:+917049668627"
          className="floating-btn call-btn"
          aria-label="Call Clinic"
        >
          <Phone size={20} />
        </a>

        <a
          href="https://wa.me/7049668627?text=Hi,%20I'd%20like%20to%20book%20an%20appointment%20at%20The%20Golden%20Tooth."
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp-btn"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle size={22} />
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="floating-btn scroll-top-btn"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </div>
  );
};
export default AppLayout;
