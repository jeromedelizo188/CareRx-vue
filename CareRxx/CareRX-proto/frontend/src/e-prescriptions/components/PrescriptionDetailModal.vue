<template>
  <div class="modal" :class="{ active: isOpen }" @click.self="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Prescription Details</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="detail-grid">
          <div class="detail-label">Medication:</div>
          <div>{{ prescription.medication_name }}</div>
          <div class="detail-label">Dosage:</div>
          <div>{{ prescription.dosage }}</div>
          <div class="detail-label">Prescribed By:</div>
          <div>{{ prescription.doctor_name }}</div>
          <div class="detail-label">Date Issued:</div>
          <div>{{ formattedDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  prescription: { type: Object, required: true }
})

const emit = defineEmits(['close'])

const formattedDate = computed(() => {
  return new Date(props.prescription.prescribed_date).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
})

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  align-items: center;
  justify-content: center;
}
.modal.active {
  display: flex;
}
.modal-content {
  background-color: var(--white);
  border-radius: 15px;
  padding: 30px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--background);
}
.modal-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: var(--secondary-color);
}
.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--light-text);
  cursor: pointer;
}
.modal-body {
  color: var(--text-color);
  line-height: 1.6;
}
.detail-grid {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 15px;
  margin-bottom: 20px;
}
.detail-label {
  font-weight: 600;
  color: var(--light-text);
}
</style>