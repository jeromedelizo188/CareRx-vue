<template>
  <header class="app-header" :class="{ 'scrolled': isScrolled }">
    <nav class="header-nav">
      <router-link to="/" class="logo">
        <i class="fas fa-heartbeat"></i>
        CareRX
      </router-link>
      
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#benefits">Benefits</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <li><router-link to="/login" class="btn btn-primary">Log In</router-link></li>
      </ul>
      
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">
        <i class="fas fa-bars"></i>
      </button>
    </nav>
    
    <div v-if="isMobileMenuOpen" class="mobile-menu">
      <ul class="mobile-nav-links">
        <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
        <li><a href="#features" @click="closeMobileMenu">Features</a></li>
        <li><a href="#how-it-works" @click="closeMobileMenu">How It Works</a></li>
        <li><a href="#benefits" @click="closeMobileMenu">Benefits</a></li>
        <li><a href="#testimonials" @click="closeMobileMenu">Testimonials</a></li>
        <li><router-link to="/login" @click="closeMobileMenu" class="btn btn-primary">Log In</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'AppHeader',
  setup() {
    const isScrolled = ref(false)
    const isMobileMenuOpen = ref(false)
    
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }
    
    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }
    
    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    
    return {
      isScrolled,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style scoped>
.app-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.app-header.scrolled {
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 5%;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.logo i {
  margin-right: 12px;
  font-size: 32px;
}

.nav-links {
  display: flex;
  list-style: none;
  align-items: center;
}

.nav-links li {
  margin-left: 35px;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-links a:hover {
  color: var(--primary-color);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--primary-color);
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  z-index: 999;
}

.mobile-nav-links {
  list-style: none;
  padding: 20px;
}

.mobile-nav-links li {
  margin-bottom: 15px;
}

.mobile-nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  font-size: 18px;
  display: block;
  padding: 10px 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
}
</style>