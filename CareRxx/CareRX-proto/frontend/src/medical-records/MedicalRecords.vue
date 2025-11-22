<template>
  <DashboardLayout :userName="userName">
    <div class="records-content">
      <!-- Health Snapshot -->
      <HealthSnapshot :patientData="patientData" />

      <!-- Tabs -->
      <RecordTabs
        :tabs="tabs"
        :active-tab="activeTab"
        @tab-changed="activeTab = $event"
      />

      <!-- Records List -->
      <RecordList
        :records="currentRecords"
        @view-record="openModal"
      />
    </div>

    <!-- Detail Modal -->
    <Teleport to="body">
      <RecordDetailModal
        v-if="isModalOpen"
        :record="selectedRecord"
        @close="closeModal"
      />
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DashboardLayout } from '../shared/components'
import HealthSnapshot from './components/HealthSnapshot.vue'
import RecordTabs from './components/RecordTabs.vue'
import RecordList from './components/RecordList.vue'
import RecordDetailModal from './components/RecordDetailModal.vue'

const route = useRoute()
const userName = ref('')
const patientData = ref({})
const medicalRecords = ref([])
const activeTab = ref('all')
const isModalOpen = ref(false)
const selectedRecord = ref(null)

const tabs = [
  { name: 'all', label: 'All Records' },
  { name: 'lab', label: 'Lab Results' },
  { name: 'visit', label: 'Visit Summaries' },
  { name: 'imaging', label: 'Imaging' }
]

const currentRecords = computed(() => {
  // In a real app, you would filter records based on activeTab
  // For now, we show all records
  return medicalRecords.value
})

const openModal = (record) => {
  selectedRecord.value = record
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedRecord.value = null
}

const fetchMedicalRecords = async () => {
  const patientId = route.params.id
  try {
    const response = await fetch(`http://localhost:3000/api/patients/${patientId}/medical-records`)
    if (!response.ok) throw new Error('Failed to fetch medical records')
    const data = await response.json()
    
    userName.value = data.patientData.first_name || 'Patient'
    patientData.value = data.patientData
    medicalRecords.value = data.medicalRecords
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchMedicalRecords()
})
</script>

<style scoped>
.records-content {
  padding: 30px;
}
</style>