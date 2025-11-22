<template>
  <DashboardLayout :userName="userName">
    <!-- Main content area for the dashboard -->
    <div class="dashboard-content">
      
      <!-- Welcome Section -->
      <WelcomeBanner :userName="userName" />

      <!-- Main grid for dashboard widgets -->
      <div class="widgets-grid">
        
        <!-- Left Column -->
        <div class="left-column">
          <QuickActions />
          <HealthSnapshot :patientData="patientData" />
        </div>

        <!-- Right Column -->
        <div class="right-column">
          <UpcomingAppointments :appointments="upcomingAppointments" />
          <ActivityFeed :activities="recentActivities" />
        </div>

      </div>
    </div>
  </DashboardLayout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // 1. Import useRoute
import { DashboardLayout } from '../shared/components'
import WelcomeBanner from './components/WelcomeBanner.vue'
import QuickActions from './components/QuickActions.vue'
import HealthSnapshot from './components/HealthSnapshot.vue'
import UpcomingAppointments from './components/UpcomingAppointments.vue'
import ActivityFeed from './components/ActivityFeed.vue'

export default {
  name: 'PatientDashboard',
  components: {
    DashboardLayout,
    WelcomeBanner,
    QuickActions,
    HealthSnapshot,
    UpcomingAppointments,
    ActivityFeed
  },
  setup() {
    const route = useRoute() // 2. Get the route object
    const userName = ref('')
    const patientData = ref({})
    const upcomingAppointments = ref([])
    const recentActivities = ref([])

    const fetchPatientData = async () => {
      try {
        // 3. Use the dynamic ID from the route
        const patientId = route.params.id
        const response = await fetch(`http://localhost:3000/api/patients/${patientId}/dashboard`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()

        // Update component data with data from the API
        userName.value = data.patientData.first_name
        patientData.value = {
          bloodType: data.patientData.blood_type || 'N/A',
          allergies: data.patientData.allergies || 'None listed',
          primaryDoctor: 'Dr. Smith' // This is not in the API response yet
        }
        upcomingAppointments.value = data.upcomingAppointments.map(apt => ({
          doctor: `Dr. ${apt.first_name}`,
          title: apt.specialization,
          date: apt.consultation_date
        }))
        recentActivities.value = data.recentConsultations.map(consultation => ({
          type: 'appointment',
          description: `Completed consultation with Dr. ${consultation.first_name} (${consultation.specialization})`,
          date: consultation.consultation_date
        }))

      } catch (error) {
        console.error("Failed to fetch patient data:", error)
        // You could set an error state here to show a message to the user
      }
    }

    onMounted(() => {
      fetchPatientData()
    })

    return {
      userName,
      patientData,
      upcomingAppointments,
      recentActivities
    }
  }
}
</script>

<style scoped>
.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Space between the welcome banner and the grid */
  padding: 2rem;
}

.widgets-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal columns */
  gap: 2rem; /* Space between the columns */
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Space between widgets in the same column */
}

/* Responsive design for smaller screens */
@media (max-width: 1024px) {
  .widgets-grid {
    grid-template-columns: 1fr; /* Stack the columns on top of each other */
  }
}
</style>