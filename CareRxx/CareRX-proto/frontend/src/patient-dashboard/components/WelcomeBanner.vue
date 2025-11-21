<template>
  <section class="welcome-banner">
    <div class="welcome-banner-text">
      <h2>How are you feeling today?</h2>
      <p>Book a consultation or manage your health records with ease.</p>
    </div>
    <div class="find-doctor-search">
      <input type="text" placeholder="Find a doctor or specialist...">
      <button><i class="fas fa-search"></i></button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  userName: String
})
</script>

<style scoped>
.welcome-banner {
  background: var(--gradient);
  border-radius: 20px;
  padding: 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  box-shadow: var(--card-shadow);
  position: relative;
  overflow: hidden;
}

.welcome-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 50%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.welcome-banner-text h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 10px;
}

.welcome-banner-text p {
  font-size: 16px;
  opacity: 0.9;
}

.find-doctor-search {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 5px;
  display: flex;
  align-items: center;
  width: 300px;
  backdrop-filter: blur(10px);
}

.find-doctor-search input {
  background: none;
  border: none;
  padding: 10px 20px;
  color: white;
  width: 100%;
  outline: none;
  font-family: 'Montserrat', sans-serif;
}

.find-doctor-search input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.find-doctor-search button {
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.find-doctor-search button:hover {
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .welcome-banner {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  .find-doctor-search {
    width: 100%;
  }
}
</style>