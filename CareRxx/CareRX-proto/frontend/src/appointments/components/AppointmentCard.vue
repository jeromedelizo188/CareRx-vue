<template>
  <div class="appointment-card">
    <div class="appointment-date">
      <div class="day">{{ dateInfo.day }}</div>
      <div class="month">{{ dateInfo.month }}</div>
    </div>
    <div class="appointment-details">
      <h3>{{ appointment.title }}</h3>
      <div class="appointment-info">
        <div class="appointment-info-item">
          <i class="fas fa-user-md"></i>
          <span>{{ appointment.doctor }}</span>
        </div>
        <div class="appointment-info-item">
          <i class="fas fa-clock"></i>
          <span>{{ dateInfo.time }}</span>
        </div>
        <div class="appointment-info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ appointment.location }}</span>
        </div>
        <div class="appointment-info-item">
          <i class="fas fa-stethoscope"></i>
          <span>{{ appointment.type }}</span>
        </div>
      </div>
      <div class="appointment-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  appointment: Object
})

const dateInfo = computed(() => {
  const date = new Date(props.appointment.date)
  return {
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }
})
</script>

<style scoped>
.appointment-card {
    background-color: var(--white);
    border-radius: 15px;
    padding: 25px;
    box-shadow: var(--card-shadow);
    display: flex;
    gap: 20px;
    transition: all 0.3s;
}
.appointment-card:hover {
    box-shadow: var(--card-hover-shadow);
}
.appointment-date {
    background-color: var(--primary-light);
    color: var(--primary-dark);
    border-radius: 10px;
    padding: 15px;
    min-width: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.appointment-date .day {
    font-size: 24px;
    font-weight: 700;
}
.appointment-date .month {
    font-size: 14px;
    text-transform: uppercase;
}
.appointment-details {
    flex-grow: 1;
}
.appointment-details h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--secondary-color);
}
.appointment-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 15px;
}
.appointment-info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--light-text);
}
.appointment-info-item i {
    color: var(--primary-color);
}
.appointment-actions {
    display: flex;
    gap: 10px;
}
</style>