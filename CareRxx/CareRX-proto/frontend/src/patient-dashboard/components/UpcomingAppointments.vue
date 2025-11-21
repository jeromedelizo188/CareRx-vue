<template>
  <div class="widget">
    <div class="widget-header">
      <h3>Upcoming</h3>
      <a href="#">View All</a>
    </div>
    <template v-if="appointments.length > 0">
      <div v-for="appointment in appointments" :key="appointment.date" class="appointment-card">
        <div class="appointment-icon">
          <i class="fas fa-stethoscope"></i>
        </div>
        <div class="appointment-details">
          <h4>{{ appointment.doctor }}</h4>
          <p>{{ appointment.title }}</p>
        </div>
        <div class="appointment-time">
          <h4>{{ formatTime(appointment.date) }}</h4>
          <p>{{ formatDate(appointment.date) }}</p>
        </div>
      </div>
    </template>
    <div v-else class="appointment-card">
      <div class="appointment-details">
        <h4>No upcoming appointments</h4>
        <p>Book your next appointment</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  appointments: {
    type: Array,
    default: () => []
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}
</script>

<style scoped>
.widget {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--card-shadow);
  margin-top: 20px;
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.widget-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--secondary-color);
}

.widget-header a {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.appointment-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid var(--background);
  transition: background-color 0.2s;
  border-radius: 8px;
}

.appointment-card:hover {
  background-color: var(--background);
}

.appointment-card:last-child {
  border-bottom: none;
}

.appointment-icon {
  width: 45px;
  height: 45px;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.appointment-details h4 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 3px;
}

.appointment-details p {
  font-size: 13px;
  color: var(--light-text);
}

.appointment-time {
  margin-left: auto;
  text-align: right;
  flex-shrink: 0;
}

.appointment-time h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
}

.appointment-time p {
  font-size: 12px;
  color: var(--light-text);
}
</style>