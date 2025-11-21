<template>
  <section class="testimonials" id="testimonials">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">💬 Testimonials</div>
        <h2 class="section-title">What Our Patients Say</h2>
        <p class="section-subtitle">Real stories from people who have experienced our healthcare services</p>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
          <p class="testimonial-text">{{ testimonial.text }}</p>
          <div class="testimonial-author">
            <div class="author-avatar">{{ testimonial.initials }}</div>
            <div class="author-info">
              <h4>{{ testimonial.name }}</h4>
              <p>{{ testimonial.role }}</p>
            </div>
          </div>
          <div class="rating">
            <i v-for="star in 5" :key="star" class="fas fa-star"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TestimonialsSection',
  setup() {
    const testimonials = ref([
      {
        name: "Sarah Johnson",
        role: "Patient",
        initials: "SJ",
        text: "CareRX has completely changed how I manage my health. The video consultations are convenient and doctors are knowledgeable."
      },
      {
        name: "Michael Chen",
        role: "Patient",
        initials: "MC",
        text: "As a busy professional, I appreciate how easy it is to schedule appointments and access my medical records through CareRX."
      },
      {
        name: "Emily Rodriguez",
        role: "Patient",
        initials: "ER",
        text: "The quality of care I've received through CareRX has been exceptional. The doctors take time to listen and follow-up care is thorough."
      }
    ])
    
    return {
      testimonials
    }
  }
}
</script>

<style scoped>
.testimonials {
  padding: 100px 5%;
  background-color: var(--white);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

.testimonial-card {
  background: var(--white);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  position: relative;
}

.testimonial-card::before {
  content: '"';
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 60px;
  color: var(--primary-light);
  font-family: Georgia, serif;
}

.testimonial-text {
  margin-bottom: 20px;
  padding-left: 20px;
  color: var(--light-text);
  font-style: italic;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-right: 15px;
}

.author-info h4 {
  font-size: 16px;
  color: var(--secondary-color);
  margin-bottom: 3px;
}

.author-info p {
  font-size: 14px;
  color: var(--light-text);
}

.rating {
  color: #fbbf24;
}
</style>