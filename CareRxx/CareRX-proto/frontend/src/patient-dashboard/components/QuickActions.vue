<template>
  <section class="quick-actions-section">
    <a href="#" class="action-card">
      <div class="action-card-icon"><i class="fas fa-calendar-plus"></i></div>
      <h3>Book Appointment</h3>
      <p>Schedule with a doctor</p>
    </a>
    <a href="#" class="action-card">
      <div class="action-card-icon"><i class="fas fa-comments"></i></div>
      <h3>Start Consultation</h3>
      <p>Join a video call</p>
    </a>
    <a href="#" class="action-card">
      <div class="action-card-icon"><i class="fas fa-file-medical-alt"></i></div>
      <h3>View Records</h3>
      <p>See your medical history</p>
    </a>
    <a href="#" class="action-card">
      <div class="action-card-icon"><i class="fas fa-pills"></i></div>
      <h3>Prescriptions</h3>
      <p>View your e-prescriptions</p>
    </a>
  </section>
</template>

<style scoped>
.quick-actions-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.action-card {
  background-color: var(--white);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--card-shadow);
  text-decoration: none;
  color: var(--text-color);
  border: 2px solid transparent;
}

.action-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-hover-shadow);
  border-color: var(--primary-light);
}

.action-card-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

.action-card:nth-child(1) .action-card-icon { background-color: var(--primary-light); color: var(--primary-dark); }
.action-card:nth-child(2) .action-card-icon { background-color: #e0e7ff; color: #4338ca; }
.action-card:nth-child(3) .action-card-icon { background-color: #dcfce7; color: #15803d; }
.action-card:nth-child(4) .action-card-icon { background-color: #fef3c7; color: #d97706; }

.action-card h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
}

.action-card p {
  font-size: 13px;
  color: var(--light-text);
}
</style>