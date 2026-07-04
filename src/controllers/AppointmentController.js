import { apiService } from '../services/apiService';
import { AppointmentModel } from '../models/AppointmentModel';

export const AppointmentController = {
  /**
   * Submits a new appointment booking.
   * Connects to express backend endpoint POST /api/appointments
   */
  submitAppointment: async (appointmentData) => {
    const model = new AppointmentModel(appointmentData);
    const { isValid, errors } = model.validate();

    if (!isValid) {
      return { success: false, errors };
    }

    return apiService.post('/appointments', model.toJSON(), AppointmentController, 'submitAppointmentMock');
  },

  /**
   * Mock fallback in case USE_MOCK is set back to true
   */
  submitAppointmentMock: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const existingJson = localStorage.getItem('mock_appointments') || '[]';
    const appointments = JSON.parse(existingJson);
    appointments.push(data);
    localStorage.setItem('mock_appointments', JSON.stringify(appointments));
    return { success: true, appointment: data };
  },

  /**
   * Retrieves all appointments.
   * Connects to express backend endpoint GET /api/appointments
   */
  getAppointments: async () => {
    return apiService.get('/appointments', AppointmentController, 'getAppointmentsMock');
  },

  getAppointmentsMock: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const existingJson = localStorage.getItem('mock_appointments') || '[]';
    return JSON.parse(existingJson);
  }
};
export default AppointmentController;
