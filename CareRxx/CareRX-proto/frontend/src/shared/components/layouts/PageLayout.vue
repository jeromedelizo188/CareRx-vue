<template>
  <div class="page-layout">
    <AppHeader />
    <main class="main-content">
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { AppHeader, AppFooter } from '../index.js'

export default {
  name: 'PageLayout',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style scoped>
.page-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 70px; /* Height of header */
}
</style>