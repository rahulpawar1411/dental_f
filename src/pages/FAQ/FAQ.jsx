import React, { useState, useMemo } from 'react';
import { Search, HelpCircle, ArrowRight, ChevronDown, MessageSquare } from 'lucide-react';
import { faqData } from '../../data/faqData';
import { Link } from 'react-router-dom';
import './FAQ.css';

export const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);

  const categories = ['All', 'General', 'Treatments', 'Emergency'];

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = 
      activeCategory === 'All' || 
      faq.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="faq-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Get answers to common queries about dental treatments, insurance, and scheduling.</p>
        </div>
      </header>

      <section className="section faq-search-section">
        <div className="container">
          <div className="faq-search-wrapper">
            <div className="faq-categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="faq-search-box">
              <Search className="faq-search-icon" size={18} />
              <input
                type="text"
                placeholder="Search FAQs (e.g. pain, root canal, pricing)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="faq-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-content-section">
        <div className="container">
          {filteredFaqs.length > 0 ? (
            <div className="faq-grid-container">
              {filteredFaqs.map((faq) => {
                const isOpen = openAccordion === faq.id;
                return (
                  <div className={`faq-card-box ${isOpen ? 'open' : ''}`} key={faq.id}>
                    <button 
                      className="faq-trigger" 
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-title-group">
                        <HelpCircle className="faq-question-icon text-gold" size={18} />
                        <span>{faq.question}</span>
                      </div>
                      <span className="faq-arrow-wrapper">
                        <ChevronDown className={`faq-chevron-icon ${isOpen ? 'rotated' : ''}`} size={20} />
                      </span>
                    </button>
                    <div className="faq-collapse-pane">
                      <div className="faq-answer-inner">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-faqs-found">
              <h3>No Questions Found</h3>
              <p>We couldn't find any FAQs matching your query. Let us know what you need, or contact us directly.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear Search Query
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section still-questions-section">
        <div className="container">
          <div className="still-questions-box">
            <div className="still-icon-wrapper">
              <MessageSquare size={30} />
            </div>
            <h2>Still Have Unanswered Questions?</h2>
            <p>Our dental coordinators are here to assist. Drop us a message or call to speak with us today.</p>
            <div className="still-buttons">
              <Link to="/book" className="btn btn-primary">
                Book a Consultation
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default FAQ;
