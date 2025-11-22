<template>
  <div class="section-tabs">
    <div
      v-for="tab in tabs"
      :key="tab.name"
      class="section-tab"
      :class="{ active: activeTab === tab.name }"
      @click="handleTabClick(tab.name)"
    >
      {{ tab.label }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: { type: Array, required: true },
  activeTab: { type: String, required: true }
})

const emit = defineEmits(['tab-changed'])

const handleTabClick = (tabName) => {
  emit('tab-changed', tabName)
}
</script>

<style scoped>
.section-tabs {
  display: flex;
  background-color: var(--background);
}

.section-tab {
  flex: 1;
  padding: 15px;
  text-align: center;
  font-weight: 500;
  color: var(--light-text);
  cursor: pointer;
  transition: all 0.3s;
}

.section-tab.active {
  background-color: var(--white);
  color: var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
}
</style>