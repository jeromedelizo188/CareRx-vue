<template>
  <section class="cta" id="cta">
    <div class="cta-content">
      <h2>Ready to Transform Your Healthcare?</h2>
      <p>Join thousands of satisfied patients and doctors who trust CareRX for their healthcare needs.</p>
      <BaseButton type="white" size="large" @click="$router.push('/signup')">
        <i class="fas fa-rocket"></i>
        Get Started Now
      </BaseButton>
    </div>
  </section>
</template>

<script>
import { BaseButton } from '../../../shared/components'

export default {
  name: 'CTASection',
  components: {
    BaseButton
  }
}
</script>

<style scoped>
.cta {
  padding: 100px 5%;
  background: var(--gradient);
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: float 20s infinite linear;
}

@keyframes float {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cta-content {
  position: relative;
  z-index: 1;
}

.cta h2 {
  font-size: 48px;
  margin-bottom: 20px;
}

.cta p {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>