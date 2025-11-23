import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Auth ---
export const login = (email, password) => apiClient.post('/auth/login', { email, password });
export const register = (userData) => apiClient.post('/auth/register', userData);

// --- Patient Data ---
export const getPatientDashboard = (patientId) => apiClient.get(`/patients/${patientId}/dashboard`);
export const getAppointments = (patientId) => apiClient.get(`/patients/${patientId}/appointments`);
export const getPatientConsultations = (patientId) => apiClient.get(`/patients/${patientId}/consultations`);
// ... other patient API calls

// --- NEW: Consultation Booking ---
/**
 * Creates a new consultation.
 * @param {object} consultationData - The consultation data { doctor_id, consultation_type, consultation_date, notes }.
 * @param {number} patientId - The ID of the patient booking the consultation.
 * @returns {Promise<object>} A promise that resolves to the creation response.
 */
export const createConsultation = (patientId, consultationData) => {
  return apiClient.post(`/patients/${patientId}/consultations`, consultationData);
};

/**
 * Fetches a list of all active doctors.
 * @returns {Promise<object>} A promise that resolves to the list of doctors.
 */
export const getDoctors = () => {
  return apiClient.get('/doctors');
};

/**
 * Fetches availability for a specific doctor.
 * @param {number} doctorId - The ID of the doctor.
 * @param {string} startDate - The start date to check availability (optional).
 * @param {string} endDate - The end date to check availability (optional).
 * @returns {Promise<object>} A promise that resolves to the doctor's availability.
 */
export const getDoctorAvailability = (doctorId, startDate, endDate) => {
  const params = new URLSearchParams();
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  return apiClient.get(`/doctors/${doctorId}/availability?${params.toString()}`);
};