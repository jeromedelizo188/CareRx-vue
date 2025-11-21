<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --primary-color: #10b981;
  --primary-dark: #059669;
  --primary-light: #d1fae5;
  --secondary-color: #065f46;
  --accent-color: #34d399;
  --text-color: #1f2937;
  --light-text: #6b7280;
  --background: #f9fafb;
  --white: #ffffff;
  --gradient: linear-gradient(135deg, #10b981, #059669);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
  background-color: var(--background);
  overflow-x: hidden;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
</style>