<template>
  <div class="modal" :class="{ active: isOpen }" @click.self="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>Request Refill</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to request a refill for <strong>{{ prescription.medication_name }}</strong>?</p>
        <p>A request will be sent to your doctor for approval.</p>
      </div>
      <div class="modal-actions">
        <button class="btn btn-outline" @click="close">Cancel</button>
        <button class="btn btn-primary" @click="confirm">Confirm Request</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: { type: Boolean, required: true },
  prescription: { type: Object, required: true }
})

const emit = defineEmits(['close', 'confirm'])

const close = () => {
  emit('close')
}

const confirm = () => {
  emit('confirm')
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
  max-width: 500px;
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
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}
</style>