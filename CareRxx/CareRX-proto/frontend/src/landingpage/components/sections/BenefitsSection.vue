<template>
  <section class="benefits" id="benefits">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">💎 Benefits</div>
        <h2 class="section-title">Why Choose CareRX?</h2>
        <p class="section-subtitle">Experience healthcare that's designed around your needs</p>
      </div>
      <div class="benefits-container">
        <div class="benefits-content">
          <h3>Transform Your Healthcare Experience</h3>
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-clock"></i>
            </div>
            <div class="benefit-text">
              <h4>Save Time</h4>
              <p>No more waiting rooms. Get instant access to our healthcare professionals.</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <div class="benefit-text">
              <h4>Secure & Private</h4>
              <p>Your medical data is encrypted and protected with advanced security.</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="benefit-text">
              <h4>Cost Effective</h4>
              <p>Affordable consultation fees with transparent pricing.</p>
            </div>
          </div>
          <div class="benefit-item">
            <div class="benefit-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="benefit-text">
              <h4>24/7 Access</h4>
              <p>Access your medical records and consult with doctors anytime, anywhere.</p>
            </div>
          </div>
        </div>
        <div class="benefits-image">
          <img src="https://i.pinimg.com/1200x/a4/02/b0/a402b016289466ff0953a81fc82a6db3.jpg" alt="Healthcare Benefits">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BenefitsSection'
}
</script>

<style scoped>
.benefits {
  padding: 100px 5%;
  background-color: var(--white);
}

.benefits-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-top: 60px;
}

.benefits-content h3 {
  font-size: 36px;
  color: var(--secondary-color);
  margin-bottom: 30px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.benefit-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  margin-right: 20px;
  flex-shrink: 0;
}

.benefit-text h4 {
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--secondary-color);
}

.benefit-text p {
  color: var(--light-text);
  line-height: 1.6;
}

.benefits-image {
  position: relative;
}

.benefits-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
}

@media (max-width: 992px) {
  .benefits-container {
    grid-template-columns: 1fr;
  }
}
</style>