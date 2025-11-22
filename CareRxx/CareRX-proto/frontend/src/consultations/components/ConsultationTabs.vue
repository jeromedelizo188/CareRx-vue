<template>
  <div class="tabs">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      class="tab"
      :class="{ active: tab.name === activeTab }"
      @click="handleTabClick(tab.name)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['tab-changed'])

const handleTabClick = (tabName) => {
  emit('tab-changed', tabName)
}
</script>

<style scoped>
.tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e7eb;
}
.tab {
  padding: 12px 20px;
  font-weight: 500;
  color: var(--light-text);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
}
.tab.active {
  color: var(--primary-color);
}
.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: var(--primary-color);
}
</style>