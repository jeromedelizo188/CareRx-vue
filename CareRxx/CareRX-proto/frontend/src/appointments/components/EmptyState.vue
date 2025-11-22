<template>
  <div class="empty-state">
    <i :class="iconClass"></i>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  iconClass: String,
  title: String,
  message: String
})
</script>

<style scoped>
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--light-text);
}
.empty-state i {
    font-size: 64px;
    color: var(--primary-light);
    margin-bottom: 20px;
}
.empty-state h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: var(--text-color);
}
</style>