import axios from 'axios';

// Create a base Axios instance with the backend server URL
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Authentication API Calls ---

/**
 * Logs in a user.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} A promise that resolves to the login response.
 */
export const login = (email, password) => {
  return apiClient.post('/auth/login', { email, password });
};

/**
 * Registers a new user.
 * @param {object} userData - The user's registration data.
 * @returns {Promise<object>} A promise that resolves to the registration response.
 */
export const register = (userData) => {
  return apiClient.post('/auth/register', userData);
};


// --- Patient Data API Calls ---

/**
 * Fetches dashboard data for a specific patient.
 * @param {number} patientId - The ID of the patient.
 * @returns {Promise<object>} A promise that resolves to the patient's dashboard data.
 */
export const getPatientDashboard = (patientId) => {
  return apiClient.get(`/patients/${patientId}/dashboard`);
};

// You can add other API calls here in the future
// export const getAppointments = (patientId) => {
//   return apiClient.get(`/patients/${patientId}/appointments`);
// };