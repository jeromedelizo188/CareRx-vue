<template>
  <div class="login-page">
    <div class="split-container">
      <!-- Left Panel - Login Form -->
      <div class="left-panel">
        <div class="soft-ui">
          <!-- Logo -->
          <div class="logo">
            <i class="fas fa-heartbeat"></i>
            <span class="logo-text">CareRX</span>
          </div>

          <h1 class="welcome-title">Welcome Back</h1>
          <p class="subtitle">Login to access your healthcare dashboard</p>

          <!-- Error handling -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <div class="soft-ui-inset">
                <input v-model="loginData.email" type="email" id="email" name="email" class="form-input" placeholder="you@example.com" required>
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="soft-ui-inset">
                <input v-model="loginData.password" type="password" id="password" name="password" class="form-input" required>
              </div>
            </div>

            <div class="button-group">
              <button type="submit" class="btn btn-primary">
                Log In
              </button>
              <router-link to="/" class="btn btn-secondary">
                Back
              </router-link>
            </div>
          </form>

          <div class="signup-link">
            <p>Don't have an account? <router-link to="/signup" class="link">Sign Up</router-link></p>
          </div>
        </div>
      </div>

      <!-- Right Panel - Visual Content -->
      <div class="right-panel">
        <!-- Floating medical icons -->
        <i class="fas fa-stethoscope floating-icon icon-1"></i>
        <i class="fas fa-heartbeat floating-icon icon-2"></i>
        <i class="fas fa-pills floating-icon icon-3"></i>
        <i class="fas fa-user-md floating-icon icon-4"></i>

        <div class="right-content">
          <h2>Your Health, Our Priority</h2>
          <p>Experience seamless healthcare management with our integrated platform</p>

          <div class="feature-list">
            <div class="feature-item">
              <i class="fas fa-video"></i>
              <span>Video consultations with certified doctors</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-file-medical"></i>
              <span>Secure electronic medical records</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-calendar-check"></i>
              <span>Easy appointment scheduling</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-prescription"></i>
              <span>Digital prescriptions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../../api'; // Import the login function from our API service

const router = useRouter();

const loginData = reactive({
  email: '',
  password: ''
});

const errorMessage = ref('');

const handleLogin = async () => {
  // Clear previous errors
  errorMessage.value = '';
  
  // Basic validation
  if (!loginData.email || !loginData.password) {
    errorMessage.value = 'Please fill in all fields.';
    return;
  }
  
  try {
    // Call the login API function
    const response = await login(loginData.email, loginData.password);
    const { user } = response.data;

    // For a prototype, store user info in localStorage
    // In a real app, you'd use a more secure state management solution
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to the user's specific dashboard page
    router.push(`/dashboard/${user.id}`);

  } catch (error) {
    // Display error message from the API or a generic one
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
.login-page {
  font-family: 'Inter', sans-serif;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Split screen container */
.split-container {
  display: flex;
  height: 100vh;
  position: relative;
  z-index: 1;
}

/* Left side - Login form */
.left-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
}

/* Right side - Visual content */
.right-panel {
  flex: 1;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animated background elements */
.right-panel::before {
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

/* Floating medical icons */
.floating-icon {
  position: absolute;
  opacity: 0.2;
  animation: float-icon 6s ease-in-out infinite;
  color: white;
}

@keyframes float-icon {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.floating-icon.icon-1 { top: 20%; left: 20%; font-size: 3rem; animation-delay: 0s; }
.floating-icon.icon-2 { top: 60%; left: 30%; font-size: 2.5rem; animation-delay: 2s; }
.floating-icon.icon-3 { top: 30%; right: 25%; font-size: 2.8rem; animation-delay: 4s; }
.floating-icon.icon-4 { bottom: 25%; right: 20%; font-size: 2.2rem; animation-delay: 1s; }

/* Soft UI styles */
.soft-ui {
  border-radius: 1.5rem;
  background: #e6f7ed;
  box-shadow: 6px 6px 12px #c9d6cf, -6px -6px 12px #ffffff;
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
}

.soft-ui-inset {
  box-shadow: inset 5px 5px 10px #c9d6cf, inset -5px -5px 10px #ffffff;
  border-radius: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #065f46;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: none;
  background: transparent;
  outline: none;
  color: #065f46;
  font-size: 1rem;
}

.form-input::placeholder {
  color: #a0aec0;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-secondary {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.signup-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.link {
  color: #10b981;
  font-weight: 600;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* Right panel content */
.right-content {
  text-align: center;
  color: white;
  z-index: 2;
  position: relative;
  padding: 2rem;
}

.right-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.right-content p {
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.feature-list {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.feature-item i {
  margin-right: 1rem;
  font-size: 1.25rem;
}

/* Logo styling */
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo i {
  font-size: 2.5rem;
  color: #10b981;
  margin-right: 0.75rem;
}

.logo-text {
  font-size: 1.875rem;
  font-weight: 700;
  color: #065f46;
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #065f46;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  color: #6b7280;
  text-align: center;
  margin-bottom: 2rem;
}

/* Error message styling */
.error-message {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 768px) {
  .split-container {
    flex-direction: column;
  }

  .right-panel {
    display: none;
  }

  .left-panel {
    padding: 1rem;
  }
}
</style>