<template>
  <DashboardLayout :userName="userName">
    <div class="appointments-content">
      <header class="content-header">
        <h1 class="page-title">My Appointments</h1>
        <div class="header-actions">
          <button class="btn btn-primary" @click="openBookingModal">
            <i class="fas fa-plus"></i> Book New Consultation
          </button>
        </div>
      </header>

      <AppointmentList
        :appointments="appointments"
        @view-details="openDetailsModal"
      />
    </div>

    <!-- The modal is now passed the patientId from the route -->
    <BookAppointmentModal 
      ref="bookingModal" 
      :patient-id="parseInt(route.params.id)"
      @booking-success="fetchAppointments"
    />
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAppointments } from '../api/index.js'
import { DashboardLayout } from '../shared/components'
import AppointmentList from './components/AppointmentList.vue'
import BookAppointmentModal from './components/BookAppointmentModal.vue';

const route = useRoute()
const userName = ref('')
const appointments = ref([])

// This ref gives us access to the modal component's methods
const bookingModal = ref(null);

const fetchAppointments = async () => {
  const patientId = route.params.id
  try {
    const response = await getAppointments(patientId); 
    userName.value = response.data.patient_first_name || 'Patient' 
    appointments.value = response.data.appointments || []
  } catch (error) {
    console.error('Failed to fetch appointments:', error.response ? error.response.data : error.message);
    alert('Could not load appointments. Please check the console for more details.');
  }
}

const openBookingModal = () => {
  bookingModal.value.openModal();
};

const openDetailsModal = (appointment) => {
  alert(`Viewing details for appointment with Dr. ${appointment.doctor}`);
};

onMounted(() => {
  fetchAppointments()
})
</script>
<style scoped>
/* Styles remain the same */
.appointments-content {
  padding: 30px;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--secondary-color);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
.btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  font-family: 'Montserrat', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.btn-primary {
  background-color: var(--primary-color);
  color: white;
}
.btn-primary:hover {
  background-color: var(--primary-dark);
}
</style>