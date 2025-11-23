<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Book a New Consultation</h2>
          <button class="close-button" @click="closeModal">&times;</button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="submitBooking">
            <div class="form-group">
              <label for="doctor-select">Select Doctor:</label>
              <select v-model="form.doctor_id" id="doctor-select" required>
                <option value="" disabled>-- Select a Doctor --</option>
                <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                  Dr. {{ doctor.first_name }} {{ doctor.last_name }} ({{ doctor.specialization }})
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="date-time-select">Select Date & Time:</label>
              <input 
                type="datetime-local" 
                id="date-time-select"
                v-model="form.consultation_date" 
                :min="minDateTime"
                required
              />
            </div>

            <div class="form-group">
              <label>Consultation Type:</label>
              <div class="type-options">
                <label v-for="type in consultationTypes" :key="type.value" class="radio-label">
                  <input 
                    type="radio" 
                    :value="type.value" 
                    v-model="form.consultation_type"
                  />
                  {{ type.label }}
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label for="purpose">Purpose of Visit (Notes):</label>
              <textarea id="purpose" v-model="form.notes" rows="4" required></textarea>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Booking...' : 'Confirm Booking' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { getDoctors, createConsultation } from '../../api/index.js';

// --- Props ---
// The patientId is passed from the parent component (Appointments.vue)
const props = defineProps({
  patientId: {
    type: Number,
    required: true
  }
});

// --- State ---
const isOpen = ref(false);
const isSubmitting = ref(false);
const doctors = ref([]);

const form = ref({
  doctor_id: '',
  consultation_date: '',
  consultation_type: 'video',
  notes: '',
});

const consultationTypes = [
  { value: 'video', label: 'Video Call' },
  { value: 'in-person', label: 'In-Person (Clinic)' },
];

// Computed property to set the minimum date/time for the input to today
const minDateTime = computed(() => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
});

// --- Methods ---
const openModal = () => {
  isOpen.value = true;
  fetchDoctors();
};

const closeModal = () => {
  isOpen.value = false;
  resetForm();
};

const resetForm = () => {
  form.value = {
    doctor_id: '',
    consultation_date: '',
    consultation_type: 'video',
    notes: '',
  };
};

const fetchDoctors = async () => {
  try {
    const response = await getDoctors();
    doctors.value = response.data;
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    alert('Could not load doctors. Please try again later.');
  }
};

const submitBooking = async () => {
  if (!props.patientId) {
    alert('Patient ID is missing.');
    return;
  }

  isSubmitting.value = true;
  try {
    await createConsultation(props.patientId, form.value);
    alert('Consultation booked successfully!');
    closeModal();
    // Emit an event to the parent to refresh the appointments list
    emit('booking-success');
  } catch (error) {
    console.error('Booking failed:', error);
    alert(error.response?.data?.error || 'Failed to book consultation. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

const emit = defineEmits(['booking-success']);

// Expose the openModal method to the parent component
defineExpose({
  openModal,
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.modal-header h2 {
  margin: 0;
  color: var(--secondary-color);
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #aaa;
}

.close-button:hover {
  color: #000;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-color);
}

.form-group select,
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
  font-family: inherit;
}

.type-options {
  display: flex;
  gap: 25px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.btn {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--primary-dark);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>