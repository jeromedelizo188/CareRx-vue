<template>
  <div class="records-list">
    <template v-if="records.length > 0">
      <RecordCard
            v-for="record in records"
            :key="record.id"
            :record="record"
            @view-record="$emit('view-record', record)"
      />
    </template>
    <EmptyState
      v-else
      icon-class="fas fa-file-medical"
      title="No Medical Records"
      message="Your medical records will appear here."
    />
  </div>
</template>

<script setup>
import EmptyState from '../../shared/components/base/EmptyState.vue'
import RecordCard from './RecordCard.vue'

defineProps({
  records: {
    type: Array,
    required: true
  }
})

defineEmits(['view-record'])
</script>

<style scoped>
.records-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>