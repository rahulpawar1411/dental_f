import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../../hooks/useDarkMode';
import logoImg from '../../assets/logo.png';
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useDarkMode();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      const navbar = document.querySelector('.navbar');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      if (
        (navbar && !navbar.contains(e.target)) &&
        (mobileMenu && !mobileMenu.contains(e.target))
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];



  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="The Golden Tooth Logo" className="navbar-logo-img" />
          <div className="logo-separator"></div>
          <div className="logo-text-group">
            <span className="logo-main-text">The Golden Tooth</span>
            <span className="logo-sub-text">Multispeciality Dental clinic</span>
          </div>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}

        </div>

        <div className="navbar-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="theme-icon text-gold" size={20} /> : <Moon className="theme-icon" size={20} />}
          </button>
          <button
            className="mobile-menu-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}

        </div>
      </div>
    </nav>
  );
};
export default Navbar;
