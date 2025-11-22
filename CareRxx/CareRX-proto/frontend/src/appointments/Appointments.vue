<template>
  <DashboardLayout :userName="userName">
    <div class="appointments-content">
      <header class="content-header">
        <h1 class="page-title">My Appointments</h1>
        <div class="header-actions">
          <button class="btn btn-outline" @click="toggleFilters">
            <i class="fas fa-filter"></i> Filter
          </button>
          <a href="https://carerxinfo.youcanbook.me/" target="_blank" class="btn btn-primary">
            <i class="fas fa-plus"></i> New Appointment
          </a>
        </div>
      </header>

    <!-- Tabs -->
      <AppointmentTabs
        :tabs="tabs"
        :active-tab="activeTab"
        @tab-changed="activeTab = $event"
      />

      <!-- Filters -->
      <div class="filters" v-show="showFilters">
        <!-- Filter controls can be added here -->
      </div>

      <!-- Appointments List -->
      <div class="appointments-list">
        <template v-if="currentAppointments.length > 0">
          <AppointmentCard
            v-for="appointment in currentAppointments"
            :key="appointment.id"
            :appointment="appointment"
          >
            <template #actions>
              <button class="btn btn-outline">Reschedule</button>
              <button class="btn btn-outline">Cancel</button>
              <a v-if="appointment.meeting_url" :href="appointment.meeting_url" target="_blank" class="btn btn-primary">Join Video Call</a>
            </template>
          </AppointmentCard>
        </template>
        <EmptyState
          v-else
          :icon-class="emptyStateIcon"
          :title="emptyStateTitle"
          :message="emptyStateMessage"
        >
          <a href="https://carerxinfo.youcanbook.me/" target="_blank" class="btn btn-primary" v-if="activeTab === 'upcoming'">
            <i class="fas fa-plus"></i> Book an Appointment
          </a>
        </EmptyState>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DashboardLayout } from '../shared/components'
import AppointmentCard from './components/AppointmentCard.vue'
import AppointmentTabs from './components/AppointmentTabs.vue'
import EmptyState from './components/EmptyState.vue'

const route = useRoute()
const userName = ref('')
const appointments = ref([])
const activeTab = ref('upcoming')
const showFilters = ref(false)

const tabs = [
  { name: 'upcoming', label: 'Upcoming' },
  { name: 'past', label: 'Past' },
  { name: 'cancelled', label: 'Cancelled' }
]

const currentAppointments = computed(() => {
  return appointments.value.filter(apt => apt.status === activeTab.value)
})

const emptyStateIcon = computed(() => {
  switch (activeTab.value) {
    case 'upcoming': return 'fas fa-calendar-times'
    case 'past': return 'fas fa-history'
    case 'cancelled': return 'fas fa-ban'
    default: return 'fas fa-calendar-times'
  }
})

const emptyStateTitle = computed(() => `No ${activeTab.value} appointments`)
const emptyStateMessage = computed(() => `You don't have any ${activeTab.value} appointments.`)

const fetchAppointments = async () => {
  const patientId = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/patients/${patientId}/appointments`)
    if (!response.ok) throw new Error('Failed to fetch appointments')
    const data = await response.json()
    
    // Set user name and appointments from the new API response structure
    userName.value = data.patient_first_name || 'Patient'
    appointments.value = data.appointments
  } catch (error) {
    console.error(error)
  }
}
const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

onMounted(() => {
  fetchAppointments()
})
</script>

<style scoped>
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
  text-decoration: none;
}
.btn-primary {
  background-color: var(--primary-color);
  color: white;
}
.btn-primary:hover {
  background-color: var(--primary-dark);
}
.btn-outline {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}
.btn-outline:hover {
  background-color: var(--primary-light);
}
.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.appointments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>    