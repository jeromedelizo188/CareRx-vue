<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <div class="hero-text">
        <div class="hero-badge">🏥 Healthcare Revolution</div>
        <h1>CareRX: Your Health, Simplified</h1>
        <p>Experience the future of healthcare with our integrated online consultation and electronic medical record system.</p>
        <div class="hero-buttons">
          <BaseButton type="primary" @click="goToSignup">
            <i class="fas fa-user-plus"></i>
            Get Started
          </BaseButton>
          <BaseButton type="outline" @click="goToLogin">
            <i class="fas fa-sign-in-alt"></i>
            Log In
          </BaseButton>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://i.pinimg.com/736x/75/82/c8/7582c8a7fa6dc39285ad9ece7bc1406b.jpg" alt="Healthcare Consultation">
      </div>
    </div>
  </section>
</template>

<script>
import { useRouter } from 'vue-router'
import BaseButton from '../../../shared/components/base/BaseButton.vue'

export default {
  name: 'HeroSection',
  components: {
    BaseButton
  },
  setup() {
    const router = useRouter()
    
    const goToSignup = () => {
      router.push('/signup')
    }
    
    const goToLogin = () => {
      router.push('/login')
    }
    
    return {
      goToSignup,
      goToLogin
    }
  }
}
</script>

<style scoped>
.hero {
  margin-top: 70px;
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.1)),
              url('https://picsum.photos/seed/healthcare-emerald/1920/1080.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
}

.hero-content {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
  width: 100%;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  flex: 1;
  padding-right: 60px;
}

.hero-badge {
  display: inline-block;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-text h1 {
  font-size: 56px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 25px;
  line-height: 1.2;
}

.hero-text p {
  font-size: 20px;
  margin-bottom: 35px;
  color: var(--light-text);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.hero-image {
  flex: 1;
  position: relative;
}

.hero-image img {
  width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
}

@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-text {
    padding-right: 0;
    margin-bottom: 40px;
  }
  
  .hero-text h1 {
    font-size: 42px;
  }
  
  .hero-buttons {
    justify-content: center;
  }
}
</style>