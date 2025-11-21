<template>
  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <h3 ref="patientsCount">0</h3>
          <p>Happy Patients</p>
        </div>
        <div class="stat-item">
          <h3 ref="doctorsCount">0</h3>
          <p>Expert Doctors</p>
        </div>
        <div class="stat-item">
          <h3 ref="consultationsCount">0</h3>
          <p>Consultations</p>
        </div>
        <div class="stat-item">
          <h3>99.9%</h3>
          <p>Uptime</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'StatsSection',
  setup() {
    const patientsCount = ref(null)
    const doctorsCount = ref(null)
    const consultationsCount = ref(null)
    
    const animateCounter = (element, target) => {
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        element.textContent = Math.floor(current).toLocaleString() + '+'
      }, 20)
    }
    
    const initCounters = () => {
      animateCounter(patientsCount.value, 50000)
      animateCounter(doctorsCount.value, 1000)
      animateCounter(consultationsCount.value, 100000)
    }
    
    onMounted(() => {
      // Start animation when component is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            initCounters()
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      
      const statsSection = document.querySelector('.stats')
      if (statsSection) {
        observer.observe(statsSection)
      }
    })
    
    return {
      patientsCount,
      doctorsCount,
      consultationsCount
    }
  }
}
</script>

<style scoped>
.stats {
  padding: 80px 5%;
  background: var(--gradient);
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  text-align: center;
}

.stat-item h3 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
}

.stat-item p {
  font-size: 18px;
  opacity: 0.9;
}
</style>