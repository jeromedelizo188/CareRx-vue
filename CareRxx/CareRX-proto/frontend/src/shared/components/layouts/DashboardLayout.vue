<template>
  <div class="dashboard-layout">
    <aside class="sidebar" :class="{ active: isSidebarOpen }">
      <div class="sidebar-header">
        <i class="fas fa-heartbeat"></i>
        <span>CareRX</span>
      </div>
        <ul class="sidebar-menu">
          <li><router-link :to="`/dashboard/${userId}`"><i class="fas fa-home"></i> Dashboard</router-link></li>
          <li><router-link :to="`/appointments/${userId}`"><i class="fas fa-calendar-alt"></i> Appointments</router-link></li>
          <li><router-link :to="`/consultations/${userId}`"><i class="fas fa-video"></i> Consultations</router-link></li>
          <li><router-link :to="`/medical-records/${userId}`"><i class="fas fa-file-medical"></i> Medical Records</router-link></li>
          <li><router-link :to="`/e-prescriptions/${userId}`"><i class="fas fa-prescription"></i> E-Prescriptions</router-link></li>
          <li><router-link :to="`/patient-profile/${userId}`"><i class="fas fa-user"></i> My Profile</router-link></li>
          <li><a href="#" style="pointer-events: none; cursor: default;"><i class="fas fa-cog"></i> Settings</a></li>
        </ul> 
      <div class="sidebar-footer">
        <button @click="logout"><i class="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </aside>

    <main class="main-content">
      <header class="top-header">
        <button class="menu-toggle" @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>
        <div class="welcome-message">
          <h1>{{ greeting }}, {{ userName }}!</h1>
          <p>Here's what's happening with your health today.</p>
        </div>
        <div class="header-actions">
          <button class="icon-btn">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </button>
          <div class="user-profile">
            <img src="https://i.pravatar.cc/150?img=3" alt="Patient">
            <span>{{ userName }}</span>
          </div>
        </div>
      </header>

      <div class="dashboard-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  userName: {
    type: String,
    required: true
  }
})

const route = useRoute()
const router = useRouter()

// Get the user ID from the route parameters
const userId = computed(() => route.params.id)

const isSidebarOpen = ref(false)
const hour = ref(new Date().getHours())

const greeting = computed(() => {
  if (hour.value < 12) return 'Good morning'
  if (hour.value < 18) return 'Good afternoon'
  return 'Good evening'
})

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Placeholder logout function
const logout = () => {
  // Implement actual logout logic here (e.g., clear tokens, redirect to login)
  console.log('Logging out...')
  router.push('/login')
}

onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      isSidebarOpen.value = false
    }
  })
})
</script>

<style scoped>
/* FIX 1: Use Grid for desktop layout structure */
.dashboard-layout {
  display: flex; /* Kept for mobile/default flexibility */
  min-height: 100vh;
}

/* --- Sidebar Navigation --- */
.sidebar {
  width: 260px;
  background-color: var(--sidebar-bg);
  color: var(--white);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  position: fixed; /* Essential for mobile overlay */
  height: 100vh;
  z-index: 1000;
  transform: translateX(-100%);
}

.sidebar.active {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header i {
  margin-right: 12px;
  font-size: 28px;
  color: var(--accent-color);
}

.sidebar-menu {
  list-style: none;
  flex-grow: 1;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 5px;
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s;
}

.sidebar-menu a:hover, .sidebar-menu .router-link-active {
  background-color: var(--sidebar-hover);
  color: var(--white);
}

.sidebar-menu i {
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

.sidebar-footer button {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.6);
  background: none;
  border: none;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
  width: 100%;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
}

.sidebar-footer button:hover {
  color: var(--white);
}

.sidebar-footer i {
  margin-right: 12px;
}

/* --- Main Content Area --- */
.main-content {
  flex: 1;
  margin-left: 0;
  display: flex;
  flex-direction: column;
}

/* --- Top Header --- */
.top-header {
  background-color: var(--white);
  padding: 20px 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-message h1 {
  font-size: 24px;
  font-weight: 600;
  color: var(--secondary-color);
}

.welcome-message p {
  color: var(--light-text);
  font-size: 14px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--light-text);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: var(--primary-color);
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--primary-color);
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 50px;
  background-color: var(--background);
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-profile:hover {
  background-color: var(--primary-light);
}

.user-profile img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}

.dashboard-content {
  padding: 30px;
}

.menu-toggle {
  display: block;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-color);
}

/* FIX 2: Apply the correct desktop layout using CSS Grid */
@media (min-width: 769px) {
  .dashboard-layout {
    display: grid;
    /* FIX: Define the fixed sidebar (260px) and the main content (1fr) columns */
    grid-template-columns: 260px 1fr;
  }
  
  .sidebar {
    position: static; /* FIX: Sidebar is no longer a fixed overlay */
    transform: translateX(0); 
    height: 100%; /* Ensure sidebar stretches to full height of grid row */
    grid-column: 1; /* Place sidebar in the first column */
  }
  
  .main-content {
    /* FIX: Remove margin-left which caused the content to shift too far right */
    margin-left: 0; 
    grid-column: 2; /* Place main content in the second column */
  }
  
  .menu-toggle {
    display: none; /* Hide the hamburger menu on desktop */
  }
}
</style>