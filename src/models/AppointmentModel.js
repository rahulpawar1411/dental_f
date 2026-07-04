export class AppointmentModel {
  constructor({ name, email, phone, treatment, preferredDate, preferredTime, message = '' }) {
    this.name = name ? name.trim() : '';
    this.email = email ? email.trim() : '';
    this.phone = phone ? phone.trim() : '';
    this.treatment = treatment || '';
    this.preferredDate = preferredDate || '';
    this.preferredTime = preferredTime || '';
    this.message = message ? message.trim() : '';
    this.createdAt = new Date().toISOString();
    this.id = 'apt_' + Math.random().toString(36).substr(2, 9);
    this.status = 'Pending';
  }

  validate() {
    const errors = {};
    if (!this.name) {
      errors.name = 'Full name is required';
    } else if (this.name.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }

    if (!this.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      errors.email = 'Invalid email address';
    }

    if (!this.phone) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(this.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid phone number (min 10 digits)';
    }

    if (!this.treatment) {
      errors.treatment = 'Please select a dental service';
    }

    if (!this.preferredDate) {
      errors.preferredDate = 'Please select a date';
    } else {
      const selected = new Date(this.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errors.preferredDate = 'Preferred date must be in the future';
      }
    }

    if (!this.preferredTime) {
      errors.preferredTime = 'Please select a preferred time slot';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      treatment: this.treatment,
      preferredDate: this.preferredDate,
      preferredTime: this.preferredTime,
      message: this.message,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}
export default AppointmentModel;
