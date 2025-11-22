// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './landingpage/LandingPage.vue'
import Signup from './auth/views/Signup.vue'
import Login from './auth/views/Login.vue'
import PatientDashboard from './patient-dashboard/PatientDashboard.vue' 
import Appointments from './appointments/Appointments.vue'
import Consultations from './consultations/Consultations.vue'

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
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router