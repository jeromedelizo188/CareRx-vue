<template>
  <DashboardLayout :userName="userName">
    <div class="consultations-content">
      <!-- Current Consultation Banner -->
      <CurrentConsultationBanner />

      <!-- Tabs -->
      <ConsultationTabs
        :tabs="tabs"
        :active-tab="activeTab"
        @tab-changed="activeTab = $event"
      />

      <!-- Consultations List -->
      <div class="consultations-list">
        <template v-if="currentConsultations.length > 0">
          <ConsultationCard
            v-for="consultation in currentConsultations"
            :key="consultation.id"
            :consultation="consultation"
          >
            <template #actions>
              <button v-if="consultation.status === 'waiting'" class="btn btn-primary">
                <i class="fas fa-video"></i> Join
              </button>
              <button v-else-if="consultation.status === 'active'" class="btn btn-outline" disabled>
                <i class="fas fa-phone"></i> In Progress
              </button>
              <button v-else-if="consultation.status === 'ended'" class="btn btn-outline">
                <i class="fas fa-file-medical"></i> View Summary
              </button>
            </template>
          </ConsultationCard>
        </template>
        <EmptyState
          v-else
          :icon-class="emptyStateIcon"
          :title="emptyStateTitle"
          :message="emptyStateMessage"
        />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DashboardLayout } from '../shared/components'
import CurrentConsultationBanner from './components/CurrentConsultationBanner.vue'
import ConsultationTabs from './components/ConsultationTabs.vue'
import ConsultationCard from './components/ConsultationCard.vue'
import EmptyState from '../shared/components/base/EmptyState.vue'

const route = useRoute()
const userName = ref('')
const consultations = ref([])
const activeTab = ref('scheduled')

const tabs = [
  { name: 'scheduled', label: 'Scheduled' },
  { name: 'history', label: 'History' }
]

const currentConsultations = computed(() => {
  if (activeTab.value === 'scheduled') {
    return consultations.value.filter(c => c.status === 'waiting' || c.status === 'active')
  }
  if (activeTab.value === 'history') {
    return consultations.value.filter(c => c.status === 'ended')
  }
  return []
})

const emptyStateIcon = computed(() => activeTab.value === 'scheduled' ? 'fas fa-video' : 'fas fa-history')
const emptyStateTitle = computed(() => `No ${activeTab.value} consultations`)
const emptyStateMessage = computed(() => {
  return activeTab.value === 'scheduled' 
    ? "You don't have any upcoming consultations." 
    : "Your past consultations will appear here."
})

const fetchConsultations = async () => {
  const patientId = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/patients/${patientId}/consultations`)
    if (!response.ok) throw new Error('Failed to fetch consultations')
    const data = await response.json()
    
    userName.value = data.patient_first_name || 'Patient'
    consultations.value = data.consultations
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchConsultations()
})
</script>

<style scoped>
.consultations-content {
  padding: 30px;
}
.consultations-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>