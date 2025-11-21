<template>
  <div class="dashboard-layout">
    <aside class="sidebar" :class="{ active: isSidebarOpen }">
      <div class="sidebar-header">
        <i class="fas fa-heartbeat"></i>
        <span>CareRX</span>
      </div>
      <ul class="sidebar-menu">
        <li><a href="#" class="active"><i class="fas fa-home"></i> Dashboard</a></li>
        <li><a href="#"><i class="fas fa-calendar-alt"></i> Appointments</a></li>
        <li><a href="#"><i class="fas fa-video"></i> Consultations</a></li>
        <li><a href="#"><i class="fas fa-file-medical"></i> Medical Records</a></li>
        <li><a href="#"><i class="fas fa-prescription"></i> E-Prescriptions</a></li>
        <li><a href="#"><i class="fas fa-user"></i> My Profile</a></li>
        <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
      </ul>
      <div class="sidebar-footer">
        <a href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
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

const props = defineProps({
  userName: {
    type: String,
    required: true
  }
})

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

onMounted(() => {
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      isSidebarOpen.value = false
    }
  })
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
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
  position: fixed;
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

.sidebar-menu a:hover, .sidebar-menu a.active {
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

.sidebar-footer a {
  display: flex;
  align-items: center;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 8px;
  transition: all 0.3s;
}

.sidebar-footer a:hover {
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

@media (min-width: 769px) {
  .sidebar {
    position: static;
    transform: translateX(0);
  }
  .main-content {
    margin-left: 260px;
  }
  .menu-toggle {
    display: none;
  }
}
</style>