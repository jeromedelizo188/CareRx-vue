<template>
  <DashboardLayout :userName="userName">
    <div class="prescriptions-content">
      <!-- Top Header -->
      <header class="content-header">
        <h1 class="page-title">My E-Prescriptions</h1>
        <div class="header-actions">
          <div class="search-bar">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search prescriptions...">
          </div>
          <button class="btn btn-primary">
            <i class="fas fa-plus"></i> Request New
          </button>
        </div>
      </header>

      <!-- Tabs -->
      <PrescriptionTabs
        :tabs="tabs"
        :active-tab="activeTab"
        @tab-changed="activeTab = $event"
      />

      <!-- Prescriptions List -->
      <PrescriptionList
        :prescriptions="currentPrescriptions"
        @view-details="openDetailsModal"
        @request-refill="openRefillModal"
      />
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <PrescriptionDetailModal
        v-if="isDetailsModalOpen"
        :prescription="selectedPrescription"
        @close="closeDetailsModal"
      />
    </Teleport>

    <!-- Refill Request Modal -->
    <Teleport to="body">
      <RefillRequestModal
        v-if="isRefillModalOpen"
        :prescription="selectedPrescription"
        @close="closeRefillModal"
        @confirm="confirmRefill"
      />
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DashboardLayout } from '../shared/components'
import PrescriptionTabs from './components/PrescriptionTabs.vue'
import PrescriptionList from './components/PrescriptionList.vue'
import PrescriptionDetailModal from './components/PrescriptionDetailModal.vue'
import RefillRequestModal from './components/RefillRequestModal.vue'

const route = useRoute()
const userName = ref('')
const prescriptions = ref([])
const activeTab = ref('active')
const isDetailsModalOpen = ref(false)
const isRefillModalOpen = ref(false)
const selectedPrescription = ref(null)

const tabs = [
  { name: 'active', label: 'Active' },
  { name: 'past', label: 'Past' }
]

const currentPrescriptions = computed(() => {
  if (activeTab.value === 'active') {
    return prescriptions.value.filter(p => p.status === 'active')
  }
  if (activeTab.value === 'past') {
    return prescriptions.value.filter(p => p.status === 'expired' || p.status === 'completed')
  }
  return []
})

const openDetailsModal = (prescription) => {
  selectedPrescription.value = prescription
  isDetailsModalOpen.value = true
}

const closeDetailsModal = () => {
  isDetailsModalOpen.value = false
  selectedPrescription.value = null
}

const openRefillModal = (prescription) => {
  selectedPrescription.value = prescription
  isRefillModalOpen.value = true
}

const closeRefillModal = () => {
  isRefillModalOpen.value = false
  selectedPrescription.value = null
}

const confirmRefill = () => {
  // In a real app, this would send an API request
  console.log('Refill request confirmed for:', selectedPrescription.value)
  alert('Refill request sent successfully!')
  closeRefillModal()
}

const fetchPrescriptions = async () => {
  const patientId = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/patients/${patientId}/prescriptions`)
    if (!response.ok) throw new Error('Failed to fetch prescriptions')
    const data = await response.json()
    
    userName.value = data.patientData.first_name || 'Patient'
    prescriptions.value = data.prescriptions
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchPrescriptions()
})
</script>

<style scoped>
.prescriptions-content {
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  gap: 15px;
}

.search-bar {
  position: relative;
}

.search-bar input {
  padding: 10px 15px 10px 40px;
  border-radius: 50px;
  border: 1px solid #d1d5db;
  width: 250px;
  font-family: 'Montserrat', sans-serif;
}

.search-bar i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--light-text);
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