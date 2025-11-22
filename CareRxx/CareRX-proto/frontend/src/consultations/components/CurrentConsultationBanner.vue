<template>
  <section class="current-consultation">
    <div class="current-consultation-info">
      <h2>Start a New Consultation</h2>
      <p>Connect with a doctor for a video consultation</p>
      <span class="status">Available Now</span>
    </div>
    <a href="#" class="join-call-btn">
      <i class="fas fa-video"></i> Start Consultation
    </a>
  </section>
</template>

<style scoped>
.current-consultation {
  background: var(--gradient);
  border-radius: 20px;
  padding: 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  box-shadow: var(--card-shadow);
}
.current-consultation-info h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}
.current-consultation-info p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 5px;
}
.current-consultation-info .status {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  margin-top: 10px;
}
.join-call-btn {
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.join-call-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
</style>