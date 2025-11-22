<template>
  <div class="consultation-card">
    <img src="https://i.pravatar.cc/150?img=32" alt="Doctor" class="consultation-avatar">
    <div class="consultation-details">
      <h3>Dr. {{ consultation.doctor_first_name }}</h3>
      <div class="consultation-info">
        <div class="consultation-info-item">
          <i class="fas fa-calendar"></i>
          <span>{{ formattedDate }}</span>
        </div>
        <div class="consultation-info-item">
          <i class="fas fa-clock"></i>
          <span>{{ formattedTime }}</span>
        </div>
        <div class="consultation-info-item">
          <i class="fas fa-stethoscope"></i>
          <span>{{ consultation.specialization || 'Consultation' }}</span>
        </div>
      </div>
      <div class="consultation-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  consultation: {
    type: Object,
    required: true
  }
})

const formattedDate = computed(() => {
  return new Date(props.consultation.created_at).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  })
})

const formattedTime = computed(() => {
  return new Date(props.consultation.created_at).toLocaleTimeString('en-US', { 
    hour: 'numeric', minute: '2-digit', hour12: true 
  })
})
</script>

<style scoped>
.consultation-card {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  display: flex;
  gap: 20px;
  align-items: center;
  transition: all 0.3s;
}
.consultation-card:hover {
  box-shadow: var(--card-hover-shadow);
}
.consultation-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-light);
}
.consultation-details {
  flex-grow: 1;
}
.consultation-details h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--secondary-color);
}
.consultation-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
}
.consultation-info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--light-text);
}
.consultation-info-item i {
  color: var(--primary-color);
}
.consultation-actions {
  display: flex;
  gap: 10px;
}
</style>