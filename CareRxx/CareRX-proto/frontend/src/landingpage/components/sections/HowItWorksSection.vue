<template>
  <section class="how-it-works" id="how-it-works">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">🔄 Process</div>
        <h2 class="section-title">How CareRX Works</h2>
        <p class="section-subtitle">Get started with CareRX in just three simple steps</p>
      </div>
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Sign Up & Verify</h3>
          <p>Create your account and complete the quick verification process to access all features.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Book Consultation</h3>
          <p>Choose a doctor, select a convenient time slot, and book your appointment instantly.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Connect & Consult</h3>
          <p>Join the video consultation, get diagnosed, receive prescriptions, and manage your health.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowItWorksSection'
}
</script>

<style scoped>
.how-it-works {
  padding: 100px 5%;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.1));
}

.steps-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
  position: relative;
}

.steps-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--gradient);
  z-index: 0;
}

.step {
  background: var(--white);
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  width: 250px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  position: relative;
  z-index: 1;
  transition: all 0.3s;
}

.step:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--gradient);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin: 0 auto 20px;
}

.step h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--secondary-color);
}

.step p {
  color: var(--light-text);
  font-size: 14px;
}

@media (max-width: 992px) {
  .steps-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .steps-container::before {
    display: none;
  }
}
</style>