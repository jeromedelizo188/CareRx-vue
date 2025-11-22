<template>
  <div class="prescriptions-list">
    <template v-if="prescriptions.length > 0">
      <PrescriptionCard
            v-for="prescription in prescriptions"
            :key="prescription.id"
            :prescription="prescription"
            @view-details="$emit('view-details', prescription)"
            @request-refill="$emit('request-refill', prescription)"
      />
    </template>
    <EmptyState
      v-else
      icon-class="fas fa-pills"
      :title="emptyStateTitle"
      :message="emptyStateMessage"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import EmptyState from '../../shared/components/base/EmptyState.vue'
import PrescriptionCard from './PrescriptionCard.vue'

const props = defineProps({
  prescriptions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['view-details', 'request-refill'])

const emptyStateTitle = computed(() => {
  // Assuming 'active' tab is the default or first
  const activeTab = 'active' 
  return `No ${activeTab} prescriptions`
})

const emptyStateMessage = computed(() => {
  // Assuming 'active' tab is the default or first
  const activeTab = 'active' 
  return `You don't have any ${activeTab} prescriptions.`
})
</script>
<style scoped>
.prescriptions-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>