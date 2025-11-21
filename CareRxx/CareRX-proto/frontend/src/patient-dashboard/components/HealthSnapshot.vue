<template>
  <div class="widget">
    <div class="widget-header">
      <h3>Health Snapshot</h3>
      <a href="#">Edit</a>
    </div>
    <div class="health-snapshot-item">
      <span class="health-snapshot-label"><i class="fas fa-tint"></i> Blood Type</span>
      <span class="health-snapshot-value">{{ patientData.bloodType }}</span>
    </div>
    <div class="health-snapshot-item">
      <span class="health-snapshot-label"><i class="fas fa-allergies"></i> Allergies</span>
      <span class="health-snapshot-value">{{ patientData.allergies }}</span>
    </div>
    <div class="health-snapshot-item">
      <span class="health-snapshot-label"><i class="fas fa-user-md"></i> Primary Doctor</span>
      <span class="health-snapshot-value">{{ patientData.primaryDoctor }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  patientData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.widget {
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

.health-snapshot-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--background);
}

.health-snapshot-item:last-child {
  border-bottom: none;
}

.health-snapshot-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--light-text);
}

.health-snapshot-label i {
  color: var(--primary-color);
}

.health-snapshot-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}
</style>