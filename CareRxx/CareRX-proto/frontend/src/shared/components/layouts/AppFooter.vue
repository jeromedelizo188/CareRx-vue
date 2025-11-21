<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-column">
        <h3>CareRX</h3>
        <p>Your integrated online health consultation and record system. Making healthcare accessible, efficient, and secure for everyone.</p>
        <div class="social-links">
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
      
      <div class="footer-column">
        <h3>Quick Links</h3>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#benefits">Benefits</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h3>Services</h3>
        <ul>
          <li><a href="#">Video Consultation</a></li>
          <li><a href="#">E-Prescriptions</a></li>
          <li><a href="#">Medical Records</a></li>
          <li><a href="#">Appointment Booking</a></li>
          <li><a href="#">Health Monitoring</a></li>
        </ul>
      </div>
      
      <div class="footer-column">
        <h3>Contact Info</h3>
        <ul>
          <li><i class="fas fa-map-marker-alt"></i>Sta. Isabel, Calapan City, Oriental Mindoro</li>
          <li><i class="fas fa-phone"></i>09298842707</li>
          <li><i class="fas fa-envelope"></i> info.carerx@gmail.com</li>
        </ul>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 CareRX. All Rights Reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background-color: var(--secondary-color);
  color: white;
  padding: 60px 5% 20px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--accent-color);
}

.footer-column p {
  margin-bottom: 20px;
  opacity: 0.8;
  line-height: 1.6;
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 12px;
}

.footer-column ul li a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column ul li a:hover {
  color: var(--accent-color);
}

.footer-column ul li i {
  margin-right: 10px;
  color: var(--accent-color);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  width: 40px;
  height: 40px;
  background-color: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
}

.social-links a:hover {
  background-color: var(--accent-color);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.6);
  font-size: 14px;
}

.footer-bottom a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  margin: 0 5px;
}

.footer-bottom a:hover {
  color: var(--accent-color);
}
</style>