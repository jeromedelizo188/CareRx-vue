<template>
  <section class="health-snapshot">
    <h2>Health Snapshot</h2>
    <div class="snapshot-grid">
      <div class="snapshot-item">
        <p>Blood Type</p>
        <h3>{{ patientData.blood_type || 'N/A' }}</h3>
      </div>
      <div class="snapshot-item">
        <p>Allergies</p>
        <h3>{{ patientData.allergies || 'None listed' }}</h3>
      </div>
      <div class="snapshot-item">
        <p>Weight</p>
        <h3>176 lbs</h3>
      </div>
      <div class="snapshot-item">
        <p>Height</p>
        <h3>5'11"</h3>
      </div>
    </div>
  </section>
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
.health-snapshot {
  background: var(--gradient);
  border-radius: 20px;
  padding: 30px;
  color: white;
  margin-bottom: 30px;
  box-shadow: var(--card-shadow);
}
.health-snapshot h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}
.snapshot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.snapshot-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}
.snapshot-item p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 5px;
}
.snapshot-item h3 {
  font-size: 18px;
  font-weight: 600;
}
</style>