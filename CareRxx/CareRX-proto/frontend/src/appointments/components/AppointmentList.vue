<template>
  <div class="appointment-list-container">
    <div v-if="appointments && appointments.length > 0" class="appointment-cards">
      <AppointmentCard 
        v-for="appointment in appointments" 
        :key="appointment.id" 
        :appointment="appointment"
        @view-details="$emit('view-details', appointment)" 
      />
    </div>

    <EmptyState v-else message="You have no appointments booked yet." />
  </div>
</template>

<script setup>
import AppointmentCard from './AppointmentCard.vue';
import EmptyState from './EmptyState.vue';

defineProps({
  appointments: {
    type: Array,
    required: true,
  }
});

defineEmits(['view-details']);
</script>

<style scoped>
.appointment-cards {
  display: grid;
  gap: 20px;
  margin-top: 20px;
}
</style>