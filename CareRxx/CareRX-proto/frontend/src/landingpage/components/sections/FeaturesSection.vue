<template>
  <section class="features" id="features">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">✨ Features</div>
        <h2 class="section-title">Everything You Need for Better Healthcare</h2>
        <p class="section-subtitle">CareRX provides comprehensive tools to manage your health journey efficiently and securely.</p>
      </div>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-user-md"></i>
          </div>
          <h3>Expert Medical Team</h3>
          <p>Connect with our certified doctors and specialists across various fields.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-calendar-check"></i>
          </div>
          <h3>Smart Appointment Booking</h3>
          <p>Schedule, reschedule, or cancel appointments with ease. Receive timely reminders.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-video"></i>
          </div>
          <h3>Video Consultations</h3>
          <p>High-quality video calls with doctors. Get prescriptions without leaving home.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-file-medical"></i>
          </div>
          <h3>Electronic Medical Records</h3>
          <p>Securely store and access your complete medical history in one place.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-prescription"></i>
          </div>
          <h3>E-Prescriptions</h3>
          <p>Receive digital prescriptions after your consultations.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-bell"></i>
          </div>
          <h3>Smart Notifications</h3>
          <p>Get timely reminders for appointments and medications.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesSection'
}
</script>

<style scoped>
.features {
  padding: 100px 5%;
  background-color: var(--white);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-badge {
  display: inline-block;
  background-color: var(--primary-light);
  color: var(--primary-dark);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--secondary-color);
  margin-bottom: 20px;
}

.section-subtitle {
  font-size: 18px;
  color: var(--light-text);
  max-width: 700px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.feature-card {
  background: var(--white);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 25px;
  background: var(--gradient);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
}

.feature-icon i {
  font-size: 36px;
  color: white;
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: var(--secondary-color);
}

.feature-card p {
  color: var(--light-text);
  line-height: 1.6;
}
</style>