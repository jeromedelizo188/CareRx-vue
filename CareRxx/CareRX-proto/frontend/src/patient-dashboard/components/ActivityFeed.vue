<template>
  <section class="activity-feed">
    <div class="widget-header">
      <h3>Recent Activity</h3>
      <a href="#">See All</a>
    </div>
    <ul class="activity-list">
      <template v-if="activities.length > 0">
        <li v-for="activity in activities" :key="activity.date" class="activity-item">
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-text">
            <p>{{ activity.description }}</p>
            <span>{{ formatDate(activity.date) }}</span>
          </div>
        </li>
      </template>
      <li v-else class="activity-item">
        <div class="activity-icon record">
          <i class="fas fa-info-circle"></i>
        </div>
        <div class="activity-text">
          <p>No recent activity</p>
          <span>Your health activities will appear here</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  activities: {
    type: Array,
    default: () => []
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const getActivityIcon = (type) => {
  const icons = {
    appointment: 'fas fa-calendar-check',
    prescription: 'fas fa-prescription-bottle',
    consultation: 'fas fa-video',
    record: 'fas fa-file-medical'
  }
  return icons[type] || 'fas fa-info-circle'
}
</script>

<style scoped>
.activity-feed {
  background-color: var(--white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: var(--card-shadow);
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

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid var(--background);
  font-size: 14px;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.activity-icon.appointment { background-color: var(--primary-light); color: var(--primary-dark); }
.activity-icon.prescription { background-color: #dbeafe; color: #1e40af; }
.activity-icon.message { background-color: #fef3c7; color: #d97706; }
.activity-icon.consultation { background-color: #fef3c7; color: #d97706; }
.activity-icon.record { background-color: #e9d5ff; color: #7c3aed; }

.activity-text p {
  margin-bottom: 5px;
  line-height: 1.5;
}

.activity-text span {
  color: var(--light-text);
  font-size: 12px;
}
</style>