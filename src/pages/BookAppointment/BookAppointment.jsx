import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, Phone, Mail, 
  ChevronRight, ChevronLeft, Check, Sparkles, AlertCircle 
} from 'lucide-react';
import { ServiceController } from '../../controllers/ServiceController';
import { AppointmentController } from '../../controllers/AppointmentController';
import './BookAppointment.css';

export const BookAppointment = () => {
  const location = useLocation();
  const services = ServiceController.getServices();

  const todayString = (() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  })();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    preferredDate: todayString,
    preferredTime: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDetails, setBookedDetails] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (location.state && location.state.selectedTreatment) {
      setFormData((prev) => ({
        ...prev,
        treatment: location.state.selectedTreatment
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await AppointmentController.getAppointments();
        if (data) {
          setAppointments(data);
        }
      } catch (e) {
        console.error("Failed to load appointments:", e);
      }
    };
    fetchAppointments();
  }, []);

  const bookedSlotsForSelectedDate = React.useMemo(() => {
    if (!formData.preferredDate) return [];
    return appointments
      .filter((apt) => apt.preferredDate === formData.preferredDate)
      .map((apt) => apt.preferredTime);
  }, [appointments, formData.preferredDate]);

  useEffect(() => {
    if (formData.preferredTime && bookedSlotsForSelectedDate.includes(formData.preferredTime)) {
      setFormData((prev) => ({ ...prev, preferredTime: '' }));
    }
  }, [formData.preferredDate, bookedSlotsForSelectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Please enter a valid phone number (min 10 digits)';
    }
    if (!formData.treatment) {
      errs.treatment = 'Please select a dental service';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a date';
    } else {
      const selected = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.preferredDate = 'Preferred date must be today or in the future';
      }
    }
    if (!formData.preferredTime) {
      errs.preferredTime = 'Please select a preferred time slot';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (step !== 3) return;

    setIsSubmitting(true);
    const response = await AppointmentController.submitAppointment(formData);
    setIsSubmitting(false);

    if (response.success) {
      setBookedDetails(response.appointment);
      setStep(4);
    } else {
      setErrors(response.errors || { global: 'Failed to process booking.' });
    }
  };

  const morningSlots = ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'];
  const afternoonSlots = ['12:30 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'];
  const eveningSlots = ['05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM', '08:00 PM'];

  const selectTimeSlot = (slot) => {
    setFormData({ ...formData, preferredTime: slot });
    if (errors.preferredTime) {
      setErrors({ ...errors, preferredTime: '' });
    }
  };

  return (
    <div className="booking-page animate-fade-in">
      <header className="page-header">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Schedule your visit with Dr. Kriti Ghagre at The Golden Tooth</p>
        </div>
      </header>

      <section className="section booking-form-section">
        <div className="container">
          <div className="booking-form-container">
            
            {step < 4 && (
              <div className="booking-progress-bar">
                <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
                  <span className="step-number-bubble">1</span>
                  <span className="step-label-text">Select Treatment</span>
                </div>
                <div className="step-link-line"></div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
                  <span className="step-number-bubble">2</span>
                  <span className="step-label-text">Date & Time</span>
                </div>
                <div className="step-link-line"></div>
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                  <span className="step-number-bubble">3</span>
                  <span className="step-label-text">Confirmation</span>
                </div>
              </div>
            )}

            <div className="booking-box">
              {errors.global && (
                <div className="global-error-box">
                  <AlertCircle size={20} />
                  <span>{errors.global}</span>
                </div>
              )}

              {step === 1 && (
                <div className="step-pane animate-fade-in">
                  <h2>Select Service & Contact Details</h2>
                  <p className="step-desc">Provide your contact details and select your desired dental care package.</p>
                  
                  <div className="form-grid grid-cols-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-name">Full Name</label>
                      <div className="input-with-icon">
                        <User size={18} className="input-icon" />
                        <input
                          type="text"
                          id="booking-name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`form-input padding-left-icon ${errors.name ? 'error-border' : ''}`}
                          placeholder="e.g. John Doe"
                        />
                      </div>
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-phone">Phone Number</label>
                      <div className="input-with-icon">
                        <Phone size={18} className="input-icon" />
                        <input
                          type="tel"
                          id="booking-phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`form-input padding-left-icon ${errors.phone ? 'error-border' : ''}`}
                          placeholder="e.g. +91 98765 43210"
                        />
                      </div>
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-grid grid-cols-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-email">Email Address</label>
                      <div className="input-with-icon">
                        <Mail size={18} className="input-icon" />
                        <input
                          type="email"
                          id="booking-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-input padding-left-icon ${errors.email ? 'error-border' : ''}`}
                          placeholder="e.g. johndoe@gmail.com"
                        />
                      </div>
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-treatment">Select Treatment</label>
                      <select
                        id="booking-treatment"
                        name="treatment"
                        value={formData.treatment}
                        onChange={handleInputChange}
                        className={`form-input ${errors.treatment ? 'error-border' : ''}`}
                      >
                        <option value="">-- Choose a Service --</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                      {errors.treatment && <span className="error-text">{errors.treatment}</span>}
                    </div>
                  </div>

                  <div className="step-actions">
                    <div></div>
                    <button onClick={handleNextStep} className="btn btn-primary">
                      Next: Date & Time
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="step-pane animate-fade-in">
                  <h2>Select Appointment Date & Time</h2>
                  <p className="step-desc">Pick a date and select one of our available dental care slots.</p>

                  <div className="form-grid grid-cols-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="booking-date">Appointment Date</label>
                      <div className="input-with-icon">
                        <Calendar size={18} className="input-icon" />
                        <input
                          type="date"
                          id="booking-date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          min={todayString}
                          className={`form-input padding-left-icon ${errors.preferredDate ? 'error-border' : ''}`}
                        />
                      </div>
                      {errors.preferredDate && <span className="error-text">{errors.preferredDate}</span>}
                    </div>

                    <div className="selected-time-summary">
                      <span className="form-label">Chosen Slot</span>
                      <div className={`chosen-slot-badge ${!formData.preferredTime ? 'empty' : ''}`}>
                        <Clock size={16} />
                        <span>{formData.preferredTime || 'No slot selected'}</span>
                      </div>
                      {errors.preferredTime && <span className="error-text">{errors.preferredTime}</span>}
                    </div>
                  </div>

                  <div className="time-slots-wrapper">
                    <span className="slots-title">Available Slots</span>
                    
                    <div className="slot-category-block">
                      <h4>Morning Sessions</h4>
                      <div className="slots-grid">
                        {morningSlots.map((slot) => {
                          const isBooked = bookedSlotsForSelectedDate.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              className={`slot-btn ${formData.preferredTime === slot ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                              onClick={() => selectTimeSlot(slot)}
                              disabled={isBooked}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="slot-category-block">
                      <h4>Afternoon Sessions</h4>
                      <div className="slots-grid">
                        {afternoonSlots.map((slot) => {
                          const isBooked = bookedSlotsForSelectedDate.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              className={`slot-btn ${formData.preferredTime === slot ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                              onClick={() => selectTimeSlot(slot)}
                              disabled={isBooked}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="slot-category-block">
                      <h4>Evening Sessions</h4>
                      <div className="slots-grid">
                        {eveningSlots.map((slot) => {
                          const isBooked = bookedSlotsForSelectedDate.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              className={`slot-btn ${formData.preferredTime === slot ? 'selected' : ''} ${isBooked ? 'booked' : ''}`}
                              onClick={() => selectTimeSlot(slot)}
                              disabled={isBooked}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="step-actions">
                    <button onClick={handlePrevStep} className="btn btn-secondary">
                      <ChevronLeft size={18} />
                      Back
                    </button>
                    <button onClick={handleNextStep} className="btn btn-primary">
                      Next: Confirm Details
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="step-pane animate-fade-in">
                  <h2>Review and Confirm Appointment</h2>
                  <p className="step-desc">Please review your contact details and scheduled timing before submitting.</p>

                  <div className="review-summary-card">
                    <div className="summary-row">
                      <span>Full Name:</span>
                      <strong>{formData.name}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Contact Phone:</span>
                      <strong>{formData.phone}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Email Address:</span>
                      <strong>{formData.email}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Selected Treatment:</span>
                      <strong>{formData.treatment}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Scheduled Date:</span>
                      <strong>{formData.preferredDate}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Time Slot:</span>
                      <strong>{formData.preferredTime}</strong>
                    </div>
                  </div>

                  <div className="form-group margin-top-md">
                    <label className="form-label" htmlFor="booking-message">Notes / Symptoms Description (Optional)</label>
                    <textarea
                      id="booking-message"
                      name="message"
                      rows="3"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g. Toothache, cosmetic Veneer consultation..."
                    ></textarea>
                  </div>

                  <div className="step-actions">
                    <button onClick={handlePrevStep} className="btn btn-secondary" disabled={isSubmitting}>
                      <ChevronLeft size={18} />
                      Back
                    </button>
                    <button 
                      onClick={handleBookingSubmit} 
                      className="btn btn-accent"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Securing Booking...' : 'Confirm and Secure Booking'}
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && bookedDetails && (
                <div className="step-pane success-pane animate-fade-in">
                  <div className="success-icon-badge">
                    <Check size={40} />
                  </div>
                  <span className="success-tag-sparkle">
                    <Sparkles size={16} className="text-gold" />
                    Appointment Secured
                  </span>
                  <h2>Booking Confirmed!</h2>
                  <p className="booking-ref">Confirmation ID: <code>{bookedDetails.id}</code></p>
                  
                  <div className="success-summary-box">
                    <p>Dear <strong>{bookedDetails.name}</strong>, your appointment for <strong>{bookedDetails.treatment}</strong> is successfully locked in.</p>
                    <div className="time-highlight">
                      <span>Date: {bookedDetails.preferredDate}</span>
                      <span>Time: {bookedDetails.preferredTime}</span>
                    </div>
                    <p className="notice-sub">A text confirmation and Google calendar invite have been dispatched to <strong>{bookedDetails.phone}</strong> and <strong>{bookedDetails.email}</strong>. Please arrive 10 minutes early.</p>
                  </div>

                  <div className="success-actions">
                    <Link to="/" className="btn btn-primary">
                      Return Home
                    </Link>
                    <Link to="/services" className="btn btn-secondary">
                      Browse Treatments
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default BookAppointment;
