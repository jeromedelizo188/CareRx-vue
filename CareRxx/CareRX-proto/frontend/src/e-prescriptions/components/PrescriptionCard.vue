<template>
  <div class="prescription-card">
    <div class="prescription-info">
      <div class="prescription-icon">
        <i class="fas fa-pills"></i>
      </div>
      <div class="prescription-details">
        <h3>{{ prescription.medication_name }}</h3>
        <div class="prescription-meta">
          <span><i class="fas fa-user-md"></i> {{ prescription.doctor_name }}</span>
          <span><i class="fas fa-calendar"></i> {{ formattedDate }}</span>
          <span><i class="fas fa-clock"></i> {{ prescription.dosage }}</span>
        </div>
      </div>
    </div>
    <div class="prescription-actions">
      <span class="prescription-status" :class="statusClass">{{ prescription.status }}</span>
      <button class="btn-icon" title="View Details" @click="$emit('view-details')">
        <i class="fas fa-eye"></i>
      </button>
      <button v-if="prescription.status === 'active'" class="btn-icon" title="Request Refill" @click="$emit('request-refill')">
        <i class="fas fa-redo"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  prescription: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details', 'request-refill'])

const formattedDate = computed(() => {
  return new Date(props.prescription.prescribed_date).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })
})

const statusClass = computed(() => {
  return {
    'active': 'status-active',
    'expired': 'status-expired',
    'completed': 'status-expired'
  }[props.prescription.status] || ''
})
</script>

<style scoped>
.prescription-card {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}
.prescription-card:hover {
  box-shadow: var(--card-hover-shadow);
}
.prescription-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-grow: 1;
}
.prescription-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  background-color: var(--primary-light);
  color: var(--primary-dark);
}
.prescription-details h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--secondary-color);
}
.prescription-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: var(--light-text);
}
.prescription-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.prescription-actions {
  display: flex;
  gap: 10px;
}
.prescription-status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}
.status-active {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}
.status-expired {
  background-color: #fee2e2;
  color: #dc2626;
}
.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  border: none;
  color: var(--light-text);
  cursor: pointer;
  transition: all 0.3s;
}
.btn-icon:hover {
  background-color: var(--primary-light);
  color: var(--primary-dark);
}
</style>