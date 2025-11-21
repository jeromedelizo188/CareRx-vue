<template>
  <div class="signup-page">
    <!-- Floating medical icons -->
    <i class="fas fa-stethoscope floating-icon icon-1"></i>
    <i class="fas fa-heartbeat floating-icon icon-2"></i>
    <i class="fas fa-pills floating-icon icon-3"></i>
    <i class="fas fa-user-md floating-icon icon-4"></i>

    <div class="main-container">
      <div class="signup-container">
        <!-- Header -->
        <div class="header-section">
          <div class="logo-container">
            <div class="logo-icon">
              <i class="fas fa-heartbeat text-2xl text-white"></i>
            </div>
            <div class="logo-text">CareRX</div>
          </div>
          <h1 class="header-title">Create Your Patient Account</h1>
          <p class="header-subtitle">Join our healthcare platform to manage your health online</p>
        </div>

        <!-- Progress Steps -->
        <div class="progress-container">
          <div class="progress-steps">
            <div class="progress-line">
              <div class="progress-line-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <!-- CHANGE: v-for now iterates over a computed property -->
            <div v-for="step in steps" :key="step" class="progress-step">
              <div :class="getStepClass(step)">
                <i v-if="isStepCompleted(step)" class="fas fa-check text-sm"></i>
                <span v-else>{{ step }}</span>
              </div>
              <div :class="['step-label', { active: currentStep === step }]">{{ getStepLabel(step) }}</div>
            </div>
          </div>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="errorMessage" class="message-container error">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="message-container success">
          {{ successMessage }}
        </div>

        <!-- Form Component -->
        <SignupForm 
          :currentStep="currentStep" 
          @next-step="nextStep" 
          @previous-step="previousStep"
          @submit-form="submitForm"
        />

        <!-- Footer -->
        <div class="form-footer">
          <p class="login-link">
            Already have an account? 
            <router-link to="/login">Log In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../../api'; // Import the register function
import SignupForm from '../components/SignupForm.vue';

const router = useRouter();
const currentStep = ref(1);
const totalSteps = 4;

// Refs for messages
const errorMessage = ref('');
const successMessage = ref('');

// CHANGE: Added a computed property to generate the steps array
// This is a more explicit and safer way to handle the v-for loop
const steps = computed(() => {
  return Array.from({ length: totalSteps }, (_, i) => i + 1);
});

const progressPercentage = computed(() => {
  return ((currentStep.value - 1) / (totalSteps - 1)) * 100;
});

const getStepClass = (step) => {
  return {
    'step-circle': true,
    'active': currentStep.value === step,
    'completed': isStepCompleted(step)
  };
};

const isStepCompleted = (step) => {
  return step < currentStep.value;
};

const getStepLabel = (step) => {
  const labels = ['Personal Info', 'Medical Info', 'Emergency', 'Verify Email'];
  return labels[step - 1];
};

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// --- MODIFIED FUNCTION ---
const submitForm = async (payload) => {
  // Clear previous messages
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // The payload is already correctly formatted from SignupForm.vue.
    // Just pass it directly to the register function.
    await register(payload);

    // On success, show a message and redirect
    successMessage.value = 'Account created successfully! Redirecting to login...';
    setTimeout(() => {
      router.push('/login');
    }, 2000); // Redirect after 2 seconds

  } catch (error) {
    // On failure, show an error message
    if (error.response && error.response.data.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  }
};
</script>

<style scoped>
/* General Page Styles */
.signup-page {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #dcfce7 75%, #f0fdf4 100%);
  background-size: 400% 400%;
  animation: medicalGradientMove 20s ease infinite;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
}

@keyframes medicalGradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.floating-icon {
  position: absolute;
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
  z-index: 0;
}
.icon-1 { top: 10%; left: 10%; font-size: 3rem; animation-delay: 0s; color: #10b981; }
.icon-2 { top: 20%; right: 15%; font-size: 2.5rem; animation-delay: 2s; color: #059669; }
.icon-3 { bottom: 20%; left: 15%; font-size: 2.8rem; animation-delay: 4s; color: #34d399; }
.icon-4 { bottom: 30%; right: 10%; font-size: 2.2rem; animation-delay: 1s; color: #10b981; }

.main-container {
  position: relative;
  z-index: 10;
  padding: 2rem;
  padding-top: 120px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 2rem;
  box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
}

/* Header Styles */
.header-section {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  padding: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.header-section::before {
  content: '';
  position: absolute;
  top: -50%; right: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }

.logo-container { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; position: relative; z-index: 1; }
.logo-icon { width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 1rem; display: flex; align-items: center; justify-content: center; margin-right: 1rem; backdrop-filter: blur(10px); }
.logo-text { font-size: 2.5rem; font-weight: 700; color: white; letter-spacing: -0.02em; }
.header-title { color: white; font-size: 1.875rem; font-weight: 600; margin-bottom: 0.5rem; position: relative; z-index: 1; }
.header-subtitle { color: rgba(255, 255, 255, 0.9); font-size: 1rem; position: relative; z-index: 1; }

/* Progress Styles */
.progress-container { padding: 2rem 3rem; background: rgba(16, 185, 129, 0.05); border-bottom: 1px solid rgba(16, 185, 129, 0.1); }
.progress-steps { display: flex; justify-content: space-between; position: relative; max-width: 600px; margin: 0 auto; }
.progress-line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: rgba(16, 185, 129, 0.2); z-index: 0; }
.progress-line-fill { position: absolute; top: 0; left: 0; height: 100%; background: #10b981; transition: width 0.3s ease; z-index: 1; }
.progress-step { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
.step-circle { width: 50px; height: 50px; border-radius: 50%; background: white; border: 3px solid rgba(16, 185, 129, 0.2); display: flex; align-items: center; justify-content: center; font-weight: 600; color: #6b7280; transition: all 0.3s ease; margin-bottom: 0.5rem; }
.step-circle.active { background: #10b981; border-color: #10b981; color: white; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2); }
.step-circle.completed { background: #10b981; border-color: #10b981; color: white; }
.step-label { font-size: 0.875rem; color: #6b7280; font-weight: 500; }
.step-label.active { color: #10b981; font-weight: 600; }

/* Message Styles */
.message-container {
  padding: 1rem 2rem;
  margin: 1rem 3rem;
  border-radius: 0.75rem;
  text-align: center;
  font-weight: 500;
}
.message-container.error {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #b91c1c;
}
.message-container.success {
  background-color: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #059669;
}

/* Footer */
.form-footer { text-align: center; padding: 2rem 3rem; background: rgba(16, 185, 129, 0.05); border-top: 1px solid rgba(16, 185, 129, 0.1); }
.login-link { color: #6b7280; font-size: 0.875rem; }
.login-link a { color: #10b981; text-decoration: none; font-weight: 600; }
.login-link a:hover { text-decoration: underline; }

/* Responsive */
@media (max-width: 768px) {
  .signup-container { margin: 1rem; border-radius: 1rem; }
  .header-section { padding: 2rem 1.5rem; }
  .logo-text { font-size: 2rem; }
  .step-label { font-size: 0.75rem; }
}
</style>