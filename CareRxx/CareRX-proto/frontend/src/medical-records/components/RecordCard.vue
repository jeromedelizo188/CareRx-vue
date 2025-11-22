<template>
  <div class="record-card">
    <div class="record-info">
      <div class="record-icon" :class="recordIconClass">
        <i :class="recordIconFa"></i>
      </div>
      <div class="record-details">
        <h3>{{ record.title }}</h3>
        <div class="record-meta">
          <span><i class="fas fa-calendar"></i> {{ formattedDate }}</span>
          <span><i class="fas fa-user-md"></i> {{ record.doctor }}</span>
          <span><i class="fas fa-hospital"></i> {{ record.facility }}</span>
        </div>
      </div>
    </div>
    <div class="record-actions">
      <button class="btn-icon" title="View" @click="$emit('view-record')">
        <i class="fas fa-eye"></i>
      </button>
      <button class="btn-icon" title="Download">
        <i class="fas fa-download"></i>
      </button>
      <button class="btn-icon" title="Share">
        <i class="fas fa-share-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  record: {
    type: Object,
    required: true
  }
})

defineEmits(['view-record'])

const formattedDate = computed(() => {
  return new Date(props.record.date).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })
})

const recordIconClass = computed(() => {
  return props.record.type ?? 'visit'
})

const recordIconFa = computed(() => {
  const iconMap = {
    lab: 'fas fa-vial',
    imaging: 'fas fa-x-ray',
    prescription: 'fas fa-prescription',
    visit: 'fas fa-file-medical'
  }
  return iconMap[props.record.type] || 'fas fa-file-medical'
})
</script>

<style scoped>
.record-card {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
}
.record-card:hover {
  box-shadow: var(--card-hover-shadow);
}
.record-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-grow: 1;
}
.record-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}
.record-icon.lab { background-color: #e0e7ff; color: #4338ca; }
.record-icon.visit { background-color: var(--primary-light); color: var(--primary-dark); }
.record-icon.imaging { background-color: #dcfce7; color: #15803d; }
.record-icon.prescription { background-color: #fef3c7; color: #d97706; }
.record-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--secondary-color);
}
.record-meta {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: var(--light-text);
  flex-wrap: wrap;
}
.record-actions {
  display: flex;
  gap: 10px;
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