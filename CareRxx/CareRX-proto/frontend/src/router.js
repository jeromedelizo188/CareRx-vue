// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './landingpage/LandingPage.vue'
import Signup from './auth/views/Signup.vue'
import Login from './auth/views/Login.vue'
import PatientDashboard from './patient-dashboard/PatientDashboard.vue' 
import Appointments from './appointments/Appointments.vue'
import Consultations from './consultations/Consultations.vue'
import MedicalRecords from './medical-records/MedicalRecords.vue'
import EPrescriptions from './e-prescriptions/EPrescriptions.vue'
import PatientProfile from './patient-profile/PatientProfile.vue'
// REMOVED: The import for the deleted BookAppointment.vue file
// import BookAppointment from './appointments/components/BookAppointment.vue' 

const routes = [
  {
    path: '/',
    component: LandingPage,
    meta: { title: 'CareRX' }
  },
  {
    path: '/dashboard/:id',
    component: PatientDashboard,
    meta: { title: 'Dashboard - CareRX' }
  },
  { 
    path: '/signup', 
    component: Signup,
    meta: { title: 'Sign Up - CareRX' }
  },
  { 
    path: '/login', 
    component: Login, 
    meta: { title: 'Login - CareRX' }
  },
  {
    path: '/dashboard',
    component: PatientDashboard,
    meta: { title: 'Dashboard - CareRX' }
  },
  {
    path: '/appointments/:id',
    component: Appointments,
    meta: { title: 'Appointments - CareRX' }
  },
  {
    path: '/consultations/:id',
    component: Consultations,
    meta: { title: 'Consultations - CareRX' }
  },
  {
    path: '/medical-records/:id',
    component: MedicalRecords,
    meta: { title: 'Medical Records - CareRX' }
  },
  {
    path: '/e-prescriptions/:id',
    component: EPrescriptions,
    meta: { title: 'E-Prescriptions - CareRX' }
  },
  {
    path: '/patient-profile/:id',
    component: PatientProfile,
    meta: { title: 'My Profile - CareRX' }
  },
  // REMOVED: The obsolete route for booking appointments
  // {
  //   path: '/patients/:id/appointments/book',
  //   name: 'BookAppointment',
  //   component: BookAppointment, // This component no longer exists
  //   meta: { requiresAuth: true }
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router