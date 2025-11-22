<template>
  <div class="page-layout">
    <AppHeader class="header" />
    
    <nav class="sidebar">
        <div class="sidebar-logo">CareRX</div>
        <ul>
            <li>Dashboard</li>
            <li>Appointments</li>
            <li>Consultations</li>
            </ul>
    </nav>

    <main class="main-content">
      <slot></slot>
    </main>
    
    </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue' // Keeping this imported, but not used in template

export default {
  name: 'PageLayout',
  components: {
    AppHeader,
    AppFooter // Imported but not used in the template to match dashboard image
  }
}
</script>

<style scoped>
/* FIX: Convert from Flexbox (vertical stack) to CSS Grid (dashboard structure) */
.page-layout {
  min-height: 100vh;
  display: grid;
  
  /* Defines columns: 250px for Sidebar, 1fr for Main Content */
  grid-template-columns: 250px 1fr; 
  /* Defines rows: auto for Header, 1fr for Content/Sidebar */
  grid-template-rows: auto 1fr;
}

/* Header spans both columns */
.header {
  grid-column: 1 / 3; 
  grid-row: 1;
}

/* New Sidebar structure (replaces the missing AppSidebar component) */
.sidebar {
  grid-column: 1;
  grid-row: 2;
  /* Styling to match the dark green in the image */
  background-color: #1a4f4d; 
  color: white;
  padding-top: 20px;
  overflow-y: auto;
}

.sidebar ul {
    list-style: none;
    padding: 0;
}
.sidebar li {
    padding: 15px 25px;
}
.sidebar-logo {
    font-weight: bold;
    font-size: 1.2em;
    padding: 0 25px 20px 25px;
}

/* Main Content is in the second column, below the header */
.main-content {
  grid-column: 2;
  grid-row: 2;
  /* This is the holder for the main content that caused the problem */
  padding: 30px; 
  background-color: var(--light-bg, #f4f4f4); 
  overflow-y: auto;
}
</style>